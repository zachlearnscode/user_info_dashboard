<script setup>
import { computed } from "vue";
import UserDetailsCard from "./UserDetailsCard.vue";

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userData: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['userDetailsFormSubmitted', 'deleteUser']);
</script>

<template>
  <Sidebar
    v-model:visible="modelValue"
    @hide="$emit('update:modelValue', false)"
    dismissable
    position="right"
    class="p-sidebar-right p-sidebar-md"
  >
    <div class="p-card-content">
      <UserDetailsCard
        v-for="user in userData"
        :key="user.id"
        :user="user"
        @userDetailsFormSubmitted="$emit('userDetailsFormSubmitted', $event)"
        @deleteUser="$emit('deleteUser', $event)"
      ></UserDetailsCard>
    </div>
  </Sidebar>
</template>