import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface ParamsSearch {
  search: any,
  status: any,
  page: any,
  per_page: any,
}

interface stateInterfase {
  activity: any,
  loading: boolean,
  error: any,
}

export const activityStore = defineStore('activity', {
  state: (): stateInterfase => ({
    activity: null,
    loading: false,
    error: null,
  }),

  getters: {
    getActivity: (state) => state.activity,
    isLoading: (state) => state.loading,
  },

  actions: {

    async index(payload?: ParamsSearch) {
      try {
        this.loading = true
        const response = await ServiceApi.get("api/super-admin/log-book", payload);
        this.activity = response.data
        return response;
      } catch (err) {
        console.log("ActivityErr", err);
        return err;
      } finally {
        this.loading = false
      }
    }
  }
});
