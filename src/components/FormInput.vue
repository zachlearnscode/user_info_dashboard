<script setup>
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
    class="inputfield w-full"
  />
  <label :for="name">{{ toTitleCase(name) }}</label>
  <!-- <InputError :validations="validations" :submited="submitted" :name="name"></InputError> -->
</template>