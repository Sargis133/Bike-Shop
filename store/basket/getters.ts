import { I_BasketState} from "~/models/store/basket/interfaces";

export default {
    getBasketProducts(state: I_BasketState) {
        return state.basket
    }
}