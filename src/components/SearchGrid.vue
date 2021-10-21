<template>
  <div>
    <SearchGridManualLoad
      :query="query"
      :search-term="query.q"
      data-testid="search-grid"
      @onLoadMoreImages="onLoadMoreImages"
    />
    <ScrollButton data-testid="scroll-button" :show-btn="showScrollButton" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { SEARCH } from '~/constants/store-modules'

export default {
  name: 'SearchGrid',
  props: ['searchTerm'],
  data: () => ({
    showScrollButton: false,
  }),
  computed: {
    ...mapState(SEARCH, ['query']),
  },
  mounted() {
    document.addEventListener('scroll', this.checkScrollLength)
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.checkScrollLength)
  },
  methods: {
    onLoadMoreImages(searchParams) {
      this.$emit('onLoadMoreImages', searchParams)
    },
    checkScrollLength() {
      this.showScrollButton = window.scrollY > 70
    },
  },
}
</script>
