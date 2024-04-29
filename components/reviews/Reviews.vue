<template>
  <div>
    <template v-if="loader">
      <div
        class="top-0 left-0 w-full h-[150px] bg-black bg-opacity-30 z-100 flex justify-center items-center"
      >
        <Loader />
      </div>
    </template>

    <div class="flex flex-col">
      <template v-if="noReviewsText">
        <p class="p-2 font-semibold text-lg h-max">{{ noReviewsText }}</p>
      </template>
      <template v-else>
        <!--        Reviews-->
        <div v-for="user in usersReviews" class="flex p-2">
          <div class="px-2">
            <img
              :src="user.image || '/img/reviews/defaultUser.jpg'"
              class="w-[60px] h-[60px] rounded-full border-2 border-gray-600 max-md:max-w-[40px] max-md:h-auto"
              alt="user_image"
            />
          </div>
          <div>
            <p class="text-lg dark:text-gray-300 max-sm:text-[15px] font-source-sans-reg">
              {{
                user.name.slice(0, 1).toUpperCase() +
                user.name.slice(1) +
                " " +
                user.id
              }}
            </p>
            <p class="pl-2 dark:text-gray-300 max-sm:text-sm font-montserrat">
              {{ user.review }}
            </p>
            <div class="flex pt-2 pl-2">
              <div v-for="star in user.stars">
                <ui-ui-icons
                  icon-name="star"
                  icon-classes="w-5 h-5 fill-yellow-500"
                  path-stroke="dark:stroke-slate-100 stroke-black"
                  :key="star"
                />
              </div>
            </div>
          </div>
        </div>
        <!--          Pagination and User Review message-->
        <template v-if="usersReviews.length > 0">
          <!--          Review-->
          <div class="pl-10 pt-6 w-[50%] max-sm:w-[80%]">
            <div class="pb-2">
              <h3 class="text-lg dark:text-gray-300 max-sm:text-sm">
                {{ localization.writeReview }}
              </h3>
            </div>
            <textarea
              class="focus:outline-none border border-gray-400 min-w-[200px] w-full rounded p-2 bg-gray-200 resize-none ml-2"
              v-model="reviewText"
            ></textarea>
            <div
              class="flex justify-between py-2 pl-4 max-sm:flex-col max-sm:gap-y-4"
            >
              <div class="flex items-start">
                <ui-ui-button
                  v-for="star in 5"
                  :key="star"
                  custom="p-0.5"
                  size="sm"
                  @mouseover="starsHoverFunc(star)"
                  @mouseleave="starsHoverFunc('leave')"
                  @click="selectStarFunc(star)"
                >
                  <ui-ui-icons
                    icon-name="star"
                    :icon-classes="
                      'w-5 h-5 ' +
                      (star <= stars ? 'fill-yellow-500' : 'fill-none')
                    "
                    path-stroke="dark:stroke-slate-100 stroke-black"
                  />
                </ui-ui-button>
              </div>
              <ui-ui-button
                variant="success"
                size="md"
                @click="sendReviewFunc"
                >{{ localization.send }}</ui-ui-button
              >
            </div>
          </div>
          <!--          Pagination-->
          <div class="py-1 mt-6">
            <Pagination  :selected-page="reviewsPage" :page-count="reviewsPageCount" @change-page="changeReviewsCountFunc"></Pagination>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  I_UserReview,
  I_UsersReviews,
} from "~/models/store/catalog/reviews/interfaces";
import { I_AlertConfigPayload } from "~/models/store/main/interfaces";

const localization = computed(() => useLocalization());
const { $store } = useNuxtApp();
const router = useRouter();
const route = useRoute();

let stars = ref(0);
let selectedStar = ref(0);
let reviewText = ref<string>("");

let loader = ref<boolean>(true);

let noReviewsText = ref<string>();
let reviewsPage = ref<number>(+(route.query.page || 1));
let reviewsPageCount = ref<number>(0);
let usersReviews = ref<I_UsersReviews[]>([]);


$store.dispatch("A_GET_USER_REVIEWS", reviewsPage.value).then((resolve) => {
  if (resolve) {
    setTimeout(() => {
      usersReviews.value = resolve.reviews;
      reviewsPageCount.value = resolve.count;
      loader.value = false;
      if (resolve.length == 0)
        noReviewsText.value = localization.value.noReviewsText;
    }, 2000);
  } else {
    loader.value = false;
    usersReviews.value = [];
    noReviewsText.value = localization.value.noReviewsText;
  }
});

const changeReviewsCountFunc = (position: string | number): void => {
  if (position == "prev") {
    if (reviewsPage.value <= 1) return;
    else {
      $store
        .dispatch("A_GET_USER_REVIEWS", (reviewsPage.value -= 1))
        .then((resolve) => (usersReviews.value = resolve.reviews));
    }
  } else if (position == "next") {
    if (reviewsPage.value >= reviewsPageCount.value) return;
    else {
      $store
        .dispatch("A_GET_USER_REVIEWS", (reviewsPage.value += 1))
        .then((resolve) => (usersReviews.value = resolve.reviews));
    }
  } else {
    $store
      .dispatch("A_GET_USER_REVIEWS", position)
      .then((resolve) => (usersReviews.value = resolve.reviews));
    reviewsPage.value = +position;
  }
  router.push({
    query: {
      page: reviewsPage.value,
    },
  });
};
const starsHoverFunc = (num: number | "leave") => {
  if (num == "leave") {
    selectedStar.value ? (stars.value = selectedStar.value) : (stars.value = 0);
  } else {
    stars.value = num;
  }
};
const selectStarFunc = (num: number) => {
  selectedStar.value = num;
  stars.value = num;
};

const sendReviewFunc = () => {
  if (reviewText.value) {
    const userReview: I_UserReview = {
      productId: +route.params.id,
      review: reviewText.value,
      stars: selectedStar.value,
    };
    const sendReview = $store.dispatch("A_ADD_USER_REVIEW", userReview);
    const alertConfig: I_AlertConfigPayload = {
      variant: "success",
      descriptions: [
        {
          title: localization.value.success,
          descriptions: [localization.value.reviewSent],
        },
      ],
    };
    sendReview.then((resolve) => {
      if (!resolve) {
        alertConfig.variant = "error";
        alertConfig.descriptions = [
          {
            title: localization.value.error,
            descriptions: [localization.value.pleaseFillInCorrectly],
          },
        ];
      }
      $store.dispatch("A_SET_ALERT_CONFIG", alertConfig);
    });
  }
};
</script>

<style scoped>
@import "assets/css/fonts.css";
</style>
