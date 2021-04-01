import { getEndpointList, request } from "./helpers";
import fetcher from "../../hooks/fetcher";

export const getUsersList = async() => {

    try {
        const { user } = await getEndpointList();
        fetcher({
            url: user.getAllUsers,
            method: "GET"
        })

        // return await fetch({
        //     url: user.getAllUsers,
        //     method: "GET"
        // })

        // return await request({
        //     url: user.getAllUsers,
        //     method: "GET"
        // });
    } catch (error) {
        console.log(error)
    }
}