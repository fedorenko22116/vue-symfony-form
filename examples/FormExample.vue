<template>
    <div id="app">
        <symfony-form
                action="/api/security/register"
                method="POST"
                data-prefix="register"
                @onSuccess="showSuccessMessage"
                @onFail="showErrorMessage"
        >
            <div slot="warning">
                Registration failed
            </div>
            <div class="form-group">
                <label for="login">Login:</label>
                <input type="text" name="username" id="login" />
            </div>
            <div class="form-group">
                <label for="passwordFirst">Password:</label>
                <input type="password" name="password[first]" id="passwordFirst" />
            </div>
            <div class="form-group">
                <label for="passwordSecond">Reapeat password:</label>
                <input type="password" name="password[second]" id="passwordSecond" />
            </div>
            <button>Send</button>
        </symfony-form>
    </div>
</template>

<script>
    import symfonyForm from 'vue-symfony-form';
    import connector from 'vue-symfony-form/src/core/connector';

    Vue.use(symfonyForm, {
        connector: connector,
    });

    export default {
        name: 'form-example',
        methods: {
            showSuccessMessage: function () {
                alert('Congratulations! Your are registered now');
            },
            showErrorMessage: function () {
                alert('Something went wrong. Sorry!');
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
