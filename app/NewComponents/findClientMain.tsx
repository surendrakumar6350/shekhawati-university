"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Image as ImageIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { click, getStudents, getuser, logOut } from "@/apiCalls/allApiCalls";
import Header from "../NewComponents/Header";
import { changeSearch } from "../redux/search";
import Popup from "../NewComponents/Popup";
import handleSearch from "@/utils/handleSearch";
import refreshByPagination from "@/utils/refreshByPagination";
import { User } from "lucide-react";
import calculateTheValueOfPage from "@/utils/calculateTheValueOfPage";
import areAllQueryParamsNull from "@/utils/isParams";
import { motion, AnimatePresence } from 'framer-motion'
import Footer from './Footer'
import { message } from "react-message-popup";
import { Search, Users, BookOpen, Sun, Moon } from 'lucide-react'
import Cookies from 'js-cookie';

export default function SearchPage() {
  const [limit, setLimit] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const queryParams = useSearchParams();
  const dispatch = useDispatch();
  const Searchresult = useSelector((data: any) => data.Search.data);

  const nameValue = queryParams.get("name");
  const fatherNameValue = queryParams.get("fatherName");
  const courseValue = queryParams.get("course");
  const mobile = queryParams.get("mobile");
  const address = queryParams.get("address");
  const page = calculateTheValueOfPage(queryParams);

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchParams, setSearchParams] = useState({
    name: nameValue ? nameValue : "",
    fatherName: fatherNameValue ? fatherNameValue : "",
    mobile: mobile ? mobile : "",
    address: address ? address : "",
    course: courseValue ? courseValue : "",
    page: page,
  });


  useEffect(() => {
    const savedTheme = Cookies.get('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.classList.toggle('dark', savedTheme === 'dark');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    Cookies.set('theme', newTheme ? 'dark' : 'light', { expires: 7 });
    document.body.classList.toggle('dark', newTheme);
    window.location.reload();
  };



  const paginate = (pageNumber: any) => {
    setSearchParams((prev) => ({ ...prev, page: pageNumber }));
    refreshByPagination(searchParams, pageNumber);
  };


  useEffect(() => {
    (async () => {

      if (!Object.values({
        name: nameValue,
        fatherName: fatherNameValue,
        course: courseValue,
        mobile: mobile,
        address: address,
      }).every(value => value === null)) {
        window.scrollBy({ top: 200, behavior: "smooth" });

        //Finding Search Result's
        const searchResponse = await getStudents(
          {
            name: nameValue,
            fatherName: fatherNameValue,
            course: courseValue,
            mobile: mobile,
            address: address,
          },
          page
        );

        if (!searchResponse) {
          return setLimit(true);
        }

        if (searchResponse.success) {
          dispatch(changeSearch(searchResponse.user));
          if (searchResponse.user.length < 1) {
            message.error('No Data Found!!!', 4000);
            setLimit(true);
          }
        }

        if (!searchResponse.success) {
          setLimit(true);
          message.error(searchResponse.message.errors, 9000);
        }
      }
    })();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setSearchParams((prev) => ({ ...prev, [name]: value }));
  };

  const handleCourseChange = (value: any) => {
    setSearchParams((prev) => ({ ...prev, course: value }));
  };

  const handleProfileSelect = async (profile: any) => {
    setSelectedProfile(profile);
    const ans = await click(profile);
    if (!ans?.success) {
      window.location.reload();
    }
  };

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };



  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-1 mb-1">
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
            >
              <div className="px-6 py-8 sm:px-8 sm:py-10">
                <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-2xl sm:text-3xl font-bold mb-2 text-gray-800 dark:text-white"
                >
                  Find College Students Near You
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-6"
                >
                  Enter Any Name And Start Searching
                </motion.div>

                <motion.div
                  className="flex flex-wrap justify-center gap-3 mb-8"
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.2
                      }
                    }
                  }}
                  initial="hidden"
                  animate="show"
                >
                  {[
                    { icon: Search, text: "Find Friends", color: "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300" },
                    { icon: Users, text: "Near You", color: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300" },
                    { icon: BookOpen, text: "College Students", color: "bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        show: { opacity: 1, y: 0 }
                      }}
                      className={`flex items-center ${item.color} rounded-full px-3 py-1`}
                    >
                      <item.icon className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.form
                  onSubmit={(e) => handleSearch(searchParams, e)}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: "name", placeholder: "Student Name", type: "text" },
                      { name: "fatherName", placeholder: "Student's Father Name", type: "text" },
                      { name: "mobile", placeholder: "Student's Mobile Number", type: "tel" },
                      { name: "address", placeholder: "Student's Address", type: "text" }
                    ].map((field, index) => (
                      <motion.div key={field.name} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Input
                          type={field.type}
                          name={field.name}
                          placeholder={field.placeholder}
                          value={searchParams[field.name as keyof typeof searchParams]}
                          onChange={handleInputChange}
                          className="w-full border-2 border-purple-300 focus:border-pink-500 rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-purple-600 dark:focus:border-pink-400"
                        />
                      </motion.div>
                    ))}
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Select defaultValue={searchParams.course} onValueChange={handleCourseChange}>
                        <SelectTrigger className="w-full border-2 border-purple-300 focus:border-pink-500 rounded-md p-2 dark:bg-gray-700 dark:text-white dark:border-purple-600 dark:focus:border-pink-400">
                          <SelectValue placeholder="Select Course" />
                        </SelectTrigger>
                        <SelectContent>
                          {["B.A LL.B", "B.A. ADDITIONAL", "B.A. B.ED", "B.A.", "B.B.A.", "B.C.A.", "B.COM", "B.ED", "B.P.ED", "B.SC", "LL.M", "M.A.", "M.A./M.SC.", "M.COM.", "M.Com", "M.ED", "M.SC", "P.G."].map((course) => (
                            <SelectItem key={course} value={course}>{course}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </motion.div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-indigo-800 dark:to-pink-700 text-white py-2 px-4 rounded-md hover:from-indigo-700 hover:to-pink-600 dark:hover:from-indigo-900 dark:hover:to-pink-800 transition-colors"
                  >
                    Search
                  </Button>
                </motion.form>
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-yellow-400 dark:bg-yellow-500 rounded-bl-full -z-10"
              />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 1 }}
                className="absolute bottom-0 left-0 w-16 h-16 md:w-24 md:h-24 bg-pink-400 dark:bg-pink-500 rounded-tr-full -z-10"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {!areAllQueryParamsNull(queryParams) && !limit && Searchresult?.length < 1 && (
          <div className="w-[100%] m-auto flex justify-center items-center">
            <img
              src="/loading.gif"
              className="my-20 justify-center w-20 h-20 rounded"
              alt="Loading"
            />
          </div>
        )}
        {Searchresult.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-purple-800 dark:text-purple-300 mb-6">
              Search Results
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {Searchresult.map((profile: any) => (
                <Card
                  key={profile?._id}
                  className="bg-white dark:bg-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="relative">
                    <img
                      src={
                        profile.imgSrc == "/placeholder.svg"
                          ? "/placeholder.svg"
                          : `https://exam.shekhauniexam.in/${profile.imgSrc}`
                      }
                      alt={profile.studentName}
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover aspect-square"
                    />
                  </div>
                  <CardContent className="p-4 flex flex-col items-center justify-center">
                    <p className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full shadow-sm mb-2 max-w-full break-words">
                      <User
                        className="w-3 h-3 mr-1 flex-shrink-0 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                      />
                      <span>{profile.studentName.toLowerCase().split(' ').map((word: string) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                    </p>
                    <Button
                      onClick={() => handleProfileSelect(profile)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-indigo-800 dark:to-pink-700 text-white"
                    >
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              <Button
                onClick={() => paginate(Number(searchParams.page) - 1)}
                disabled={Number(searchParams.page) === 1}
                variant="outline"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: 5 }).map((_, index) => (
                <Button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  variant={
                    Number(searchParams.page) === index + 1
                      ? "default"
                      : "outline"
                  }
                  className={
                    Number(searchParams.page) === index + 1
                      ? "bg-gradient-to-r from-indigo-600 to-pink-500 dark:from-indigo-800 dark:to-pink-700 text-white"
                      : "dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  }
                >
                  {index + 1}
                </Button>
              ))}
              <Button
                onClick={() => paginate(Number(searchParams.page) + 1)}
                disabled={Number(searchParams.page) === 5}
                variant="outline"
                className="dark:bg-gray-700 dark:text-white dark:border-gray-600"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        <Popup
          selectedProfile={selectedProfile}
          handleCloseProfile={handleCloseProfile}
          Home={false}
        />
      </main>

      <Footer />
      <motion.button
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>
    </div>
  );
}