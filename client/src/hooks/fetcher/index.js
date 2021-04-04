import axios from "axios";
import UrlPattern from "url-pattern";
import qs from "qs";

async function getEndpointList() {
    let apiURL;

    switch (process.env.NODE_ENV) {
        case "development":
            apiURL = `${process.env.PUBLIC_URL}/endpoints/development.json`;
            break;
        case "production":
            apiURL = `${process.env.PUBLIC_URL}/endpoints/production.json`;
            break;
        default:
            apiURL = `${process.env.PUBLIC_URL}/endpoints/local.json`;
            break;
    };

    const response = await fetch(apiURL);
    return await response.json();
};

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

const fetcher = ({ url, method }) => {

    let error = {};
    let data = {};


    const createAxiosGateway = (options) => {
        const { url, method } = options;
        
        try {
            const headers = getHeaders();
            const axiosGateway = axios.create({
                baseURL: url,
                timeout: 30000,
                json: true,
                method,
                headers,
                withCredentials: true,
            });
            axiosGateway.defaults.headers.common = headers;
            axiosGateway.defaults.headers.patch = headers;
            axiosGateway.defaults.headers.post = headers;
            axiosGateway.defaults.headers.put = headers;
            axiosGateway.defaults.headers.get = headers;
            axiosGateway.defaults.headers.delete = headers;
            axiosGateway.defaults.withCredentials = true;
            axiosGateway.interceptors.request.use(
                (response) => {
                    response.meta = response.meta || {};
                    response.meta.requestStartedAt = new Date().getTime();
                    return response;
                },
                (err) => {
                    console.error(err);
                }
            );
            axiosGateway.interceptors.response.use(
                (response) => {
                    return response;
                },
                async (err) => {
                    try {
                        if ([ 401, 403, 404 ].includes(err?.response?.status)) {
                            const accessToken = await fetchToken();
                            return fetch(url, {
                                method,
                                headers: getHeaders()
                            })
                        }
                    } catch (error) {
                        console.error(error)
                        return error
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
            const result = await fetch(auth.requestNewToken, {
                method: "POST",
                headers: getHeaders()
            })
            const { accessToken } = await result.json();
            localStorage.setItem("accessToken", accessToken);
            return accessToken;
        } catch (err) {
            error = {
                ...err
            };
        }
    }

    const fetchRequest = async(options) => {
        const axiosGateway = createAxiosGateway(options);
        try {
            let result = await axiosGateway({
                ...options,
            });
            data = {
                ...result.data
            };
        } catch (err) {
            error = {
                ...err
            };
        }
    };
    fetchRequest({
        method: "GET",
        url
    });

    return {
        data,
        error,
    }
}

export default fetcher