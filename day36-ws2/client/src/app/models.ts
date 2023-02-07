export interface Game {
    gid: number
    name: string
}

export interface Comment {
    gid: number
    commentId: string
    user: string
    rating: number
    commentText: string
}