import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { appId, request } from "../utils"

export interface User {
  id: string
  email: string
  telephone: string
  role: "user" | "admin"
  created: string
}
export interface Business {
  businessName: string
  businessSlug: string
  created: string
}
export type RegisterCredentials = {
  businessName: string
  email: string
  telephone: string
  subscribe: boolean
}
export type LoginCredentials = {
  email: string
  telephone: string
}

interface AccountState {
  authenticated: boolean
  authToken?: string
  user?: User
  business?: Business
}

interface AccountMethods {
  restoreDefault: () => void
  registerBusiness: (credentials: RegisterCredentials) => Promise<any>
  login: (credentials: { email: string; telephone: string }) => Promise<any>
  logout: () => void
}

export const useAccountStore = create<AccountState & AccountMethods>()(
  devtools(
    persist(
      (set, get) => ({
        authenticated: false,
        authToken: undefined,
        user: undefined,
        business: undefined,
        restoreDefault: () => {
          set({
            authenticated: false,
            authToken: undefined,
            user: undefined,
            business: undefined,
          })
        },
        registerBusiness: async (credentials) => {
          return await request
            .post({
              url: "/account/register",
              body: credentials,
            })
            .then((resp) => {
              if (resp.status === true) {
                set({
                  authenticated: true,
                  authToken: resp.data.authToken,
                  user: resp.data.user,
                  business: resp.data.business,
                })
              }
              return resp
            })
        },
        login: async (credentials) => {
          return await request
            .post({
              url: "/account/login",
              body: credentials,
            })
            .then((resp) => {
              if (resp.status === true) {
                set({
                  authenticated: true,
                  authToken: resp.data.authToken,
                  user: resp.data.user,
                  business: resp.data.business,
                })
              }
              return resp
            })
        },
        logout: () => {
          get().restoreDefault()
        },
      }),
      {
        name: `${appId}.account`,
      }
    )
  )
)
