import { Suspense } from 'react'
import PageCode from './Pagecode/PageCode'

function SearchBarFallback() {
  return <></>
}

export default function Page() {
  return (
    <>
      <div>
        <Suspense fallback={<SearchBarFallback />}>
          <PageCode />
        </Suspense>
      </div>
    </>
  )
}