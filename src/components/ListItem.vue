<script setup>
import List from "./List.vue";

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  value: {
    type: [String, Object],
    required: true
  },
  depth: {
    type: Number,
    required: false
  }
})

const isObject = (value) => {
  if (typeof value === 'object') {
    return true
  } else {
    return false
  }
}

</script>

<template>
  <div v-if="!isObject(value)" class="flex justify-content-between">
    <span class="mr-2 font-bold" :class="`ml-${depth*2}`">{{ name }}:</span>
    <span class="text-right">{{ value }}</span>
  </div>
  <template v-else>
    <div :class="`ml-${depth * 2} font-bold`">{{name}}</div>
    <List :listItems="value"></List>
    <!-- Above is recursive call to List component to display nested object key/value pairs -->
  </template>
</template>