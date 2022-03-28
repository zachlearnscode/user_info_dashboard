<script setup>
import { computed } from "vue";
import ListItem from "./ListItem.vue";

const props = defineProps({
  listItems: {
    type: Object,
    required: true
  }
})

// filteredListItems removes id, name and depth key/values from prop listItems so they won't be displayed in the list.
const filteredListItems = computed(() => {
  const entries = Object.entries(props.listItems);
  
  const filteredEntries = entries.filter(item => {
    const [key, value] = item;
    return key !== 'id' && key !== 'name' && key !== 'depth'
  })

  return Object.fromEntries(filteredEntries);
})

</script>

<template>
  <ListItem
    v-for="(value, key) in filteredListItems"
    :key="key"
    :name="key"
    :value="value"
    :depth="listItems.depth"
  ></ListItem>
</template>