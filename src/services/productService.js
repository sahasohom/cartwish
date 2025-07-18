import apiClient from "../utils/api-client"

export const getSuggestionAPI = (search) => {
    return apiClient.get(`/products/suggestions?search=${search}`)
}