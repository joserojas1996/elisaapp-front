<script setup lang="ts">
import { computed, reactive, ref, watch } from "vue";
import { FormInput, FormLabel, FormTextarea, } from "../../../base-components/Form";
import { Slideover } from "../../../base-components/Headless";
import Lucide from "../../../base-components/Lucide";
import Button from "../../../base-components/Button";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { rolesStore } from "../../../stores/Roles/index";
import LoadingIcon from "../../../base-components/LoadingIcon"
import { core } from "../../../services/pluginInit";
import { paysheetStore } from "../../../stores/Paysheets";

const formData = reactive({
    id: null,
    name: '',
    description: '',
});

const openOverlay = ref(false);
const store = paysheetStore();
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
const emit = defineEmits(['refresh', 'close'])

watch(props, (newValue, oldValue) => {
    if (props.data?.id) {
        const { id, name, description } = props.data
        formData.id = id
        formData.name = name
        formData.description = description
    } else {
        reset()
    }
})

const closeForm = () => {
    openOverlay.value = false
    emit('close');
};

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(3) },
        description: { minLength: minLength(3) },
    }
});

const v$ = useVuelidate(rules, formData);
const saveFormData = async () => {
    v$.value.$touch();
    if (v$.value.$invalid)
        return;

    try {
        const response: any = await store.store(formData);
        if (response?.status == 201 || response?.status == 200) {
            core.showSnackbar("success", formData.id ? 'Nomina actualizada con exito' : 'Nomina agregada con exito');
            emit('refresh');
            closeForm()
        }
    } catch (error) {
        console.log(error);
    }
};

const reset = () => {
    formData.id = null
    formData.name = ''
    formData.description = ''
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
                        {{ formData.id ? 'Actualizar nomina' : 'Agregar nueva nomina' }}
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
                            <FormLabel htmlFor="name">Descripción</FormLabel>
                            <FormTextarea id="name" placeholder="Ingrese una descripcion" :class="{
                                'border-danger': v$.description.$error,
                            }" v-model.trim="v$.description.$model" @blur="v$.description.$touch" />
                            <template v-if="v$.description.$error">
                                <div v-for="(error, index) in v$.description.$errors" :key="index" class="mt-1 text-danger">
                                    <span v-if="error.$validator == 'required'" class="error">
                                        El campo es requerido
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
                    <Button variant="outline-secondary" type="button" @click="emit('close')" class="w-20 mr-2">
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" class="w-20" @click="saveFormData()" :disabled="store.isLoading">
                        <LoadingIcon color="white" v-if="store.isLoading" icon="tail-spin" class="mr-1" />{{ store.isLoading ? "" :
                            "Guardar" }}
                    </Button>
                </Slideover.Footer>
            </Slideover.Panel>
            <!-- END: Slide Over Footer -->
        </Slideover>
    </form>
</template>