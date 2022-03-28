<script setup>
import { computed } from "vue";
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
  formType: {
    type: String,
    required: true
  },
  userData: {
    type: Object,
    required: false
  }
})

const emits = defineEmits(['userDetailsFormSubmitted']);

const formData = computed(() => {
  const u = props.userData;

  return {
    name: u.name,
    username: u.username,
    email: u.email,
    street: u.address.street,
    suite: u.address.suite,
    city: u.address.city,
    zip_code: u.address.zipcode,
    phone: u.phone,
    website: u.website,
    company_name: u.company.name,
    company_motto: u.company.catchPhrase
  }
})

const userID = computed(() => {
  return props.userData.id;
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

    <UserDetailsForm
      v-if="formType === 'addUser' || formType === 'editUser'"
      :formType="formType"
      :formData="formData"
      :userID="userID"
      @cancel="$emit('cancel')"
      @userDetailsFormSubmitted="$emit('userDetailsFormSubmitted', $event)"
    >
    </UserDetailsForm>
  </Dialog>
</template>
