<script setup lang="ts">
import { ClassicEditor } from "../../base-components/Ckeditor";
import TomSelect from "../../base-components/TomSelect";
import { ref } from "vue";
import Button from "../../base-components/Button";
import {
  FormInput,
  FormLabel,
  FormSwitch,
  InputGroup,
} from "../../base-components/Form";

const categories = ref(["1", "3"]);
const editorConfig = {
  toolbar: {
    items: ["bold", "italic", "link"],
  },
};
const editorData = ref("<p>Content of the editor.</p>");
</script>

<template>
  <div class="flex items-center mt-8 intro-y">
    <h2 class="mr-auto text-lg font-medium">Movimientos Internos</h2>
  </div>
  <div class="grid grid-cols-24 gap-6 mt-5">
    <div class="col-span-6 intro-y lg:col-span-6">
      <!-- BEGIN: Form Layout -->
      <div class="p-5 intro-y box">
        <div class="grid-cols-3 gap-2 sm:grid">
          <div>
            <FormLabel htmlFor="crud-form-1">Departamento de origen</FormLabel>
            <TomSelect id="crud-form-2" v-model="categories" class="w-full">
              <option value="1">Sport & Outdoor</option>
              <option value="2">PC & Laptop</option>
              <option value="3">Smartphone & Tablet</option>
              <option value="4">Photography</option>
            </TomSelect>
          </div>
           <div>
            <FormLabel htmlFor="crud-form-1">Departamento de destino</FormLabel>
            <TomSelect id="crud-form-2" v-model="categories" class="w-full">
              <option value="1">Sport & Outdoor</option>
              <option value="2">PC & Laptop</option>
              <option value="3">Smartphone & Tablet</option>
              <option value="4">Photography</option>
            </TomSelect>
          </div>
        </div>
        <!-- <div class="mt-3">
          <div class="grid-cols-3 gap-2 sm:grid">
            <div>
              <FormLabel htmlFor="crud-form-1">Marca</FormLabel>
              <FormInput
                id="crud-form-1"
                type="text"
                class="w-full"
                placeholder="Color"
              />
            </div>
            <div>
              <FormLabel htmlFor="crud-form-1">Modelo</FormLabel>
              <FormInput
                id="crud-form-1"
                type="text"
                class="w-full"
                placeholder="Modelo"
              />
            </div>
            <div>
              <FormLabel htmlFor="crud-form-1">Serial</FormLabel>
              <FormInput
                id="crud-form-1"
                type="text"
                class="w-full"
                placeholder="Serial"
              />
            </div>
          </div>
        </div>
        <hr class="mt-4 mb-4" /> -->

        <!-- <div class="my-10">
          <div class="grid-cols-3 gap-2 sm:grid">
            <div>
              <FormLabel htmlFor="crud-form-1"
                >Fecha de incorporacion</FormLabel
              >
              <FormInput
                id="crud-form-1"
                type="text"
                class="w-full"
                placeholder="Input text"
              />
            </div>
            <div>
              <FormLabel htmlFor="crud-form-1">Costo</FormLabel>
              <FormInput
                id="crud-form-1"
                type="text"
                class="w-full"
                placeholder="Input text"
              />
            </div>
            <div>
              <FormLabel htmlFor="crud-form-1">Tipo de incorporacion</FormLabel>
              <TomSelect id="crud-form-2" v-model="categories" class="w-full">
                <option value="1">Sport & Outdoor</option>
                <option value="2">PC & Laptop</option>
                <option value="3">Smartphone & Tablet</option>
                <option value="4">Photography</option>
              </TomSelect>
            </div>
          </div>
        </div> -->
        <div class="mt-3">
          <FormLabel htmlFor="crud-form-1">Activos</FormLabel>
          <TomSelect id="crud-form-2" v-model="categories" class="w-full">
            <option value="1">Sport & Outdoor</option>
            <option value="2">PC & Laptop</option>
            <option value="3">Smartphone & Tablet</option>
            <option value="4">Photography</option>
          </TomSelect>
        </div>
        <!-- <div class="mt-3">
          <label>En Uno / En resguardo</label>
          <FormSwitch class="mt-2">
            <FormSwitch.Input type="checkbox" />
          </FormSwitch>
        </div> -->
        <div class="mt-3">
          <label>Motivo de movimiento</label>
          <div class="mt-2">
            <ClassicEditor v-model="editorData" :config="editorConfig" />
          </div>
        </div>
        <div class="mt-5 text-right">
          <Button type="button" variant="outline-secondary" class="w-24 mr-1">
            Cancelar
          </Button>
          <Button type="button" variant="primary" class="w-24"> Guardar </Button>
        </div>
      </div>
      <!-- END: Form Layout -->
    </div>
  </div>
</template>
