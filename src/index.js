import symfonyForm from './components/symfony-form.vue';

export default {
    install(Vue, options) {
        if (!options.hasOwnProperty('connector')) {
            console.error('(@vue-symfony-form): connector must be set');
        } else {
            Vue.prototype.$connector = options.connector;
            Vue.component(symfonyForm.name, symfonyForm);
        }
    }
}