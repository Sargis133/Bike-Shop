import {I_UserReview, I_UserReviewsState} from "~/models/store/catalog/reviews/interfaces";

export default {
    M_ADD_USER_REVIEW(state: I_UserReviewsState, payload: I_UserReview): void {
        state.userReviews.push(payload)
    }
}