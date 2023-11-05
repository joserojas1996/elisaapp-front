<script setup lang="ts">
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import logoUrl from "../../assets/images/logo.png";
import logoGold from "../../assets/images/4.png";
import illustrationUrl from "../../assets/images/undraw_knowledge_re_5v9l.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { authStore } from "../../stores/Auth";
import { useRouter } from "vue-router";
import useVuelidate from "@vuelidate/core";
import { reactive } from "vue";
import { email, required } from "@vuelidate/validators";
import Toastify from "toastify-js";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";

const router = useRouter();
const store = authStore();

const formState: any = reactive({
  email: "",
});

const rules = {
  email: { required, email },
};

const v$ = useVuelidate(rules, formState);

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }
  try {
    const response: any = await authStore().forgodPassword(formState);
    if (response?.status == 200 || response?.status == 201) {
      const failedEl = document
        .querySelectorAll("#failed-notification-content")[0]
        .cloneNode(true) as HTMLElement;
      failedEl.classList.remove("hidden");
      Toastify({
        node: failedEl,
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
      }).showToast();
      router.push("/auth/login");
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
                reestablecer su cuenta.
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
                Recuperar contraseña
              </h2>
              <div class="mt-2 text-left intro-x text-slate-400">
                Ingrese su correo con el que se registro en el sistema. El
                sistema le enviara un correo con las instrucciones para poder
                recuperar su acceso
              </div>
              <div class="mt-8 intro-x">
                <FormInput
                  type="text"
                  class="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]"
                  :class="{
                    'border-danger': v$.email.$error,
                  }"
                  placeholder="Ingrese su correo de recuperación"
                  v-model.trim="v$.email.$model"
                  @blur="v$.email.$touch"
                />

                <template v-if="v$.email.$error">
                  <div
                    v-for="(error, index) in v$.email.$errors"
                    :key="index"
                    class="mt-1 text-danger"
                  >
                    <span v-if="error.$validator == 'required'" class="error">
                      El correo es requerido
                    </span>
                    <span v-if="error.$validator == 'email'" class="error">
                      El correo debe contener un formato valido
                    </span>
                  </div>
                </template>
              </div>

              <div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                <Button
                  variant="primary"
                  class="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
                  type="submit"
                >
                  {{ store.isLoading ? "Cargando..." : "Recuperar" }}
                </Button>
              </div>
            </div>
          </div>
          <!-- END: Login Form -->
        </div>
      </div>
    </form>
    <Notification id="failed-notification-content" class="flex hidden">
      <Lucide icon="CheckCircle" class="text-success" />
      <div class="ml-4 mr-4">
        <div class="font-medium">Excelente!</div>
        <div class="mt-1 text-slate-500">
            Instrucciones enviadas
        </div>
      </div>
    </Notification>
  </div>
</template>
