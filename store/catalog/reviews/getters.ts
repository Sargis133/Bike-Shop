import {I_UserReviewsState} from "~/models/store/catalog/reviews/interfaces";

export default {
    getUserReviews:(state: I_UserReviewsState): I_UserReviewsState => {
        return state.userReviews
    }
}