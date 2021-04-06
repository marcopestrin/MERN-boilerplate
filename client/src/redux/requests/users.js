import { getEndpointList, request } from "./helpers";
import fetcher from "../../hooks/fetcher";

export const getUsersList = async() => {

    try {
        const { user } = await getEndpointList();
        const { data, error } = await fetcher({
            url: user.getAllUsers,
            method: "GET"
        })
        //console.error(error);
        //console.log(data);
        if (error) {
            throw error
        }
        return data;

        // return await fetch({
        //     url: user.getAllUsers,
        //     method: "GET"
        // })

        // return await request({
        //     url: user.getAllUsers,
        //     method: "GET"
        // });
    } catch (error) {
        console.error(error);
        return error;
    }
}