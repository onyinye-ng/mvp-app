import axios from "axios"
import { useAccountStore, useStatusStore } from "../stores"
import { apiDomain } from "./constants"

type Request = {
  /**
   * the request endpoint
   *
   * OR
   *
   * the external resource url
   */
  url: string
  /**
   * the request body for POST, PUT, PATCH, and DELETE methods
   */
  body?: object | string | URLSearchParams | FormData | File | Blob
  params?: URLSearchParams
  headers?: Headers | {}
  external?: boolean
}
type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT" | "HEAD"

const requestCore = async (method: RequestMethod, config: Request) => {
  try {
    let { url, body, params, headers, external } = config

    external = external ?? false
    body = method === "GET" || method === "HEAD" ? undefined : body
    headers =
      headers === undefined
        ? { "Content-Type": "application/json" }
        : { "Content-Type": "application/json", ...headers }
    // , "Sec-Fetch-Mode": "no-cors"

    const response = await axios({
      baseURL: external === true ? url : apiDomain,
      url: external === true ? "" : url,
      method: method,
      headers: headers,
      data: body,
      params: params,
      validateStatus: function (status) {
        return status >= 200 && status < 500
      },
    })

    if (response.status === 401) {
      useAccountStore.getState().restoreDefault()
      useStatusStore.getState().toast.error(response?.statusText)
    } else return response.data
  } catch (error: any) {
    if (error.code === "ERR_NETWORK") throw new Error(error?.message)
    else {
      console.log(error.response?.data.message ?? "")
      throw new Error(error?.response.statusText + ". Please try again later.")
    }
  }
}

/**
 * Make request easily to the API or other external resource by
 * passing true to the `external` option.
 */
export const request = {
  /**
   * Make /GET request
   * @param config request configurations
   * @returns Promise
   */
  get: async (config: Request) => {
    return await requestCore("GET", config)
  },
  /**
   * Make /POST request
   * @param config request configurations
   * @returns Promise
   */
  post: async (config: Request) => {
    return await requestCore("POST", config)
  },
  /**
   * Make /POST request
   * @param config request configurations
   * @returns Promise
   */
  patch: async (config: Request) => {
    return await requestCore("PATCH", config)
  },
  /**
   * Make /PATCH request
   * @param config request configurations
   * @returns Promise
   */
  put: async (config: Request) => {
    return await requestCore("PUT", config)
  },
  /**
   * Make /DELETE request
   * @param config request configurations
   * @returns Promise
   */
  delete: async (config: Request) => {
    return await requestCore("DELETE", config)
  },
}
