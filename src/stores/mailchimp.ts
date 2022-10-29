import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { appId } from "../utils"
import client from "@mailchimp/mailchimp_marketing"

interface MailChimpState {}

interface MailChimpMethods {
  restoreDefault: () => void
  subscribeMemberToList: (email: string) => Promise<any>
}

export const useMailChimpStore = create<MailChimpState & MailChimpMethods>()(
  devtools(
    persist(
      (set, get) => ({
        restoreDefault: () => {},
        subscribeMemberToList: async (email) => {
          const listId = "41a652d840"
          const apiKey = "6d7301866a9e5af14a469ede99041d73-us14"
          const serverPrefix = "us14"

          client.setConfig({
            apiKey: apiKey,
            server: serverPrefix,
          })

          return await client.lists.addListMember(listId, {
            email_address: email,
            status: "subscribed",
          })
        },
      }),
      {
        name: `${appId}.mailchimp`,
      }
    )
  )
)
