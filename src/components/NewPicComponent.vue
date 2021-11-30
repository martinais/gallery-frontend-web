<template>
  <form v-on:submit.prevent="uploadPics">
    <h2>Add new pictures</h2>
    <label v-if="!uploadQueue.length" for="file-chooser" class="custom-file-chooser">
      <p>Click to add pictures or drag from your computer.</p>
      <font-awesome-icon id="image-icon" :icon="['fa', 'images']"/>
    </label>
    <label v-else for="file-chooser" class="custom-file-chooser small-file-chooser">
      <font-awesome-icon id="image-icon" :icon="['fa', 'images']"/>
      <p>Click to add pictures or drag from your computer.</p>
    </label>
    <input id="file-chooser" type="file" multiple accept="image/*"
           @change="selectPics"/>
    <br>
    <div id="table-wrapper">
      <table cellspacing="0" cellpadding="0">
        <tbody>
        <tr v-for="(file, index) in uploadQueue" v-bind:key="file.name">
          <td class="left-cell">{{ file.name }}</td>
          <td class="right-cell">
            <TrashComponent class="trash" @remove="removeUpload(index)"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <div id="button-wrapper">
      <input type="submit" value="Add Pics"/>
    </div>
  </form>
</template>

<script>
import {http, httpUpload} from '../helpers/http.js'
import TrashComponent from "./TrashComponent";

export default {
  name: 'NewPicComponent',
  components: {TrashComponent},
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
      this.uploadProgress.push(hash);
      if (this.uploadProgress.length === this.uploadQueue.length) {
        this.updateAlbum();
        this.uploadQueue = [];
      }
    },
    updateAlbum() {
      const data = {'+': this.uploadProgress}
      http('PATCH', '/albums/' + this.slug + '/pics', data).then(() => {
        this.$emit('added');
      })
    },
    uploadPics() {
      for (let i = 0; i < this.uploadQueue.length; i++) {
        httpUpload(this.uploadQueue[i]).then(hash => this.progress(hash));
        document.getElementsByClassName('left-cell')[i].classList.add('done');
      }
    },
  }
}
</script>

<style scoped>
.trash {
  color: #949494;
}

h2 {
  font-weight: lighter;
}

input {
  width: 200px;
  font-size: 1rem;
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin: 10px 0;
  background-color: #d8dbe3;
  cursor: pointer;
}

input[type="file"] {
  display: none;
}

table {
  background-color: #d8dbe3;
  width: 100%;
}

td {
  border-bottom: 1px solid #898989;
  padding: 5px 15px;
}

.left-cell.done { color: green; }
.left-cell {
  text-align: left;
}

.right-cell {
  text-align: right;
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

.small-file-chooser {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  width: 100%;
}

.small-file-chooser p {
  margin-right: 40px;
}

#table-wrapper {
  max-height: 40vh;
  overflow-y: scroll;
}

#button-wrapper {
  width: 99%;
  text-align: right;
}

#button-wrapper input:hover {
  background-color: #949494;
  color: white;
}

#image-icon {
  font-size: 5rem;
  margin-left: 10px;
}
</style>
