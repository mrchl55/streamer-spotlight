export type Streamer = {
    id: string,
    name: string,
    platform: string,
    description: string,
    image?: string,
    votes?: {
        upvotes: number,
        downvotes: number
    }
}