"use client"
import { recentSearches } from '@/apiCalls/allApiCalls'
import React, { useEffect, useState } from 'react'
import HomePage from './NewComponents/Main';

const page = () => {
  const [recentSearchess, setRecentSearchess] = useState([]);
  useEffect(() => {
    (async () => {
      const ans = await recentSearches();
      setRecentSearchess(ans.heroImages);
    })()
  }, [])
  return (
    <>
    {recentSearchess.length > 2 && <HomePage recentProfiles={recentSearchess} />}
    </>
  )
}

export default page