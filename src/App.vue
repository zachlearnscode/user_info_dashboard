<script setup>
import { ref, watch, onMounted } from "vue";
import { instance as axios } from "./services/axios_instance";
import { useConfirm } from "primevue/useconfirm";
import TableHeader from "./components/TableHeader.vue";
import FormDialog from "./components/FormDialog.vue";
import UserDetailsCard from "./components/UserDetailsCard.vue";

const loading = ref(true);
const users = ref([]);
const selectedUsers = ref([]);
const openAddUserDialog = ref(false);
const openSidebar = ref(false);
const confirm = useConfirm();

onMounted(() => {
  axios.get("/users")
    .then(res => users.value = res.data)
    .catch(err => console.log("Oops: ", err)) // TODO: Handle error
    .finally(() => loading.value = false)
})

// Closes sidebar in the event that the only selected user is deleted.
watch(selectedUsers, () => {
  if (openSidebar.value === true && selectedUsers.value.length === 0) {
    return openSidebar.value = false;
  }
})

const addNewUser = user => {
  users.value.push(user);
};

const updateUserDetails = (userObj) => {
  const existingUserData = users.value
    .find(user => user.id === userObj.id);
  const idxInUsers = users.value.indexOf(existingUserData);
  const idxInSelectedUsers = selectedUsers.value.indexOf(existingUserData);
  users.value[idxInUsers] = userObj;
  selectedUsers.value[idxInSelectedUsers] = userObj;
}

const deleteUser = (id) => {
  axios.delete(`/users/${id}`)
    .then(res => {
      if (res.status === 200) {
        users.value = users.value.filter(user => user.id !== id)
        selectedUsers.value = selectedUsers.value
          .filter(selectedUser => selectedUser.id !== id)
      }
    })
    .catch(err => console.log("Error deleting user: ", err))
}

const requestConfirm = (userId) => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Delete User',
    icon: 'pi pi-exclamation-triangle',
    acceptClass: 'p-button-danger',
    accept: () => {
      deleteUser(userId)
    },
    reject: () => {
      confirm.close();
    }
  });
}
</script>

<template>
  <DataTable
    :value="users"
    data-key="id"
    v-model:selection="selectedUsers"
    :loading="loading"
    stripedRows
    responsiveLayout="stack"
  >
    <template #loading>Loading records, please wait...</template>
    <template #header>
      <TableHeader
        :disableButtons="selectedUsers.length === 0"
        @openAddUserDialog="openAddUserDialog = true"
        @openSidebar="openSidebar = true"
      />
    </template>
    <Column selectionMode="multiple" :exportable="false"></Column>
    <Column field="name" header="Name"></Column>
    <Column field="company.name" header="Company"></Column>
    <Column field="email" header="Email"></Column>
    <Column field="phone" header="Phone"></Column>
    <Column field="website" header="Website"></Column>
  </DataTable>

  <FormDialog
    :title="'Add a User'"
    :formType="'addUser'"
    v-model="openAddUserDialog"
    @userDetailsFormSubmitted="[addNewUser($event), openAddUserDialog = false]"
    @cancel="openAddUserDialog = false"
  ></FormDialog>

  <Sidebar v-model:visible="openSidebar" position="right" dismissable>
    <UserDetailsCard
      v-for="user in selectedUsers"
      :key="user.id"
      :user="user"
      @userDetailsFormSubmitted="updateUserDetails($event)"
      @deleteRequested="requestConfirm($event)"
    ></UserDetailsCard>
  </Sidebar>

  <ConfirmDialog></ConfirmDialog>
</template>

<style>
</style>
