export interface ReelComment {
    id: string,
    reelId: string,
    comment: string,
    likes: number,
    dislikes: number,
    subComments: Array<string>
}