<script setup lang="ts">
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import logoUrl from "../../assets/images/logo.png";
// import logoGold from "../../assets/images/4.png";
import illustrationUrl from "../../assets/images/undraw_pie_graph_re_fvol.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import Toastify from "toastify-js";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";

import { authStore } from "../../stores/Auth";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength } from "@vuelidate/validators";

const router = useRouter();
const store = authStore();

const formState = reactive({
  identity: "",
  email: "",
  password: "",
});

const rules = {
  identity: { required, minLength: minLength(6) },
  // email: { required, email },
  password: { required, minLength: minLength(5) },
};

const v$ = useVuelidate(rules, formState);

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    // const failedEl = document
    //   .querySelectorAll("#failed-notification-content")[0]
    //   .cloneNode(true) as HTMLElement;
    // failedEl.classList.remove("hidden");
    // Toastify({
    //   node: failedEl,
    //   duration: 3000,
    //   newWindow: true,
    //   close: true,
    //   gravity: "top",
    //   position: "right",
    //   stopOnFocus: true,
    // }).showToast();
    return;
  }

  try {
    const response: any = await authStore().login(formState);
    if (response?.status == 200) {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div
    :class="[
      '-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
      'before:hidden before:xl:block before:content-[\'\'] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400',
      'after:hidden after:xl:block after:content-[\'\'] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700',
    ]"
  >
    <DarkModeSwitcher />
    <MainColorSwitcher />
    <form
      class="validate-form"
      @submit.prevent="handleSubmit"
      :model="formState"
    >
      <div class="container relative z-10 sm:px-10">
        <div class="block grid-cols-2 gap-4 xl:grid">
          <!-- BEGIN: Login Info -->
          <div class="flex-col hidden min-h-screen xl:flex">
            <router-link to="/" class="flex items-center pt-5 -intro-x">
              <img
                alt="Midone Tailwind HTML Admin Template"
                width="150"
                :src="logoUrl"
              />
              <span class="ml-3 text-lg text-white"></span>
            </router-link>
            <div class="my-auto">
              <img
                alt="Midone Tailwind HTML Admin Template"
                class="w-1/2 -mt-16 -intro-x"
                :src="illustrationUrl"
              />
              <div
                class="mt-10 text-4xl font-medium leading-tight text-white -intro-x"
              >
                Unos clics más para <br />
                acceder a su cuenta.
              </div>
              <div
                class="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400"
              >
              La ERP nos permite ofrecer un mejor servicio a nuestros clientes.
              </div>
            </div>
          </div>
          <!-- END: Login Info -->
          <!-- BEGIN: Login Form -->
          <div class="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div
              class="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto"
            >
              <h2
                class="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left"
              >
                Inicio de sesion
              </h2>
              <div class="mt-2 text-center intro-x text-slate-400 xl:hidden">
                Ingresa tus credenciales para iniciar sesion
              </div>
              <div class="mt-8 intro-x">
                <FormInput
                  type="text"
                  class="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]"
                  :class="{
                    'border-danger': v$.identity.$error,
                  }"
                  placeholder="Nombre de usuario"
                  v-model.trim="v$.identity.$model"
                  @blur="v$.identity.$touch"
                />
                <template v-if="v$.identity.$error">
                  <div
                    v-for="(error, index) in v$.identity.$errors"
                    :key="index"
                    class="mt-2 text-danger"
                  >
                    <span v-if="error.$validator == 'required'" class="error">
                     El usuario es requerido
                    </span>
                    <span v-if="error.$validator == 'minLength'" class="error">
                     El usuario debe contener al menos 8 caracteres
                    </span>
                  </div>
                </template>
                <FormInput
                  type="password"
                  class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                  :class="{
                    'border-danger': v$.password.$error,
                  }"
                  placeholder="Contrasena"
                  v-model.trim="v$.password.$model"
                  @blur="v$.password.$touch"
                />
                <template v-if="v$.password.$error">
                  <div
                    v-for="(error, index) in v$.password.$errors"
                    :key="index"
                    class="mt-2 text-danger"
                  >
                    <span v-if="error.$validator == 'required'" class="error">
                      La contraseña es requerida
                    </span>
                  </div>
                </template>
              </div>
              <div
                class="flex mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm"
              >
                <!-- <div class="flex items-center mr-auto">
                  <FormCheck.Input
                    id="remember-me"
                    type="checkbox"
                    class="mr-2 border"
                    v-model="formState.password"
                  />
                  <label
                    class="cursor-pointer select-none"
                    htmlFor="remember-me"
                  >
                    Recordar este equipo
                  </label>
                </div> -->
                <router-link to="/forgot-password"
                  >Olvide mi contraseña!</router-link
                >
                <a href=""></a>
              </div>
              <div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                <Button
                  variant="primary"
                  class="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                  type="submit"
                >
                {{ store.isLoading ? "Cargando..." : "Iniciar Sesión" }}
                </Button>
                <router-link
                  class="transition duration-200 border shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed dark:border-primary w-full px-4 py-3 align-top xl:w-32 xl:mr-3 outline-secondary w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                  :to="'/auth/register'"
                >
                  Registrarse
                </router-link>
              </div>
              <div
                class="mt-10 text-center intro-x xl:mt-24 text-slate-600 dark:text-slate-500 xl:text-left"
              >
                Al registrarse, acepta nuestra
                <a class="text-primary dark:text-slate-200" href="/terms-and-conditions" target="_blank">
                  Condiciones generales
                </a>
                y
                <a class="text-primary dark:text-slate-200" href="/terms-and-conditions" target="_blank">
                  política de privacidad
                </a>
              </div>
            </div>
          </div>
          <!-- END: Login Form -->
        </div>
      </div>
    </form>
    <!-- BEGIN: Failed Notification Content -->
    <!-- <Notification id="failed-notification-content" class="flex hidden">
      <Lucide icon="XCircle" class="text-danger" />
      <div class="ml-4 mr-4">
        <div class="font-medium">Inicio de sesion fallido!</div>
        <div class="mt-1 text-slate-500">Por favor revise el formulario.</div>
      </div>
    </Notification> -->
    <!-- END: Failed Notification Content -->
  </div>
</template>
