<script setup lang="ts">
import _ from "lodash";
import { ref, provide } from "vue";
import fakerData from "../../utils/faker";
import Button from "../../base-components/Button";
import { FormSwitch } from "../../base-components/Form";
import Progress from "../../base-components/Progress";
import TinySlider, {
  TinySliderElement,
} from "../../base-components/TinySlider";
import Lucide from "../../base-components/Lucide";
import FileIcon from "../../base-components/FileIcon";
import { Menu, Tab } from "../../base-components/Headless";
import { Tab as HeadlessTab } from "@headlessui/vue";
import ChangePassword from "./ChangePassword";
import UpdateProfile from "./UpdateProfile";
import Profile from "./Profile";

const newProductsRef = ref<TinySliderElement>();
const newAuthorsRef = ref<TinySliderElement>();

provide("bind[newProductsRef]", (el: TinySliderElement) => {
  newProductsRef.value = el;
});

provide("bind[newAuthorsRef]", (el: TinySliderElement) => {
  newAuthorsRef.value = el;
});

const prevNewProducts = () => {
  newProductsRef.value?.tns.goTo("prev");
};
const nextNewProducts = () => {
  newProductsRef.value?.tns.goTo("next");
};
const prevNewAuthors = () => {
  newAuthorsRef.value?.tns.goTo("prev");
};
const nextNewAuthors = () => {
  newAuthorsRef.value?.tns.goTo("next");
};
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Detalles de perfil de usuario</h2>
  </div>
  <Tab.Group>
    <!-- BEGIN: Profile Info -->
    <div class="px-5 pt-5 mt-5 intro-y box">
      <div
        class="flex flex-col pb-5 -mx-5 border-b lg:flex-row border-slate-200/60 dark:border-darkmode-400"
      >
        <div
          class="flex items-center justify-center flex-1 px-5 lg:justify-start"
        >
          <div
            class="relative flex-none w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32 image-fit"
          >
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="rounded-full"
              :src="fakerData[0].photos[0]"
            />
          </div>
          <div class="ml-5">
            <div
              class="w-24 text-lg font-medium truncate sm:w-40 sm:whitespace-normal"
            >
              {{ fakerData[0].users[0].name }}
            </div>
            <div class="text-slate-500">Analista de bienes</div>
          </div>
        </div>
        <div
          class="flex-1 px-5 pt-5 mt-6 border-t border-l border-r lg:mt-0 border-slate-200/60 dark:border-darkmode-400 lg:border-t-0 lg:pt-0"
        >
          <div class="font-medium text-center lg:text-left lg:mt-3">
            Detalles de contacto
          </div>
          <div
            class="flex flex-col items-center justify-center mt-4 lg:items-start"
          >
            <div class="flex items-center truncate sm:whitespace-normal">
              <Lucide icon="Mail" class="w-4 h-4 mr-2" />
              {{ fakerData[0].users[0].email }}
            </div>
            <div class="flex items-center mt-3 truncate sm:whitespace-normal">
              <Lucide icon="Instagram" class="w-4 h-4 mr-2" /> Instagram
              {{ fakerData[0].users[0].name }}
            </div>
            <div class="flex items-center mt-3 truncate sm:whitespace-normal">
              <Lucide icon="Twitter" class="w-4 h-4 mr-2" /> Twitter
              {{ fakerData[0].users[0].name }}
            </div>
          </div>
        </div>
        <!-- <div
          class="flex items-center justify-center flex-1 px-5 pt-5 mt-6 border-t lg:mt-0 lg:border-0 border-slate-200/60 dark:border-darkmode-400 lg:pt-0"
        >
          <div class="w-20 py-3 text-center rounded-md">
            <div class="text-xl font-medium text-primary">201</div>
            <div class="text-slate-500">Orders</div>
          </div>
          <div class="w-20 py-3 text-center rounded-md">
            <div class="text-xl font-medium text-primary">1k</div>
            <div class="text-slate-500">Purchases</div>
          </div>
          <div class="w-20 py-3 text-center rounded-md">
            <div class="text-xl font-medium text-primary">492</div>
            <div class="text-slate-500">Reviews</div>
          </div>
        </div> -->
      </div>
      <Tab.List
        variant="link-tabs"
        class="flex-col justify-center text-center sm:flex-row lg:justify-start"
      >
        <Tab :fullWidth="false">
          <Tab.Button class="flex items-center py-4 cursor-pointer">
            <Lucide icon="User" class="w-4 h-4 mr-2" /> Mi Perfil
          </Tab.Button>
        </Tab>
        <Tab :fullWidth="false">
          <Tab.Button class="flex items-center py-4 cursor-pointer">
            <Lucide icon="Shield" class="w-4 h-4 mr-2" /> Actualizar
          </Tab.Button>
        </Tab>
        <Tab :fullWidth="false">
          <Tab.Button class="flex items-center py-4 cursor-pointer">
            <Lucide icon="Lock" class="w-4 h-4 mr-2" /> Cambiar Contrasena
          </Tab.Button>
        </Tab>
      </Tab.List>
    </div>
    <!-- END: Profile Info -->
    <Tab.Panels class="mt-5">
      <Tab.Panel>
        <Profile />
      </Tab.Panel>
      <Tab.Panel>
        <UpdateProfile />
      </Tab.Panel>
      <Tab.Panel>
        <ChangePassword />
      </Tab.Panel>
    </Tab.Panels>
  </Tab.Group>
</template>
