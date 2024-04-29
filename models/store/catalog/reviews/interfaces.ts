export interface API_I_UsersReviews {
    id: number,
    name: string,
    image?: string,
    review: string,
    stars: number
}
export interface I_UsersReviews extends API_I_UsersReviews {}
export interface I_UsersReviewsCounts {
    reviews: I_UsersReviews[],
    count: number
}
export interface I_UserReview {
    productId: number,
    review: string,
    stars: number,
}
export interface I_UserReviewsState {
    userReviews: I_UserReview[]
}