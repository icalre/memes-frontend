import {UserModel} from "../models";

export const userAdapter = (data: any): UserModel  => {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
    };
};