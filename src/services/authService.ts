import { supabase } from '../lib/supabase';
import type { AuthUser } from '../types';

function toAuthUser(supabaseUser: { id: string; email?: string }): AuthUser {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email ?? '',
  };
}

export const authService = {
  async signIn(email: string, password: string): Promise<AuthUser> {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error('ログインに失敗しました');
    return toAuthUser(data.user);
  },

  async signUp(email: string, password: string): Promise<{ user: AuthUser; needsEmailConfirmation: boolean }> {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (!data.user) throw new Error('アカウント作成に失敗しました');
    // session が null の場合はメール確認待ち
    return { user: toAuthUser(data.user), needsEmailConfirmation: !data.session };
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  },

  async getSession(): Promise<AuthUser | null> {
    const { data, error } = await supabase.auth.getSession();
    if (error) throw error;
    if (!data.session?.user) return null;
    return toAuthUser(data.session.user);
  },
};
