"use client"
import { recentSearches, recentSignup, heroImages } from '@/apiCalls/allApiCalls'
import React, { useEffect, useState } from 'react'
import HomePage from './NewComponents/Main';

const page = () => {
  const [recentSearchess, setRecentSearchess] = useState([]);
  const [recentSignupp, setRecentSignupp] = useState([]);
  const [heroImg, setHeroImg] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        // Make both API calls in parallel
        const [searchesResponse, signupResponse, heroImgResponse] = await Promise.all([
          recentSearches(),
          recentSignup(),
          heroImages(),
        ]);

        // Update state with the results
        setRecentSearchess(searchesResponse.heroImages);
        setRecentSignupp(signupResponse.data);
        setHeroImg(heroImgResponse.heroImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    <>
      {recentSearchess.length > 2 && recentSignupp.length > 2 &&
        heroImg.length > 2 && <HomePage topProfiles={recentSignupp}
          recentProfiles={recentSearchess} imageUrls={heroImg} />}
    </>
  )
}

export default page