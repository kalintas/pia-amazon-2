export interface ReelComment {
    _id: string,
    reelId: string,
    comment: string,
    likes: number,
    dislikes: number,
    subComments: Array<string>
}