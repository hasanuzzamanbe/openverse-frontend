import HomeLicenseFilter from '~/components/HomeLicenseFilter'
import { render, screen } from '@testing-library/vue'
import { TOGGLE_FILTER } from '~/constants/action-types'
import { FILTER } from '~/constants/store-modules'

describe('HomeLicenseFilter', () => {
  let options = {}
  let dispatchMock = null

  beforeEach(() => {
    dispatchMock = jest.fn()
    options = {
      mocks: {
        $store: {
          dispatch: dispatchMock,
          state: {
            filter: {
              filters: {
                licenseTypes: [
                  { code: 'commercial', name: 'Commercial usage' },
                  { code: 'modification', name: 'Allows modification' },
                ],
              },
            },
          },
        },
      },
    }
  })

  it('renders checkboxes', () => {
    render(HomeLicenseFilter, options)
    const checkboxes = screen.queryAllByRole('checkbox')
    expect(checkboxes.length).toEqual(2)

    const commercialCheckbox = screen.queryByLabelText('Commercial usage')
    expect(commercialCheckbox).toBeTruthy()

    const modificationCheckbox = screen.queryByLabelText('Allows modification')
    expect(modificationCheckbox).toBeTruthy()
  })

  it('dispatches `TOGGLE_FILTER` when checkboxes selected', async () => {
    render(HomeLicenseFilter, options)
    const commercialCheckbox = screen.queryByLabelText('Commercial usage')
    await commercialCheckbox.click()
    const checked = screen.queryAllByRole('checkbox', { checked: true })

    expect(checked.length).toEqual(1)
    expect(dispatchMock).toHaveBeenCalledWith(`${FILTER}/${TOGGLE_FILTER}`, {
      code: 'commercial',
      filterType: 'licenseTypes',
    })
  })
})
