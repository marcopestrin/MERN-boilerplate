import fetcher, { getEndpointList } from "./helpers";

export const getUsersList = async() => {

    try {
        const { user } = await getEndpointList();
        const { data, error } = await fetcher({
            url: user.getAllUsers,
            method: "GET"
        })
        // gestitire error
        return data
    } catch (error) {
        console.error(error);
        return error;
    }
}