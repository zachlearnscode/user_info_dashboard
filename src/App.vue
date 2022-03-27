<script setup>
  import { onMounted, ref } from "vue";
  import TableHeader from "./components/TableHeader.vue";
  import { instance as axios } from "./services/axios_instance";
  import FormDialog from "./components/FormDialog.vue";
  import DetailsSidebar from "./components/DetailsSidebar.vue";

  const loading = ref(true);

  const users = ref([]);
  onMounted(() => {
    axios.get("/users")
      .then(res => users.value = res.data)
      .catch(err => console.log("Oops: ", err)) // TODO: Handle error
      .finally(() => loading.value = false) 
  })

  const selectedUsers = ref([]);

  const openAddUserDialog = ref(false);
  const openDetailsSidebar = ref(false);

  const addNewUser = user => {
    users.value.push(user);
  };

  
</script>

<template>
  <DataTable :value="users" dataKey="id" v-model:selection="selectedUsers" :loading="loading" :stripedRows="true" responsiveLayout="stack">
    <template #loading>
      Loading records, please wait...
    </template>

    <template #header>
      <TableHeader :disableButtons="selectedUsers.length === 0" @openAddUserDialog="openAddUserDialog = true" @openDetailsSidebar="openDetailsSidebar = true"/>
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

  <FormDialog :title="'Add a User'" :form="'addUser'" v-model="openAddUserDialog"></FormDialog>
  <DetailsSidebar v-model="openDetailsSidebar" :userData="selectedUsers"></DetailsSidebar>
</template>

<style>

</style>
