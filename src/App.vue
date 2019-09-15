<template>
  <div id="app">
    <Navbar :app='this'></Navbar>
    <spinner v-if="loading"></spinner>
    <div v-else-if="initiated">
      <router-view :app="this"></router-view>
    </div>
  </div>
</template>

<script>
import Api from './Api';
import Navbar from './components/Navbar'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      user: null,
      loading: false,
      initiated: false
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      Api.get('auth/init').then((response) => {
        this.user = response.data.user;
        this.loading = false;
        this.initiated = true;
      })
    }
  }
}
</script>