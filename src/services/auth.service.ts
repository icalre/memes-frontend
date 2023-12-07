import axios from "./axios.service.ts";
import {UserModel} from "../models/user.model.ts";

export default {
    register: (user: Partial<UserModel>) => axios.post("auth/register", user),
    login: (user: Partial<UserModel>) => axios.post("auth/login", user),
    logout: () => axios.get("auth/logout"),
}