import { jwtDecode } from "jwt-decode";
import apiClient from "../utils/api-client";

const tokenName = "token"

export const signUp = async (user, profile) => {
    const body = new FormData();

    body.append('name', user.name)
    body.append('email', user.email)
    body.append('password', user.password)
    body.append('deliveryAddress', user.deliveryAddress)
    body.append('profile', profile)

    const { data } = await apiClient.post('/user/signup', body, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    localStorage.setItem(tokenName, data.token)
}

export const login = async (user) => {
    const { data } = await apiClient.post('/user/login', user, {
        headers: {
            'Content-Type': 'application/json'
        }
    })

    localStorage.setItem(tokenName, data.token)
}

export const logOut = () => {
    localStorage.removeItem("token");
}

export const getUser = () => {
    try {
        const jwt = localStorage.getItem(tokenName);
        return jwtDecode(jwt)

    } catch (error) {
        return null
    }
}

export const getJWT = () => {
    return localStorage.getItem(tokenName)
}

