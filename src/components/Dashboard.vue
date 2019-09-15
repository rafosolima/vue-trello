<template>
  <div>
    <b-col class="text-center mt-1">
      <b-button v-on:click="addCard">Adicionar Card</b-button>
    </b-col>
    <b-card v-for="(list, indexList) in cards" :key="indexList" >
      <Draggable class="list-group" :list="list" group="people">
        <b-list-group-item v-for="(element, indexTask) in list" :key="element.indexTask">
          <b-row>
            <b-col>
              <b-form-input v-model="cards[indexList][indexTask].task" v-on:blur="addTask(indexList, indexTask)" placeholder="Tarefa"></b-form-input>
            </b-col>
            <b-button class="float-right" v-on:click="removeTask(indexList, indexTask)">Excluir</b-button>
          </b-row>
        </b-list-group-item>
      </Draggable>
    </b-card>
    
  </div>
</template>

<script>
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Draggable from "vuedraggable"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

export default {
    props: ['app'],
    components: {
      Draggable
    },
    data() {
      return {
        cards: [],
      };
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        let user = JSON.parse(localStorage.getItem('user'));
        if(!this.app.user && user){
          this.app.user = user;
        } else if (!this.app.user && !user){
          this.$router.push('/login');
        }
      },
      addCard() {
        this.cards.push([{
          task: ''
        }]);
      },
      addTask(indexList, indexTask) {
        let card = this.cards[indexList];
        if(card[indexTask].task){
          card.push({
            task: ''
          });
        }
      },
      removeTask(indexList, indexTask) {
        this.cards[indexList].splice(indexTask, 1);
        if(!this.cards[indexList].length){
          this.cards.splice(indexList, 1);
        }
      },
    }
}
</script>
<style>
  .card{
    width: 400px;
    float: left;
    margin: 10px;
  }
  body {
    overflow-x: scroll;
  }
</style>