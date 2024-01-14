<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { FormInput, FormLabel, } from "../../../base-components/Form";
import { Slideover } from "../../../base-components/Headless";
import Lucide from "../../../base-components/Lucide";
import TomSelect from "../../../base-components/TomSelect"
import Button from "../../../base-components/Button";
import { permissionsStore } from "../../../stores/Permissions";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { providersStore } from "../../../stores/Treasury/providers";
import LoadingIcon from "../../../base-components/LoadingIcon"
import { core } from "../../../services/pluginInit";

interface PermissionsInterfase {
    id: string,
    rif: string,
    name: string,
}

const formData = reactive({
    id: '',
    rif: '',
    name: '',
});

const headerFooterSlideoverPreview = ref(false);
const store = providersStore();
const props = defineProps({
    'foo': {
        type: Boolean,
        required: false
    },
    'data': {
        type: Object,
        default: {}
    }
})
const formRef = ref();
const isLoading = ref(false);
const emit = defineEmits(['refresh'])


watch(props, (newValue, oldValue) => {
    onEdit()
    if (props.data?.id) {
        const { id, name, rif } = props.data
        formData.id = id
        formData.rif = rif
        formData.name = name
    }
})

const onEdit = () => {
    reset()
    headerFooterSlideoverPreview.value = !headerFooterSlideoverPreview.value
};

const rules = computed(() => {
    return {
        rif: { required, minLength: minLength(3) },
        name: { required, minLength: minLength(3) },
    }
});

const v$ = useVuelidate(rules, formData);

const saveFormData = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        return;
    }

    try {
        isLoading.value = true
        const response: any = await store.store(formData);
        if (response?.status == 201) {
            core.showSnackbar("success", `Exelente, ${!formData.id ? 'nuevo registro agregado' : 'registro actualizado'}`);
            emit('refresh');
            headerFooterSlideoverPreview.value = false
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false
    }
};

const reset = () => {
    formData.id = ''
    formData.rif = ''
    formData.name = ''
};

</script>
<template>
    <form class="validate-form" @submit.prevent="saveFormData" :model="formData" ref="formRef">
        <Slideover backdrop="static" :open="headerFooterSlideoverPreview" @close="() => { }">
            <!-- BEGIN: Slide Over Header -->
            <Slideover.Panel>
                <a @click="headerFooterSlideoverPreview = false" class="absolute top-0 left-0 right-auto mt-4 -ml-12"
                    href="#">
                    <Lucide icon="X" class="w-8 h-8 text-slate-400" />
                </a>
                <Slideover.Title>
                    <h2 class="mr-auto text-base font-medium">
                        Agregar nuevo proveedor
                    </h2>
                </Slideover.Title>
                <!-- END: Slide Over Header -->
                <!-- BEGIN: Slide Over Body -->
                <Slideover.Description>
                    <div>
                        <div>
                            <FormLabel htmlFor="modal-form-1">Rif</FormLabel>
                            <FormInput id="modal-form-1" type="text" placeholder="Ingrese un rif" :class="{
                                'border-danger': v$.rif.$error,
                            }" v-model.trim="v$.rif.$model" @blur="v$.rif.$touch" />
                            <template v-if="v$.rif.$error">
                                <div v-for="(error, index) in v$.rif.$errors" :key="index" class="mt-1 text-danger">
                                    <span v-if="error.$validator == 'required'" class="error">
                                        El campo es requerido
                                    </span>
                                    <span v-if="error.$validator == 'minLength'" class="error">
                                        El campo debe contener al menos 8 caracteres
                                    </span>
                                </div>
                            </template>

                        </div>
                        <div class="mt-3">
                            <FormLabel htmlFor="modal-form-2">Nombre</FormLabel>
                            <FormInput id="modal-form-2" type="text" placeholder="Ingrese un nombre" :class="{
                                'border-danger': v$.name.$error,
                            }" v-model.trim="v$.name.$model" @blur="v$.name.$touch" />
                            <template v-if="v$.name.$error">
                                <div v-for="(error, index) in v$.name.$errors" :key="index" class="mt-1 text-danger">
                                    <span v-if="error.$validator == 'required'" class="error">
                                        El campo es requerido es requerido
                                    </span>
                                    <span v-if="error.$validator == 'minLength'" class="error">
                                        El campo debe contener al menos 3 caracteres
                                    </span>
                                </div>
                            </template>
                        </div>
                    </div>
                </Slideover.Description>
                <!-- END: Slide Over Body -->
                <!-- BEGIN: Slide Over Footer -->
                <Slideover.Footer>
                    <Button variant="outline-secondary" type="button" @click="headerFooterSlideoverPreview = false"
                        class="w-20 mr-2">
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" class="w-20" @click="saveFormData()" :disabled="isLoading">
                        <LoadingIcon color="white" v-if="isLoading" icon="tail-spin" class="mr-1" />{{ isLoading ? "" :
                            "Guardar" }}
                    </Button>
                </Slideover.Footer>
            </Slideover.Panel>
            <!-- END: Slide Over Footer -->
        </Slideover>
    </form>
</template>