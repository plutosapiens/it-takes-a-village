export interface Post {
    id?: string,
    img: string;
    title: string;
    content: string;
    ownerId?: string;
    likedBy: string[];
}