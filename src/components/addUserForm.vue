<script setup>
import { ref, computed } from "vue";
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import FormInput from "./FormInput.vue";

const emit = defineEmits(['newUserSubmitted']);
const submitted = ref(false);

const inputs = ref({
    name: "",
    username: "",
    email: "",
    street: "",
    suite: "",
    city: "",
    zip_code: "",
    phone: "",
    website: "",
    name: "",
    catch_phrase: ""

});

const validations = () => {
    return {
        name: { required },
        username: {},
        email: { required, email },
        street: {},
        suite: {},
        city: {},
        zipcode: {},
        phone: { required },
        website: { required },
        name: { required },
        catchPhrase: {}
    }
}

const v$ = useVuelidate(validations, inputs.value);

const onSubmit = (isFormValid) => {
    submitted.value = true;

    if (!isFormValid) {
        return;
    }

    emit('newUserSubmitted', inputs.value);
}

const accessProperty = (arr) => {
    let pointer = 'inputs.';

    arr.forEach((prop, i) => {
        pointer += prop;
        if (i !== arr.length - 1) {
            pointer += '.';
        }
    })

    return `${pointer}`
}
</script>

<template>
    <form @submit.prevent="onSubmit(!v$.$invalid)" class="formgrid grid">
        <div v-for="(value, key) in inputs" :key="key" class="field col-12 p-float-label">
            <FormInput
                :name="key"
                :submitted="submitted"
                v-model="inputs[key]"
                :validations="v$[key]"
                :type="'text'"                
            ></FormInput>
        </div>
        











<!-- 
        <div class="field col-12 p-float-label">
            <FormInput :name="'Name'" :type="'text'" :autofocus="true" :validations="v$.name" :submitted="submitted"></FormInput>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText
                id="username"
                type="text"
                v-model="inputs.username"
                class="inputfield w-full"
            />
            <label for="username">Username</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="website" type="text" v-model="inputs.website" class="inputfield w-full" />
            <label for="website">Website*</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText id="phone" type="tel" v-model="inputs.phone" class="inputfield w-full" />
            <label for="phone">Phone*</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText
                id="email"
                type="text"
                v-model="inputs.email"
                @blur="v$.email.$touch"
                class="inputfield w-full"
                :class="{'p-invalid':v$.email.$invalid && submitted}"
            />
            <label for="email" :class="{'p-error':v$.email.$invalid && submitted}">Email*</label>
            <small v-if="v$.email.$invalid && submitted" class="p-error">{{`${toTitleCase(v$.email.$path)} is invalid.`}}</small>
        </div>
        <div class="field col-8 md:col-10 p-float-label">
            <InputText
                id="street"
                type="text"
                v-model="inputs.address.street"
                class="inputfield w-full"
            />
            <label for="street">Street Address</label>
        </div>
        <div class="field col-4 md:col-2 p-float-label">
            <InputText
                id="ste"
                type="text"
                v-model="inputs.address.suite"
                class="inputfield w-full"
            />
            <label for="ste">Ste.</label>
        </div>
        <div class="field col-8 md:col-10 p-float-label">
            <InputText
                id="city"
                type="text"
                v-model="inputs.address.city"
                class="inputfield w-full"
            />
            <label for="city">City</label>
        </div>
        <div class="field col-4 md:col-2 p-float-label">
            <InputText
                id="zip"
                type="text"
                v-model="inputs.address.zipcode"
                class="inputfield w-full"
            />
            <label for="zip">Zip Code</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText
                id="company"
                type="text"
                v-model="inputs.company.name"
                class="inputfield w-full"
            />
            <label for="company">Company*</label>
        </div>
        <div class="field col-12 md:col-6 p-float-label">
            <InputText
                id="motto"
                type="text"
                v-model="inputs.company.catchPhrase"
                class="inputfield w-full"
            />
            <label for="motto">Company Motto</label>
        </div> -->

        <div class="ml-auto mr-2">
            <Button label="Cancel" @click="$emit('closeAddUserDialog')" class="p-button-text" />
            <Button label="Submit" type="submit" />
        </div>
    </form>
</template>