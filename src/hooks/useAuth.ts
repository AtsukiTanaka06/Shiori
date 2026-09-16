import { useAuthStore } from '../store/authStore';
import { authService } from '../services/authService';

export function useAuth() {
  const { user, isLoading, setUser, setIsLoading } = useAuthStore();

  async function signIn(email: string, password: string): Promise<void> {
    setIsLoading(true);
    try {
      const authUser = await authService.signIn(email, password);
      setUser(authUser);
    } finally {
      setIsLoading(false);
    }
  }

  // needsEmailConfirmation が true の場合はメール確認待ちのため user は null のまま
  async function signUp(email: string, password: string): Promise<{ needsEmailConfirmation: boolean }> {
    setIsLoading(true);
    try {
      const { user: authUser, needsEmailConfirmation } = await authService.signUp(email, password);
      if (!needsEmailConfirmation) {
        setUser(authUser);
      }
      return { needsEmailConfirmation };
    } finally {
      setIsLoading(false);
    }
  }

  async function signOut(): Promise<void> {
    setIsLoading(true);
    try {
      await authService.signOut();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }

  return { user, isLoading, signIn, signUp, signOut };
}
