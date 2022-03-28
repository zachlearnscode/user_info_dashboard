<script setup>
import { useMq } from "vue3-mq";
const mq = useMq();

const props = defineProps({
  disableButtons: Boolean
})



</script>

<template>
  <div class="flex align-items-center justify-content-between sticky top-0">
    <div class="flex align-items-center">
      <h2 class="mr-2">Users</h2>
      <Button :label="mq.mdPlus ? 'Add User' : ''" icon="pi pi-user-plus" class="p-button-success mx-1" @click="$emit('openAddUserDialog')" />
      <Button
        :label="mq.mdPlus ? 'View/Edit Details' : ''"
        icon="pi pi-info-circle"
        :disabled="disableButtons"
        class="p-button-info mx-1"
        @click="$emit('openDetailsSidebar')"
      />
    </div>

    <span v-if="mq.mdPlus" class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText type="text" v-model="value3" placeholder="Search" />
    </span>
    <Button v-else icon="pi pi-search" class="mx-1" />
  </div>
</template>