<script setup>
import UserDetailsForm from "./UserDetailsForm.vue";

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  modelValue: {
    type: Boolean,
    required: true
  },
  form: {
    type: String,
    required: true
  },
  formData: {
    type: Object,
    required: false
  }
})
</script>

<template>
  <Dialog
    modal
    dismissableMask
    closeOnEscape
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '50vw' }"
    v-model:visible="modelValue"
    @hide="$emit('update:modelValue', false)"
  >
    <template #header>
      <div class="flex-column">
        <h3>{{ title }}</h3>
        <p class="my-0">Fields marked with * are required</p>
      </div>
    </template>

      <UserDetailsForm v-if="form === 'addUser'">
        <!-- TODO: Require events to emit -->
      </UserDetailsForm>
      <UserDetailsForm v-else-if="form = 'editUser'" :formData="formData" @cancel="$emit('cancel')"></UserDetailsForm>

  </Dialog>
</template>
