<template>
  <div
    class="fixed flex px-8 align-center z-40 w-full bg-white"
    :class="{ 'border-b border-dark-charcoal-20': isHeaderScrolled }"
  >
    <NuxtLink to="/">
      <VLogoLoader :status="isFetching ? 'loading' : 'idle'" />
    </NuxtLink>

    <VContentSwitcher
      class="flex-grow self-center"
      :route="route"
      :is-header-scrolled="isHeaderScrolled"
      :is-md-screen="isMdScreen"
      :is-search="isSearch"
      :is-overlay-open="showOverlay"
      @open-overlay="handleOpenOverlayClick"
    />
    <VButton
      v-if="showOverlay"
      variant="action-menu-secondary"
      class="ms-auto self-center"
      @click="closeOverlay"
    >
      <span class="text-sr">{{ $t('modal.close') }}</span>
      <VIcon :icon-path="closeIcon" />
    </VButton>
  </div>
</template>

<script>
import { computed, defineComponent, useContext } from '@nuxtjs/composition-api'

import { isScreen } from '~/composables/use-media-query'
import { useSearchRoute } from '~/composables/use-search-route'
import { useWindowScroll } from '~/composables/use-window-scroll'

import closeIcon from '~/assets/icons/close.svg'

import VContentSwitcher from '~/components/VHeader/VContentSwitcher.vue'
import VIcon from '~/components/VIcon/VIcon.vue'
import VLogoLoader from '~/components/VLogoLoader/VLogoLoader.vue'
import { useOverlay } from '~/composables/use-overlay'

const VHeader = defineComponent({
  name: 'VHeader',
  components: {
    VContentSwitcher,
    VIcon,
    VLogoLoader,
  },
  setup() {
    const { store } = useContext()
    const { isSearch, route } = useSearchRoute()
    const { isHeaderScrolled } = useWindowScroll()
    const isMdScreen = isScreen('md')
    const { showOverlay, closeOverlay, openOverlay } = useOverlay()

    /**  @type {import('@nuxtjs/composition-api').ComputedRef<Boolean>} */
    const isFetching = computed(
      () => store.getters['media/fetchingState'].isFetching
    )
    const handleOpenOverlayClick = () => {
      openOverlay('content-switcher')
    }

    return {
      closeIcon,
      closeOverlay,
      handleOpenOverlayClick,

      showOverlay,
      isFetching,
      isHeaderScrolled,
      isMdScreen,
      isSearch,
      route,
    }
  },
})

export default VHeader
</script>
