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