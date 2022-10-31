import create from "zustand"
import { devtools } from "zustand/middleware"

interface MailChimpState {}

interface MailChimpMethods {
  restoreDefault: () => void
  subscribeMemberToList: (email: string) => Promise<any>
}

export const useMailChimpStore = create<MailChimpState & MailChimpMethods>()(
  devtools((set, get) => ({
    restoreDefault: () => {},
    subscribeMemberToList: async (email) => {},
  }))
)
