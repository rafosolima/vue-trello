<template>
  <b-container class="container">
    <b-col cols="6" offset="3" class="mt-5">
        <b-card header="Resetar a senha">
            <div class="alert alert-danger" v-if="errors.length">
                <ul class="mb-0">
                    <li v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
            <b-card-body>
                <b-form-group
                  id="password"
                  label-cols-md="3"
                  label="Nova Senha"
                  label-for="password"
                >
                  <b-form-input id="password" type="password" placeholder="Informe sua Senha" v-model="password"></b-form-input>
                </b-form-group>
                <b-form-group
                  id="passwordConfirm"
                  label-cols-md="3"
                  label="Confirmar nova senha"
                  label-for="password"
                >
                  <b-form-input id="passwordConfirm" type="password" placeholder="Confirme sua Senha" v-model="passwordConfirm"></b-form-input>
                </b-form-group>
                <b-form-group class="text-center">
                  <b-button pill variant="info" v-on:click="resetPassword">Resetar</b-button>
                </b-form-group>
            </b-card-body>
        </b-card>
    </b-col>
  </b-container>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Api from '../Api';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

export default {
    props: ['app', 'credential'],
    data() {
        return {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
            errors: []
        }
    },
    methods: {
        resetPassword () {
            this.errors = [];

            if(!this.password){
                this.errors.push("É necessário preencher a nova senha.");
            }
            if(!this.passwordConfirm){
                this.errors.push("É necessário preencher a nova confirmação da senha.");
            }
            if(this.password !== this.passwordConfirm){
                this.errors.push("Senhas diferentes.");
                this.password = this.passwordConfirm = '';
            }

            if(!this.errors.length){
                Api.post('auth/resetPassword', {
                    credential: this.credential,
                    password: this.password
                }).then((response) => {
                    this.app.user = response.data;
                    localStorage.setItem('user', JSON.stringify(this.app.user));
                    this.$router.push("/dashboard");
                }).catch((errors) => {
                    if(errors.response) {
                      this.errors.push(errors.response.data.error);
                    }
                });
            }
            
        },
    }
}
</script>

<style>
  button, a {
    margin-right: 10px;
  }
</style>