<script setup>
  import { reactive } from "vue";

  const inputs = reactive({
    name: "",
    username: "",
    phone: "",
    email: "",
    street: "",
    ste: "",
    city: "",
    zip: "",
    company: "",
    motto: ""
  });

  const toTitleCase = (str) => {
    const words = str.split('_');

    let result = "";
    for (let word of words) {
      let wordUpper = word.toUpperCase(), wordLower = word.toLowerCase();
      let wordTitleCase = wordUpper[0] + wordLower.slice(1);

      result += wordTitleCase + " ";
    }

    result = result.trim();
    return result;
  }
</script>

<template>
  <form class="formgrid grid">
        <div class="field col-12 md:col-7 p-float-label">
            <InputText id="name" type="text" v-model="inputs.name" class="inputfield w-full" />
            <label for="name">Name</label>
        </div>
        <div class="field col-12 md:col-5 p-float-label">
            <InputText id="username" type="text" v-model="inputs.username" class="inputfield w-full" />
            <label for="username">Username</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="phone" type="tel" v-model="inputs.phone" class="inputfield w-full" />
            <label for="phone">Phone</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="email" type="email" v-model="inputs.email" class="inputfield w-full" />
            <label for="email">Email</label>
        </div>
        <div class="field col-8 md:col-10 p-float-label">
            <InputText id="street" type="text" v-model="inputs.street" class="inputfield w-full" />
            <label for="street">Street Address</label>
        </div>
        <div class="field col-4 md:col-2 p-float-label">
            <InputText id="ste" type="text" v-model="inputs.ste" class="inputfield w-full" />
            <label for="ste">Ste.</label>
        </div>
        <div class="field col-8 md:col-10 p-float-label">
            <InputText id="city" type="text" v-model="inputs.city" class="inputfield w-full" />
            <label for="city">City</label>
        </div>
        <div class="field col-4 md:col-2 p-float-label">
            <InputText id="zip" type="text" v-model="inputs.zip" class="inputfield w-full" />
            <label for="zip">Zip Code</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="company" type="text" v-model="inputs.company" class="inputfield w-full" />
            <label for="company">Company</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="motto" type="text" v-model="inputs.motto" class="inputfield w-full" />
            <label for="motto">Company Motto</label>
        </div>
    </form>
</template>