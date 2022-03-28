<script setup>
import { ref, computed, onBeforeMount } from "vue";
import { instance as axios } from "../services/axios_instance";
import useVuelidate from '@vuelidate/core'
import { required, email, url } from '@vuelidate/validators'
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

onBeforeMount(() => {
    if (props.formData) {
        const inputKeys = Object.keys(inputs.value);
        inputKeys.forEach(key => {
            inputs.value[key] = props.formData[key];
        })
    }
})

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
    company_name: "",
    company_motto: ""

});

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

const disableSubmit = computed(() => {
    if (props.formType === 'editUser') {
        return !v$.value.$anyDirty; // Prevents user from resubmitting form without changing any values
    }

    return false;
})

const formatInputs = (obj) => {
    const result = {
        address: { geo: { lat: null, lng: null } },
        company: { bs: null }
    }

    const entries = Object.entries(obj);
    const entriesWithNulls = entries.map(entry => {
        let [key, value] = entry;
        if (value === "") {
            value = null;
        }
        return [key, value];
    })

    entriesWithNulls.forEach(entry => {
        let [key, value] = entry;

        if (key.includes("_")) {
            key = key.split("_").join("");
        }

        switch (key) {
            case "street":
            case "suite":
            case "city":
            case "zipcode": {
                result.address[key] = value;
                break;
            }
            case "companyname": {
                result.company["name"] = value;
                break;
            }
            case "companymotto": {
                result.company["catchPhrase"] = value;
                break;
            }
            default: {
                result[key] = value;
            }
        }
    })

    return result;
}

const postNewUser = (userObj) => {
    axios.post("/users", userObj)
        .then(res => {
            //Should I be checking status codes?
            // const newUser = res.data;
            // emit('addNewUser', newUser);
        })
        .catch(err => console.log("Error in addUserForm: ", err))
}

const patchExistingUser = (userObj, id) => {
    axios.patch(`/users/${id}`, userObj)
        .then(res => {
            //Should I be checking status codes?
            const userData = res.data;
            emit('userDetailsFormSubmitted', userData);
        })
        .catch(err => console.log("Error in addUserForm: ", err))
}
const onSubmit = (isFormValid) => {
    submitted.value = true;

    if (isFormValid) {
        switch (props.formType) {
            case 'addUser': {
                postNewUser(formatInputs(inputs.value));
                break;
            }
            case 'editUser': {
                patchExistingUser(formatInputs(inputs.value), props.userID);
                break;
            }
        }

    }
}

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
            ></FormInput>
        </span>

        <div class="ml-auto mr-2">
            <Button label="Cancel" @click="$emit('cancel')" class="p-button-text" />
            <Button label="Submit" type="submit" :disabled="disableSubmit" />
        </div>
    </form>
</template>