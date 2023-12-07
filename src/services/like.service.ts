import axios from "./axios.service.ts";

export default {
    create: (like:any) => axios.post("likes", like)
}