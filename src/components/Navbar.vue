<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <b-navbar-brand v-if="!app.user" to="/login">Trello Dev</b-navbar-brand>
            <b-navbar-brand v-else to="/dashboard">Trello Dev</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                <!-- Using 'button-content' slot -->
                <template v-slot:button-content>
                    <em> {{  app.user ? app.user.name : 'Usuário' }} </em>
                </template>
                <div v-if="!app.user">
                    <b-dropdown-item to="/login">Login</b-dropdown-item>
                    <b-dropdown-item to="/register">Registrar</b-dropdown-item>
                </div>
                <b-dropdown-item v-else v-on:click="logout">Logout</b-dropdown-item>
                <b-dropdown-item to="/forgotPassword">Recuperar Senha</b-dropdown-item>
                </b-nav-item-dropdown>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        </div>
</template>

<script>
import Api from '../Api';

export default {
    props: ['app'],
    data() {
        return {

        }
    },
    methods: {
        logout() {
            Api.post('auth/logout').then(() => {
                this.app.user = null;
                localStorage.setItem('user', JSON.stringify(this.app.user));
                this.$router.push('/login');
            });
        }
    }
}
</script>