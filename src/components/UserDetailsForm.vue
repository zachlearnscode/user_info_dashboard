<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { instance as axios } from "../services/axios_instance";
import { required, email, url } from '@vuelidate/validators'
import UserPrototype from "../services/user_prototype";
import useVuelidate from '@vuelidate/core'
import FormInput from "./FormInput.vue";

const props = defineProps({
    formType: {
        type: String,
        required: true
    },
    formData: {
        type: Object,
        required: false
    },
    userID: {
        type: Number,
        required: false
    }
})

const emit = defineEmits(['userDetailsFormSubmitted']);

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
    company_name: "",
    company_motto: ""

});

const validations = () => {
    return {
        name: { required },
        username: {},
        email: { required, email },
        street: {},
        suite: {},
        city: {},
        zip_code: {},
        phone: { required },
        website: { required, url },
        company_name: { required },
        company_motto: {}
    }
}

const v$ = useVuelidate(validations, inputs.value);

onBeforeMount(() => {
    if (props.formData) {
        const inputKeys = Object.keys(inputs.value);
        inputKeys.forEach(key => {
            inputs.value[key] = props.formData[key];
        })
    }
})

const disableSubmit = computed(() => {
    if (props.formType === 'editUser') {
        return !v$.value.$anyDirty; // Prevents user from resubmitting form without changing any values
    }

    return false;
})

const submitted = ref(false); // Triggers validations

const onSubmit = (isFormValid) => {
    submitted.value = true;

    if (isFormValid) {
        const inputValues = Object.values(inputs.value); //Creates array from values from inputs object for easy creation of new User object
        switch (props.formType) {
            case 'addUser': {
                postNewUser(formatInputs(inputValues));
                break;
            }
            case 'editUser': {
                patchExistingUser(formatInputs(inputValues), props.userID);
                break;
            }
        }
    }
}

const formatInputs = (arr) => {
    return new UserPrototype(...arr);
}

const postNewUser = (userObj) => {
    axios.post("/users", userObj)
        .then(res => {
            const userData = res.data;
            emit('userDetailsFormSubmitted', userData);
        })
        .catch(err => console.log("Error posting new user: ", err))
}

const patchExistingUser = (userObj, id) => {
    axios.patch(`/users/${id}`, userObj)
        .then(res => {
            const userData = res.data;
            emit('userDetailsFormSubmitted', userData);
        })
        .catch(err => console.log("Error patching existing user: ", err))
}

// Placed responsive input classes in script to use v-for in template
const inputClasses = ref({
    name: "col-12",
    username: "col-12 md:col-6",
    email: "col-12 md:col-6",
    street: "col-8 md:col-9",
    suite: "col-4 md:col-3",
    city: "col-8 md:col-9",
    zip_code: "col-4 md:col-3",
    phone: "col-12 md:col-6",
    website: "col-12 md:col-6",
    company_name: "col-12 md:col-7",
    company_motto: "col-12 md:col-5"
})
</script>

<template>
    <form @submit.prevent="onSubmit(!v$.$invalid)" class="formgrid grid mt-3">
        <span
            v-for="(value, key) in inputs"
            :key="key"
            class="field p-float-label"
            :class="inputClasses[key]"
        >
            <FormInput
                :name="key"
                :submitted="submitted"
                v-model="v$[key].$model"
                :validations="v$[key]"
                :type="'text'"
                :autofocus="formType === 'addUser' && key === 'name'"
            ></FormInput>
        </span>

        <div class="ml-auto mr-2">
            <Button label="Cancel" @click="$emit('cancel')" class="p-button-text" />
            <Button label="Submit" type="submit" :disabled="disableSubmit" />
        </div>
    </form>
</template>