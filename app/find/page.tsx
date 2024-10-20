import { Suspense } from 'react'
import FindClient from '../NewComponents/findClient';

function SearchBarFallback() {
  return <></>
}

export default function Page() {
  return (
    <>
      <div>
        <Suspense fallback={<SearchBarFallback />}>
          <FindClient />
        </Suspense>
      </div>
    </>
  )
}