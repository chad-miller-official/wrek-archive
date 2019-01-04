<template>
  <div id="uploader">
    <form enctype="multipart/form-data" method="post" action="/upload">
      <fieldset>
        <legend>File Upload</legend>
        <input type="file" name="wrekFiles" multiple />
        <input type="submit"/>
      </fieldset>
    </form>
  </div>
</template>

<script>
  export default {};
</script>

<style>
</style>