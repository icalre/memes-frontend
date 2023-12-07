import axios from "./axios.service.ts";
import {MemeModel} from "../models";

export default {
    create: (meme: Partial<MemeModel>) => axios.post("memes", meme),
    update: (id:number, meme: Partial<MemeModel>) => axios.put("memes/"+id, meme),
    all: (page:number, limit:number, user?:number) => axios.get(`memes?page=${page}&limit=${limit}&user=${user || ''}`),
    get: (id: number) => axios.get(`memes/${id}`),
    delete: (id: number) => axios.delete(`memes/${id}`),
}