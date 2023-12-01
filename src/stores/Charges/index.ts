import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface ParamsSearch {
  search?: any,
  status?: any,
  page?: any,
  per_page?: any,
}

interface stateInterfase {
  charges: any,
  loading: boolean,
  error: any,
}

export const chargesStore = defineStore('charges', {
  state: (): stateInterfase => ({
    charges: null,
    loading: true,
    error: null,
  }),

  getters: {
    getCharges: (state) => state.charges,
    isLoading: (state) => state.loading,
  },

  actions: {

    async index(payload?: ParamsSearch) {
      try {
        this.loading = true
        const response = await ServiceApi.get("api/rrhh/charges", payload);
        this.charges = response.data
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
          const response = await ServiceApi.post("api/rrhh/charges", payload);
          return response;
        } else {
          const response = await ServiceApi.put(`api/rrhh/charges/${id}`, payload);
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
        const response = await ServiceApi.delete(`api/rrhh/charges/${payload.id}`, payload);
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
