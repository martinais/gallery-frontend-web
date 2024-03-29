<template>
  <div class="grid">
    <Header/>
    <div id="content" ref="content" @wheel="handleScroll">
      <button id="import-btn" v-on:click="showImport = true">+</button>
      <div v-for="j in [0,1,2]" v-bind:key="j" class="gallery-row">
        <div class="pictureWrapper" v-on:click="carouselPtr = hash" v-bind:key="hash" v-for="hash in pics[j]">
          <TrashComponent class="trash" @remove="removePic(hash)"/>
          <Picture :height="rowHeight" :album="slug" :hash="hash" @update="updatePics"/>
        </div>
      </div>
      <FullModalComponent v-if="showImport" @close="showImport = false">
        <NewPicComponent @added="updatePics"/>
      </FullModalComponent>
      <Carousel v-if="carouselPtr" :album="slug" :hash="carouselPtr"
                @close="carouselPtr = undefined" @update="updatePics">
        <Picture :height="800" :hash="carouselPtr"/>
      </Carousel>
    </div>
  </div>
</template>

<script>
import {http} from '../helpers/http.js'
import Header from '../components/HeaderComponent.vue';
import Carousel from '../components/CarouselComponent.vue';
import Picture from '../components/PictureComponent.vue';
import NewPicComponent from '../components/NewPicComponent.vue';
import FullModalComponent from "../components/FullModalComponent";
import TrashComponent from "../components/TrashComponent";

export default {
  name: 'Gallery',
  components: {TrashComponent, FullModalComponent, Header, Picture, Carousel, NewPicComponent},
  data() {
    return {
      slug: undefined,
      showImport: false,
      carouselPtr: undefined,
      rowHeight: 100,
      pics: [],
    }
  },
  mounted() {
    const params = new URLSearchParams(location.search);
    this.slug = params.get('slug')
    if (!this.slug) document.location = '/'
    this.updatePics()
    this.extractRowHeight()
    window.addEventListener('resize', this.extractRowHeight)
  },
  unmounted() {
    window.removeEventListener('resize', this.extractRowHeight)
  },
  methods: {
    removePic(hash) {
      http('PATCH', '/albums/' + this.slug + '/pics', {'-': [hash]}).then(() => this.updatePics())
    },
    handleScroll(event) {
      this.$refs.content.scrollBy(event.deltaY, 0)
    },
    extractRowHeight() {
      this.rowHeight = this.$refs.content.clientHeight / 3
    },
    updatePics() {
      this.showImport = false;
      const x = (m, n) => m.filter((_, i) => i % 3 === n)
      http('GET', '/albums/' + this.slug + '/pics').then(r => r.json())
          .then(d => this.pics = [x(d.pics, 0), x(d.pics, 1), x(d.pics, 2)])
    },
  }
}
</script>

<style scoped>
.grid {
  font-family: sans-serif;
  text-align: center;
  background-color: white;
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-auto-rows: min-content;
  grid-template-rows: 10% 90%;
}

#import-btn {
  z-index: 1;
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  border-radius: 100%;
  border-width: 0;
  background-color: #FCE0E0;
  cursor: pointer;
  /* replace with a font-awesome logo ? */
  font-size: 3em;
  font-weight: bolder;
  color: white;
}

#content {
  overflow: auto;
  white-space: nowrap;
}

.gallery-row {
  font-size: 0;
  text-align: left;
}

.pictureWrapper {
  display: inline-block;
  position: relative
}

.trash {
  position: absolute;
  font-size: 2rem;
  right: 30px;
  top: 30px;
  color: white;
}
</style>
