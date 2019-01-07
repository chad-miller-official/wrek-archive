<template>
  <div id="login">
    <form method="post" action="/users/login">
      <fieldset>
        <legend>Login</legend>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" value="Log In" />
      </fieldset>
    </form>
  </div>
</template>

<script>
  export default {};
</script>

<style>
</style>
