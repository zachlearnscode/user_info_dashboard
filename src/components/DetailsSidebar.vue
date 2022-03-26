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
</script>

<template>
  <Sidebar
    v-model:visible="modelValue"
    @hide="$emit('update:modelValue', false)"
    dismissable
    position="right"
    class="p-sidebar-right p-sidebar-lg"
  >
    <!-- <h2 class="p-card-title">User Details</h2> -->
    <div class="p-card-content">
      <UserDetailsCard v-for="user in userData" :key="user.id" :user="user"></UserDetailsCard>
    </div>
  </Sidebar>
</template>