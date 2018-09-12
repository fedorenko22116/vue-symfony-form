import symfonyForm from './components/symfony-form.vue';

export default {
    install(Vue, connector) {
        Vue.prototype.$connector = connector;
        Vue.component(symfonyForm);
    }
}