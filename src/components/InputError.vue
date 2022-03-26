<script setup>
  const props = defineProps({
    name: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <small class="p-error">{{`${name} is invalid.`}}</small>
</template>