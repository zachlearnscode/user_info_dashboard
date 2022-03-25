<script setup>
  import { computed } from "vue";

  const props = defineProps({
    validations: {
      type: Object,
      required: true
    },
    submitted: {
      type: Boolean,
      required: true
    },
    name: {
      type: String,
      required: true
    }
  })

  const invalid = computed(() => {
    return props.validations.$invalid;
  })
</script>

<template>
  <small v-if="invalid && submitted" class="p-error">{{`${v$.email.$path} is invalid.`}}</small>
</template>