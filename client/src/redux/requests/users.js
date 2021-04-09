import fetcher, { getEndpointList } from "./helpers";

export const getUsersList = async() => {
    const { user } = await getEndpointList();
    const { data, error } = await fetcher({
        url: user.getAllUsers,
        method: "GET"
    });
    if (error) {
        return {
            success: false,
            error
        }
    }
    return {
        data,
        success: true
    };
}