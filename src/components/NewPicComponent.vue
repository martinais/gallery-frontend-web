<template>
  <form v-on:submit.prevent="uploadPics">
    <h2>Add new pictures</h2>
    <label for="file-chooser" class="custom-file-chooser">
      <p>Click to add pictures or drag from your computer.</p>
      <font-awesome-icon id="image-icon" :icon="['fa', 'images']"/>
    </label>
    <input id="file-chooser" type="file" multiple accept="image/*"
       @change="selectPics"/>
    <br>
    <div id="button-wrapper">
      <input type="submit"/>
    </div>
  </form>
  <table>
    <tbody>
      <tr v-for="(file, index) in uploadQueue" v-bind:key="file.name">
        <td>{{ file.name }}</td>
        <td><button v-on:click="removeUpload(index)">remove</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { http, httpUpload } from '../helpers/http.js'

export default {
  name: 'NewPicComponent',
  data() {
    return {
      slug: undefined,
      uploadQueue: [],
      uploadProgress: [],
    }
  },
  mounted() {
    const params = new URLSearchParams(location.search);
    this.slug = params.get('slug')
    if (!this.slug) document.location = '/'
  },
  methods: {
    selectPics() {
      this.uploadQueue = Array.from(event.target.files)
    },
    removeUpload(index) {
      this.uploadQueue.splice(index, 1);
    },
    progress(hash) {
      // TODO : update progress bar
      this.uploadProgress.push(hash);
      if (this.uploadProgress.length == this.uploadQueue.length) {
        this.updateAlbum();
        this.uploadQueue = [];
      }
    },
    updateAlbum() {
      const data = { '+': this.uploadProgress }
      http('PATCH', '/albums/'+this.slug+'/pics', data).then(()=>{
        this.showImport = false;
        this.$emit('added');
      })
    },
    uploadPics() {
      for (let i = 0; i < this.uploadQueue.length; i++) {
        httpUpload(this.uploadQueue[i]).then(hash => this.progress(hash))
      }
    },
  }
}
</script>

<style scoped>
  h2 { font-weight: lighter; }
  input {
    width: 200px;
    font-size: 1rem;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin: 10px 0;
    background-color: #d8dbe3;
  }
  input[type="file"] {
    display: none;
  }
  .custom-file-chooser {
    width: 98%;
    background-color: #d8dbe3;
    border-top: 1px solid #898989;
    border-radius: 0 0 10px 10px;
    display: inline-block;
    padding: 50px 0;
    color: #949494;
    cursor: pointer;
  }
  #button-wrapper {
    width: 99%;
    text-align: right;
  }
  #image-icon {
    font-size: 5rem;
  }
</style>
