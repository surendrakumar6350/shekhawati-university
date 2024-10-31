import { Suspense } from 'react'
import SearchPage from '../NewComponents/findClientMain';

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