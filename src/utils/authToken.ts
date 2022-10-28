import { appId } from "./constants"

export const authToken = () => ({
  Authorization:
    "Bearer " + JSON.parse(localStorage.getItem(appId + ".account") ?? "{}")?.state?.authToken ??
    "",
})
