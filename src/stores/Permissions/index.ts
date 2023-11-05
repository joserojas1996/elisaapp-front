import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface ParamsSearch {
  search: any,
  active: any,
  role: any,
  page: any,
  per_page: any,
}

interface stateInterfase {
  permissions: any,
  loading: boolean,
  error: any,
}

export const permissionsStore = defineStore('permissions', {
  state: (): stateInterfase => ({
    permissions: null,
    loading: false,
    error: null,
  }),

  getters: {
    getPermissions: (state) => state.permissions,
    isLoading: (state) => state.loading,
  },

  actions: {

    async index() {
      this.loading = true
      try {
        await ServiceApi.getCookie();
        const response = await ServiceApi.get("api/admin/permissions");
        console.log(response)
        this.permissions = response.data
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
        const response = await ServiceApi.post("api/admin/permissions", payload);
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
        const response = await ServiceApi.put(`api/admin/permission/${payload.id}`, payload);
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
        const response = await ServiceApi.delete(`api/admin/permission/${payload.id}`, payload);
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
