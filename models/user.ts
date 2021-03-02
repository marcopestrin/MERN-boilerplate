import schema from './schema/user';

export default class User {
    createNewUser(payload: object) {
        try {
            schema.create(payload, (err: object, res: object) => {
                if (err) throw err;
                return res;
            })
        } catch (error) {
            console.log("error", error)
        }
    }
};