<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { FormInput, FormLabel, FormTextarea, } from "../../../base-components/Form";
import { Slideover } from "../../../base-components/Headless";
import Lucide from "../../../base-components/Lucide";
import Button from "../../../base-components/Button";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import Toastify from "toastify-js";
import Notification from "../../../base-components/Notification";
import LoadingIcon from "../../../base-components/LoadingIcon"
import { chargesStore } from "../../../stores/Charges";
import { core } from "../../../services/pluginInit";

interface FormDataInterfase {
    id: any,
    name: string,
    vacant: number,
    description: string
}

const formData: FormDataInterfase = reactive({
    id: null,
    name: '',
    vacant: 0,
    description: '',
});

const showOverload = ref(false);

const store = chargesStore();

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
        const { id, name, vacant, description } = props.data
        formData.id = id
        formData.name = name
        formData.vacant = parseInt(vacant)
        formData.description = description
    } else {
        reset()
    }
})

const closeForm = () => {
    showOverload.value = false
    emit('close');
};

const rules = computed(() => {
    return {
        name: { required, minLength: minLength(3) },
        vacant: { required },
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
        if (response?.status == 201 || response?.status == 200 )
            core.showSnackbar("success", formData.id ? 'Cargo actualizado con exito' : 'Cargo agregado con exito');
    } catch (error) {
        console.log(error);
    } finally {
        emit('refresh');
        closeForm()

    }
};

const reset = () => {
    formData.id = null
    formData.name = ''
    formData.vacant = 0
    formData.description = ''
};

const countVacant = (value: any) => {
    if (value == 1)
        formData.vacant = formData.vacant + 1

    if (value == 2)
        formData.vacant = formData.vacant - 1
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
                        {{ formData.id ? 'Actualizar cargo' : 'Agregar nuevo cargo' }}
                    </h2>
                </Slideover.Title>

                <Slideover.Description>
                    <div>
                        <div>
                            <FormLabel htmlFor="name">Nombres</FormLabel>
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
                            <FormLabel htmlFor="vacant">Vacantes</FormLabel>

                            <div class="grid grid-cols-12 gap-2">
                                <Button class="col-span-2" variant="outline-secondary" type="button"
                                    @click="countVacant(1)"> + </Button>

                                <FormInput :min="1" class="col-span-8 text-center" id="vacant" type="number" placeholder="0"
                                    :class="{
                                        'border-danger': v$.vacant.$error,
                                    }" v-model.trim="v$.vacant.$model" @blur="v$.vacant.$touch" />

                                <Button :disabled="formData.vacant == 0" class="col-span-2" variant="outline-secondary"
                                    type="button" @click="countVacant(2)"> - </Button>
                            </div>
                            <template v-if="v$.vacant.$error">
                                <div v-for="(error, index) in v$.vacant.$errors" :key="index" class="mt-1 text-danger">
                                    <span v-if="error.$validator == 'required'" class="error">
                                        El campo es requerido
                                    </span>
                                </div>
                            </template>
                        </div>
                        <div class="mt-3">
                            <FormLabel htmlFor="description">Descripcion</FormLabel>
                            <FormTextarea id="description" placeholder="Ingrese una descripcion" :class="{
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

                <Slideover.Footer>
                    <Button variant="outline-secondary" type="button" @click="emit('close')" class="w-20 mr-2">
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit" class="w-20" @click="saveFormData()"
                        :disabled="store.isLoading">
                        <LoadingIcon color="white" v-if="store.isLoading" icon="tail-spin" class="mr-1" />{{ store.isLoading
                            ? "" :
                            "Guardar" }}
                    </Button>
                </Slideover.Footer>
            </Slideover.Panel>
            <!-- END: Slide Over Footer -->
            <Notification id="add-rol-notification" class="flex hidden">
                <Lucide icon="CheckCircle" class="text-success" />
                <div class="ml-4 mr-4">
                    <div class="font-medium">Exelente!</div>
                    <div class="mt-1 text-slate-500">Cargo agregado exitosamente.</div>
                </div>
            </Notification>
        </Slideover>
    </form>
</template>