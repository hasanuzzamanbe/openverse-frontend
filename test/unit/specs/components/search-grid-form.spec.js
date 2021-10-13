import SearchGridForm from '~/components/SearchGridForm'
import render from '../../test-utils/render'

describe('SearchGridForm', () => {
  it('should render correct contents', () => {
    const wrapper = render(SearchGridForm, {
      mocks: {
        $store: {
          state: {
            filter: { isFilterVisible: true },
            search: { query: { q: 'foo' } },
          },
        },
        $route: {
          path: '/search',
        },
      },
    })

    expect(wrapper.find('form').vm).toBeDefined()
  })
})
