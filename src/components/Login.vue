<template>
  <b-container class="container">
    <b-col cols="6" offset="3" class="mt-5">
        <b-card header="Login">
            <div class="alert alert-danger" v-if="errors.length">
                <ul class="mb-0">
                    <li v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
            <b-card-body>
                <b-form-group
                  id="email"
                  label-cols-md="3"
                  label="Login"
                  label-for="email"
                >
                  <b-form-input v-model="email" id="email" type="email" placeholder="Email"></b-form-input>
                </b-form-group>
                <b-form-group
                  id="password"
                  label-cols-md="3"
                  label="Senha"
                  label-for="password"
                >
                  <b-form-input v-model="password" id="password" type="password" placeholder="Informe sua Senha"></b-form-input>
                </b-form-group>
                <b-form-group class="text-center">
                  <b-button pill variant="primary" v-on:click="authentication">Login</b-button>
                  <b-button to="/forgotPassword" pill variant="secondary">Esqueceu a senha?</b-button>
                </b-form-group>
            </b-card-body>
        </b-card>
    </b-col>
  </b-container>
</template>

<script>
import Vue from 'vue'
import Api from '../Api'
import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

export default {
  props: ['app'],
  data() {
      return {
        email: '',
        password: '',
        errors: []
      }
  },
  mounted() {
    this.app.user = null;
    localStorage.setItem('user', null);
  },
  methods: {
      authentication() {
          this.errors = [];

          if(!this.email){
            this.errors.push("Prencha o login");
          }
          if(!this.password){
            this.errors.push("Informe sua senha");
          }

          if(!this.errors.length){
            Api.post('auth/login', {
              email: this.email,
              password: this.password
            }).then((response) => {
                this.app.user = response.data.user;
                localStorage.setItem('user', JSON.stringify(this.app.user));
                this.$router.push('/dashboard');
            }).catch((errors) => {
              if(errors.response){
                this.errors.push(errors.response.data.error);
              }
            });
          }
      }
  }
}
</script>

<style>
  button, a {
    margin-right: 10px;
  }
</style>