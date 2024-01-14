import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface ParamsSearch {
  search?: any,
  page?: any,
  per_page?: any,
}

interface stateInterfase {
  providers: any,
  loading: boolean,
  error: any,
}

export const providersStore = defineStore('providers', {
  state: (): stateInterfase => ({
    providers: null,
    loading: true,
    error: null,
  }),

  getters: {
    getProviders: (state) => state.providers,
    isLoading: (state) => state.loading,
  },

  actions: {

    async index(payload?: ParamsSearch) {
      try {
        this.loading = true
        const response = await ServiceApi.get("api/admin/providers", payload);
        this.providers = response.data
        return response;
      } catch (err) {
        console.error("loginErr", err);
        throw err
        return err;
      } finally {
        this.loading = false
      }
    },

    async store(payload: any) {
      this.loading = true
      try {
        const { id } = payload
        if (!id) {
          const response = await ServiceApi.post("api/admin/providers", payload);
          return response;
        } else {
          const response = await ServiceApi.put(`api/admin/providers/${id}`, payload);
          return response;
        }
      } catch (err) {
        console.error("loginErr", err);
        throw err
        return err;
      } finally {
        this.loading = false
      }
    },

    async delete(payload: any) {
      this.loading = true
      try {
        const response = await ServiceApi.delete(`api/admin/providers/${payload.id}`, payload);
        return response;
      } catch (err) {
        console.error("loginErr", err);
        throw err
        return err;
      } finally {
        this.loading = false
      }
    },
  },
});
