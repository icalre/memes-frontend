import axios from "./axios.service.ts";
import {CommentModel} from "../models";

export default {
    create: (comment: Partial<CommentModel>) => axios.post("comments", comment),
    update: (comment: Partial<CommentModel>) => axios.put("comments", comment),
    all: (page:number, limit: number, id:number) => axios.get(`comments?page=${page}&limit=${limit}&meme=${id}`)
}