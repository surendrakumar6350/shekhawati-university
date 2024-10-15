import SearchPage from '../NewComponents/findClient'
import { Suspense } from 'react'

function SearchBarFallback() {
  return <></>
}

export default function Page() {
  return (
    <>
      <div>
        <Suspense fallback={<SearchBarFallback />}>
          <SearchPage />
        </Suspense>
      </div>
    </>
  )
}