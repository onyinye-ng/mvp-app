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
          const listId = process.env.REACT_APP_LIST_ID!
          const apiKey = process.env.REACT_APP_MAILCHIMP_APIKEY!
          const serverPrefix = process.env.REACT_APP_SERVER_PREFIX!

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
