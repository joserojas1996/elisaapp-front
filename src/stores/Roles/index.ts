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
      try {
        this.loading = true
        await ServiceApi.getCookie();
        const response = await ServiceApi.get("api/admin/roles", payload);
        this.roles = response.data
        return response;
      } catch (err) {
        console.log("loginErr", err);
        return err;
      } finally {
        this.loading = false
      }
    },

    async store(payload: any) {
      try {
        const { id } = payload
        if (!id) {
          await ServiceApi.getCookie();
          const response = await ServiceApi.post("api/admin/roles", payload);
          return response;
        } else {
          await ServiceApi.getCookie();
          const response = await ServiceApi.put(`api/admin/role/${id}`, payload);
          return response;
        }
      } catch (err) {
        console.log("loginErr", err);
        return err;
      } finally {
      }
    },

    async delete(payload: any) {
      try {
        await ServiceApi.getCookie();
        const response = await ServiceApi.delete(`api/admin/role/${payload.id}`, payload);
        return response;
      } catch (err) {
        console.log("loginErr", err);
        return err;
      } finally {
      }
    },
  },
});
