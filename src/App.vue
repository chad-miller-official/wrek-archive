<template>
  <div id="app">
    <h1>WREK 91.1 Archive</h1>
      <ul>
        <li>
          <router-link to="/">Home</router-link>
        </li>
        <li>
          <router-link to="/uploader">Uploader</router-link>
        </li>
        <li>
          <router-link to="/files">File List</router-link>
        </li>
      </ul>
      <router-view></router-view>
  </div>
</template>

<script>
  export default {};
</script>

<style>
</style>
