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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../NewComponents/Header";
import { changeSearch } from "../redux/search";
import Popup from "../NewComponents/Popup";
import handleSearch from "@/utils/handleSearch";
import refreshByPagination from "@/utils/refreshByPagination";
import { User } from "lucide-react";
import calculateTheValueOfPage from "@/utils/calculateTheValueOfPage";
import areAllQueryParamsNull from "@/utils/isParams";
import { motion } from 'framer-motion'
import Footer from './Footer'



export default function SearchPage() {
    const [limit, setLimit] = useState(false);
    const [index, setIndex] = useState(0)
    const words = ['Connect', 'Collaborate', 'Create']

    const queryParams = useSearchParams();
    const dispatch = useDispatch();

    //@ts-ignore
    const user = useSelector((data) => data?.userSlice?.data);
    //@ts-ignore
    const Searchresult = useSelector((data) => data?.Search?.data);

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
        const timer = setInterval(() => {
            setIndex((prevIndex) => (prevIndex + 1) % words.length)
        }, 2000)
        return () => clearInterval(timer)
    }, [])

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
            }

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
            if (searchResponse?.success) {
                dispatch(changeSearch(searchResponse?.user));
            }
            if (!searchResponse?.success) {
                setLimit(true);
                if (searchResponse.message == "Rate limit exceeded") {
                    toast(
                        "Rate limit exceeded! You've reached your daily limit. Try again tomorrow!"
                    );
                }
                if (searchResponse.message == "login first") {
                    toast(
                        "Please Sign in.."
                    );
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
        <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100">
            <Header picture={user.picture} />

            <main className="flex-1 container mx-auto px-4 py-4">
                <div className="max-w-4xl mx-auto bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-1 mb-1">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-500 md:p-6 p-1 rounded-lg shadow-lg text-white text-center mb-6">
                        <motion.h1
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="md:text-2xl text-lg font-bold"
                        >
                            Welcome
                        </motion.h1>
                        <motion.div
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="md:text-base text-xs font-serif"
                        >
                            Find Your College Crew & connect
                        </motion.div>
                    </div>

                    <form
                        onSubmit={(e) => handleSearch(searchParams, e)}
                        className="space-y-4"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Your Name"
                                    value={searchParams.name}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-purple-300 focus:border-pink-500 rounded-md p-2"
                                />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Input
                                    type="text"
                                    name="fatherName"
                                    placeholder="Father's Name"
                                    value={searchParams.fatherName}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-purple-300 focus:border-pink-500 rounded-md p-2"
                                />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Input
                                    type="tel"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={searchParams.mobile}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-purple-300 focus:border-pink-500 rounded-md p-2"
                                />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Input
                                    type="text"
                                    name="address"
                                    placeholder="Address"
                                    value={searchParams.address}
                                    onChange={handleInputChange}
                                    className="w-full border-2 border-purple-300 focus:border-pink-500 rounded-md p-2"
                                />
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Select defaultValue={searchParams.course}
                                    onValueChange={handleCourseChange}>
                                    <SelectTrigger className="w-full border-2 border-purple-300 focus:border-pink-500 rounded-md p-2">
                                        <SelectValue placeholder="Select Course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="B.A LL.B">B.A LL.B</SelectItem>
                                        <SelectItem value="B.A. ADDITIONAL">
                                            B.A. ADDITIONAL
                                        </SelectItem>
                                        <SelectItem value="B.A. B.ED">B.A. B.ED</SelectItem>
                                        <SelectItem value="B.A.">B.A.</SelectItem>
                                        <SelectItem value="B.B.A.">B.B.A.</SelectItem>
                                        <SelectItem value="B.C.A.">B.C.A.</SelectItem>
                                        <SelectItem value="B.COM">B.COM</SelectItem>
                                        <SelectItem value="B.ED">B.ED</SelectItem>
                                        <SelectItem value="B.P.ED">B.P.ED</SelectItem>
                                        <SelectItem value="B.SC">B.SC</SelectItem>
                                        <SelectItem value="LL.M">LL.M</SelectItem>
                                        <SelectItem value="M.A.">M.A.</SelectItem>
                                        <SelectItem value="M.A./M.SC.">M.A./M.SC.</SelectItem>
                                        <SelectItem value="M.COM.">M.COM.</SelectItem>
                                        <SelectItem value="M.Com">M.Com</SelectItem>
                                        <SelectItem value="M.ED">M.ED</SelectItem>
                                        <SelectItem value="M.SC">M.SC</SelectItem>
                                        <SelectItem value="P.G.">P.G.</SelectItem>
                                    </SelectContent>
                                </Select>
                            </motion.div>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white py-2 px-4 rounded-md hover:from-indigo-700 hover:to-pink-600 transition-colors"
                        >
                            Search
                        </Button>
                    </form>
                </div>

                {!areAllQueryParamsNull(queryParams) && !limit && Searchresult?.length < 2 && (
                    <div className="w-[100%] m-auto flex justify-center items-center">
                        {" "}
                        <img
                            src="/loading.gif"
                            className="my-20 justify-center w-20 h-20 rounded"
                        />{" "}
                    </div>
                )}
                {Searchresult.length > 0 && (
                    <div className="mt-12">
                        <h2 className="text-2xl font-bold text-purple-800 mb-6">
                            Search Results
                        </h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                            {Searchresult.map((profile: any) => (
                                <Card
                                    key={profile?._id}
                                    className="bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300"
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

                                        <p className="inline-flex items-center px-3 py-1 text-xs font-medium text-gray-700 bg-gray-100 rounded-full shadow-sm mb-2 max-w-full break-words">
                                            <User
                                                className="w-3 h-3 mr-1 flex-shrink-0 text-gray-500"
                                                aria-hidden="true"
                                            />
                                            <span>{profile.studentName.toLowerCase().split(' ').map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</span>
                                        </p>
                                        <Button
                                            onClick={() => handleProfileSelect(profile)}
                                            className="w-full bg-gradient-to-r from-indigo-600 to-pink-500 text-white"
                                        >
                                            View Details
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8 space-x-2">
                            <Button
                                //@ts-ignore
                                onClick={() => paginate(Number(searchParams.page) - 1)}
                                disabled={Number(searchParams.page) === 1}
                                variant="outline"
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
                                            ? "bg-gradient-to-r from-indigo-600 to-pink-500 text-white"
                                            : ""
                                    }
                                >
                                    {index + 1}
                                </Button>
                            ))}
                            <Button
                                //@ts-ignore
                                onClick={() => paginate(Number(searchParams.page) + 1)}
                                disabled={Number(searchParams.page) === 5}
                                variant="outline"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
                <Popup
                    selectedProfile={selectedProfile}
                    handleCloseProfile={handleCloseProfile}
                />
            </main>

            <Footer />
        </div>
    );
}