import fetcher, { getEndpointList } from "./helpers";

export const getUsersList = async() => {

    try {
        const { user } = await getEndpointList();
        const { data, error } = await fetcher({
            url: user.getAllUsers,
            method: "GET"
        })
        if (error) {
            throw error
        }
        return data;
    } catch (error) {
        console.error(error);
        return error;
    }
}