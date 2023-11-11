<script setup lang="ts">
import Lucide from "../../../base-components/Lucide";
import { Dialog } from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import LoadingIcon from "../../../base-components/LoadingIcon"
import { FormInput, FormSelect } from "../../../base-components/Form";
import { onMounted, ref, reactive } from "vue";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { stringToHTML } from "../../../utils/helper";
import Toastify from "toastify-js";
import Notification from "../../../base-components/Notification";
import { rolesStore } from "../../../stores/Roles/index";
import CreatedOrUpdate from './createdOrUpdate.vue'
import Pagination from "../../../base-components/Pagination";


interface Response {
  name?: string;
  category?: string;
  images?: string[];
  status?: string;
}

const store = rolesStore();
const tableRef = ref<HTMLDivElement>();
const tabulator = ref<Tabulator>();
const headerFooterSlideoverPreview = ref(false);
const deleteButtonRef = ref();
const deleteData = ref();
const editData = ref({});

const isLoading = ref(false);

const filter = reactive({
  search: null,
  status: null,
  page: 1,
  per_page: 10,

});

onMounted(async () => {
  onLoadData()
});

// Filter function
const onLoadData = async () => {
  await rolesStore().index(filter)
  initTabulator();
  reInitOnResizeWindow();
};

// Filter function
const onFilter = async () => {
  if (tabulator.value) {
    await rolesStore().index(filter);
  }
};

const setDeleteModalPreview = ref(false);

const edit = (data: any = {}) => {
  editData.value = data
  headerFooterSlideoverPreview.value = !headerFooterSlideoverPreview.value
};

const onDelete = (data: any) => {
  deleteData.value = data
  setDeleteModalPreview.value = !setDeleteModalPreview.value
};

const deleteUser = async () => {
  isLoading.value = true
  const response: any = await rolesStore().delete(deleteData.value);

  if (response?.status == 200) {
    const failedEl = document
      .querySelectorAll("#delete-notification")[0]
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

    setDeleteModalPreview.value = !setDeleteModalPreview.value
    onLoadData();
  }
  isLoading.value = false
};

const initTabulator = () => {
  if (tableRef.value) {
    tabulator.value = new Tabulator(tableRef.value, {
      data: store.getRoles.data,
      pagination: true,
      paginationMode: "local",
      layout: "fitColumns",
      responsiveLayout: "collapse",
      paginationInitialPage: 1,
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 30, 40],
      paginationCounter:"rows",
      placeholder: "No se han encontrado registros",
      columns: [
        {
          title: "",
          formatter: "responsiveCollapse",
          width: 40,
          minWidth: 30,
          hozAlign: "center",
          resizable: false,
          headerSort: false,
        },
        {
          title: "NOMBRE",
          minWidth: 200,
          field: "label",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
        },
        {
          title: "SLUG",
          minWidth: 200,
          field: "label",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
        },

        {
          title: "ESTADO",
          minWidth: 200,
          field: "isActive",
          hozAlign: "center",
          headerHozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            const response: any = cell.getData();
            return `<div class="flex items-center lg:justify-center text-success">
                <i data-lucide="check-square" class="w-4 h-4 mr-2"></i>  Habilitado
              </div>`;
          },
        },
        {
          title: "PERMISOS",
          minWidth: 200,
          field: "role",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            const response: any = cell.getData();
            let content = '<p class="flex items-center lg:justify-center">';
            for (let i = 0; i < response.permissions.length; i++) {
              content += `- ${response.permissions[i].label} <br>`;
            }
            content += '</p>';
            return content;
          },
        },
        {
          title: "ACCIONES",
          minWidth: 200,
          field: "actions",
          responsive: 1,
          hozAlign: "center",
          headerHozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            const a =
              stringToHTML(`<div class="flex items-center lg:justify-center">
                  <a class="flex items-center mr-3 text-warning" href="javascript:;" name="edit">
                    <i data-lucide="edit" class="w-4 h-4 mr-1"></i> Editar
                  </a>
                  <a class="flex items-center text-danger" href="javascript:;" name="delete">
                    <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Eliminar
                  </a>
                </div>`);
            const handleActionClick = (event: MouseEvent) => {
              const target = event.target as HTMLElement;
              const action = target.getAttribute("name");
              const response: any = cell.getData();
              if (action === "edit") {
                edit(response);
              } else if (action === "delete") {
                onDelete(response);
              }
            };
            a.addEventListener("click", handleActionClick)
            return a;
          },
        }
      ]
    });
  }

  tabulator.value?.on("renderComplete", () => {
    createIcons({
      icons,
      attrs: { "stroke-width": 1.5 },
      nameAttr: "data-lucide",
    });
  });
};

// Redraw table onresize
const reInitOnResizeWindow = () => {
  window.addEventListener("resize", () => {
    if (tabulator.value) {
      tabulator.value.redraw();
      createIcons({
        icons,
        attrs: {
          "stroke-width": 1.5,
        },
        nameAttr: "data-lucide",
      });
    }
  });
};

</script>

<template>
  <div>
    <div class="flex flex-col items-center mt-8 intro-y sm:flex-row">
      <h2 class="mr-auto text-lg font-medium">Gestion de roles y permisos</h2>
      <div class="flex w-full mt-4 sm:w-auto sm:mt-0">
        <Button variant="primary" class="mr-2 shadow-md" @click="edit()">
          <Lucide icon="Plus" class="w-4 h-4 mr-2" /> Agregar
        </Button>
      </div>
    </div>
    <!-- BEGIN: HTML Table Data -->
    <div class="p-5 mt-5 intro-y box">
      <div class="flex flex-col sm:flex-row sm:items-end xl:items-start">
        <form id="tabulator-html-filter-form" class="xl:flex sm:mr-auto" @submit="(e) => {
          e.preventDefault();
          onFilter();
        }
        ">
          <div class="items-center mt-2 sm:flex sm:mr-4 xl:mt-0">
            <FormInput id="tabulator-html-filter-value" v-model="filter.search" type="text"
              class="mt-2 sm:w-100 2x1:w-full sm:mt-0" placeholder="Buscar..." />
          </div>
        </form>
      </div>

      <div class="overflow-x-auto scrollbar-hidden">
        <p class="p-5 mt-5 text-center" v-if="store.isLoading">
          <LoadingIcon icon="tail-spin" class="mr-1" />Cargando...
        </p>
        <div id="tabulator" ref="tableRef" v-else class="mt-5"></div>

      </div>
    </div>
    <!-- END: HTML Table Data -->

    <Dialog :open="setDeleteModalPreview" @close="() => {
      // setDeleteModalPreview.value = false;
    }
    " :initialFocus="deleteButtonRef">
      <Dialog.Panel>
        <div class="p-5 text-center">
          <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
          <div class="mt-5 text-3xl">¿Esta seguro?</div>
          <div class="mt-2 text-slate-500">
            ¿Desea eliminar este usuario? <br />
            Una vez realizada esta accion no se podra deshacer.
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <Button type="button" variant="outline-secondary" @click="setDeleteModalPreview = false" class="w-24 mr-2">
            Cancelar
          </Button>
          <Button type="button" variant="danger" class="w-24" ref="{deleteButtonRef}" @click="deleteUser()"
            :disabled="isLoading">
            <LoadingIcon color="white" v-if="isLoading" icon="tail-spin" class="mr-1" /> {{ isLoading ? '' : 'Eliminar' }}
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>

    <Notification id="delete-notification" class="flex hidden">
      <Lucide icon="CheckCircle" class="text-success" />
      <div class="ml-4 mr-4">
        <div class="font-medium">Exelente!</div>
        <div class="mt-1 text-slate-500">Rol eliminado exitosamente.</div>
      </div>
    </Notification>

    <CreatedOrUpdate :foo="headerFooterSlideoverPreview" :data="editData" @refresh="onLoadData()" />
  </div>
</template>