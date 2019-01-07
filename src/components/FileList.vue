<template>
  <div id="fileList">
    <h2>File List</h2>
      <div v-if="!files">
        <p>Loading...</p>
      </div>
      <div v-else>
        <div v-if="files.length > 0">
          <table>
            <thead>
              <tr>
                <th>Date Uploaded</th>
                <th>File Size</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="file in files" :key="file._id">
                <td>{{ new Date(file.dateUploaded).toLocaleString('en-US', { timeZone: 'America/New_York' }) }}</td>
                <td>{{ file.readableSize }}</td>
                <td><a :href="'/file/download/' + file._id">{{ file.fileName }}</a></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <p>No files here</p>
        </div>
      </div>
  </div>
</template>

<script>
  import * as axios from 'axios'

  const SIZE_LABELS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

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
              res.data.forEach((file) => {
                file.readableSize = fileListObj.readableBytes(file.fileSize)
              })

              fileListObj.files = res.data
            }
          })(this))
          .catch((err) => {
            throw err
          })
      },
      readableBytes(bytes) {
        if(typeof bytes === 'undefined')
          return 'Unknown Size'

        var i = Math.floor(Math.log(bytes) / Math.log(1024))
        return (bytes / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + SIZE_LABELS[i]
      }
    }
  }
</script>

<style>
  table, th, td {
    border: 1px solid black;
  }
</style>