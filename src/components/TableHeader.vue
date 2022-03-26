<script setup>
  const props = defineProps({
    disableButtons: Boolean
  })
</script>

<template>
  <div class="flex align-items-center justify-content-between">
    <div class="flex align-items-center">
      <h2 class="mr-2">Users</h2>
      <Button
        label="Add User"
        class="p-button-rounded p-button-success mx-1"
        @click="$emit('openAddUserDialog')"
      />
      <Button
        label="View/Edit Details"
        :disabled="disableButtons"
        class="p-button-rounded p-button-info mx-1"
        @click="$emit('openDetailsSidebar')"
      />
      <Button
        label="Delete User(s)"
        :disabled="disableButtons"
        class="p-button-rounded p-button-danger mx-1"
      />
    </div>

    <span class="p-input-icon-left">
      <i class="pi pi-search" />
      <InputText type="text" v-model="value3" placeholder="Search" />
    </span>
  </div>
</template>