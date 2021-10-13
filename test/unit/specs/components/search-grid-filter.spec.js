import SearchGridFilter from '~/components/Filters/SearchGridFilter'
import render from '../../test-utils/render'
import { FILTER } from '~/constants/store-modules'
import {
  CLEAR_FILTERS,
  SET_FILTER_IS_VISIBLE,
} from '~/constants/mutation-types'
import { TOGGLE_FILTER } from '~/constants/action-types'

describe('SearchGridFilter', () => {
  let options = {}
  let storeMock = null
  let dispatchMock = null
  let commitMock = null
  let props = null
  beforeEach(() => {
    dispatchMock = jest.fn()
    commitMock = jest.fn()
    storeMock = {
      dispatch: dispatchMock,
      commit: commitMock,
      state: {
        filter: {
          isFilterApplied: true,
          isFilterVisible: true,
          filters: {
            licenseTypes: [{ code: 'commercial', name: 'Commercial usage' }],
            licenses: [{ code: 'by', name: 'CC-BY' }],
            categories: [{ code: 'photo', name: 'Photographs' }],
            extensions: [{ code: 'jpg', name: 'JPG' }],
            searchBy: {
              creator: false,
            },
            mature: false,
          },
        },
        query: 'me',
      },
    }

    props = {
      showProvidersFilter: true,
      provider: undefined,
    }

    options = {
      stubs: { FiltersList: true },
      propsData: props,
      mocks: {
        $store: storeMock,
      },
    }
  })

  it('should render correct contents', () => {
    const wrapper = render(SearchGridFilter, options)
    expect(
      wrapper.findComponent({ name: 'SearchGridFilter' }).element
    ).toBeDefined()
  })

  it('should show search filters when isFilterVisible is true', () => {
    const wrapper = render(SearchGridFilter, options)
    expect(wrapper.find('.search-filters').classes()).toContain(
      'search-filters__visible'
    )
  })

  it('should not show search filters when isFilterVisible is false', () => {
    storeMock.state.filter.isFilterVisible = false
    const wrapper = render(SearchGridFilter, options)
    expect(wrapper.find('.search-filters').classes()).not.toContain(
      'search-filters__visible'
    )
  })

  it('should not display providers filter when props is set to false', () => {
    props.showProvidersFilter = false
    const wrapper = render(SearchGridFilter, options)
    expect(wrapper.find('.search-filters_providers').element).not.toBeDefined()
  })

  it('toggles filter', () => {
    const wrapper = render(SearchGridFilter, options)
    wrapper.vm.toggleFilter({ code: 'foo', filterType: 'bar' })
    expect(dispatchMock).toHaveBeenCalledWith(`${FILTER}/${TOGGLE_FILTER}`, {
      code: 'foo',
      filterType: 'bar',
      provider: props.provider,
    })
  })

  it('clears filters', () => {
    const wrapper = render(SearchGridFilter, options)
    wrapper.vm.clearFilters()
    expect(dispatchMock).toHaveBeenCalledWith(`${FILTER}/${CLEAR_FILTERS}`)
  })

  it('toggles search visibility', () => {
    const wrapper = render(SearchGridFilter, options)
    wrapper.vm.onToggleSearchGridFilter()
    expect(commitMock).toHaveBeenCalledWith(
      `${FILTER}/${SET_FILTER_IS_VISIBLE}`,
      {
        isFilterVisible: !storeMock.state.filter.isFilterVisible,
      }
    )
  })
})
