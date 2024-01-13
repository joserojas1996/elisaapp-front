import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface ParamsSearch {
  search?: any,
  page?: any,
  per_page?: any,
}

interface stateInterfase {
  municipality: any,
  loading: boolean,
  error: any,
}

export const municipalityStore = defineStore('municipality', {
  state: (): stateInterfase => ({
    municipality: null,
    loading: true,
    error: null,
  }),

  getters: {
    getMunicipality: (state) => state.municipality,
    isLoading: (state) => state.loading,
  },

  actions: {

    async index(payload?: ParamsSearch) {
      try {
        this.loading = true
        const response = await ServiceApi.get("api/admin/municipalities", payload);
        this.municipality = response.data
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
          const response = await ServiceApi.post("api/admin/municipalities", payload);
          return response;
        } else {
          const response = await ServiceApi.put(`api/admin/municipality/${id}`, payload);
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
        const response = await ServiceApi.delete(`api/admin/municipality/${payload.id}`, payload);
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
