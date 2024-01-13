<script setup lang="ts">
import Lucide from "../../base-components/Lucide";
import Button from "../../base-components/Button";
import LoadingIcon from "../../base-components/LoadingIcon"
import { FormInput, FormSelect } from "../../base-components/Form";
import { onMounted, ref, reactive } from "vue";
import { createIcons, icons } from "lucide";
import { TabulatorFull as Tabulator } from "tabulator-tables";
import { stringToHTML } from "../../utils/helper";
import { activityStore } from "../../stores/ActivityCenter/index";
import { core } from "../../services/pluginInit";

interface Response {
  name?: string;
  category?: string;
  images?: string[];
  status?: string;
}

const store = activityStore();
const tableRef = ref<HTMLDivElement>();
const tabulator = ref<Tabulator>();
const headerFooterSlideoverPreview = ref(false);
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
  await store.index(filter)
  initTabulator();
  reInitOnResizeWindow();
};

// Filter function
const onFilter = async () => {
  if (tabulator.value) {
    onLoadData();
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

const initTabulator = () => {
  if (tableRef.value) {
    tabulator.value = new Tabulator(tableRef.value, {
      data: store.getActivity.data,
      pagination: true,
      paginationMode: "local",
      layout: "fitColumns",
      responsiveLayout: "collapse",
      paginationInitialPage: 1,
      paginationSize: 10,
      paginationSizeSelector: [10, 20, 30, 40],
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
          title: "FECHA",
          minWidth: 200,
          field: "created_at",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
        },
        {
          title: "ORIGEN",
          minWidth: 200,
          field: "action_locale",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            const {auditable, action_locale}: any = cell.getData();
            return `<div>
                <div class="font-medium whitespace-nowrap">${auditable.correlative_number}</div>
                <div class="text-xs text-slate-500 whitespace-nowrap">${action_locale}</div>
              </div>`;
          },
        },
        {
          title: "ANTIGUO",
          minWidth: 200,
          field: "old",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            const response: any = cell.getData();
            return `<pre>
               ${response.old}
              </pre>`;
          },
        },
        {
          title: "NUEVO",
          minWidth: 200,
          field: "new",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            const response: any = cell.getData();
            return `<pre>
               ${JSON.stringify(response.new, null, 2)}
              </pre>`;
          },
        },
        {
          title: "USUARIO",
          minWidth: 200,
          field: "user.name",
          hozAlign: "left",
          headerHozAlign: "left",
          vertAlign: "middle",
          print: false,
          download: false,
          formatter(cell) {
            const {user}: any = cell.getData();
            return `<div>
                <div class="font-medium whitespace-nowrap">${user.name}</div>
                <div class="text-xs text-slate-500 whitespace-nowrap">${user.email}</div>
              </div>`;
          },
        },
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
      <h2 class="mr-auto text-lg font-medium">Centro de actividades</h2>
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
  </div>
</template>