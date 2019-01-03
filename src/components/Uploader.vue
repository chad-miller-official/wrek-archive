<template>
    <div id="uploader">
        <form enctype="multipart/form-data" novalidate v-if="uploadedFiles.length === 0">
            <fieldset>
                <legend>File Upload</legend>
                <div class="dropbox">
                    <input type="file" multiple name="wrekFiles[]"
                           @change="filesChange($event.target.name, $event.target.files); fileCount = $event.target.files.length" />
                </div>
            </fieldset>
        </form>
        <div v-if="uploadedFiles.length > 0">
            <p>Uploaded {{ uploadedFiles.length }} file(s) successfully.</p>
            <ul class="list-unstyled">
                <li v-for="item in uploadedFiles" :key="item.data.Key">
                    {{ item.data.Bucket }}
                    <br />
                    {{ item.data.Key }}
                    <br />
                    {{ item.data.Location }}
                    <hr />
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    var storage = require('../storage.js');

    export default {
        name: 'uploader',
        data() {
            return {
                uploadedFiles: [],
            };
        },
        computed: {},
        methods: {
            filesChange(fieldName, fileList) {
                if(!fileList.length)
                    return;

                var s3 = storage.getClient(
                    process.env.VUE_APP_AWS_ACCESS_KEY.trim(),
                    process.env.VUE_APP_AWS_SECRET_KEY.trim()
                );

                for(var file of fileList)
                {
                    var fileReader = new FileReader();
                    fileReader.onload = (function(fileToPut, uploader) {
                        return function(event) {
                            var putData = {
                                Body: event.target.result,
                                Bucket: process.env.VUE_APP_S3_BUCKET_NAME,
                                Key: Date.now() + '_' + fileToPut.name
                            };

                            s3.upload(putData, function(err, data) {
                                uploader.uploadedFiles.push({
                                    'data': data,
                                    'error': err
                                });
                            });
                        };
                    })(file, this);

                    fileReader.readAsArrayBuffer(file);
                }
            }
        },
        mounted() {
            this.uploadedFiles = [];
        }
    };
</script>

<style>
</style>