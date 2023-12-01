  <script lang="ts">
import { defineComponent } from 'vue';

  export default defineComponent({
    name: "AddRolNotification",
  });
  </script>
<template>
    <Notification id="add-rol-notification" class="flex hidden">
      <Lucide icon="CheckCircle" class="text-success" />
      <div class="ml-4 mr-4">
        <div class="font-medium">Excelente!</div>
        <div class="mt-1 text-slate-500">Rol agregado exitosamente.</div>
      </div>
    </Notification>
  </template>
  