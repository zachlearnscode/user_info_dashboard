import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config';

// PrimeVue CSS Dependencies
import 'primevue/resources/themes/md-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import '/node_modules/primeicons/primeicons.css';

// PrimeVue Components
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Sidebar from 'primevue/sidebar';
import Card from 'primevue/card';
import ConfirmDialog from 'primevue/confirmdialog';

// PrimeFlex CSS
import '/node_modules/primeflex/primeflex.css';

// Vue3 MQ for accessing breakpoints
import { Vue3Mq } from "vue3-mq";


const app = createApp(App);

app.use(PrimeVue);
app.use(Vue3Mq, {
  breakpoints: {
    xs: '0px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px'
  }
});

app.component('DataTable', DataTable);
app.component('Column', Column);
app.component('Button', Button);
app.component('InputText', InputText);
app.component('Dialog', Dialog);
app.component('Sidebar', Sidebar);
app.component('Card', Card);
app.component('ConfirmDialog', ConfirmDialog);

app.mount('#app');