"use client"
import SearchPage from './findClientMain'
import { useDispatch, useSelector } from "react-redux";
import { getuser } from '@/apiCalls/allApiCalls';
import { setUserdetails } from '../redux/allSlice';
import LoadingAnimation from '../NewComponents/LoadingAnimation';
import React, { useEffect, useState } from 'react'

const FindClient = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const updateuser = useSelector((data) => data?.Slice?.data);
  //@ts-ignore
  const user = useSelector((data) => data?.userSlice?.data);

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

  console.log(user)

  return (
    <>
      {user.picture == null || user.picture.length > 9 ? <SearchPage /> : <><LoadingAnimation /></>}
    </>
  )
}

export default FindClient