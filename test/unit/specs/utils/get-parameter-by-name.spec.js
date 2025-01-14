import getParameterByName from '~/utils/get-parameter-by-name'

describe('getParameterByName', () => {
  const queryStr = '?q=nature&provider=flickr&li=by&lt='
  it('finds "q" key', () => {
    expect(getParameterByName('q', queryStr)).toBe('nature')
  })

  it('finds "provider" key', () => {
    expect(getParameterByName('provider', queryStr)).toBe('flickr')
  })

  it('finds "li" key', () => {
    expect(getParameterByName('li', queryStr)).toBe('by')
  })

  it('finds "lt" to be empty', () => {
    expect(getParameterByName('lt', queryStr)).toBe('')
  })

  it('finds "lt"', () => {
    const query = '?q=landscapes&provider=met&li=&lt=commercial'
    expect(getParameterByName('lt', query)).toBe('commercial')
  })

  it('finds multiple "lt" parameter values', () => {
    const query = '?q=cat&lt=commercial&lt=modification'
    expect(getParameterByName('lt', query)).toBe('commercial,modification')
  })
})
