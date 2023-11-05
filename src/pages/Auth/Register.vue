<script setup lang="ts">
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import logoUrl from "../../assets/images/logo.png";
import illustrationUrl from "../../assets/images/undraw_building_blocks_re_5ahy.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
import { authStore } from "../../stores/Auth";
import { computed, reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useVuelidate } from "@vuelidate/core";
import { email, required, minLength, sameAs } from "@vuelidate/validators";
import Toastify from "toastify-js";
import Notification from "../../base-components/Notification";
import Lucide from "../../base-components/Lucide";

interface RegisterInterfase {
  identity: string,
  username: string,
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  password_confirmation: string,
  terms_and_service: any
}


const store = authStore();

const debounce: any = ref(null)
const debounceTime = ref(300)
const router = useRouter();
const formRef = ref();

const formState: RegisterInterfase = reactive({
  identity: "",
  username: "",
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  password_confirmation: "",
  terms_and_service: null
});

const verifyRegister = async () => {
  if (formState.identity) {
    const res: any = await authStore().verifyRegister(formState.identity);
    if (res?.status == 200) {
      const { firstname, lastname } = res.data.data
      formState.lastname = lastname
      formState.firstname = firstname
    } else {
      formState.firstname = ""
      formState.lastname = ""
    }
  }
};

const onSearch = () => {
  clearTimeout(debounce.value)
  return new Promise((resolve) => {
    debounce.value = setTimeout(async () => {
      try {
        await verifyRegister()
      } catch (error) {
        console.log(error)
      } finally {
        resolve('')
      }
    }, debounceTime.value)
  })
}

const rules = computed(() => {
  return {
    identity: { required, minLength: minLength(6) },
    username: { required, minLength: minLength(3) },
    firstname: { required, minLength: minLength(3) },
    lastname: { required, minLength: minLength(3) },
    email: { required, email },
    password: { required, minLength: minLength(8) },
    password_confirmation: { required, sameAs: sameAs(formState.password) },
    terms_and_service: { required },
  }
});

const v$ = useVuelidate(rules, formState);

const handleSubmit = async () => {
  v$.value.$touch();
  if (v$.value.$invalid) {
    return;
  }

  try {
    const response: any = await authStore().register(formState);
    if (response?.status == 201) {

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

const levelOfSegurity = computed(() => {
  let levelSegurity = []
  const hasUppercase = /[A-Z]/.test(formState.password);
  const hasLowercase = /[a-z]/.test(formState.password);
  const hasNumber = /[0-9]/.test(formState.password);
  const hasConsecutiveCharacters = /(.)\1{2,}/.test(formState.password);


  if (formState.password.length <= 0) {
    levelSegurity[0] = 'bg-slate-100 dark:bg-darkmode-800'
  }

  if (formState.password.length >= 8) {
    levelSegurity[0] = 'bg-dark'
  }

  if (hasUppercase && hasLowercase && formState.password.length >= 8) {
    levelSegurity[1] = 'bg-danger'
  } else {
    levelSegurity[1] = 'bg-slate-100 dark:bg-darkmode-800'
  }

  if (hasNumber && hasUppercase && hasLowercase && formState.password.length >= 8) {
    levelSegurity[2] = 'bg-warning'
  } else {
    levelSegurity[2] = 'bg-slate-100 dark:bg-darkmode-800'
  }

  if (hasConsecutiveCharacters && hasNumber && hasUppercase && hasLowercase && formState.password.length >= 8) {
    levelSegurity[3] = 'bg-success'
  } else {
    levelSegurity[3] = 'bg-slate-100 dark:bg-darkmode-800'
  }

  return levelSegurity;
});



</script>

<template>
  <div :class="[
    '-m-3 sm:-mx-8 p-3 sm:px-8 relative h-screen lg:overflow-hidden bg-primary xl:bg-white dark:bg-darkmode-800 xl:dark:bg-darkmode-600',
    'before:hidden before:xl:block before:content-[\'\'] before:w-[57%] before:-mt-[28%] before:-mb-[16%] before:-ml-[13%] before:absolute before:inset-y-0 before:left-0 before:transform before:rotate-[-4.5deg] before:bg-primary/20 before:rounded-[100%] before:dark:bg-darkmode-400',
    'after:hidden after:xl:block after:content-[\'\'] after:w-[57%] after:-mt-[20%] after:-mb-[13%] after:-ml-[13%] after:absolute after:inset-y-0 after:left-0 after:transform after:rotate-[-4.5deg] after:bg-primary after:rounded-[100%] after:dark:bg-darkmode-700',
  ]">
    <DarkModeSwitcher />
    <MainColorSwitcher />
    <form class="validate-form" @submit.prevent="handleSubmit" :model="formState" ref="formRef">
      <div class="container relative z-10 sm:px-10">
        <div class="block grid-cols-2 gap-4 xl:grid">
          <!-- BEGIN: Register Info -->
          <div class="flex-col hidden min-h-screen xl:flex">
            <router-link to="/" class="flex items-center pt-5 -intro-x">
              <img alt="Midone Tailwind HTML Admin Template" width="150" :src="logoUrl" />
              <span class="ml-3 text-lg text-white"> </span>
            </router-link>
            <div class="my-auto">
              <img alt="Midone Tailwind HTML Admin Template" class="w-1/2 -mt-16 -intro-x" :src="illustrationUrl" />
              <div class="mt-10 text-4xl font-medium leading-tight text-white -intro-x">
                Unos clics más para <br />
                obtener su cuenta.
              </div>
              <div class="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400">
                La ERP nos permite ofrecer un mejor servicio a nuestros clientes.
              </div>
            </div>
          </div>
          <!-- END: Register Info -->
          <!-- BEGIN: Register Form -->
          <div class="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
            <div
              class="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto">
              <h2 class="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left">
                Registrarse
              </h2>
              <div class="mt-2 text-center intro-x text-slate-400 dark:text-slate-400 xl:hidden">
                Complete los campos requeridos para poder obtener su cuenta
              </div>
              <div class="mt-8 intro-x">
                <!-- IDENTITY -->
                <FormInput type="text" class="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]" 
                  :class="{
                    'border-danger': v$.identity.$error,
                  }" 
                  placeholder="Cedúla"
                  @keyup="onSearch()"
                  v-model.trim="v$.identity.$model"
                  @blur="v$.identity.$touch" 
                />
                <template v-if="v$.identity.$error">
                  <div v-for="(error, index) in v$.identity.$errors" :key="index" class="mt-1 text-danger">
                    <span v-if="error.$validator == 'required'" class="error">
                      La cedula es requerida
                    </span>
                    <span v-if="error.$validator == 'minLength'" class="error">
                      La cedula debe contener al menos 6 caracteres
                    </span>
                  </div>
                </template>

                <!-- USERNAME -->
                <FormInput type="text" class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                  :class="{
                    'border-danger': v$.username.$error,
                  }" placeholder="Nombre de usuario" v-model.trim="v$.username.$model" @blur="v$.username.$touch" />
                <template v-if="v$.username.$error">
                  <div v-for="(error, index) in v$.username.$errors" :key="index" class="mt-1 text-danger">
                    <span v-if="error.$validator == 'required'" class="error">
                      Nombre de usuario requerido
                    </span>
                    <span v-if="error.$validator == 'minLength'" class="error">
                      Nombre de usuario debe contener al menos 3 caracteres
                    </span>
                  </div>
                </template>

                <!-- FIRSTNAME -->
                <FormInput type="text" class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                  disabled :class="{
                    'border-danger': v$.firstname.$error,
                  }" placeholder="Nombres" v-model.trim="v$.firstname.$model" @blur="v$.firstname.$touch" />
                <template v-if="v$.firstname.$error">
                  <div v-for="(error, index) in v$.firstname.$errors" :key="index" class="mt-1 text-danger">
                    <span v-if="error.$validator == 'required'" class="error">
                      Los nombre son requeridos
                    </span>
                    <span v-if="error.$validator == 'minLength'" class="error">
                      Los nombres debe contener al menos 3 caracteres
                    </span>
                  </div>
                </template>

                <!-- LASTNAME  -->
                <FormInput type="text" class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                  disabled :class="{
                    'border-danger': v$.lastname.$error,
                  }" placeholder="Apellidos" v-model.trim="v$.lastname.$model" @blur="v$.lastname.$touch" />
                <template v-if="v$.lastname.$error">
                  <div v-for="(error, index) in v$.lastname.$errors" :key="index" class="mt-1 text-danger">
                    <span v-if="error.$validator == 'required'" class="error">
                      Los apellidos son requeridos
                    </span>
                    <span v-if="error.$validator == 'minLength'" class="error">
                      Los apellidos deben contener al menos 3 caracteres
                    </span>
                  </div>
                </template>

                <!-- EMAIL  -->
                <FormInput type="text" class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                  :class="{
                    'border-danger': v$.email.$error,
                  }" placeholder="Email" v-model.trim="v$.email.$model" @blur="v$.email.$touch" />
                <template v-if="v$.email.$error">
                  <div v-for="(error, index) in v$.email.$errors" :key="index" class="mt-1 text-danger">
                    <span v-if="error.$validator == 'required'" class="error">
                      El correo es requerido
                    </span>
                    <span v-if="error.$validator == 'email'" class="error">
                      El correo debe contener un formato valido
                    </span>
                  </div>
                </template>

                <!-- PASSWORD  -->
                <FormInput type="text" class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                  :class="{
                    'border-danger': v$.password.$error,
                  }" placeholder="Contraseña" v-model.trim="v$.password.$model" @blur="v$.password.$touch" />
                <template v-if="v$.password.$error">
                  <div v-for="(error, index) in v$.password.$errors" :key="index" class="mt-1 text-danger">
                    <span v-if="error.$validator == 'required'" class="error">
                      La contraseña es requerida
                    </span>
                    <span v-if="error.$validator == 'minLength'" class="error">
                      La contrasena debe contener al menos 8 caracteres
                    </span>
                  </div>
                </template>

                <div class="grid w-full h-1 grid-cols-12 gap-4 mt-3 intro-x">
                  <div :class="`h-full col-span-3 rounded ${item}`" v-for="item in levelOfSegurity"> </div>
                </div>
                <a href="https://www.uach.cl/direccion-de-tecnologias-de-informacion/seguridad/que-es-una-contrasena-segura"
                  target="_blank" class="block mt-2 text-xs intro-x text-slate-500 sm:text-sm">
                  <small>
                    ¿Que es una contraseña segura?
                  </small>
                </a>
                <!-- CONFIRM PASSWORD  -->
                <FormInput type="text" class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                  :class="{
                    'border-danger': v$.password_confirmation.$error,
                  }" placeholder="Confirmar contraseña" v-model.trim="v$.password_confirmation.$model"
                  @blur="v$.password_confirmation.$touch" />
                <template v-if="v$.password_confirmation.$error">
                  <div v-for="(error, index) in v$.password_confirmation.$errors" :key="index" class="mt-1 text-danger">
                    <span v-if="error.$validator == 'required'" class="error">
                      La confirmacion de contrasena es requerida
                    </span>

                    <span v-if="error.$validator == 'sameAs'" class="error">
                      Contrasena no coincide
                    </span>
                  </div>
                </template>

              </div>
              <div class="flex items-center mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm">
                <FormCheck.Input id="remember-me" type="checkbox" class="mr-2 border" :class="{
                  'border-danger': v$.terms_and_service.$error,
                }" v-model.trim="v$.terms_and_service.$model" @blur="v$.terms_and_service.$touch" />
                <label class="cursor-pointer select-none" htmlFor="remember-me">
                  Estoy de acuerdo con las
                </label>
                <a class="ml-1 mr-1 text-primary dark:text-slate-200" href="/terms-and-conditions" target="_blank">
                  Politicas
                </a>
                de servicio.
              </div>
              <template v-if="v$.terms_and_service.$error">
                <div v-for="(error, index) in v$.terms_and_service.$errors" :key="index" class="mt-1 text-danger">
                  <span v-if="error.$validator == 'required'" class="error">
                    Debe aceptar las politicas de servicios
                  </span>
                </div>
              </template>
              <div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
                <Button variant="primary" class="w-full px-4 py-3 align-top xl:w-32 xl:mr-3" type="submit">
                  {{ store.isLoading ? "Cargando..." : "Registrarse" }}
                </Button>
                <router-link
                  class="transition duration-200 border shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed dark:border-primary w-full px-4 py-3 align-top xl:w-32 xl:mr-3 outline-secondary w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                  :to="'/auth/login'">
                  Iniciar sesion
                </router-link>
              </div>
            </div>
          </div>
          <!-- END: Register Form -->
        </div>
      </div>
    </form>

    <Notification id="failed-notification-content" class="flex hidden">
      <Lucide icon="CheckCircle" class="text-success" />
      <div class="ml-4 mr-4">
        <div class="font-medium">Exelente!</div>
        <div class="mt-1 text-slate-500">Usuario registrado exitosamente.</div>
      </div>
    </Notification>
  </div>
</template>
