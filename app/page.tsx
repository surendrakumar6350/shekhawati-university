"use client"
import { recentSearches, recentSignup, heroImages } from '@/apiCalls/allApiCalls'
import React, { useEffect, useState } from 'react'
import HomePage from './NewComponents/Main';
import { useDispatch, useSelector } from "react-redux";
import { getuser } from '@/apiCalls/allApiCalls';
import { setUserdetails } from './redux/allSlice';
import LoadingAnimation from './NewComponents/LoadingAnimation';

const page = () => {
  const [recentSearchess, setRecentSearchess] = useState([]);
  const [recentSignupp, setRecentSignupp] = useState([]);
  const [heroImg, setHeroImg] = useState([]);

  const dispatch = useDispatch();
  //@ts-ignore
  const updateuser = useSelector((data) => data?.Slice?.data);
  //@ts-ignore
  const user = useSelector((data) => data?.userSlice?.data);

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

  useEffect(() => {
    (async () => {
      const res = await getuser();
      if (res?.success) {
        dispatch(setUserdetails(res));
      } else {
        dispatch(setUserdetails({ ...user, picture: null }));
      }
    })();
  }, [updateuser]);

  return (
    <>
      {recentSearchess.length > 2 && recentSignupp.length > 2 &&
        heroImg.length > 2 ? <HomePage topProfiles={recentSignupp}
          recentProfiles={recentSearchess} imageUrls={heroImg} /> :  <LoadingAnimation />}
    </>
  )
}

export default page