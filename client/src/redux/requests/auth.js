import { getEndpointList } from "../../helpers/endpoints";
export const login = async({payload}) => {
    const { auth } = await getEndpointList();

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Origin': 'http://localhost:3000',

        },
        body: {
            username: payload?.username,
            password: payload?.password
        }
    };
    const response = await fetch(auth.login, options);
    return response.json();
};

export const registration = async(payload) => {
    return {
        response: "ok!"
    }
};