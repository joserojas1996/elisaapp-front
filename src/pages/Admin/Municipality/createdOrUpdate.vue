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
import { rolesStore } from "../../../stores/Roles/index";
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
    label: '',
    permissions: '',
});

const headerFooterSlideoverPreview = ref(false);
const store = permissionsStore();
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

onMounted(async () => {
    await permissionsStore().index()
});

watch(props, (newValue, oldValue) => {
    onEdit()
    if (props.data?.id) {
        const { id, name, label, permissions } = props.data
        formData.id = id
        formData.name = name
        formData.label = label
        formData.permissions = permissions.map((obj: PermissionsInterfase) => obj.name)
    }
})

const onEdit = () => {
    reset()
    headerFooterSlideoverPreview.value = !headerFooterSlideoverPreview.value
};

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(3) },
        label: { required, minLength: minLength(3) },
        permissions: { required, minLength: minLength(1) },
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
        const response: any = await rolesStore().store(formData);
        console.log(response)
        if (response?.status == 201) {
            core.showSnackbar("success", response.data.message);
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
    if (formData.label.length > 0) {
        formData.name = formData.label
            .replace(/ /g, "-")
            .replace(/[^a-zA-Z0-9-]/g, "")
            .toLowerCase();
    } else {
        formData.name = ''
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
                            <FormInput id="modal-form-1" type="text" placeholder="Ingrese un nombre" :class="{
                                'border-danger': v$.label.$error,
                            }" v-model.trim="v$.label.$model" @blur="v$.label.$touch" @keyup="toSlug()" />
                            <template v-if="v$.label.$error">
                                <div v-for="(error, index) in v$.label.$errors" :key="index" class="mt-1 text-danger">
                                    <span v-if="error.$validator == 'required'" class="error">
                                        El nombre es requerido
                                    </span>
                                    <span v-if="error.$validator == 'minLength'" class="error">
                                        El nombre debe contener al menos 3 caracteres
                                    </span>
                                </div>
                            </template>

                        </div>
                        <div class="mt-3">
                            <FormLabel htmlFor="modal-form-2">Slug</FormLabel>
                            <FormInput id="modal-form-2" type="text" placeholder="Ingrese un slug" :class="{
                                'border-danger': v$.name.$error,
                            }" v-model.trim="v$.name.$model" @blur="v$.name.$touch" />
                            <template v-if="v$.name.$error">
                                <div v-for="(error, index) in v$.name.$errors" :key="index" class="mt-1 text-danger">
                                    <span v-if="error.$validator == 'required'" class="error">
                                        El Slug es requerido
                                    </span>
                                    <span v-if="error.$validator == 'minLength'" class="error">
                                        El Slug debe contener al menos 3 caracteres
                                    </span>
                                </div>
                            </template>
                        </div>
                        <div class="mt-3">
                            <FormLabel> Permisos </FormLabel>
                            <div>
                                <TomSelect :value="formData.permissions" v-model.trim="v$.permissions.$model"
                                    @blur="v$.permissions.$touch" :options="{
                                        placeholder: 'Seleccionar',
                                        plugins: {
                                            'checkbox_options': {
                                                'checkedClassNames': ['ts-checked'],
                                                'uncheckedClassNames': ['ts-unchecked'],
                                            },
                                        },
                                    }" multiple :class="{ 'border-danger': v$.permissions.$error }">
                                    <option :value="value.name" v-for="value in store.getPermissions.data"
                                        :key="value.name">{{ value.label }}</option>
                                </TomSelect>
                                <template v-if="v$.permissions.$error">
                                    <div v-for="(error, index) in v$.permissions.$errors" :key="index"
                                        class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'required'" class="error">
                                            Los permisos son requeridos
                                        </span>
                                        <span v-if="error.$validator == 'minLength'" class="error">
                                            Debe seleccionar al menos 1 permiso
                                        </span>
                                    </div>
                                </template>

                            </div>
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