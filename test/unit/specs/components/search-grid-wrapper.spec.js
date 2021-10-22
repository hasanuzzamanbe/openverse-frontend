import SearchGrid from '~/components/SearchGrid'
import render from '../../test-utils/render'
import { createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)
const storeMock = new Vuex.Store({
  modules: {
    filter: {
      namespaced: true,
      state: {
        filters: {
          licenseTypes: [
            { code: 'commercial', name: 'Commercial usage' },
            { code: 'modification', name: 'Allows modification' },
          ],
        },
      },
    },
    search: {
      namespaced: true,
      state: { query: { q: 'foo' } },
    },
  },
})

const options = {
  stubs: {
    ScrollButton: true,
    SearchGridManualLoad: true,
  },
  localVue,
  store: storeMock,
}

describe('Search Grid Wrapper', () => {
  it('renders correct content', () => {
    const wrapper = render(SearchGrid, options)
    expect(wrapper.find('[data-testid="search-grid"]').element).toBeDefined()
    expect(wrapper.find('[data-testid="scroll-button"]').element).toBeDefined()
  })

  it('renders the scroll button when the page scrolls down', () => {
    const wrapper = render(SearchGrid, options)
    window.scrollY = 80
    wrapper.vm.checkScrollLength()
    expect(wrapper.vm.showScrollButton).toBe(true)
  })
})
