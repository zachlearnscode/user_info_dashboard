<script setup>
  import { ref, watch, onMounted } from "vue";
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

  watch(users, () => {
    selectedUsers.value = selectedUsers.value.map(selectedUser => {
      const existingUser = users.value
        .find(user => user.id === selectedUser.id);

      if (existingUser && selectedUser !== existingUser) {
        return existingUser;
      }

      if (!users.value.find(user => user === selectedUser)) {
        return undefined;
      }
    }).filter(selectedUser => selectedUser !== undefined)
  })

  watch(selectedUsers, () => {
    if (openDetailsSidebar.value && !selectedUsers.value.length) {
      return openDetailsSidebar.value = false;
    }
  })

  const openAddUserDialog = ref(false);
  const openDetailsSidebar = ref(false);

  const addNewUser = user => {
    users.value.push(user);
  };

  const updateUserDetails = (event) => {
    const existingUserData = users.value
      .find(user => user.id === event.id);
    const newUserData = Object.entries(event);

    newUserData.forEach(pair => {
      const [key, value] = pair;

      switch (key) {
        case "username":
        case "website":
        case "phone":
        case "name":
        case "email": {
          existingUserData[key] = value;
          break;
        }
        case "suite":
        case "city":
        case "street": {
          existingUserData.address[key] = value;
          break;
        }
        case "zip_code": {
          existingUserData.address.zipcode = value;
          break;
        }
        case "company_name": {
          existingUserData.company.name = value;
          break;
        }
        case "company_motto": {
          existingUserData.company.catchPhrase = value;
          break;
        }
        default: {
          break;
        }
      }
    })
    
    
    let newUsers = users.value.filter(user => user.id !== newUserData.id);

    return users.value = newUsers


  }

  const deleteUser = (userId) => {
    return users.value.filter(user => user.id !== userId);
  }
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
  <DetailsSidebar v-model="openDetailsSidebar" :userData="selectedUsers" @userDetailsFormSubmitted="updateUserDetails($event)" @deleteUser="users = deleteUser($event)"></DetailsSidebar>
</template>

<style>

</style>
