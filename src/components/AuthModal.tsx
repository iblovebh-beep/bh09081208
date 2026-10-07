import { useState, FormEvent } from 'react';
import { signUpUser, signInUser, getFriendlyErrorMessage } from '../services/authService';
import { UserProfile } from '../types';
import { X, Lock, Mail, User, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
  initialMode?: 'login' | 'signup';
  customTitle?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'login',
  customTitle,
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleTabChange = (newMode: 'login' | 'signup') => {
    setMode(newMode);
    setErrorMessage('');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    // Pre-validation with plain friendly Korean messages
    if (mode === 'signup' && !name.trim()) {
      setErrorMessage('성함을 입력해 주세요. (예: 안봉환)');
      return;
    }

    if (!email.trim()) {
      setErrorMessage('이메일 주소를 입력해 주세요.');
      return;
    }

    if (!password) {
      setErrorMessage('비밀번호를 입력해 주세요.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('비밀번호는 6자 이상으로 입력해 주세요. (현재 ' + password.length + '자 입력됨)');
      return;
    }

    if (mode === 'signup' && password !== passwordConfirm) {
      setErrorMessage('비밀번호와 비밀번호 확인이 서로 다릅니다. 똑같이 입력해 주세요.');
      return;
    }

    try {
      setIsSubmitting(true);
      if (mode === 'signup') {
        const user = await signUpUser(name, email, password);
        onSuccess(user);
        onClose();
      } else {
        const user = await signInUser(email, password);
        onSuccess(user);
        onClose();
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      setErrorMessage(getFriendlyErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FBF8F3] w-full max-w-md rounded-3xl shadow-2xl border border-[#DECBB4] overflow-hidden my-6">
        
        {/* Header */}
        <div className="bg-[#FAF6F0] p-5 border-b border-[#EADFCF] flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-[#8B5A2B] block">
              {customTitle || '주문 전 본인 확인'}
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#261E18]">
              {mode === 'login' ? '간편 로그인' : '회원가입'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#EAE0D1] text-[#634E3C] transition-colors cursor-pointer"
            aria-label="닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Notice Banner */}
        <div className="bg-[#EDF5EE] px-5 py-3 border-b border-[#C6DECA] text-xs text-[#23532C] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#2D5A3A] shrink-0" />
            <span>안전한 주문 및 배송 조회를 위해 로그인이 필요합니다.</span>
          </div>
          <button
            type="button"
            onClick={() => {
              setName('안봉환');
              setEmail('iblovebh@gmail.com');
              setPassword('password123');
              setPasswordConfirm('password123');
              setErrorMessage('');
            }}
            className="text-[11px] font-black text-[#2D5A3A] bg-white border border-[#A7D7AF] px-2.5 py-1 rounded-md hover:bg-[#F2F9F3] transition-colors cursor-pointer shrink-0"
            title="테스트용 안봉환님 정보 자동입력"
          >
            💡 안봉환님 자동입력
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="grid grid-cols-2 p-2 bg-[#F3EBE0] gap-2 border-b border-[#DECBB4]">
          <button
            type="button"
            onClick={() => handleTabChange('login')}
            className={`py-2.5 text-sm font-black rounded-xl transition-all cursor-pointer ${
              mode === 'login'
                ? 'bg-white text-[#2D5A3A] shadow-sm'
                : 'text-[#6E5745] hover:text-[#261E18]'
            }`}
          >
            기존 회원 로그인
          </button>
          <button
            type="button"
            onClick={() => handleTabChange('signup')}
            className={`py-2.5 text-sm font-black rounded-xl transition-all cursor-pointer ${
              mode === 'signup'
                ? 'bg-white text-[#2D5A3A] shadow-sm'
                : 'text-[#6E5745] hover:text-[#261E18]'
            }`}
          >
            처음이신가요? 회원가입
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          
          {/* Sign Up Name Field */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#5C4533] mb-1">
                주문자 성함 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8B5A2B]" />
                <input
                  type="text"
                  required
                  placeholder="예: 안봉환"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#DECBB4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A] text-sm bg-white"
                />
              </div>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className="block text-xs font-bold text-[#5C4533] mb-1">
              이메일 주소 <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8B5A2B]" />
              <input
                type="email"
                required
                placeholder="예: sample@naver.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#DECBB4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A] text-sm bg-white"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#5C4533]">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-[#8B5A2B] font-semibold">
                (6자 이상)
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8B5A2B]" />
              <input
                type="password"
                required
                placeholder="비밀번호 6자 이상"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#DECBB4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A] text-sm bg-white"
              />
            </div>
            {password.length > 0 && password.length < 6 && (
              <p className="text-[11px] text-[#D32F2F] mt-1 font-semibold flex items-center gap-1">
                ⚠️ 현재 {password.length}자입니다. 6자 이상이어야 합니다.
              </p>
            )}
            {password.length >= 6 && (
              <p className="text-[11px] text-[#2D5A3A] mt-1 font-semibold flex items-center gap-1">
                ✓ 사용 가능한 비밀번호 길이입니다 (6자 이상).
              </p>
            )}
          </div>

          {/* Sign Up Confirm Password */}
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#5C4533] mb-1">
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8B5A2B]" />
                <input
                  type="password"
                  required
                  placeholder="비밀번호를 한 번 더 입력해 주세요"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-3 rounded-xl border border-[#DECBB4] text-[#2C241E] focus:outline-none focus:ring-2 focus:ring-[#2D5A3A] text-sm bg-white"
                />
              </div>
              {passwordConfirm.length > 0 && password === passwordConfirm && (
                <p className="text-[11px] text-[#2D5A3A] mt-1 font-semibold">
                  ✓ 비밀번호가 일치합니다.
                </p>
              )}
              {passwordConfirm.length > 0 && password !== passwordConfirm && (
                <p className="text-[11px] text-[#D32F2F] mt-1 font-semibold">
                  ⚠️ 비밀번호가 서로 일치하지 않습니다.
                </p>
              )}
            </div>
          )}

          {/* Error Message Box */}
          {errorMessage && (
            <div className="p-3.5 bg-[#FEE2E2] border border-[#FCA5A5] rounded-xl text-xs sm:text-sm text-[#991B1B] font-bold flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-[#D32F2F] shrink-0 mt-0.5" />
              <span className="leading-snug">{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 text-white text-base sm:text-lg font-black py-4 px-6 rounded-2xl shadow-lg transition-all cursor-pointer ${
                isSubmitting
                  ? 'bg-[#55785D] cursor-not-allowed opacity-90'
                  : 'bg-[#2D5A3A] hover:bg-[#23492F] active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{mode === 'login' ? '로그인 처리 중...' : '회원가입 처리 중...'}</span>
                </>
              ) : (
                <>
                  <span>{mode === 'login' ? '로그인하고 주문 계속하기' : '회원가입 완료하기'}</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Switch Prompt */}
          <div className="text-center pt-2 text-xs text-[#7A614D]">
            {mode === 'login' ? (
              <p>
                아직 계정이 없으신가요?{' '}
                <button
                  type="button"
                  onClick={() => handleTabChange('signup')}
                  className="text-[#2D5A3A] font-extrabold underline cursor-pointer ml-1"
                >
                  30초 만에 회원가입
                </button>
              </p>
            ) : (
              <p>
                이미 가입된 아이디가 있으신가요?{' '}
                <button
                  type="button"
                  onClick={() => handleTabChange('login')}
                  className="text-[#2D5A3A] font-extrabold underline cursor-pointer ml-1"
                >
                  로그인하기
                </button>
              </p>
            )}
          </div>

        </form>

      </div>
    </div>
  );
}
