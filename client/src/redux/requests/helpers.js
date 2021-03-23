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


export async function request({
    url,
    method,
    payload
}) {
    try {
        const response = await fetch(url, {
            method,
            headers:  {
                "refreshToken": localStorage.getItem("refreshToken"),
                "accessToken": localStorage.getItem("accessToken"),
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": "true",
                "Access-Control-Allow-Origin": "http://localhost:8000",
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