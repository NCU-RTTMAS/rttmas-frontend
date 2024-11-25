import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import 'primeicons/primeicons.css'

import PrimeVue from 'primevue/config';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Panel from 'primevue/panel';
import Card from 'primevue/card';
import Slider from 'primevue/slider';
import InputText from 'primevue/inputtext';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import DatePicker from 'primevue/datepicker';
import IftaLabel from 'primevue/iftalabel';
import Menu from 'primevue/menu';
import MultiSelect from 'primevue/multiselect';
import Listbox from 'primevue/listbox';

import Aura from '@primevue/themes/aura';

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false || 'none',
        }
    }
})
app.component('Menubar',            Menubar);
app.component('Panel',              Panel);
app.component('Card',               Card);
app.component('Button',             Button);
app.component('Slider',             Slider);
app.component('InputText',          InputText);
app.component('InputGroup',         InputGroup);
app.component('InputGroupAddon',    InputGroupAddon);
app.component('DatePicker',         DatePicker);
app.component('IftaLabel',          IftaLabel);
app.component('Menu',               Menu);
app.component('MultiSelect',        MultiSelect);
app.component('Listbox',            Listbox);

app.mount('#app')
