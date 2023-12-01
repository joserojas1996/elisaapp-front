import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface ParamsSearch {
  search: any,
  active: any,
  role: any,
  page: any,
  per_page: any,
}

interface AuthStoreInterfase {
  users: any,
  loading: boolean,
  error: any,
}

export const usersStore = defineStore('users', {
  state: (): AuthStoreInterfase => ({
    users: null,
    loading: false,
    error: null,
  }),

  getters: {
    usersList: (state) => state.users,
    isLoading: (state) => state.loading,
  },

  actions: {

    async index(payload: ParamsSearch) {
      this.loading = true
      try {
        await ServiceApi.getCookie();
        const response = await ServiceApi.get("api/admin/users", payload);
        this.users = response.data
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
        const response = await ServiceApi.post("api/admin/users", payload);
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
        const response = await ServiceApi.put(`api/admin/user/${payload.id}`, payload);
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
        const response = await ServiceApi.delete(`api/admin/user/${payload.id}`, payload);
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
