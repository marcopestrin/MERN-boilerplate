import { useCallback, useState } from "react";
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


function useFetcher({ url, method }) {

    const [ data, setData ] = useState();
    const [ error, setError ] = useState();

    const createAxiosGateway = useCallback((options) => {
        const { addBaseUrl } = options;
        try {
            const CORSHeaders = {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "X-Requested-With, Content-Type, Accept, Set-Cookie",
                "Access-Control-Allow-Methods": "GET, PUT, POST, DELETE, PATCH, OPTIONS",
                "Access-Control-Allow-Credentials": "true",
            };
            const headers = {
                accept: "application/json",
                "Content-Type": "application/json",
                ...CORSHeaders,
            };
            const axiosGateway = axios.create({
                baseURL: addBaseUrl ? process.env.REACT_APP_API_URL : null,
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
        
            axiosGateway.interceptors.response.use(
                (response) => {
                  return response;
                },
                (err) => {
                  const commonErrors = [ 401, 403, 404 ];
                  if (commonErrors.includes(err?.response?.status)) {
                    const fetchToken = async() => {
                        try {
                            const { requestToken } = getEndpointList();
                            await fetch({
                                method: "POST",
                                url: requestToken,
                                setData: false
                            })
                        } catch (error) {
                            // redirect to login
                        }
                    }
                    return fetchToken;
                }
                return axiosGateway;
            })
        } catch (err) {
            setError(err);
        }
    }, []);

    const createUrl = useCallback((axiosOptions) => {
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
    }, []);

    const fetch = useCallback(async(options) => {
        /*
            query
            urlPrams,
            url
            addBaseUrl
        */
        const axiosGateway = createAxiosGateway(options);
        let url = createUrl(options);
        try {
            let result = await axiosGateway({
                ...options,
                url,
            });
            setData(result.data);
        } catch (err) {
            setError(err)
        }
    }, []);

    return {
        data,
        error,
        fetch
    }
}

export default useFetcher