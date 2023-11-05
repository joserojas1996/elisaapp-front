<script setup lang="ts">
import { FormInput, FormSelect, FormLabel, FormSwitch } from "../../../base-components/Form";

</script>
<template>
    <div>
        <div>
            <FormLabel htmlFor="modal-form-1">Nombres</FormLabel>
            <FormInput id="modal-form-1" type="text" placeholder="example@gmail.com" />
        </div>
        <div class="mt-3">
            <FormLabel htmlFor="modal-form-2">Apellidos</FormLabel>
            <FormInput id="modal-form-2" type="text" placeholder="example@gmail.com" />
        </div>
        <div class="mt-3">
            <FormLabel htmlFor="modal-form-3">Nombre de usuario </FormLabel>
            <FormInput id="modal-form-3" type="text" placeholder="Important Meeting" />
        </div>
        <div class="mt-3">
            <FormLabel htmlFor="modal-form-4">Correo electronico </FormLabel>
            <FormInput id="modal-form-3" type="text" placeholder="Important Meeting" />
        </div>
        <div class="mt-3">
            <FormLabel htmlFor="modal-form-5">Contrasena </FormLabel>
            <FormInput id="modal-form-3" type="text" placeholder="Important Meeting" />
        </div>
        <div class="mt-3">
            <FormLabel htmlFor="modal-form-5">Confirmar contrasena </FormLabel>
            <FormInput id="modal-form-3" type="text" placeholder="Important Meeting" />
        </div>
        <div class="mt-3">
            <FormLabel htmlFor="modal-form-6"> Rol </FormLabel>
            <FormSelect id="modal-form-6">
                <option>10</option>
                <option>25</option>
                <option>35</option>
                <option>50</option>
            </FormSelect>
        </div>
        <div class="mt-3">
            <label>Estado</label>
            <div class="mt-2">
                <FormSwitch>
                    <FormSwitch.Input id="checkbox-switch-7" type="checkbox" />
                    <FormSwitch.Label htmlFor="checkbox-switch-7">
                        Usuario deshabilitado
                    </FormSwitch.Label>
                </FormSwitch>
            </div>
        </div>
    </div>
</template>