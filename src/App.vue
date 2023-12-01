<template>
  <RouterView />

  <Notification id="notification-manager" class="flex hidden">
    <Lucide id="notification-manager-icon" icon="Circle" class="text-success" />
    <div class="ml-4 mr-4">
      <div class="font-medium" id="notification-manager-title"></div>
      <div class="mt-1 text-slate-500" id="notification-manager-description"></div>
    </div>
  </Notification>
</template>
<script setup lang="ts">
import Lucide from "./base-components/Lucide";
import Notification from "./base-components/Notification";

</script>
