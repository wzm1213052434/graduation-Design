<template>
  <Layout></Layout>
</template>

<script>
  import Layout from './views/Layout.vue';
  export default {
    name:'App',
    components: {
      Layout
    }
  }
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  background: rgba(250, 227, 217, 1);
  position: relative;
  margin: 0;
  padding: 0;
}
</style>
