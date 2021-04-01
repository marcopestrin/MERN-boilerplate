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

const fetcher = ({ url, method }) => {

    let error = {};
    let data = {};

    const createAxiosGateway = (options) => {
        const { addBaseUrl } = options;
        try {
            const CORSHeaders = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept, Set-Cookie",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Credentials": "true",
            };
            const headers = {
                "accept": "application/json",
                "accessToken": localStorage.getItem("accessToken"),
                "refreshToken": localStorage.getItem("refreshToken"),
                "Content-Type": "application/json",
                ...CORSHeaders,
            };
            const axiosGateway = axios.create({
                baseURL: "",
                timeout: 30000,
                json: true,
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
                (error) => {
                    console.log("error", error);
                }
            );
            axiosGateway.interceptors.response.use(
                (response) => {
                    return response;
                },
                async (err) => {
                    const commonErrors = [ 401, 403, 404 ];
                    if (commonErrors.includes(err?.response?.status)) {
                        const fetchToken = async() => {
                            try {
                                const { auth } = await getEndpointList();
                                await fetch({
                                    method: "POST",
                                    url: auth.requestNewToken
                                })
                            } catch (err) {
                                error = {
                                    ...err
                                };
                            }
                        }
                        return await fetchToken();
                    }
                    return "eeee"
                }
            )
            return axiosGateway
        } catch (err) {
            error = {
                ...err
            };
        }
    };

    const createUrl = (axiosOptions) => {
        const { url, urlParams, query } = axiosOptions;
        let uri = url;
        let queryString = "";
    
        if (urlParams) {
            uri = new UrlPattern(url).stringify(urlParams);
        }
        if (query) {
            Object.keys(query).forEach((key) =>{
                (query[key] === null || query[key] === undefined) && delete query[key]
            });
            queryString = query
            ? qs.stringify(query, { addQueryPrefix: true, arrayFormat: "repeat" })
            : "";
        }
    
        return uri + queryString;
    };

    const fetch = async(options) => {
        const axiosGateway = createAxiosGateway(options);
        let url = createUrl(options);
        try {
            let result = await axiosGateway({
                ...options,
                url,
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
    fetch({
        query: "",
        urlPrams: "",
        url,
        addBaseUrl: ""
    });

    return {
        data,
        error,
    }
}

export default fetcher