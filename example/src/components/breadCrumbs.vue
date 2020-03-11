<template>
  <div class="breadCrumb">
        {{names}}
  </div>
</template>

<script>
export default {
    name:"breadCrumb",
    props: ["names"],
    data() {
        return {
        }
    }
}
</script>

<style>
    .breadCrumb {
        width: 100%;
        height: 100%;
        padding-top: 1%;
        padding-left: 2%;
        border-bottom: 1px solid rgba(188,188,188,.5);
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
</style>