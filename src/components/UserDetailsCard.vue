<script setup>
import { computed } from "vue";

const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const flattenEntries = (arr, parentProperties = []) => {
  let result = [];

  arr.forEach(entry => {
    let [key, value] = entry;
    if (typeof value !== 'object') {
      if (parentProperties.length) {
        result.push([...parentProperties, ...entry]);
      } else {
        result.push([...entry]);
      }
    } else {
      parentProperties.push(key);
      result.push(...flattenEntries(Object.entries(value), parentProperties));
      parentProperties = []
    }
  })

  return result;
}

const flattenedUserData = computed(() => {
  return flattenEntries(Object.entries(props.user));
})
</script>

<template>
<Card>
  <template #header>
    {{user.name}}
  </template>
  <template #content>
    <div v-for="(data, i) in flattenedUserData" :key="i" class="flex justify-content-between">
      <span :class="`ml-${2 * (data.length - 2)} mr-2`">{{data[data.length - 2]}}</span>
      <span :class="text-right">{{data[data.length - 1]}}</span>
    </div>
  </template>
</Card>
</template>