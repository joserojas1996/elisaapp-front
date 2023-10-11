import { authStore } from "../stores/Auth";

export default async (to: any, from: any, next: any) => {

  const store = authStore()
  
  await authStore().fetchUser()
  
  let user = store.userAuth
  let check = store.check
  
  console.log(user)
  
  if (check) {
    if (!user) {
      next('/auth/login')
    } else if (user !== null && to.path === '/auth/login') {
      next('/')
    } else {
      next()
    }
  } else {
    next('/auth/login')
  }

}