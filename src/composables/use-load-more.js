import { computed, useContext } from '@nuxtjs/composition-api'
import { FETCH_MEDIA } from '~/constants/action-types'
import { MEDIA } from '~/constants/store-modules'

/**
 * Fetches media on 'Load More' button click.
 *
 * @param {import('../pages/search/search-page.types').Props} props
 * @returns {{ onLoadMore: ((function(): Promise<void>)|void), canLoadMore: import('@nuxtjs/composition-api').ComputedRef<boolean>}}
 */
export const useLoadMore = (props) => {
  const { store } = useContext()

  const searchParams = computed(() => ({
    page: props.mediaResults.page + 1,
    shouldPersistMedia: true,
  }))

  const canLoadMore = computed(() => props.searchTerm.trim() !== '')
  const onLoadMore = async () => {
    if (canLoadMore) {
      await store.dispatch(`${MEDIA}/${FETCH_MEDIA}`, searchParams.value)
    }
    await Promise.resolve()
  }

  return { canLoadMore, onLoadMore }
}
