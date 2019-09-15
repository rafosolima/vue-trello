<template>
  <b-container class="container">
    <b-col cols="6" offset="3" class="mt-5">
        <b-card header="Recuperar senha">
            <div class="alert alert-danger" v-if="errors.length">
                <ul class="mb-0">
                    <li v-for="(error, index) in errors" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>
            <div class="alert alert-success" v-if="isSend">
                  Email foi enviado com sucesso! 
            </div>
            <b-card-body>
                <b-form-group
                  id="email"
                  label-cols-md="3"
                  label="E-mail"
                  label-for="email"
                >
                  <b-form-input v-model="email" id="email" type="email" placeholder="E-mail"></b-form-input>
                </b-form-group>
                <b-form-group class="text-center">
                  <b-button pill variant="info" v-on:click="sendResetLink">Enviar reset link</b-button>
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
    data() {
      return {
        email: '',
        isSend: false,
        errors: []
      }
    },
    methods: {
        sendResetLink () {
            this.errors = [];

            if(!this.email) {
              this.errors.push('Preencha o campo email');
            }

            if(!this.errors.length){
              Api.post('auth/sendResetLink', {
                email: this.email
              }).then((response) => {
                this.isSend = response.data;
              }).catch((errors) => {
                if(errors.response){
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