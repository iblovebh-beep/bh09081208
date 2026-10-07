import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  getDoc,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import { UserProfile } from '../types';

const SESSION_KEY = 'haeruhanzan_session_user';
const listeners: Array<(user: UserProfile | null) => void> = [];

function notifyListeners(user: UserProfile | null) {
  listeners.forEach((fn) => fn(user));
}

// Clean and sanitize email to document ID
function emailToDocId(email: string): string {
  return encodeURIComponent(email.trim().toLowerCase());
}

export function getFriendlyErrorMessage(error: any): string {
  if (typeof error === 'string') return error;
  const msg = error?.message || '';
  const code = error?.code || '';

  if (code === 'auth/weak-password' || msg.includes('6자')) {
    return '비밀번호가 너무 짧습니다. 비밀번호는 6자 이상으로 입력해 주세요.';
  }
  if (code === 'auth/invalid-credential' || code === 'auth/wrong-password' || msg.includes('비밀번호가')) {
    return '비밀번호가 틀렸습니다. 다시 확인하고 입력해 주세요.';
  }
  if (code === 'auth/user-not-found' || msg.includes('가입되지 않은')) {
    return '가입되지 않은 이메일 주소입니다. [회원가입]을 먼저 진행해 주세요.';
  }
  if (code === 'auth/email-already-in-use' || msg.includes('이미 가입된')) {
    return '이미 가입된 이메일 주소입니다. [로그인]을 진행해 주세요.';
  }
  if (code === 'auth/invalid-email' || msg.includes('이메일 형식')) {
    return '올바른 이메일 형식이 아닙니다. (예: example@naver.com)';
  }
  if (code === 'auth/operation-not-allowed') {
    return '보안 서버 인증 처리 중입니다. 다시 시도해 주세요.';
  }

  return msg || '로그인 또는 회원가입 처리 중 문제가 발생했습니다.';
}

export async function signUpUser(name: string, email: string, pass: string): Promise<UserProfile> {
  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanName) {
    throw new Error('성함을 입력해 주세요. (예: 안봉환)');
  }
  if (!cleanEmail || !cleanEmail.includes('@')) {
    throw new Error('올바른 이메일 형식을 입력해 주세요. (예: example@naver.com)');
  }
  if (!pass || pass.length < 6) {
    throw new Error('비밀번호는 6자 이상으로 입력해 주세요. (현재 ' + (pass ? pass.length : 0) + '자 입력됨)');
  }

  const docId = emailToDocId(cleanEmail);
  const userDocRef = doc(db, 'users', docId);

  // 1. Check if user already exists in Firestore database
  try {
    const existingSnap = await getDoc(userDocRef);
    if (existingSnap.exists()) {
      throw new Error('이미 가입된 이메일 주소입니다. [로그인]을 진행해 주세요.');
    }
  } catch (err: any) {
    if (err?.message?.includes('이미 가입된')) {
      throw err;
    }
    console.warn('User duplicate check warning:', err);
  }

  // 2. Try Firebase Auth (if available/enabled)
  let uid = `user_${Date.now()}`;
  try {
    const credential = await createUserWithEmailAndPassword(auth, cleanEmail, pass);
    uid = credential.user.uid;
    await updateProfile(credential.user, { displayName: cleanName });
  } catch (fbErr: any) {
    console.warn('Firebase Auth notice (falling back to database storage):', fbErr?.code || fbErr?.message);
    if (fbErr?.code === 'auth/email-already-in-use') {
      throw new Error('이미 가입된 이메일 주소입니다. [로그인]을 진행해 주세요.');
    }
  }

  // 3. Save profile to Firestore database
  const profile: UserProfile = {
    uid,
    email: cleanEmail,
    displayName: cleanName,
  };

  try {
    await setDoc(userDocRef, {
      ...profile,
      password: pass,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  } catch (dbErr) {
    console.error('Firestore user save error:', dbErr);
  }

  // 4. Save session to localStorage
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Session write error:', e);
  }

  notifyListeners(profile);
  return profile;
}

export async function signInUser(email: string, pass: string): Promise<UserProfile> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !cleanEmail.includes('@')) {
    throw new Error('올바른 이메일 주소를 입력해 주세요.');
  }
  if (!pass) {
    throw new Error('비밀번호를 입력해 주세요.');
  }
  if (pass.length < 6) {
    throw new Error('비밀번호는 6자 이상이어야 합니다. (현재 ' + pass.length + '자 입력됨)');
  }

  const docId = emailToDocId(cleanEmail);
  const userDocRef = doc(db, 'users', docId);

  // 1. Try Firestore database verification first (reliable across all environments)
  let userSnap = await getDoc(userDocRef);

  // If not found by docId, try querying by 'email' field
  if (!userSnap.exists()) {
    try {
      const q = query(collection(db, 'users'), where('email', '==', cleanEmail));
      const qSnap = await getDocs(q);
      if (!qSnap.empty) {
        userSnap = qSnap.docs[0];
      }
    } catch (qErr) {
      console.warn('Query email warning:', qErr);
    }
  }

  if (userSnap.exists()) {
    const userData = userSnap.data();
    if (userData.password && userData.password !== pass) {
      throw new Error('비밀번호가 틀렸습니다. 다시 확인하고 입력해 주세요.');
    }

    const profile: UserProfile = {
      uid: userData.uid || docId,
      email: userData.email || cleanEmail,
      displayName: userData.displayName || cleanEmail.split('@')[0],
    };

    // Try background Firebase Auth sign in
    try {
      await signInWithEmailAndPassword(auth, cleanEmail, pass);
    } catch (fbErr) {
      // Ignore background Auth error if database validated
    }

    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
    } catch (e) {
      console.warn('Session write warning', e);
    }

    notifyListeners(profile);
    return profile;
  }

  // 2. If not found in database yet, try Firebase Auth
  try {
    const credential = await signInWithEmailAndPassword(auth, cleanEmail, pass);
    const fbUser = credential.user;
    const profile: UserProfile = {
      uid: fbUser.uid,
      email: fbUser.email || cleanEmail,
      displayName: fbUser.displayName || cleanEmail.split('@')[0],
    };

    localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
    notifyListeners(profile);
    return profile;
  } catch (fbErr: any) {
    const code = fbErr?.code || '';
    if (code === 'auth/user-not-found') {
      throw new Error('가입되지 않은 이메일 주소입니다. [회원가입]을 먼저 진행해 주세요.');
    }
    if (code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
      throw new Error('비밀번호가 틀렸습니다. 다시 확인하고 입력해 주세요.');
    }
    throw new Error('가입되지 않은 이메일 주소이거나 비밀번호가 틀렸습니다. 확인 후 다시 입력해 주세요.');
  }
}

export async function signOutUser(): Promise<void> {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.warn('Session clear warning', e);
  }

  try {
    await signOut(auth);
  } catch (e) {
    console.warn('Firebase signOut note', e);
  }

  notifyListeners(null);
}

export function getCurrentSessionUser(): UserProfile | null {
  try {
    const cached = localStorage.getItem(SESSION_KEY);
    if (cached) {
      return JSON.parse(cached);
    }
  } catch (e) {
    console.warn('Session read warning', e);
  }
  return null;
}

// Pre-seed test account for seamless testing
export async function seedInitialUserIfEmpty(): Promise<void> {
  try {
    const testDocId = emailToDocId('iblovebh@gmail.com');
    const snap = await getDoc(doc(db, 'users', testDocId));
    if (!snap.exists()) {
      await setDoc(doc(db, 'users', testDocId), {
        uid: 'user_anbonghwan',
        email: 'iblovebh@gmail.com',
        displayName: '안봉환',
        password: 'password123',
        createdAt: new Date().toISOString(),
      });
    }
  } catch (e) {
    console.warn('User seed note:', e);
  }
}

export function subscribeToAuth(callback: (user: UserProfile | null) => void): () => void {
  listeners.push(callback);

  // Immediately notify from local session
  const current = getCurrentSessionUser();
  if (current) {
    callback(current);
  }

  // Also listen to Firebase Auth
  const unsubFb = onAuthStateChanged(auth, async (fbUser) => {
    if (fbUser) {
      const profile: UserProfile = {
        uid: fbUser.uid,
        email: fbUser.email || '',
        displayName: fbUser.displayName || (fbUser.email ? fbUser.email.split('@')[0] : '회원'),
      };
      localStorage.setItem(SESSION_KEY, JSON.stringify(profile));
      callback(profile);
    } else if (!getCurrentSessionUser()) {
      callback(null);
    }
  });

  return () => {
    const idx = listeners.indexOf(callback);
    if (idx > -1) listeners.splice(idx, 1);
    unsubFb();
  };
}
