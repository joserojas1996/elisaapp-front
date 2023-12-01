import axios from "axios";
import { core } from "./pluginInit";

const API_ENDPOINT = 'http://localhost:8000';
const client = axios.create({
  baseURL: API_ENDPOINT,
  headers: {
    accept: "application/json"
  },
});

client.defaults.withCredentials = true;

class ServiceApi {
  static getCookie() {
    return client({
      method: "GET",
      url: "/api/csrf-cookie",
    });
  }

  static get(path = "", params = {}) {
    return client.get(path, { params });
  }

  static post(path = "", data = {}, optionalHeader = {}) {
    return client({
      method: "POST",
      url: path,
      data,
      headers: { ...optionalHeader },
    });
  }

  static patch(path = "", data = {}) {
    return client({
      method: "PATCH",
      url: path,
      data: JSON.stringify(data),
    });
  }

  static delete(path = "", data = {}) {
    return client({
      method: "DELETE",
      url: path,
      data: JSON.stringify(data),
    });
  }

  static put(path = "", data = {}) {
    return client({
      method: "PUT",
      url: path,
      data: data,
    });
  }
}

/**
 * axios interceptors runs before and after a request, letting the developer modify req,req more
 * For more details on axios interceptor see https://github.com/axios/axios#interceptors
 */
client.interceptors.request.use((config) => {
  // do something before executing the request
  // For example tag along the bearer access token to request header or set a cookie
  const requestConfig: any = config;
  const { headers } = config;
  requestConfig.headers = { ...headers };

  return requestConfig;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    /**
     * Do something in case the response returns an error code [3**, 4**, 5**] etc
     * For example, on token expiration retrieve a new access token, retry a failed request etc
     */
    const { response } = error;
    const originalRequest = error.config;
    if (response) {
      if (response.status === 500) {
        core.showSnackbar("error", error.response.statusText);
      }
      
      if (response.status === 422) {
        const { data: { errors } } = response;
        Object.values(errors).forEach((error:any) => {
          core.showSnackbar("error", error);
        });

      } else if (response.status === 403) {
        core.showSnackbar("error", response.data.message);
      } else if (response.status === 404) {
        core.showSnackbar("error", response.data.message);
      } else if (response.status === 409) {
        core.showSnackbar("error", response.data.error);
      } else if (response.status === 400) {
        core.showSnackbar("error", response.data.message);
      } else if (response.status === 429) {
        core.showSnackbar(
          "error",
          "Ha sobrepasado el limite de solicitudes por minuto, intente de nuevo en unos minutos"
        );
      } else {
        return originalRequest;
      }
    }
    return Promise.reject(error);
  }
);

export { ServiceApi };
