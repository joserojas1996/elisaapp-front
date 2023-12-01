<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { FormInput, FormLabel, FormTextarea, } from "../../../base-components/Form";
import { Slideover } from "../../../base-components/Headless";
import Lucide from "../../../base-components/Lucide";
import TomSelect from "../../../base-components/TomSelect"
import Button from "../../../base-components/Button";
import { permissionsStore } from "../../../stores/Permissions";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import Toastify from "toastify-js";
import Notification from "../../../base-components/Notification";
import { rolesStore } from "../../../stores/Roles/index";
import LoadingIcon from "../../../base-components/LoadingIcon"
import { toolsStore } from "../../../stores/Tools";
import { core } from "../../../services/pluginInit";
import { departamentsStore } from "../../../stores/Departaments";

const formData = reactive({
    id: null,
    name: '',
    municipality: "",
    address: ''
});

const headerFooterSlideoverPreview = ref(false);
const props = defineProps({
    'open': {
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
const emit = defineEmits(['refresh', 'close'])

onMounted(async () => {
    await toolsStore().municipality()
});

watch(props, (newValue, oldValue) => {
    console.log(props.data)
    if (props.data?.id) {
        const { id, name, municipality, address } = props.data
        formData.id = id
        formData.name = name
        formData.municipality = municipality.id
        formData.address = address
    } else {
        reset()
    }
})

const closeForm = () => {
    headerFooterSlideoverPreview.value = false
    emit('close');
};

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(3) },
        municipality: { required, minLength: minLength(1) },
        address: { minLength: minLength(3) },
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
        const response: any = await departamentsStore().store(formData);
        if (response?.status == 201 || response?.status == 200) {
            core.showSnackbar("success", formData.id ? 'Departamento actualizado con exito' : 'Departamento agregado con exito');
            emit('refresh');
            closeForm()
        }
    } catch (error) {
        console.log(error);
    } finally {
        isLoading.value = false
    }
};

const reset = () => {
    formData.id = null
    formData.name = ''
    formData.address = ''
    formData.municipality = ""
};

</script>
<template>
    <form class="validate-form" @submit.prevent="saveFormData" :model="formData" ref="formRef">
        <Slideover backdrop="static" :open="$props.open" @close="() => { }">
            <!-- BEGIN: Slide Over Header -->
            <Slideover.Panel>
                <a @click="emit('close')" class="absolute top-0 left-0 right-auto mt-4 -ml-12" href="#">
                    <Lucide icon="X" class="w-8 h-8 text-slate-400" />
                </a>
                <Slideover.Title>
                    <h2 class="mr-auto text-base font-medium">
                        {{ formData.id ? 'Actualizar departamento' : 'Agregar nuevo departamento' }}
                    </h2>
                </Slideover.Title>
                <!-- END: Slide Over Header -->
                <!-- BEGIN: Slide Over Body -->
                <Slideover.Description>
                    <div>
                        <div>
                            <FormLabel htmlFor="name">Nombre</FormLabel>
                            <FormInput id="name" type="text" placeholder="Ingrese un nombre" :class="{
                                'border-danger': v$.name.$error,
                            }" v-model.trim="v$.name.$model" @blur="v$.name.$touch" />
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
                            <FormLabel> Municipio</FormLabel>
                            <TomSelect :value="formData.municipality" v-model.trim="v$.municipality.$model" @blur="v$.municipality.$touch"
                                :options="{ placeholder: 'Seleccionar', }"
                                :class="{ 'border-danger': v$.municipality.$error }">
                                <option v-for="value in toolsStore().getMunicipalities.data" :value="value.id"
                                    :key="value.id">
                                    {{ value.name }}
                                </option>
                            </TomSelect>

                            <template v-if="v$.municipality.$error">
                                <div v-for="(error, index) in v$.municipality.$errors" :key="index"
                                    class="mt-1 text-danger">
                                    <span v-if="error.$validator == 'required'" class="error">
                                        El campo es requerido
                                    </span>
                                    <span v-if="error.$validator == 'minLength'" class="error">
                                        Debe seleccionar al menos 1 elemento
                                    </span>
                                </div>
                            </template>
                        </div>

                        <div class="mt-3">
                            <FormLabel htmlFor="name">Direccion</FormLabel>
                            <FormTextarea id="name" placeholder="Ingrese una direccion" :class="{
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
                    </div>
                </Slideover.Description>
                <!-- END: Slide Over Body -->
                <!-- BEGIN: Slide Over Footer -->
                <Slideover.Footer>
                    <Button variant="outline-secondary" type="button" @click="emit('close')" class="w-20 mr-2">
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" class="w-20" @click="saveFormData()"
                        :disabled="departamentsStore().isLoading">
                        <LoadingIcon color="white" v-if="departamentsStore().isLoading" icon="tail-spin" class="mr-1" />{{
                            departamentsStore().isLoading ? "" :
                            "Guardar" }}
                    </Button>
                </Slideover.Footer>
            </Slideover.Panel>
            <!-- END: Slide Over Footer -->
        </Slideover>
    </form>
</template>