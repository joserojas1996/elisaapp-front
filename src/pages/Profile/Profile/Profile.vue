<script setup lang="ts">
import _ from "lodash";
import { ref, provide } from "vue";
import fakerData from "../../../utils/faker";
import Button from "../../../base-components/Button";
import { FormSwitch } from "../../../base-components/Form";
import Progress from "../../../base-components/Progress";
import TinySlider, {
  TinySliderElement,
} from "../../../base-components/TinySlider";
import Lucide from "../../../base-components/Lucide";
import FileIcon from "../../../base-components/FileIcon";
import { Menu, Tab } from "../../../base-components/Headless";
import { Tab as HeadlessTab } from "@headlessui/vue";
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
  <div class="grid grid-cols-12 gap-6">
    <!-- BEGIN: Latest Uploads -->
    <div class="col-span-12 intro-y box lg:col-span-6">
      <div
        class="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="mr-auto text-base font-medium">
          Ultimos archivos generados
        </h2>
        <Menu class="ml-auto sm:hidden">
          <Menu.Button tag="a" class="block w-5 h-5" href="#">
            <Lucide icon="MoreHorizontal" class="w-5 h-5 text-slate-500" />
          </Menu.Button>
          <Menu.Items class="w-40">
            <Menu.Item>Todos</Menu.Item>
          </Menu.Items>
        </Menu>
        <Button variant="outline-secondary" class="hidden sm:flex">
          Todos
        </Button>
      </div>
      <div class="p-5">
        <div class="flex items-center mt-5">
          <FileIcon class="w-12 text-xs file" variant="file" type="pdf" />
          <div class="ml-4">
            <a class="font-medium" href=""> Notificacion - CGR - 01-01-2023 </a>
            <div class="text-slate-500 text-xs mt-0.5">40 KB</div>
          </div>
          <Menu class="ml-auto">
            <Menu.Button tag="a" class="block w-5 h-5" href="#">
              <Lucide icon="MoreHorizontal" class="w-5 h-5 text-slate-500" />
            </Menu.Button>
            <Menu.Items class="w-40">
              <Menu.Item>
                <Lucide icon="Download" class="w-4 h-4 mr-2" /> Descargar
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Trash" class="w-4 h-4 mr-2" />
                Eliminar
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
         <div class="flex items-center mt-5">
          <FileIcon class="w-12 text-xs file" variant="file" type="pdf" />
          <div class="ml-4">
            <a class="font-medium" href=""> Notificacion - CGR - 01-01-2023 </a>
            <div class="text-slate-500 text-xs mt-0.5">40 KB</div>
          </div>
          <Menu class="ml-auto">
            <Menu.Button tag="a" class="block w-5 h-5" href="#">
              <Lucide icon="MoreHorizontal" class="w-5 h-5 text-slate-500" />
            </Menu.Button>
            <Menu.Items class="w-40">
              <Menu.Item>
                <Lucide icon="Download" class="w-4 h-4 mr-2" /> Descargar
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Trash" class="w-4 h-4 mr-2" />
                Eliminar
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
         <div class="flex items-center mt-5">
          <FileIcon class="w-12 text-xs file" variant="file" type="pdf" />
          <div class="ml-4">
            <a class="font-medium" href=""> Notificacion - CGR - 01-01-2023 </a>
            <div class="text-slate-500 text-xs mt-0.5">40 KB</div>
          </div>
          <Menu class="ml-auto">
            <Menu.Button tag="a" class="block w-5 h-5" href="#">
              <Lucide icon="MoreHorizontal" class="w-5 h-5 text-slate-500" />
            </Menu.Button>
            <Menu.Items class="w-40">
              <Menu.Item>
                <Lucide icon="Download" class="w-4 h-4 mr-2" /> Descargar
              </Menu.Item>
              <Menu.Item>
                <Lucide icon="Trash" class="w-4 h-4 mr-2" />
                Eliminar
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </div>
    <!-- END: Latest Uploads -->
    <!-- BEGIN: Work In Progress -->
    <Tab.Group class="col-span-12 intro-y box lg:col-span-6">
      <div
        class="flex items-center px-5 py-5 border-b sm:py-0 border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="mr-auto text-base font-medium">En progreso</h2>
        <Menu class="ml-auto sm:hidden">
          <Menu.Button tag="a" class="block w-5 h-5" href="#">
            <Lucide icon="MoreHorizontal" class="w-5 h-5 text-slate-500" />
          </Menu.Button>
          <Menu.Items class="w-40">
            <Menu.Item class="w-full" :as="HeadlessTab"> Actual </Menu.Item>
            <Menu.Item class="w-full" :as="HeadlessTab"> Hace una semana </Menu.Item>
          </Menu.Items>
        </Menu>
        <Tab.List variant="link-tabs" class="hidden w-auto ml-auto sm:flex">
          <Tab :fullWidth="false">
            <Tab.Button class="py-5 cursor-pointer"> Nuevo </Tab.Button>
          </Tab>
          <Tab :fullWidth="false">
            <Tab.Button class="py-5 cursor-pointer"> Hace una semana </Tab.Button>
          </Tab>
        </Tab.List>
      </div>
      <div class="p-5">
        <Tab.Panels>
          <Tab.Panel>
            <div>
              <div class="flex">
                <div class="mr-auto">Pendientes</div>
                <div>20%</div>
              </div>
              <Progress class="h-1 mt-2">
                <Progress.Bar
                  class="w-1/2 bg-primary"
                  role="progressbar"
                  :aria-valuenow="0"
                  :aria-valuemin="0"
                  :aria-valuemax="100"
                ></Progress.Bar>
              </Progress>
            </div>
            <div class="mt-5">
              <div class="flex">
                <div class="mr-auto">Completadas</div>
                <div>2 / 20</div>
              </div>
              <Progress class="h-1 mt-2">
                <Progress.Bar
                  class="w-1/4 bg-primary"
                  role="progressbar"
                  :aria-valuenow="0"
                  :aria-valuemin="0"
                  :aria-valuemax="100"
                ></Progress.Bar>
              </Progress>
            </div>
            <div class="mt-5">
              <div class="flex">
                <div class="mr-auto">En progreso</div>
                <div>42</div>
              </div>
              <Progress class="h-1 mt-2">
                <Progress.Bar
                  class="w-3/4 bg-primary"
                  role="progressbar"
                  :aria-valuenow="0"
                  :aria-valuemin="0"
                  :aria-valuemax="100"
                ></Progress.Bar>
              </Progress>
            </div>
            <Button
              as="a"
              variant="secondary"
              href=""
              class="block w-40 mx-auto mt-5"
            >
              Ver mas
            </Button>
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group>
    <!-- END: Work In Progress -->
    <!-- BEGIN: Daily Sales -->
    <!-- <div class="col-span-12 intro-y box lg:col-span-6">
      <div
        class="flex items-center px-5 py-5 border-b sm:py-3 border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="mr-auto text-base font-medium">Daily Sales</h2>
        <Menu class="ml-auto sm:hidden">
          <Menu.Button tag="a" class="block w-5 h-5" href="#">
            <Lucide icon="MoreHorizontal" class="w-5 h-5 text-slate-500" />
          </Menu.Button>
          <Menu.Items class="w-40">
            <Menu.Item>
              <Lucide icon="File" class="w-4 h-4 mr-2" /> Download Excel
            </Menu.Item>
          </Menu.Items>
        </Menu>
        <Button variant="outline-secondary" class="hidden sm:flex">
          <Lucide icon="File" class="w-4 h-4 mr-2" /> Download Excel
        </Button>
      </div>
      <div class="p-5">
        <div class="relative flex items-center">
          <div class="flex-none w-12 h-12 image-fit">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="rounded-full"
              :src="fakerData[0].photos[0]"
            />
          </div>
          <div class="ml-4 mr-auto">
            <a href="" class="font-medium">
              {{ fakerData[0].users[0].name }}
            </a>
            <div class="mr-5 text-slate-500 sm:mr-5">
              Bootstrap 4 HTML Admin Template
            </div>
          </div>
          <div class="font-medium text-slate-600 dark:text-slate-500">+$19</div>
        </div>
        <div class="relative flex items-center mt-5">
          <div class="flex-none w-12 h-12 image-fit">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="rounded-full"
              :src="fakerData[1].photos[0]"
            />
          </div>
          <div class="ml-4 mr-auto">
            <a href="" class="font-medium">
              {{ fakerData[1].users[0].name }}
            </a>
            <div class="mr-5 text-slate-500 sm:mr-5">
              Tailwind HTML Admin Template
            </div>
          </div>
          <div class="font-medium text-slate-600 dark:text-slate-500">+$25</div>
        </div>
        <div class="relative flex items-center mt-5">
          <div class="flex-none w-12 h-12 image-fit">
            <img
              alt="Midone Tailwind HTML Admin Template"
              class="rounded-full"
              :src="fakerData[2].photos[0]"
            />
          </div>
          <div class="ml-4 mr-auto">
            <a href="" class="font-medium">
              {{ fakerData[2].users[0].name }}
            </a>
            <div class="mr-5 text-slate-500 sm:mr-5">
              Vuejs HTML Admin Template
            </div>
          </div>
          <div class="font-medium text-slate-600 dark:text-slate-500">+$21</div>
        </div>
      </div>
    </div> -->
    <!-- END: Daily Sales -->
    <!-- BEGIN: Latest Tasks -->
    <!-- <Tab.Group class="col-span-12 intro-y box lg:col-span-6">
      <div
        class="flex items-center px-5 py-5 border-b sm:py-0 border-slate-200/60 dark:border-darkmode-400"
      >
        <h2 class="mr-auto text-base font-medium">Latest Tasks</h2>
        <Menu class="ml-auto sm:hidden">
          <Menu.Button tag="a" class="block w-5 h-5" href="#">
            <Lucide icon="MoreHorizontal" class="w-5 h-5 text-slate-500" />
          </Menu.Button>
          <Menu.Items class="w-40">
            <Menu.Item class="w-full" :as="HeadlessTab"> New </Menu.Item>
            <Menu.Item class="w-full" :as="HeadlessTab"> Last Week </Menu.Item>
          </Menu.Items>
        </Menu>
        <Tab.List variant="link-tabs" class="hidden w-auto ml-auto sm:flex">
          <Tab :fullWidth="false">
            <Tab.Button class="py-5 cursor-pointer"> New </Tab.Button>
          </Tab>
          <Tab :fullWidth="false">
            <Tab.Button class="py-5 cursor-pointer"> Last Week </Tab.Button>
          </Tab>
        </Tab.List>
      </div>
      <div class="p-5">
        <Tab.Panels>
          <Tab.Panel>
            <div class="flex items-center">
              <div class="pl-4 border-l-2 border-primary dark:border-primary">
                <a href="" class="font-medium"> Create New Campaign </a>
                <div class="text-slate-500">10:00 AM</div>
              </div>
              <FormSwitch class="ml-auto">
                <FormSwitch.Input type="checkbox" />
              </FormSwitch>
            </div>
            <div class="flex items-center mt-5">
              <div class="pl-4 border-l-2 border-primary dark:border-primary">
                <a href="" class="font-medium"> Meeting With Client </a>
                <div class="text-slate-500">02:00 PM</div>
              </div>
              <FormSwitch class="ml-auto">
                <FormSwitch.Input type="checkbox" />
              </FormSwitch>
            </div>
            <div class="flex items-center mt-5">
              <div class="pl-4 border-l-2 border-primary dark:border-primary">
                <a href="" class="font-medium"> Create New Repository </a>
                <div class="text-slate-500">04:00 PM</div>
              </div>
              <FormSwitch class="ml-auto">
                <FormSwitch.Input type="checkbox" />
              </FormSwitch>
            </div>
          </Tab.Panel>
        </Tab.Panels>
      </div>
    </Tab.Group> -->
    <!-- END: Latest Tasks -->
  </div>
</template>
