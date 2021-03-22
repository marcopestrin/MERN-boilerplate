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


export async function request({url, method, payload}) {

    const response = await fetch(url, {
        method,
        headers:  {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'http://localhost:8000',
        },
        body: JSON.stringify(payload)
    });
    return response.json();

}