export interface MemeModel {
    id: number;
    title: string;
    image: string;
    numberOfLikes: number;
    numberOfComments: number;
    userId: number;
    createdAt: string;
    updatedAt:string;
    comment?:any,
}