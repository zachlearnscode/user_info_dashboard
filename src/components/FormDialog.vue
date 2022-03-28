<script setup>
import { ref, computed } from "vue";
import UserDetailsForm from "./UserDetailsForm.vue";
import { useMq } from "vue3-mq";
const mq = useMq();

const formDialog = ref();

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

const emits = defineEmits(['userDetailsFormSubmitted', 'cancel']);

const formData = computed(() => {
  if (props.userData) {
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
  }

  return null;
})

const userID = computed(() => {
  if (props.userData) {
    return props.userData.id;
  }

  return null;
})

// Unfortunately, PrimeVue dialogs don't have a fullscreen property.
// This is kind of a hacky workaround to make dialog full screen below md breakpoint.
const evaluateMaximize = () => {
  if (!mq.mdPlus) {
    formDialog.value.maximize();
  }
}
</script>

<template>
  <Dialog
    modal
    dismissableMask
    closeOnEscape
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '50vw' }"
    v-model:visible="modelValue"
    @show="evaluateMaximize"
    @hide="[$emit('update:modelValue', false), formDialog.maximized = false]"
    @unmaximize="formDialog.maximized = false"
    maximizable
    ref="formDialog"
    class="fadeindown"
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
    ></UserDetailsForm>
  </Dialog>
</template>
