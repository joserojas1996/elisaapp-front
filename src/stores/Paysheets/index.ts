import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface ParamsSearch {
  search?: any,
  status?: any,
  page?: any,
  per_page?: any,
}

interface stateInterfase {
  paysheet: any,
  loading: boolean,
  error: any,
}

export const paysheetStore = defineStore('paysheet', {
  state: (): stateInterfase => ({
    paysheet: null,
    loading: true,
    error: null,
  }),

  getters: {
    getPaysheet: (state) => state.paysheet,
    isLoading: (state) => state.loading,
  },

  actions: {

    async index(payload?: ParamsSearch) {
      try {
        this.loading = true
        const response = await ServiceApi.get("api/rrhh/paysheets", payload);
        this.paysheet = response.data
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
          const response = await ServiceApi.post("api/rrhh/paysheets", payload);
          return response;
        } else {
          const response = await ServiceApi.put(`api/rrhh/paysheets/${id}`, payload);
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
        const response = await ServiceApi.delete(`api/rrhh/paysheets/${payload.id}`, payload);
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
