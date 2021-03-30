import { getEndpointList, request } from "./helpers";
//import useFetch from "hooks/useFetch";

export const getUsersList = async() => {
    //const { fetch } = useFetch();

    try {
        const { user } = await getEndpointList();

        // return await fetch({
        //     url: user.getAllUsers,
        //     method: "GET"
        // })

        return await request({
            url: user.getAllUsers,
            method: "GET"
        });
    } catch (error) {

    }
}