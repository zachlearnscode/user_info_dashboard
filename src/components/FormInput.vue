<script setup>
import { computed } from "vue";
import InputError from "./InputError.vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  },
  autofocus: {
    type: Boolean,
    required: false,
    default: false
  },
  type: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  validations: {
    required: false
  },
  submitted: {
    type: Boolean,
    required: true
  }
})

defineEmits(['update:modelValue'])

const invalid = computed(() => {
  return props.validations.$invalid;
})

const toTitleCase = (str) => {
  const strArr = str.split("_");

  let result = "";
  strArr.forEach(str => {
    const strUpper = str.toUpperCase();
    const strLower = str.toLowerCase();

    result += strUpper.slice(0, 1);
    result += strLower.slice(1) + " ";
  })

  return result.trim();
}
</script>

<template>
  <InputText
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :id="name"
    :type="type"
    :autofocus="autofocus"
    v-model="modelValue"
    class="inputfield w-full"
  />
  <label :for="name">{{ validations.required ? toTitleCase(name) + "*" : toTitleCase(name) }}</label>
  <Transition>
    <InputError v-if="invalid && submitted" :name="toTitleCase(name)"></InputError>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>