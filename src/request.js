import { store } from "./app/store"

export async function request(...props) {
    const res = await fetch(...props)
}

export function getToken() {
    console.log(store.getState().userSession)
}