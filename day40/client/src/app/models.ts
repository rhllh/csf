export interface PostDetails {
    title: string
    text: string
    imageUrl: string
    upvotes: number
    downvotes: number
}

export interface UploadData {
    title: string
    text: string
    image: Blob
}