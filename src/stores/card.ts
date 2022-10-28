import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { appId, authToken, request } from "../utils"

export interface Card {
  id: string
  business: string
  amount: number
  balance: number
  couponCode: string
  status: "active" | "inactive" | "used" | "destroyed"
  created: string
  new?: boolean
}
export type ActivateCardCredentials = {
  qrCodeValue: string
}
export type CardPaymentCredentials = {
  amount: number
  qrCodeValue?: string
  couponCode?: string
}

interface CardState {
  cards: Card[]
}

interface CardMethods {
  restoreDefault: () => void
  createCard: (credentials: Partial<Card>) => Promise<any>
  getCard: (id: Card["id"]) => Promise<any>
  getCards: () => Promise<any>
  activateCard: (qrCodeValue: ActivateCardCredentials["qrCodeValue"]) => Promise<any>
  destroyCard: (id: Card["id"]) => Promise<any>
  cardPayment: (credentials: CardPaymentCredentials) => Promise<any>
}

export const useCardStore = create<CardState & CardMethods>()(
  devtools(
    persist(
      (set, get) => ({
        cards: [],
        restoreDefault: () => {
          set({
            cards: [],
          })
        },
        createCard: async (credentials) => {
          return await request
            .post({
              url: "/cards",
              body: credentials,
              headers: {
                ...authToken(),
              },
            })
            .then((resp) => {
              if (resp.status === true) {
                const cards = get().cards
                set({
                  cards: [{ ...resp.data.card, new: true }, ...cards],
                })
              }
              return resp
            })
        },
        getCard: async (id) => {
          return await request.get({
            url: `/cards/${id}`,
            headers: {
              ...authToken(),
            },
          })
        },
        getCards: async () => {
          await request
            .get({
              url: "/cards",
              headers: {
                ...authToken(),
              },
            })
            .then((resp) => {
              if (resp.status === true) {
                set({
                  cards: resp.data.cards.reverse(),
                })
              }
            })
        },
        destroyCard: async (id) => {
          return await request.patch({
            url: `/cards/${id}/destroy`,
            headers: {
              ...authToken(),
            },
          })
        },
        activateCard: async (qrCodeValue) => {
          return await request.patch({
            url: `/cards/${qrCodeValue}/activate`,
            headers: {
              ...authToken(),
            },
          })
        },
        cardPayment: async (credentials) => {
          return await request.post({
            url: `/cards/payment`,
            body: credentials,
            headers: {
              ...authToken(),
            },
          })
        },
      }),
      {
        name: `${appId}.card`,
      }
    )
  )
)
