import { userReviewsData } from "~/server/product/reviews";
import {
  API_I_UsersReviews,
  I_UserReview,
  I_UsersReviews,
  I_UsersReviewsCounts
} from "~/models/store/catalog/reviews/interfaces";

export default {
  async A_GET_USER_REVIEWS(
    context: { commit: (arg0: string) => void },
    payload: number,
  ): Promise<I_UsersReviewsCounts | false> {
    try {
      const reviewsData: API_I_UsersReviews[] = userReviewsData
      const reviews: I_UsersReviews[] = Object.assign(reviewsData);
      return {
          reviews: reviews.slice((payload - 1) * 10, payload * 10),
          count: Math.ceil(reviews.length / 10)
      }
    } catch (err) {
      return false;
    }
  },
  A_ADD_USER_REVIEW(context: { commit: (arg0: string, arg1: I_UserReview) => any }, payload: I_UserReview): boolean {
    if(payload.review) {
        context.commit("M_ADD_USER_REVIEW", payload);
        return true
    } else return false
  }
};
