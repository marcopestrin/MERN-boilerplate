
import axios from 'axios'

function getBaseURL () {
    return process.env.REACT_APP_BASE_URL_SERVER;
} 

function getRefreshToken () {
    return localStorage.getItem("refreshToken");
}

function getAccessToken () {
    return localStorage.getItem("accessToken");
}

function setAccessToken(accessToken) {
    localStorage.setItem("accessToken", accessToken);
}

function getHeaders () {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept, Set-Cookie",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "accept": "application/json",
        "accessToken": getAccessToken(),
        "refreshToken": getRefreshToken(),
        "Content-Type": "application/json",
    }
}

function parseError (messages) {
    if (messages) {
        if (messages instanceof Array) {
            return Promise.reject({ messages: messages })
        } else {
            return Promise.reject({ messages: [messages] })
        }
    } else {
        return Promise.reject({ messages: [""] })
    }
}

function parseBody (response) {
    if (response.status === 200) {    
        return response.data.result
    } else {
        return parseError(response.data.messages)
    }
}

async function getEndpointList() {
    const url = `${process.env.PUBLIC_URL}/json/endpoints.json`;
    const response = await fetch(url);
    return await response.json();
}

async function handleError(error) {
    try {
        if ([ 401 ].includes(error?.response?.status)) {
            const result = await fetchToken();
            if (result.success) {
                instance.defaults.headers.common['accessToken'] = getAccessToken;
                return instance;
            }
            throw error.response;
        }
        if ([ 500, 403 ].includes(error?.response?.status)) {
            throw error.response;
        }
    } catch (error) {
        return Promise.reject(error)
    }
}

function handleResponse (response) {
    return parseBody(response)
}

async function fetchToken () {
    const { auth } = await getEndpointList();
    const url = `${baseURL}${auth.requestNewToken}`
    const result = await fetch(url, {
        method: "POST",
        headers: getHeaders()
    });
    if (result.status === 200) {
        const { accessToken } = await result.json();
        setAccessToken(accessToken);
        return {
            success: true,
            accessToken
        };
    }
    return {
        success: false
    }
}

const baseURL = getBaseURL()

let instance = axios.create({
    baseURL,
    json: true,
    headers: getHeaders(),
})

instance.interceptors.response.use(handleResponse, handleError)

export default instance;
