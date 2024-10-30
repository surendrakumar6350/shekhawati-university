"use client"
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import Header from "../NewComponents/Header.jsx"
import { CalendarIcon, MapPinIcon, BookOpenIcon, MailIcon, MapPin } from "lucide-react"
import { Users, ChevronRight, BookOpen, Briefcase, Star, Zap } from "lucide-react"
import convertDate from '../../utils/convertDate'
import maskEmail from "../../utils/maskEmail"
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import Footer from '../NewComponents/Footer'
import formatAddress from '../../utils/formatAddress'
import { fadeInUp, stagger, hoverScale } from '../../utils/snippets'
import { redirectToFind } from '../../utils/functions'
import Popup from './Popup.jsx';
import { hideRandomLetters } from '../../utils/hideRandomLetters'

export default function HomePage(props: any) {
  let { recentProfiles, topProfiles, imageUrls } = props;

  const [selectedProfile, setSelectedProfile] = useState(null);
  const [searchQuery, setSearchQuery] = useState('')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  //@ts-ignore
  const user = useSelector((data) => data?.userSlice?.data);
  const [progress, setProgress] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageUrls.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (searchQuery.length > 0) {
      window.location.href = `/find?address=${searchQuery}`;
    }
  }

  const handleCloseProfile = () => {
    setSelectedProfile(null);
  };

  const handleProfileSelect = async (profile: any) => {
    setSelectedProfile(profile);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-purple-100 via-pink-100 to-blue-100">
      <LoadingBar
        color="#f11946"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <Header picture={user.picture} />
      <main className="flex-1">
        <section className="w-full flex justify-center py-6 md:py-8 lg:py-10 xl:py-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-normal sm:text-5xl xl:text-6xl/none text-white">
                    Find Students and Build Community
                  </h1>
                  <p className="max-w-[600px] text-gray-200 md:text-xl">
                    Discover, collaborate, and grow with fellow students in your area
                  </p>
                </div>
                <div className="w-full max-w-sm space-y-2">
                  <form onSubmit={handleSubmit} className="flex space-x-2">
                    <Input
                      className="max-w-lg flex-1 bg-white bg-opacity-20 text-white placeholder-gray-300"
                      placeholder="Enter your PIN code "
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Button type='submit' className="bg-yellow-400 text-purple-900 hover:bg-yellow-300">
                      Find Students
                    </Button>
                  </form>
                </div>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 mt-6"
                  variants={stagger}
                  initial="initial"
                  animate="animate"
                >
                  {[
                    { icon: BookOpen, text: 'Study Groups' },
                    { icon: Users, text: 'Project Collaborations' },
                    { icon: Zap, text: 'Skill Sharing' }
                  ].map((item, index) => (
                    //@ts-ignore
                    <motion.div key={index} variants={fadeInUp} className="flex items-center bg-white bg-opacity-20 rounded-full px-4 py-2">
                      <item.icon className="h-5 w-5 text-yellow-400 mr-2" />
                      <span className="text-sm font-medium text-white">{item.text}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
              <div className="flex items-center justify-center">
                <motion.div
                  className="relative w-full h-[400px] overflow-hidden rounded-lg shadow-2xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentImageIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <img
                        src={imageUrls[currentImageIndex]}
                        alt={`Student ${currentImageIndex + 1}`}
                        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-in-out"
                      />
                    </motion.div>
                  </AnimatePresence>
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/50 to-transparent" />
                  <motion.div
                    className="absolute bottom-4 left-4 bg-white p-4 rounded-lg shadow-lg"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span className="text-sm font-medium text-purple-800">500+ Students Nearby</span>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
            <motion.div
              className="mt-12 grid gap-6 md:grid-cols-3"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {[
                {
                  icon: Users,
                  title: 'Diverse Student Network',
                  description: 'Connect with fellow students across Shekhawati region.'
                },
                {
                  icon: MapPin,
                  title: 'Local Study Meetups',
                  description: 'Organize and join study groups and educational events in your local area.'
                },
                {
                  icon: BookOpen,
                  title: 'Collaborative Learning',
                  description: 'Exchange knowledge, share study resources, and learn together with peers.'
                },
              ].map((item, index) => (
                //@ts-ignore
                <motion.div key={index} variants={fadeInUp}>
                  <Card className="bg-white bg-opacity-50 backdrop-blur-lg">
                    <CardContent className="p-6 flex items-center space-x-4">
                      <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-full">
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-purple-800">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="w-full flex justify-center py-6 md:py-10 lg:py-10 bg-gradient-to-b from-blue-100 to-purple-100">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <Star className="h-12 w-12 text-yellow-400" />
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-800">Recently Searched Profiles</h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Discover students who have been recently searched by someone. Today, we've got a list of profiles that have caught someone's attention
              </p>
            </motion.div>
            <motion.div
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
              variants={stagger}
              initial="initial"
              animate="animate"
            >

              {recentProfiles?.map((profile: any, index: any) => (
                //@ts-ignore
                <motion.div key={index} variants={fadeInUp} initial="initial" animate="animate">
                  <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4 mb-4">
                        <Avatar className="h-16 w-16 border-4 border-purple-300">
                          <AvatarImage src={`https://exam.shekhauniexam.in/${profile.search.imgSrc}`} alt={profile.search.studentName} />
                          <AvatarFallback>{profile.search.studentName.split(' ').map((n: any) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg text-purple-800">
                            {profile.search.studentName.toLowerCase().split(' ').map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                          </h3>
                          <p className="text-sm text-gray-600">Roll: {profile.search.rollNo}</p>
                        </div>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <BookOpenIcon className="w-4 h-4 mr-2 text-purple-500" />
                          <span>{profile.search.course}</span>
                          <Badge variant="secondary" className="ml-2">Year {profile.search.year}</Badge>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <MapPinIcon className="w-4 h-4 mr-2 text-purple-500" />
                          <span>{formatAddress(profile.search.address)}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <CalendarIcon className="w-4 h-4 mr-2 text-purple-500" />
                          <span>Searched on: {convertDate(profile.date)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        <span
                          className="font-semibold truncate inline-block max-w-[150px]"
                          title={profile.user.name}
                        >
                          Searched By: {" "} {hideRandomLetters(profile.user.name)}
                        </span>
                      </p>
                      <Button
                        onClick={() => handleProfileSelect(profile.search)}
                        className="w-full sm:w-auto text-xs sm:text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                      >
                        View Profile
                      </Button>

                    </CardContent>
                  </Card>
                </motion.div>
              ))}

            </motion.div>
            <div className="mt-12 text-center">
              <Button onClick={redirectToFind} size="lg" className="bg-purple-600 text-white hover:bg-purple-700">
                Explore More Profiles
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        <section className="w-full flex justify-center py-6 md:py-10 lg:py-10 bg-gradient-to-b from-purple-100 to-pink-100">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <Badge className="px-3 py-1 text-sm font-medium bg-yellow-400 text-purple-900" variant="secondary">
                More than 100 active users
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-purple-800">
                Meet Our New Users!
              </h2>
              <p className="max-w-[900px] text-gray-600 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Meet our newest community members who have joined us in the past few days, bringing fresh perspectives and ideas to the table.
              </p>
            </motion.div>
            <motion.div
              className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
              variants={stagger}
              initial="initial"
              animate="animate"
            >
              {topProfiles.map((profile: any, index: any) => (
                <motion.div
                  key={index}
                  //@ts-ignore
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  whileHover={hoverScale}
                >
                  <Card className="overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                    <CardContent className="p-6">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      >
                        <Avatar className="h-32 w-32 mx-auto mb-6 border-4 border-purple-300 shadow-md">
                          <AvatarImage src={profile?.picture} alt={profile?.name} />
                          <AvatarFallback>{profile.name.split(' ').map((n: any) => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <motion.h3
                        className="font-bold text-xl text-center text-purple-800 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        {profile.name}
                      </motion.h3>
                      <motion.div
                        className="space-y-2 mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center justify-center text-sm text-gray-600 truncate">
                          <MailIcon className="w-4 h-4 mr-2 flex-shrink-0 text-purple-500" />
                          <span className="truncate" title={maskEmail(profile.email)}>
                            {maskEmail(profile.email)}
                          </span>
                        </div>
                        <div className="flex items-center justify-center text-sm text-gray-600">
                          <CalendarIcon className="w-4 h-4 mr-2 text-purple-500" />
                          {convertDate(profile?.date)}
                        </div>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                      </motion.div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
            <div className="mt-12 text-center">
            </div>
          </div>
        </section>
      </main>
      <Popup
        selectedProfile={selectedProfile}
        handleCloseProfile={handleCloseProfile}
        Home={true}
      />
      <Footer />
    </div>
  )
}