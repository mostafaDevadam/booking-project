import axios, { AxiosRequestConfig } from "axios"
import { API_HOST } from "../../constants"
import { AuthService } from "../auth.service"

const base_url = API_HOST

export const buildHeader = async () => {
    return {
        ...(await AuthService.getToken() && {'auth-token': await AuthService.getToken()})
    }

}

export const callAPI = async (method: string, url: string, data?: any) => {
    return await axios({
        baseURL: base_url + url,
        method: method,
        data: data && data,
        headers: await buildHeader(),
    })
}



export enum REQUEST_METHOD_ENUM {
    get = 'GET',
    post = 'POST',
    patch = 'PATCH',
    delete = 'DELETE',
}

type PARAMS<BODY_TYPE> = {
    method: 'POST' | 'GET' | 'PATCH' | 'DELETE'
    path: string
    data?: BODY_TYPE
}

type RESPONSE<T> = {
    response: {
        ok: boolean,
        status: number
    }
    data?: T
}

const setOptions = async<INPUT>({ method, path, data }: PARAMS<INPUT>): Promise<AxiosRequestConfig> => {
    // const token = async () => {}
    return {
        method,
        url: base_url + path,
        headers: await buildHeader(),
    }
}

export const callAPI1 = async <T, INPUT>({ method, path, data }: PARAMS<INPUT>) => {
    try {
        return await axios
            .request(await setOptions<INPUT>({ method, path, data }))
            .then(({ data }: { data: T }) => {
                return data
            })
            .catch((error: any) => {
                console.error(error)
            })
    } catch (error) {
        console.log("error:", error)
    }
}

