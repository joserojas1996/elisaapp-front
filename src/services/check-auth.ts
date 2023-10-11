import store from '../store/index'
import { ServiceApi } from './auth'

export default async () => {
  if (!store.getters['check']) {
    try {
      await ServiceApi.getCookie()
      const { data } = await store.dispatch('fetchUser')
      return data
    } catch (e) {
      return e
    }
  } else {
    return store.getters['user']
  }
}

