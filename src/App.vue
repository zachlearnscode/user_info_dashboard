<script setup>
  import { onMounted, ref } from "vue";
  import TableHeader from "./components/TableHeader.vue";
  import { instance as axios } from "./services/axios_instance";
  import AddUserForm from "./components/addUserForm.vue";

  const users = ref([]);
  const selectedUsers = ref([]);

  const openAddUserDialog = ref(false);

  const addNewUser = user => {
    users.value.push(user);
  };

  onMounted(() => {
    axios.get("/users")
      .then(res => users.value = res.data)
      .catch(err => console.log("Oops: ", err)) // TODO: Handle error
  })
  
</script>

<template>
  <DataTable :value="users" dataKey="id" v-model:selection="selectedUsers" :loading="loading" :stripedRows="true" responsiveLayout="stack">
    <template #loading>
      Loading records, please wait...
    </template>

    <template #header>
      <TableHeader :disableButtons="selectedUsers.length === 0" @openAddUserDialog="openAddUserDialog = true"/>
    </template>

    <Column selectionMode="multiple" :exportable="false"></Column>      
    <Column field="name" header="Name"></Column>
    <Column field="company.name" header="Company"></Column>
    <Column field="email" header="Email">
      <template #body="{data}">
        <a :href="`mailto:${data.email}`">{{data.email}}</a>
      </template>
    </Column>
    <Column field="phone" header="Phone">
      <!-- TODO: Normalize phone numbers and add in a[:tel] -->
    </Column>
    <Column field="website" header="Website">
      <template #body="{data}">
        <a :href="data.website" target="_blank">{{data.website}}</a>
      </template>
    </Column>
  </DataTable>

  <Dialog modal dismissableMask closeOnEscape :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}" v-model:visible="openAddUserDialog">
    <template #header>
      <div class="flex-column">
        <h3>Create New User</h3>
        <p class="my-0">Fields marked with * are required.</p>
      </div>
    </template>

    <AddUserForm class="mt-3" @addNewUser="[addNewUser($event), openAddUserDialog = false]" @closeAddUserDialog="openAddUserDialog = false"></AddUserForm>
  </Dialog>
</template>

<style>

</style>
