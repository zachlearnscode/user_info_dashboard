<script setup>
  import { ref } from "vue";
  import { instance as axios } from "../services/axios_instance";

  const emit = defineEmits(['newUserSubmitted'])

  const inputs = ref({
    name: "",
    username: "",
    email: "",
    address: {
        street: "",
        suite: "",
        city: "",
        zipcode: ""
    },
    phone: "",
    website: "",
    company: {
        name: "",
        catchPhrase: ""
    }
  });

  const onSubmit = () => {
      emit('newUserSubmitted', inputs.value);
  }
</script>

<template>
  <form @submit.prevent="onSubmit" class="formgrid grid">
        <div class="field col-12 p-float-label">
            <InputText id="name" type="text" autofocus  v-model="inputs.name" class="inputfield w-full" />
            <label for="name">Name</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="username" type="text"  v-model="inputs.username" class="inputfield w-full" />
            <label for="username">Username</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="website" type="text"  v-model="inputs.website" class="inputfield w-full" />
            <label for="website">Website</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="phone" type="tel"  v-model="inputs.phone" class="inputfield w-full" />
            <label for="phone">Phone</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="email" type="email"  v-model="inputs.email" class="inputfield w-full" />
            <label for="email">Email</label>
        </div>
        <div class="field col-8 md:col-10 p-float-label">
            <InputText id="street" type="text"  v-model="inputs.address.street" class="inputfield w-full" />
            <label for="street">Street Address</label>
        </div>
        <div class="field col-4 md:col-2 p-float-label">
            <InputText id="ste" type="text"  v-model="inputs.address.suite" class="inputfield w-full" />
            <label for="ste">Ste.</label>
        </div>
        <div class="field col-8 md:col-10 p-float-label">
            <InputText id="city" type="text"  v-model="inputs.address.city" class="inputfield w-full" />
            <label for="city">City</label>
        </div>
        <div class="field col-4 md:col-2 p-float-label">
            <InputText id="zip" type="text"  v-model="inputs.address.zipcode" class="inputfield w-full" />
            <label for="zip">Zip Code</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="company" type="text"  v-model="inputs.company.name" class="inputfield w-full" />
            <label for="company">Company</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="motto" type="text"  v-model="inputs.company.catchPhrase" class="inputfield w-full" />
            <label for="motto">Company Motto</label>
        </div>

        <div class="ml-auto mr-2">
            <Button label="Cancel" @click="$emit('closeAddUserDialog')" class="p-button-text"/>
            <Button label="Submit" type="submit"/>
        </div>
    </form>
</template>