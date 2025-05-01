import { Ref, ref } from 'vue'
import { Session, SupabaseClient, User } from '@supabase/supabase-js'
import { supabase } from './useSupabase'

interface UseAuthReturn {
  supabase: SupabaseClient
  signUp: (email: string, password: string, alias: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  getSession: () => Promise<void>
  hasSession: () => boolean
  user: Ref<User | null>
  session: Ref<Session | null>
}

const user = ref<User | null>(null)
const session = ref<Session | null>(null)

export default function useAuth(): UseAuthReturn {
  async function signUp(email: string, password: string, alias: string): Promise<void> {
    try {
      const { data } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { alias }
        }
      })

      session.value = data.session
      user.value = data.user
    } catch (error) {
      alert(error)
    }
  }

  async function signIn(email: string, password: string): Promise<void> {
    try {
      const { data } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      session.value = data.session
      user.value = data.user
    } catch (error) {
      alert(error)
    }
  }

  async function signOut(): Promise<void> {
    if (hasSession()) {
      try {
        await supabase.auth.signOut()
        await getSession()
      } catch (error) {
        alert(error)
      }
    }
  }

  async function getSession(): Promise<void> {
    try {
      const { data } = await supabase.auth.getSession()
      const { data: userData } = await supabase.auth.getUser()

      session.value = data.session
      user.value = userData.user
    } catch (error) {
      alert(error)
    }
  }

  function hasSession(): boolean {
    return !!session.value
  }

  return {
    supabase,
    signUp,
    signIn,
    signOut,
    getSession,
    hasSession,
    user,
    session
  }
}
