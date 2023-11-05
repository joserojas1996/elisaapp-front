import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface ParamsSearch {
  search: any,
  status: any,
  page: any,
  per_page: any,
}

interface stateInterfase {
  roles: any,
  loading: boolean,
  error: any,
}

export const rolesStore = defineStore('roles', {
  state: (): stateInterfase => ({
    roles: null,
    loading: false,
    error: null,
  }),

  getters: {
    getRoles: (state) => state.roles,
    isLoading: (state) => state.loading,
  },

  actions: {

    async index(payload: ParamsSearch) {
      this.loading = true
      try {
        await ServiceApi.getCookie();
        const response = await ServiceApi.get("api/admin/roles", payload);
        this.roles = response.data
        return response;
      } catch (err) {
        this.loading = false
        console.log("loginErr", err);
        return err;
      } finally {
        this.loading = false
      }
    },

    async store(payload: any) {
      this.loading = true
      try {
        await ServiceApi.getCookie();
        const response = await ServiceApi.post("api/admin/roles", payload);
        return response;
      } catch (err) {
        this.loading = false
        console.log("loginErr", err);
        return err;
      } finally {
        this.loading = false
      }
    },

    async update(payload: any) {
      this.loading = true
      try { 
        await ServiceApi.getCookie();
        const response = await ServiceApi.put(`api/admin/role/${payload.id}`, payload);
        return response;
      } catch (err) {
        this.loading = false
        console.log("loginErr", err);
        return err;
      } finally {
        this.loading = false
      }
    },

    async delete(payload: any) {
      this.loading = true
      try { 
        await ServiceApi.getCookie();
        const response = await ServiceApi.delete(`api/admin/role/${payload.id}`, payload);
        return response;
      } catch (err) {
        this.loading = false
        console.log("loginErr", err);
        return err;
      } finally {
        this.loading = false
      }
    },
  },
});
