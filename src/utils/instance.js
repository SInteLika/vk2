import axios from "axios";
export const API_URL = 'https://hacker-news.firebaseio.com/v0/'
const instance = axios.create({
    baseURL: API_URL,
})

export default instance