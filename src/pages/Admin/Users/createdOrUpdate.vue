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
import Toastify from "toastify-js";
import Notification from "../../../base-components/Notification";
import { rolesStore } from "../../../stores/Roles/index";
import LoadingIcon from "../../../base-components/LoadingIcon"
import { core } from "../../../services/pluginInit";
import { toolsStore } from "../../../stores/Tools";
import { usersStore } from "../../../stores/Users";

interface PermissionsInterfase {
    id: any,
    employee: string,
    role: string,
}

const formData = reactive({
    id: null,
    employee: '',
    role: '',
});

const headerFooterSlideoverPreview = ref(false);
const tools = toolsStore();
const users =usersStore()
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
    await tools.fetchEmployees()
    await tools.fetchRoles()
});

watch(props, (newValue, oldValue) => {

    if (props.data?.id) {
        const { id, employee, role} = props.data
        formData.id = id
        formData.employee = employee
        formData.role = role
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
        employee: { required, minLength: minLength(1) },
        role: { required, minLength: minLength(1) }
    }
});

const v$ = useVuelidate(rules, formData);

const saveFormData = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
        return;
    }

    try {
        const response: any = await users.store(formData);
        if (response?.status == 201) {
            core.showSnackbar("success", formData.id ? 'Usuario actualizado con exito' : 'Usuario agregado con exito');
            emit('refresh');
            closeForm()
        }
    } catch (error) {
        console.log(error);
    }
};

const reset = () => {
    formData.id = null
    formData.role = ''
    formData.employee = ''
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
                        {{ formData.id ? 'Actualizar usuario' : 'Agregar nuevo usuario' }}
                    </h2>
                </Slideover.Title>
                <!-- END: Slide Over Header -->
                <!-- BEGIN: Slide Over Body -->
                <Slideover.Description>
                    <div>
                        <div class="mt-3">
                            <FormLabel> Empleado </FormLabel>
                            <div>
                                <TomSelect :value="formData.employee" v-model.trim="v$.employee.$model"
                                    @blur="v$.employee.$touch" :options="{
                                        placeholder: 'Seleccionar',
                                    }" :class="{ 'border-danger': v$.employee.$error }">
                                    <option :value="value.id" v-for="value in tools.getEmployees"
                                        :key="value.id">{{ value.name }}</option>
                                </TomSelect>
                                <template v-if="v$.employee.$error">
                                    <div v-for="(error, index) in v$.employee.$errors" :key="index"
                                        class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'required'" class="error">
                                           Campo requeridos
                                        </span>
                                        <span v-if="error.$validator == 'minLength'" class="error">
                                            Debe seleccionar al menos 1 elemento
                                        </span>
                                    </div>
                                </template>

                            </div>
                        </div>

                        <div class="mt-3">
                            <FormLabel> Roles </FormLabel>
                            <div>
                                <TomSelect 
                                v-model.trim="v$.role.$model"
                                @blur="v$.role.$touch" 
                                    :value="formData.role"
                                    :options="{
                                        placeholder: 'Seleccionar',
                                    }"
                                    :class="{ 'border-danger': v$.role.$error }"
                                >
                                    <option :value="value.id" v-for="value in tools.getRoles"
                                        :key="value.name">{{ value.label }}</option>
                                </TomSelect>
                                <template v-if="v$.role.$error">
                                    <div v-for="(error, index) in v$.role.$errors" :key="index"
                                        class="mt-1 text-danger">
                                        <span v-if="error.$validator == 'required'" class="error">
                                           Campo requerido
                                        </span>
                                        <span v-if="error.$validator == 'minLength'" class="error">
                                            Debe seleccionar al menos 1 elemento
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
                    <Button variant="primary" type="submit" class="w-20" @click="saveFormData()" :disabled="users.isLoading">
                        <LoadingIcon color="white" v-if="users.isLoading" icon="tail-spin" class="mr-1" />{{ users.isLoading ? "" :
                            "Guardar" }}
                    </Button>
                </Slideover.Footer>
            </Slideover.Panel>
            <!-- END: Slide Over Footer -->
        </Slideover>
    </form>
</template>