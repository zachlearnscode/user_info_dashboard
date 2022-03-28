<script setup>
import { ref, computed } from "vue";
import List from "./List.vue";
import FormDialog from "./FormDialog.vue";


const props = defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emits = defineEmits(['userDetailsFormSubmitted']);

const openEditUserDialog = ref(false);

const listItems = computed(() => {
  return getDepth(props.user);
})

const getDepth = (obj, count = 1) => {
  for (let key in obj) {
    if (typeof obj[key] === 'object') {
      obj[key].depth = count;
      getDepth(obj[key], count + 1);
      count - 1;
    }
  }
  return obj;
}

const getFormData = () => {
  const u = props.user;

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
</script>

<template>
  <Card class="my-3 shadow-5" style="background-color:rgba(63, 81, 181, 0.12);">
    <template #title>
      <h3 class="my-1">{{ user.name }}</h3>
    </template>
    <template #content>
      <List :listItems="listItems"></List>
    </template>
    <template #footer>
      <div class="flex">
        <Button label="Delete User" class="w-full p-button-danger" />
        <Button
          label="Edit User"
          @click="openEditUserDialog = true"
          class="w-full p-button-primary"
          style="margin-left: .5em"
        />
      </div>
    </template>
  </Card>

  <FormDialog
    :title="`Edit User ${user.name}`"
    v-model="openEditUserDialog"
    :formType="'editUser'"
    :userData="user"
    @cancel="openEditUserDialog = false"
    @userDetailsFormSubmitted="[$emit('userDetailsFormSubmitted' ,$event), openEditUserDialog = false]"
  ></FormDialog>
</template>