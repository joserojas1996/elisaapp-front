<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from "vue";
import { FormInput, FormLabel, FormTextarea, } from "../../../base-components/Form";
import { Slideover } from "../../../base-components/Headless";
import Lucide from "../../../base-components/Lucide";
import TomSelect from "../../../base-components/TomSelect"
import Button from "../../../base-components/Button";
import useVuelidate from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import LoadingIcon from "../../../base-components/LoadingIcon"
import { employeesStore } from "../../../stores/Employees";
import { core } from "../../../services/pluginInit";
import Litepicker from "../../../base-components/Litepicker";
import { toolsStore } from "../../../stores/Tools";

const formData = reactive({
    id: null,
    firstname: '',
    lastname: '',
    identity: '',
    phone: '',
    gender: '',
    birstday: '',
    address: '',
    providence: '',
    start_date: '',
    finish_date: '',
    charge: '',
    paysheet: '',
    departament: '',
});

const optionsLitepicker = ref({
    autoApply: true,
    showWeekNumbers: false,
    format: 'YYYY-MM-DD',
    lang: 'en-GB',
    dropdowns: {
        minYear: 2019,
        maxYear: new Date().getFullYear(),
        months: true,
        years: true,
    },
})

const optionsTomSelect = ref({
    placeholder: "Seleccionar"
})

const headerFooterSlideoverPreview = ref(false);
const tools = toolsStore();
const store = employeesStore();
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


onMounted(async () => {
    await tools.fetchCharge()
    await tools.fetchPaysheet()
    await tools.fetchDepartament()
});

watch(props, (newValue, oldValue) => {
    if (props.data?.id) {
        const { id, firstname, lastname, identity } = props.data
        formData.id = id
        formData.identity = identity
        formData.firstname = firstname
        formData.lastname = lastname
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
        identity: { required },
        firstname: { required },
        lastname: { required },
        phone: { minLength: minLength(10) },
        gender: { required },
        birstday: { required },
        address: { minLength: minLength(3) },
        providence: { minLength: minLength(3) },
        start_date: { required },
        finish_date: { minLength: minLength(1) },
        charge: { required },
        paysheet: { required },
        departament: { required },
    }
});

const v$ = useVuelidate(rules, formData);

const saveFormData = async () => {
    v$.value.$touch();
    if (v$.value.$invalid)
        return;

    try {
        const response: any = await store.store(formData);
        if (response?.status == 201) {
            core.showSnackbar("success", formData.id ? 'Empleado actualizado con exito' : 'Empleado agregado con exito');
            emit('refresh');
            closeForm()
        }
    } catch (error) {
        console.log(error);
    }
};

const reset = () => {
    formData.id = null
    formData.firstname = ''
    formData.lastname = ''
    formData.identity = ''
    formData.phone = ''
    formData.gender = ''
    formData.birstday = ''
    formData.address = ''
    formData.providence = ''
    formData.start_date = ''
    formData.finish_date = ''
    formData.charge = ''
    formData.paysheet = ''
    formData.departament = ''
};

</script>
<template>
    <form class="validate-form" @submit.prevent="saveFormData" :model="formData" ref="formRef">
        <Slideover size="lg" backdrop="static" :open="$props.open" @close="() => { }">
            <!-- BEGIN: Slide Over Header -->
            <Slideover.Panel>
                <a @click="emit('close')" class="absolute top-0 left-0 right-auto mt-4 -ml-12" href="#">
                    <Lucide icon="X" class="w-8 h-8 text-slate-400" />
                </a>
                <Slideover.Title>
                    <h2 class="mr-auto text-base font-medium">
                        {{ formData.id ? 'Actualizar empleado' : 'Agregar nuevo empleado' }}
                    </h2>
                </Slideover.Title>
                <!-- END: Slide Over Header -->
                <!-- BEGIN: Slide Over Body -->
                <Slideover.Description>
                    <div>
                        <div class="with-text mb-3">
                            Datos Personales
                        </div>
                        <div class="grid grid-cols-12 gap-2">
                            <div class="col-span-6">
                                <FormLabel htmlFor="name">Cedúla</FormLabel>
                                <FormInput id="name" type="text" placeholder="Cedúla de identidad" :class="{
                                    'border-danger': v$.identity.$error,
                                }" v-model.trim="v$.identity.$model" @blur="v$.identity.$touch" />
                                <template v-if="v$.identity.$error">
                                    <div v-for="(error, index) in v$.identity.$errors" :key="index"
                                        class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'required'" class="error">
                                            El campo es requerido
                                        </span>
                                    </div>
                                </template>
                            </div>
                            <div class="col-span-6">
                                <FormLabel htmlFor="name">Fecha de nac.</FormLabel>
                                <Litepicker :class="{
                                    'border-danger': v$.birstday.$error,
                                }" v-model.trim="v$.birstday.$model" @blur="v$.birstday.$touch"
                                    :options="optionsLitepicker" />
                                <template v-if="v$.birstday.$error">
                                    <div v-for="(error, index) in v$.birstday.$errors" :key="index"
                                        class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'required'" class="error">
                                            El campo es requerido
                                        </span>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div class="mt-3">

                            <div class="grid grid-cols-12 gap-2">
                                <div class="col-span-6">
                                    <FormLabel htmlFor="name">Nombres</FormLabel>
                                    <FormInput id="name" type="text" placeholder="Ingrese sus nombres" :class="{
                                        'border-danger': v$.firstname.$error,
                                    }" v-model.trim="v$.firstname.$model" @blur="v$.firstname.$touch" />
                                    <template v-if="v$.firstname.$error">
                                        <div v-for="(error, index) in v$.firstname.$errors" :key="index"
                                            class="mt-1 text-danger">
                                            <span v-if="error.$validator == 'required'" class="error">
                                                El campo es requerido
                                            </span>
                                        </div>
                                    </template>
                                </div>

                                <div class="col-span-6">
                                    <FormLabel htmlFor="name">Apellidos</FormLabel>
                                    <FormInput id="name" type="text" placeholder="Ingrese sus apellidos" :class="{
                                        'border-danger': v$.lastname.$error,
                                    }" v-model.trim="v$.lastname.$model" @blur="v$.lastname.$touch" />
                                    <template v-if="v$.lastname.$error">
                                        <div v-for="(error, index) in v$.lastname.$errors" :key="index"
                                            class="mt-1 text-danger">
                                            <span v-if="error.$validator == 'required'" class="error">
                                                El campo es requerido
                                            </span>
                                        </div>
                                    </template>
                                </div>

                            </div>
                        </div>

                        <div class="grid grid-cols-12 gap-2 mt-3">
                            <div class="col-span-6">
                                <FormLabel htmlFor="name">Teléfono</FormLabel>
                                <FormInput id="name" type="text" placeholder="Telefono" :class="{
                                    'border-danger': v$.phone.$error,
                                }" v-model.trim="v$.phone.$model" @blur="v$.phone.$touch" />
                                <template v-if="v$.phone.$error">
                                    <div v-for="(error, index) in v$.phone.$errors" :key="index" class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'minLength'" class="error">
                                            El campo debe contener al menos 10 caracteres
                                        </span>
                                    </div>
                                </template>
                            </div>
                            <div class="col-span-6">
                                <FormLabel htmlFor="name">Género</FormLabel>
                                <TomSelect :class="{
                                    'border-danger': v$.gender.$error,
                                }" v-model.trim="v$.gender.$model" :value="formData.gender" @blur="v$.gender.$touch"
                                    :options="optionsTomSelect" class="w-full">
                                    <option value="female">Femenina</option>
                                    <option value="male">Masculino</option>
                                    <option value="other">Otros</option>
                                </TomSelect>
                                <template v-if="v$.gender.$error">
                                    <div v-for="(error, index) in v$.gender.$errors" :key="index" class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'required'" class="error">
                                            El campo es requerido
                                        </span>
                                    </div>
                                </template>
                            </div>
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

                        <div class="with-text mt-5">
                            Datos laborales
                        </div>

                        <div class="grid grid-cols-12 gap-2 mt-3">
                            <div class="col-span-6">
                                <FormLabel htmlFor="name">Fecha de inicio.</FormLabel>
                                <Litepicker :class="{
                                    'border-danger': v$.start_date.$error,
                                }" v-model.trim="v$.start_date.$model" @blur="v$.start_date.$touch"
                                    :options="optionsLitepicker" />
                                <template v-if="v$.start_date.$error">
                                    <div v-for="(error, index) in v$.start_date.$errors" :key="index"
                                        class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'required'" class="error">
                                            El campo es requerido
                                        </span>
                                    </div>
                                </template>
                            </div>
                            <div class="col-span-6">
                                <FormLabel htmlFor="name">Fecha de fin.</FormLabel>
                                <Litepicker :class="{
                                    'border-danger': v$.finish_date.$error,
                                }" v-model.trim="v$.finish_date.$model" @blur="v$.finish_date.$touch"
                                    :options="optionsLitepicker" />
                                <template v-if="v$.finish_date.$error">
                                    <div v-for="(error, index) in v$.finish_date.$errors" :key="index"
                                        class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'minLength'" class="error">
                                            El campo debe contener al menos 3 caracteres
                                        </span>
                                    </div>
                                </template>
                            </div>
                        </div>

                        <div class="mt-3">

                            <div class="grid grid-cols-12 gap-2">
                                <div class="col-span-6">
                                    <FormLabel htmlFor="name">Cargo</FormLabel>
                                    <TomSelect :class="{ 'border-danger': v$.charge.$error }"
                                        v-model.trim="v$.charge.$model" @blur="v$.charge.$touch" class="w-full"
                                        :options="optionsTomSelect">
                                        <option v-for="value in tools.getCharges" :key="value.id" :value="value.id">
                                            {{ value.name }}
                                        </option>
                                    </TomSelect>
                                    <template v-if="v$.charge.$error">
                                        <div v-for="(error, index) in v$.charge.$errors" :key="index"
                                            class="mt-1 text-danger">
                                            <span v-if="error.$validator == 'required'" class="error">
                                                El campo es requerido
                                            </span>
                                        </div>
                                    </template>
                                </div>

                                <div class="col-span-6">
                                    <FormLabel htmlFor="name">Nomina</FormLabel>
                                    <TomSelect :class="{
                                        'border-danger': v$.paysheet.$error,
                                    }" v-model.trim="v$.paysheet.$model" @blur="v$.paysheet.$touch" class="w-full"
                                        :options="optionsTomSelect">
                                        <option v-for="value in tools.getPaysheets" :key="value.id" :value="value.id">
                                            {{ value.name }}
                                        </option>
                                    </TomSelect>
                                    <template v-if="v$.paysheet.$error">
                                        <div v-for="(error, index) in v$.paysheet.$errors" :key="index"
                                            class="mt-1 text-danger">
                                            <span v-if="error.$validator == 'required'" class="error">
                                                El campo es requerido
                                            </span>
                                        </div>
                                    </template>
                                </div>

                            </div>
                        </div>

                        <div class="grid grid-cols-12 gap-2 mt-3">
                            <div class="col-span-6">
                                <FormLabel htmlFor="name">Departamento</FormLabel>
                                <TomSelect :class="{
                                    'border-danger': v$.departament.$error,
                                }" v-model.trim="v$.departament.$model" @blur="v$.departament.$touch" class="w-full"
                                    :options="optionsTomSelect">
                                    <option v-for="value in tools.getDepartaments" :key="value.id" :value="value.id">
                                        {{ value.name }}
                                    </option>
                                </TomSelect>
                                <template v-if="v$.departament.$error">
                                    <div v-for="(error, index) in v$.departament.$errors" :key="index"
                                        class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'required'" class="error">
                                            El campo es requerido
                                        </span>
                                    </div>
                                </template>
                            </div>
                            <div class="col-span-6">
                                <FormLabel htmlFor="name">Providencia</FormLabel>
                                <FormInput id="name" type="text" placeholder="Numero de providencia" :class="{
                                    'border-danger': v$.providence.$error,
                                }" v-model.trim="v$.providence.$model" @blur="v$.providence.$touch" />
                                <template v-if="v$.providence.$error">
                                    <div v-for="(error, index) in v$.providence.$errors" :key="index"
                                        class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'minLength'" class="error">
                                            El campo debe contener al menos 3 caracteres
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
        </Slideover>
    </form>
</template>

<style scoped>
/* Estilo para el contenedor que incluye texto y línea horizontal */
.with-text {
    display: flex;
    align-items: center;
    color: #afaeae;
}

/* Estilo para la línea horizontal después del texto */
.with-text::after {
    content: "";
    flex: 1;
    margin-left: 10px;
    /* Espaciado opcional entre el texto y la línea horizontal */
    border-top: 1px solid #afaeae;
    /* Establecer el estilo de la línea horizontal */
}
</style>