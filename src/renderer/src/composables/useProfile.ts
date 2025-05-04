import { Ref, ref } from 'vue'
import { supabase } from './useSupabase'

interface Profile {
  userId: string
  alias: string
  avatarUrl?: string
  bio?: string
  pronouns?: string
  createdAt: Date
  socialLinks?: SocialLink[]
  updatedAt?: Date
}

export type SocialLinkPlatform = 'steam' | 'spotify' | 'bluesky' | 'mastodon' | 'website'

interface SocialLink {
  platform: SocialLinkPlatform
  url: string
}

interface UseProfileReturn {
  profile?: Ref<Profile | undefined>
  initProfile: (alias: string) => Promise<Profile | undefined>
  setProfile: (userId: string) => Promise<void>
}

const PROFILES_TABLE = 'profiles'

const profile = ref<Profile>()

export default function useProfile(): UseProfileReturn {
  async function initProfile(alias: string): Promise<Profile | undefined> {
    try {
      const { data } = await supabase.from(PROFILES_TABLE).insert([{ alias }]).select()

      if (data) {
        const remoteProfile = data[0]

        profile.value = {
          userId: remoteProfile.user_id,
          alias: remoteProfile.alias,
          createdAt: new Date(remoteProfile.created_at)
        }
        return data[0]
      }
    } catch (error) {
      console.log(error)
      return undefined
    }

    return undefined
  }

  async function setProfile(userId: string): Promise<void> {
    console.log('Get profile with:', userId)
    try {
      const { data } = await supabase.from(PROFILES_TABLE).select('*').eq('user_id', userId)
      console.log(data)

      if (data) {
        const remoteProfile = data[0]

        profile.value = {
          userId: remoteProfile.user_id,
          alias: remoteProfile.alias,
          avatarUrl: remoteProfile.avatar_url,
          createdAt: new Date(remoteProfile.created_at),
          updatedAt: remoteProfile.updated_at,
          bio: remoteProfile.bio,
          pronouns: remoteProfile.pronouns,
          socialLinks: remoteProfile.social_links
        }

        console.log(profile.value)
        // return data[0]
      }
    } catch (error) {
      console.log(error)
    }
  }

  return {
    initProfile,
    setProfile,
    profile
  }
}
