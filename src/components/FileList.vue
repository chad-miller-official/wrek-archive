<template>
  <div id="fileList">
    <h2>File List</h2>
      <div v-if="!files">
        <p>Loading...</p>
      </div>
      <div v-else>
        <div v-if="files.length > 0">
          <ul>
            <li v-for="file in files" :key="file._id">
              {{ file.dateAdded }} - <a :href="'/file/content/' + file._id">{{ file.originalFileName }}</a>
            </li>
          </ul>
        </div>
        <div v-else>
          <p>No files here</p>
        </div>
      </div>
  </div>
</template>

<script>
  import * as axios from 'axios'

  export default {
    name: 'filelist',
    data() {
      return {
        files: null
      }
    },
    mounted() {
      this.getFileList()
    },
    methods: {
      getFileList() {
        axios.get('/files')
          .then(((fileListObj) => {
            return function(res) {
              fileListObj.files = res.data
            }
          })(this))
          .catch((err) => {
            throw err
          })
      }
    }
  }
</script>

<style>
</style>