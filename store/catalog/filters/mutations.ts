import {
  I_DataFilters,
  I_FiltersState,
} from "~/models/store/catalog/filters/interfaces";

export default {
  M_SET_FILTERS(state: I_FiltersState, payload: I_DataFilters): void {
    state.colors = payload.colors
    state.types = payload.types;
    state.sizes = payload.sizes;
  },
};
