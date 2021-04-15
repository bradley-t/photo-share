<template>
  <div class="container">
    <h1 class="header">We couldn't find that page.</h1>
    <router-link to="/" type="submit" class="button pure-button pure-button-primary center">Go to our home page</router-link>
  </div>
</template>

<script>
export default {
  name: '404'
};
</script>

<style scoped>
  .header {
    color: black;
    font-size: 50px;
    text-align: center;
  }
  .container{
    padding-top: 150px;
    height: 50%;
    max-width: 80%;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .button {
    font-weight: bold;
    background-color: #277E8E;
  }
</style>
