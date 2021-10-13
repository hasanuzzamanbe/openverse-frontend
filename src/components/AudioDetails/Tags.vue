<template>
  <div v-if="tags && tags.length" class="media_tags">
    <h3 v-if="showHeader" class="b-header">
      {{ header }}
    </h3>
    <div>
      <MediaTag
        v-for="(tag, index) in getValidTags()"
        :key="index"
        class="mr-4"
        @click="searchByTagName"
      >
        {{ tag.name }}
      </MediaTag>
    </div>
  </div>
</template>

<script>
import { SET_Q } from '~/constants/mutation-types'
import { SEARCH } from '~/constants/store-modules'

export default {
  name: 'AudioTags',
  props: ['tags', 'header'],
  computed: {
    showHeader() {
      return this.$props.header !== ''
    },
  },
  methods: {
    isClarifaiTag(provider) {
      return provider === 'clarifai'
    },
    searchByTagName(query) {
      this.$store.commit(`${SEARCH}/${SET_Q}`, { q: query })
    },
    getValidTags() {
      return this.$props.tags.filter((tag) => !!tag.name)
    },
  },
}
</script>
