import axios from "axios";

require('dotenv').config()

export async function getEndpointList() {
    const url = `${process.env.PUBLIC_URL}/json/endpoints.json`;
    const response = await fetch(url);
    return await response.json();
};

async function getErrorMessage() {
    const url = `${process.env.PUBLIC_URL}/json/errorMessage.json`;
    const response = await fetch(url);
    return await response.json();
}

const baseURL = process.env.REACT_APP_BASE_URL_SERVER;

const getHeaders = () => {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept, Set-Cookie",
        "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Credentials": "true",
        "accept": "application/json",
        "accessToken": localStorage.getItem("accessToken"),
        "refreshToken": localStorage.getItem("refreshToken"),
        "Content-Type": "application/json",
    }
}

export async function request({
    url,
    method,
    payload
}) {
    try {
        const response = await fetch(`${baseURL}${url}`, {
            method,
            headers:  {
                ...getHeaders()
            },
            body: JSON.stringify(payload)
        });
        if (response.status !== 200){
            throw response;
        }
        return response.json();
    } catch (error){
        console.error(error);
    }
}

const fetcher = async({ url, method }) => {

    let error = null;
    let data = {};
    const errorMessage = await getErrorMessage();


    const createAxiosGateway = (options) => {
        const { url, method } = options;
        
        try {
            const headers = getHeaders();
            const axiosGateway = axios.create({
                baseURL,
                timeout: 30000,
                json: true,
                method,
                headers,
                withCredentials: true,
            });
            axiosGateway.interceptors.response.use(
                (response) => response.data,
                async (err) => {
                    try {
                        if ([ 401 ].includes(err?.response?.status)) {
                            // autorizzazione al backend errata
                            const result = await fetchToken();
                            if (result.success) {
                                const res = await fetch(`${baseURL}${url}`, {
                                    method,
                                    headers: getHeaders()
                                })
                                return await res.json();
                            }
                            throw result;
                        }
                        if ([ 500 ].includes(err?.response?.status)) {
                            // errore del server
                            throw err.response
                        }
                    } catch (err) {
                        console.error(err);
                        error = {
                            ...err
                        }
                    }
  
                }
            )
            return axiosGateway;
        } catch (err) {
            error = {
                ...err
            };
        }
    };

    const fetchToken = async() => {
        try {
            const { auth } = await getEndpointList();
            const url = `${baseURL}${auth.requestNewToken}`
            const result = await fetch(url, {
                method: "POST",
                headers: getHeaders()
            })
            if (result.status === 200) {
                const { accessToken } = await result.json();
                localStorage.setItem("accessToken", accessToken);
                return {
                    success: true
                }
            }
            error = errorMessage.invalidRefreshToken;
            return {
                success: false
            }
        } catch (err) {
            console.error(err);
            return {
                success: false
            }
        }
    }

    const fetchRequest = async(options) => {
        const axiosGateway = createAxiosGateway(options);
        try {
            let result = await axiosGateway({
                ...options,
            });
            if (result === undefined) {
                return;
            }
            data = {
                ...result
            }
        } catch (err) {
            error = {
                ...err
            }
        }
    };

    await fetchRequest({
        method,
        url
    });
    return {
        data,
        error,
    }
}

export default fetcher