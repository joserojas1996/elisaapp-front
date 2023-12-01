<script setup lang="ts">
import Lucide from "../../../base-components/Lucide";
import { Dialog } from "../../../base-components/Headless";
import Button from "../../../base-components/Button";
import LoadingIcon from "../../../base-components/LoadingIcon"
import { FormInput } from "../../../base-components/Form";
import { onMounted, ref, reactive } from "vue";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { stringToHTML } from "../../../utils/helper";
import CreatedOrUpdate from './createdOrUpdate.vue'
import { paysheetStore } from "../../../stores/Paysheets";
import { core } from "../../../services/pluginInit";

interface Response {
  name?: string;
  category?: string;
  images?: string[];
  status?: string;
}

const store = paysheetStore();
const tableRef = ref<HTMLDivElement>();
const tabulator = ref<Tabulator>();
const openModal = ref(false);
const deleteButtonRef = ref();
const deleteData = ref();
const editData = ref({});
const setDeleteModalPreview = ref(false);

const filter = reactive({
  search: '',
  active: '',
  role: '',
  page: 1,
  per_page: 10,
});

onMounted(async () => {
  onLoadData()
});

const onLoadData = async () => {
  await store.index(filter)
  initTabulator();
  reInitOnResizeWindow();
};

const closeForm = () => {
  openModal.value = false
  editData.value = {}
};

const onEdit = (data: any) => {
  editData.value = data
  openModal.value = !openModal.value
};

const onDelete = (data: any) => {
  deleteData.value = data
  setDeleteModalPreview.value = !setDeleteModalPreview.value
};

const deleteUser = async () => {
  const response: any = await store.delete(deleteData.value);
  if (response?.status == 200) {
    core.showSnackbar("success", response.data.message);
    setDeleteModalPreview.value = !setDeleteModalPreview.value
    onLoadData()
  }
};


const initTabulator = () => {
  if (tableRef.value) {
    tabulator.value = new Tabulator(tableRef.value, {
      data: store.getPaysheet.data,
      reactiveData: true,
      pagination: true,
      paginationMode: "local",
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 30, 40],
      layout: "fitColumns",
      responsiveLayout: "collapse",
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
          title: "CODIGO",
          minWidth: 200,
          field: "correlative",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
        },
        {
          title: "NOMBRE",
          minWidth: 200,
          field: "name",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
        },

        {
          title: "ESTADO",
          minWidth: 200,
          field: "status",
          hozAlign: "center",
          headerHozAlign: "center",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            const response: any = cell.getData();
            return `<div class="flex items-center lg:justify-center ${response.status ? "text-success" : "text-danger"
              }">
                <i data-lucide="${response.status ? "check-square" : "x-square"}" class="w-4 h-4 mr-2"></i> ${response.status ? "Activo" : "Inactivo"
              }
              </div>`;
          },
        },
        {
          title: "DESCRIPCIÓN",
          minWidth: 200,
          field: "description",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
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
                onEdit(response);
              } else if (action === "delete") {
                onDelete(response);
              }
            };
            a.addEventListener("click", handleActionClick)
            return a;
          },
        },
      ],
    });
  }

  tabulator.value?.on("renderComplete", () => {
    createIcons({
      icons,
      attrs: {
        "stroke-width": 1.5,
      },
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
      <h2 class="mr-auto text-lg font-medium">Gestion de nominas</h2>
      <div class="flex w-full mt-4 sm:w-auto sm:mt-0">
        <Button variant="primary" class="mr-2 shadow-md" @click="openModal = !openModal">
          <Lucide icon="Plus" class="w-4 h-4 mr-2" /> Agregar
        </Button>
      </div>
    </div>
    <!-- BEGIN: HTML Table Data -->
    <div class="p-5 mt-5 intro-y box">
      <div class="flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap">
        <div class="w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0 sm:mr-4">
          <div class="relative w-56 ">
            <FormInput v-model="filter.search" type="search" class="mt-2 sm:w-75 2xl:w-full sm:mt-0 "
              placeholder="Buscar..." />
            <Lucide icon="Search" class="absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3" />
          </div>
        </div>
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
    }
    " :initialFocus="deleteButtonRef">
      <Dialog.Panel>
        <div class="p-5 text-center">
          <Lucide icon="XCircle" class="w-16 h-16 mx-auto mt-3 text-danger" />
          <div class="mt-5 text-3xl">¿Esta seguro?</div>
          <div class="mt-2 text-slate-500">
            ¿Desea eliminar esta nomina? <br />
            Una vez realizada esta accion no se podra deshacer.
          </div>
        </div>
        <div class="px-5 pb-8 text-center">
          <Button type="button" variant="outline-secondary" @click="setDeleteModalPreview = false" class="w-24 mr-2">
            Cancelar
          </Button>
          <Button type="button" variant="danger" class="w-24" ref="{deleteButtonRef}" @click="deleteUser()"
            :disabled="store.isLoading">
            <LoadingIcon color="white" v-if="store.isLoading" icon="tail-spin" class="mr-1" /> {{ store.isLoading ? '' :
              'Eliminar' }}
          </Button>
        </div>
      </Dialog.Panel>
    </Dialog>
    <CreatedOrUpdate :open="openModal" :data="editData" @close="closeForm()" @refresh="onLoadData()" />
  </div>
</template>
