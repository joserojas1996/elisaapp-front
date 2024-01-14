import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface ParamsSearch {
  search?: any,
  page?: any,
  per_page?: any,
}

interface stateInterfase {
  institutions: any,
  loading: boolean,
  error: any,
}

export const institutionStore = defineStore('institutions', {
  state: (): stateInterfase => ({
    institutions: [],
    loading: true,
    error: null,
  }),

  getters: {
    getInstitutions: (state) => state.institutions,
    isLoading: (state) => state.loading,
  },

  actions: {

    async index(payload?: ParamsSearch) {
      try {
        this.loading = true
        const response = await ServiceApi.get("api/admin/institutions", payload);
        this.institutions = response.data.data
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
          const response = await ServiceApi.post("api/admin/institutions", payload);
          return response;
        } else {
          const response = await ServiceApi.put(`api/admin/institutions/${id}`, payload);
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
        const response = await ServiceApi.delete(`api/admin/institutions/${payload.id}`, payload);
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
