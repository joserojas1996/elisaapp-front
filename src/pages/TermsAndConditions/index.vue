<script setup lang="ts">
import Button from "../../base-components/Button";
import logoUrl from "../../assets/images/logo.png";
import undraw_terms_re_6ak4 from "../../assets/images/undraw_terms_re_6ak4.svg";
import { computed } from "vue";

const nowDate = new Date().toLocaleDateString("es-ES", {
  day: "numeric",
  month: "numeric",
  year: "numeric"
});


</script>

<template>
  <div class="py-2">
    <div class="container">
      <div class="flex-col hidden min-h-screen xl:flex">
        <router-link to="/" class="flex items-end pt-5 -intro-x">
          <img alt="Midone Tailwind HTML Admin Template" width="150" :src="logoUrl" />
          <span class="ml-3 pb-3 text-white" style="font-size: 2.5rem">Alimentos del Guarico S.A</span>
        </router-link>

        <div class="flex mt-10 px-16">

          <div class="sticky top-0 p-8">
            <ul
              class="text-slate-500 relative before:content-[''] before:w-[2px] before:bg-slate-200 before:dark:bg-darkmode-600 before:h-full before:absolute before:left-0 before:z-[-1]">
              <li class="pl-5 mb-4 font-medium border-l-2 border-primary dark:border-primary text-primary">
                <a class="text-white" href="#"></a>
              </li>
              <li class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a class="text-white" href="#1">Registros y actividades</a>
              </li>
              <li class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a class="text-white" href="#2">Generación de Hash y Firma de Documentos</a>
              </li>
              <li class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a class="text-white" href="#3">Auditorías Internas</a>
              </li>
              <li class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a class="text-white" href="#4">Bloqueo de Usuarios</a>
              </li>
              <li class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a class="text-white" href="#5">Administración de Recursos Humanos y bienes nacionales
                </a>
              </li>
              <li class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a class="text-white" href="#6">Privacidad y Confidencialidad</a>
              </li>
              <li class="pl-5 mb-4 border-l-2 border-transparent dark:border-transparent">
                <a class="text-white" href="#7">Modificaciones a los Términos y Condiciones</a>
              </li>
            </ul>
            <img class="mt-20" alt="Midone Tailwind HTML Admin Template" width="350" :src="undraw_terms_re_6ak4" />
          </div>

          <div class="flex-1 p-16 mb-5 intro-y box lg:ml-5 lg:mb-0" style="max-height: 800px; overflow-y: auto">
            <p class="text-center text-4xl font-medium leading-none">
              Términos y Condiciones de Uso
            </p>

            <article class="mt-10">
              <span class="float-right">
                <b>Fecha de entrada en vigencia: {{ nowDate }}</b></span><br />
              <div class="mt-16">
                <h1 class="text-2xl font-medium leading-none">
                  Bienvenido a Elisa System.
                </h1>
                <br />
                <p class="font-normal">
                  Al acceder y utilizar nuestros servicios, usted acepta estar
                  sujeto a los siguientes términos y condiciones. Lea
                  detenidamente este documento antes de utilizar el sistema.
                </p>
              </div>
            </article>

            <article class="mt-10">
              <div>
                <h1 class="text-2xl font-medium leading-none">
                  Registro y Actividades
                </h1>
                <br />
                <p class="font-normal">
                <ul>
                  <li>
                    1.1. Todas las actividades realizadas en Elisa System serán
                    registradas y almacenadas para su posterior revisión y
                    seguimiento.
                  </li>
                  <li>
                    1.2. Los comportamientos de los usuarios dentro del sistema
                    serán mapeados con el fin de mejorar la experiencia y la
                    eficiencia en el uso de la plataforma.
                  </li>
                  <li>
                    1.3. Se mantendrá un registro detallado de las entradas y
                    salidas de los usuarios en el sistema.
                  </li>
                </ul>
                </p>
              </div>
            </article>

            <article class="mt-10" id="1">
              <div>
                <h1 class="text-2xl font-medium leading-none">
                  Generación de Hash y Firma de Documentos
                </h1>
                <br />
                <p class="font-normal">
                  2.1. Para cada usuario se generará un hash único que será
                  utilizado para la firma de cualquier documento generado en el
                  sistema. <br />
                  2.2. La firma con el hash del usuario tendrá validez legal y
                  será considerada como una forma válida de consentimiento y
                  autorización.<br>
                  2.3. Por definir
                </p>
              </div>
            </article>

            <article class="mt-10" id="2">
              <div>
                <h1 class="text-2xl font-medium leading-none">
                  Auditorías Internas
                </h1>
                <br />
                <p class="font-normal">
                  3.1. La administración de Elisa System se reserva el derecho
                  de acceder a las cuentas de usuario para llevar a cabo
                  auditorías internas con el fin de verificar el cumplimiento de
                  los términos y condiciones establecidos. <br />
                  3.2. El acceso a las cuentas de usuario se llevará a cabo
                  siguiendo los protocolos de seguridad y confidencialidad
                  establecidos.
                  <br>
                  3.3. Por definir
                </p>
              </div>
            </article>

            <article class="mt-10" id="3">
              <div>
                <h1 class="text-2xl font-medium leading-none">
                  Bloqueo de Usuarios
                </h1>
                <br />
                <p class="font-normal">
                  4.1. En caso de actividades sospechosas o incumplimiento de
                  los términos y condiciones, la administración de Elisa System
                  se reserva el derecho de bloquear la cuenta del usuario
                  temporal o permanentemente. <br />
                  4.2. El usuario será notificado en caso de bloqueo y se le
                  proporcionará información sobre los pasos a seguir para
                  resolver la situación.
                  <br>
                  4.3. Por definir
                </p>
              </div>
            </article>

            <article class="mt-10" id="4">
              <div>
                <h1 class="text-2xl font-medium leading-none">
                  Administración de Recursos Humanos.
                </h1>
                <br />
                <p class="font-normal">
                  5.1. Por definir <br />
                </p>
              </div>
            </article>

            <article class="mt-10" id="4">
              <div>
                <h1 class="text-2xl font-medium leading-none">
                  Administración de Bienes nacionales.
                </h1>
                <br />
                <p class="font-normal">
                  6.1. Por definir <br />
                </p>
              </div>
            </article>

            <article class="mt-10" id="4">
              <div>
                <h1 class="text-2xl font-medium leading-none">
                  Administración de tesoresia
                </h1>
                <br />
                <p class="font-normal">
                  7.1. Por definir <br />
                </p>
              </div>
            </article>

            <article class="mt-10" id="4">
              <div>
                <h1 class="text-2xl font-medium leading-none">
                  Administración de comercializacion
                </h1>
                <br />
                <p class="font-normal">
                  8.1. Por definir <br />
                </p>
              </div>
            </article>

            <article class="mt-10" id="5">
              <div>
                <h1 class="text-2xl font-medium leading-none">
                  Privacidad y Confidencialidad
                </h1>
                <br />
                <p class="font-normal">
                  9.1. Los datos recopilados y almacenados por Elisa System
                  estarán protegidos de acuerdo con las leyes y regulaciones de
                  privacidad aplicables. <br />
                  9.2. La información proporcionada por los usuarios será
                  tratada con estricta confidencialidad y solo se utilizará con
                  el propósito de mejorar la experiencia de uso.
                  <br>
                  9.3. Por definir
                </p>
              </div>
            </article>

            <article class="mt-10" id="6">
              <div>
                <h1 class="text-2xl font-medium leading-none">
                  Modificaciones a los Términos y Condiciones
                </h1>
                <br />
                <p class="font-normal">
                  10.1. La administración de Elisa System se reserva el derecho
                  de modificar estos términos y condiciones en cualquier
                  momento. Los cambios serán notificados a los usuarios y
                  entrarán en vigencia a partir de su publicación. <br>
                  10.2. Por definir

                </p>
              </div>
            </article>

            <article class="mt-10" id="7">
              <div>
                <p class="font-normal">
                  Al utilizar Elisa System, usted acepta estar sujeto a estos
                  términos y condiciones. Si no está de acuerdo con alguno de
                  los puntos mencionados anteriormente, le recomendamos
                  abstenerse de utilizar nuestros servicios. Si tiene alguna
                  pregunta o inquietud, no dude en ponerse en contacto con
                  nuestro equipo de soporte.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
