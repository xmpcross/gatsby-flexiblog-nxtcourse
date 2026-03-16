import React, { useState, useCallback, Suspense } from 'react'
import SearchInput from './Search.Input'

const SearchComponent = React.lazy(() => import('./Search'))

const Search = () => {
  const [searchLoaded, setSearchLoaded] = useState()

  const loadSearchModule = useCallback(() => {
    setSearchLoaded(true)
  })

  const loadSearch = useCallback(() => {
    loadSearchModule()
  })

  return searchLoaded ? (
    <Suspense fallback={null}>
      <SearchComponent isFocused={true} />
    </Suspense>
  ) : (
    <SearchInput loadSearch={loadSearch} />
  )
}

export default Search
