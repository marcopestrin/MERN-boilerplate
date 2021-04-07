import axios from "axios";

export async function getEndpointList() {
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

export async function request({
    url,
    method,
    payload
}) {
    try {
        const response = await fetch(url, {
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
        console.log(error);
    }
}


const fetcher = async({ url, method }) => {

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
                    error = {
                        ...err
                    }
                    console.error(err);
                }
            );
            axiosGateway.interceptors.response.use(
                (response) => {
                    return response.data
                },
                async (err) => {
                    try {
                        if ([ 401, 403, 404 ].includes(err?.response?.status)) {
                            const result = await fetchToken();
                            if (result.success) {
                                const res = await fetch(url, {
                                    method,
                                    headers: getHeaders()
                                })
                                return await res.json();
                            }
                            // da gestire
                            return err
                        }
                        // da gestire
                        return err
                    } catch (err) {
                        console.error(err);
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
            if (result.status === 200) {
                const { accessToken } = await result.json();
                localStorage.setItem("accessToken", accessToken);
                return {
                    success: true
                }
            }
            error = 'Impossible to get a new token. Might be wrong refresh-token';
            return {
                success: false
            }
        } catch (err) {
            console.error(err);
        }
    }

    const fetchRequest = async(options) => {
        const axiosGateway = createAxiosGateway(options);
        try {
            let result = await axiosGateway({
                ...options,
            });
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