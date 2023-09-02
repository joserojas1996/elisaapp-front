<script setup lang="ts">
import DarkModeSwitcher from "../../components/DarkModeSwitcher";
import MainColorSwitcher from "../../components/MainColorSwitcher";
import logoUrl from "../../assets/images/logo.png";
import illustrationUrl from "../../assets/images/undraw_building_blocks_re_5ahy.svg";
import { FormInput, FormCheck } from "../../base-components/Form";
import Button from "../../base-components/Button";
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
    <div class="container relative z-10 sm:px-10">
      <div class="block grid-cols-2 gap-4 xl:grid">
        <!-- BEGIN: Register Info -->
        <div class="flex-col hidden min-h-screen xl:flex">
          <router-link to="/" class="flex items-center pt-5 -intro-x">
            <img
              alt="Midone Tailwind HTML Admin Template"
              width="150"
              :src="logoUrl"
            />
            <span class="ml-3 text-lg text-white"> </span>
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
              obtener su cuenta.
            </div>
            <div
              class="mt-5 text-lg text-white -intro-x text-opacity-70 dark:text-slate-400"
            >
              Gestione el proceso de adquisición de bienes desde un solo lugar.
            </div>
          </div>
        </div>
        <!-- END: Register Info -->
        <!-- BEGIN: Register Form -->
        <div class="flex h-screen py-5 my-10 xl:h-auto xl:py-0 xl:my-0">
          <div
            class="w-full px-5 py-8 mx-auto my-auto bg-white rounded-md shadow-md xl:ml-20 dark:bg-darkmode-600 xl:bg-transparent sm:px-8 xl:p-0 xl:shadow-none sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="text-2xl font-bold text-center intro-x xl:text-3xl xl:text-left"
            >
              Registrarse
            </h2>
            <div
              class="mt-2 text-center intro-x text-slate-400 dark:text-slate-400 xl:hidden"
            >
              Complete los campos requeridos para poder obtener su cuenta
            </div>
            <div class="mt-8 intro-x">
              <FormInput
                type="text"
                class="block px-4 py-3 intro-x login__input min-w-full xl:min-w-[350px]"
                placeholder="Cedúla"
              />
              <FormInput
                type="text"
                class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                placeholder="Nombres"
              />
              <FormInput
                type="text"
                class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                placeholder="Apellidos"
              />
              <FormInput
                type="text"
                class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                placeholder="Email"
              />
              <FormInput
                type="text"
                class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                placeholder="Contraseña"
              />
              <div class="grid w-full h-1 grid-cols-12 gap-4 mt-3 intro-x">
                <div class="h-full col-span-3 rounded bg-danger"></div>
                <div class="h-full col-span-3 rounded bg-warning"></div>
                <div class="h-full col-span-3 rounded bg-success"></div>
                <div
                  class="h-full col-span-3 rounded bg-slate-100 dark:bg-darkmode-800"
                ></div>
              </div>
              <a
                href=""
                class="block mt-2 text-xs intro-x text-slate-500 sm:text-sm"
              >
                ¿Que es una contraseña segura?
              </a>
              <FormInput
                type="text"
                class="block px-4 py-3 mt-4 intro-x login__input min-w-full xl:min-w-[350px]"
                placeholder="Confirmar contraseña"
              />
            </div>
            <div
              class="flex items-center mt-4 text-xs intro-x text-slate-600 dark:text-slate-500 sm:text-sm"
            >
              <FormCheck.Input
                id="remember-me"
                type="checkbox"
                class="mr-2 border"
              />
              <label class="cursor-pointer select-none" htmlFor="remember-me">
                Estoy de acuerdo con las
              </label>
              <a class="ml-1 mr-1 text-primary dark:text-slate-200" href="">
                Politicas
              </a>
              de Alguarisa.
            </div>
            <div class="mt-5 text-center intro-x xl:mt-8 xl:text-left">
              <Button
                variant="primary"
                class="w-full px-4 py-3 align-top xl:w-32 xl:mr-3"
              >
                Registrarse
              </Button>
              <router-link
                class="transition duration-200 border shadow-sm inline-flex items-center justify-center rounded-md font-medium cursor-pointer focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus-visible:outline-none dark:focus:ring-slate-700 dark:focus:ring-opacity-50 [&:hover:not(:disabled)]:bg-opacity-90 [&:hover:not(:disabled)]:border-opacity-90 [&:not(button)]:text-center disabled:opacity-70 disabled:cursor-not-allowed dark:border-primary w-full px-4 py-3 align-top xl:w-32 xl:mr-3 outline-secondary w-full px-4 py-3 mt-3 align-top xl:w-32 xl:mt-0"
                :to="'/auth/login'"
              >
                Iniciar sesion
              </router-link>
            </div>
          </div>
        </div>
        <!-- END: Register Form -->
      </div>
    </div>
  </div>
</template>
