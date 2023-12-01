import { defineStore } from "pinia";
import { ServiceApi } from "../../services/auth";

interface stateInterfase {
  municipalities: any,
  charges: any,
  paysheets: any,
  departaments: any,
  employees: any,
  roles: any,
}

interface ParamsSearch {
  search?: any,
  page?: any,
  per_page?: any,
}

export const toolsStore = defineStore('tools', {
  state: (): stateInterfase => ({
    municipalities: [],
    charges: [],
    paysheets: [],
    departaments: [],
    employees: [],
    roles: []
  }),

  getters: {
    getMunicipalities: (state) => state.municipalities,
    getCharges: (state) => state.charges,
    getPaysheets: (state) => state.paysheets,
    getDepartaments: (state) => state.departaments,
    getEmployees: (state) => state.employees,
    getRoles: (state) => state.roles

  },

  actions: {
    async municipality(payload?: ParamsSearch) {
      try {
        const response = await ServiceApi.get("api/tools/municipalities", payload);
        this.municipalities = response.data
        return response;
      } catch (err) {
        console.error("loginErr", err);
        throw err
        return err;
      }
    },

    async fetchCharge(payload?: ParamsSearch) {
      try {
        const response = await ServiceApi.get("api/tools/charges", payload);
        this.charges = response.data.data
        return response;
      } catch (err) {
        console.error("loginErr", err);
        throw err
        return err;
      }
    },

    async fetchDepartament(payload?: ParamsSearch) {
      try {
        const response = await ServiceApi.get("api/tools/departaments", payload);
        this.departaments = response.data.data
        return response;
      } catch (err) {
        console.error("loginErr", err);
        throw err
        return err;
      }
    },

    async fetchPaysheet(payload?: ParamsSearch) {
      try {
        const response = await ServiceApi.get("api/tools/paysheets", payload);
        this.paysheets = response.data.data
        return response;
      } catch (err) {
        console.error("loginErr", err);
        throw err
        return err;
      }
    },

    async fetchEmployees(payload?: ParamsSearch) {
      try {
        const response = await ServiceApi.get("api/tools/employees", payload);
        this.employees = response.data.data
        return response;
      } catch (err) {
        console.error("loginErr", err);
        throw err
        return err;
      }
    },

    async fetchRoles(payload?: ParamsSearch) {
      try {
        const response = await ServiceApi.get("api/tools/roles", payload);
        this.roles = response.data.data
        return response;
      } catch (err) {
        console.error("loginErr", err);
        throw err
        return err;
      }
    },
  },
});
