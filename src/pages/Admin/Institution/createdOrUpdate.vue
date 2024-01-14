<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { FormInput, FormLabel, FormTextarea } from "../../../base-components/Form";
import { Slideover } from "../../../base-components/Headless";
import Lucide from "../../../base-components/Lucide";
import TomSelect from "../../../base-components/TomSelect"
import Button from "../../../base-components/Button";
import useVuelidate from "@vuelidate/core";
import { required, minLength, ipAddress } from "@vuelidate/validators";
import { institutionStore } from "../../../stores/Admin/institution";
import LoadingIcon from "../../../base-components/LoadingIcon"
import { core } from "../../../services/pluginInit";

interface PermissionsInterfase {
    id: string,
    name: string,
    label: string,
}

const formData = reactive({
    id: '',
    name: '',
    slug: '',
    address: '',
    description: '',
});

const headerFooterSlideoverPreview = ref(false);
const store = institutionStore();
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
        const { id, name, slug, address, description } = props.data
        formData.id = id
        formData.name = name
        formData.slug = slug
        formData.address = address
        formData.description = description
    }
})

const onEdit = () => {
    reset()
    headerFooterSlideoverPreview.value = !headerFooterSlideoverPreview.value
};

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(3) },
        slug: { required, minLength: minLength(3) },
        address: { required, minLength: minLength(1) },
        description: { required, minLength: minLength(1) },
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
        console.log(response)
        if (response?.status == 201 || response?.status == 200) {
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

const toSlug = async () => {
    if (formData.name.length > 0) {
        formData.slug = formData.name
            .replace(/ /g, "-")
            .replace(/[^a-zA-Z0-9-]/g, "")
            .toLowerCase();
    } else {
        formData.slug = ''
    }
};

const reset = () => {
    formData.id = ''
    formData.name = ''
    formData.label = ''
    formData.permissions = ''
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
                        Agregar nuevo Rol
                    </h2>
                </Slideover.Title>
                <!-- END: Slide Over Header -->
                <!-- BEGIN: Slide Over Body -->
                <Slideover.Description>
                    <div>
                        <div>
                            <FormLabel htmlFor="modal-form-1">Nombres</FormLabel>
                            Slug
                            Slug
                            <FormInput id="modal-form-1" type="text" placeholder="Ingrese un nombre" :class="{
                                'border-danger': v$.name.$error,
                            }" v-model.trim="v$.name.$model" @blur="v$.name.$touch" @keyup="toSlug()" />
                            <template v-if="v$.name.$error">
                                <div v-for="(error, index) in v$.name.$errors" :key="index" class="mt-1 text-danger">
                                    <span v-if="error.$validator == 'required'" class="error">
                                        El campo es requerido
                                    </span>
                                    <span v-if="error.$validator == 'minLength'" class="error">
                                        El campo debe contener al menos 3 caracteres
                                    </span>
                                </div>
                            </template>

                        </div>
                        <div class="mt-3">
                            <FormLabel htmlFor="modal-form-2">Slug</FormLabel>
                            <FormInput id="modal-form-2" type="text" placeholder="Ingrese un slug" :class="{
                                'border-danger': v$.slug.$error,
                            }" v-model.trim="v$.slug.$model" @blur="v$.slug.$touch" />
                            <template v-if="v$.slug.$error">
                                <div v-for="(error, index) in v$.slug.$errors" :key="index" class="mt-1 text-danger">
                                    <span v-if="error.$validator == 'required'" class="error">
                                        El campo es requerido
                                    </span>
                                    <span v-if="error.$validator == 'minLength'" class="error">
                                        El campo debe contener al menos 3 caracteres
                                    </span>
                                </div>
                            </template>
                        </div>
                        <div class="mt-3">
                            <FormLabel htmlFor="name">Dirección</FormLabel>
                            <FormTextarea placeholder="Ingrese una dirección" :class="{
                                'border-danger': v$.address.$error,
                            }" v-model.trim="v$.address.$model" @blur="v$.address.$touch" />
                            <template v-if="v$.address.$error">
                                <div v-for="(error, index) in v$.address.$errors" :key="index" class="mt-1 text-danger">
                                    <span v-if="error.$validator == 'minLength'" class="error">
                                        El campo debe contener al menos 3 caracteres
                                    </span>
                                </div>
                            </template>
                        </div>
                        <div class="mt-3">
                            <FormLabel htmlFor="name">Descripcion</FormLabel>
                            <FormTextarea placeholder="Ingrese una descripcion" :class="{
                                'border-danger': v$.description.$error,
                            }" v-model.trim="v$.description.$model" @blur="v$.description.$touch" />
                            <template v-if="v$.description.$error">
                                <div v-for="(error, index) in v$.description.$errors" :key="index" class="mt-1 text-danger">
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