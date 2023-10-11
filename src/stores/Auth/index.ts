import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface LoginData {
  email: string;
  password: string;
}

interface AuthStoreInterfase {
  user: any,
  loading: boolean,
  error: any,
  verify: any
}

export const authStore = defineStore('auth', {
  state: (): AuthStoreInterfase => ({
    user: null,
    loading: false,
    error: null,
    verify: {}
  }),

  getters: {
    userAuth: (state) => state.user,
    check: (state) => state.user !== null && state.user !== undefined,
    isLoading: (state) => state.loading,
    isVerify: (state) => state.verify,

  },
  actions: {

    async login(payload: LoginData) {
      this.loading = true
      try {
        await ServiceApi.getCookie();
        const response = await ServiceApi.post("api/login", payload);
        await this.fetchUser();
        return response;
      } catch (err) {
        this.loading = false
        console.log("loginErr", err);
        return err;
      } finally {
        this.loading = false
      }
    },

    async fetchUser() {
      try {
        this.loading = true
        const { data } = (await ServiceApi.get("api/user")).data;
        this.user = data
        this.loading = false
        return data;

      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    },
    async logout() {
      try {
        this.loading = true
        await ServiceApi.getCookie();
        const data = await ServiceApi.post("api/logout");
        this.user = data
        return data;
      } catch (err) {
        console.log("logoutErr", err);
      } finally {
        this.loading = false
      }
    },

    async verifyRegister(identity: string) {
      try {
        this.loading = true
        await ServiceApi.getCookie();
        const data = await ServiceApi.post(`api/verify?identity=${identity}`);
        if (data.status == 200) {
          this.verify = data.data.data
          return data;
        }
      } catch (err) {
        console.log("verifyErr", err);
      } finally {
        this.loading = false
      }
    },

    async register(payload: LoginData) {
      this.loading = true
      try {
        await ServiceApi.getCookie();
        const response = await ServiceApi.post("api/register", payload);
        return response;
      } catch (err) {
        this.loading = false
        console.log("loginErr", err);
        return err;
      } finally {
        this.loading = false
      }
    },

    async forgodPassword(payload: any) {
      this.loading = true
      try { 
        await ServiceApi.getCookie();
        const response = await ServiceApi.post("api/password/email", payload);
        return response;
      } catch (err) {
        this.loading = false
        console.log("loginErr", err);
        return err;
      } finally {
        this.loading = false
      }
    },

    async restorePassword(payload: any) {
      this.loading = true
      try { 
        await ServiceApi.getCookie();
        const response = await ServiceApi.post("api/password/reset", payload);
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
