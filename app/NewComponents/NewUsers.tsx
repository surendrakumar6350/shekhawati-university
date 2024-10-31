"use client"
import React from 'react'
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MailIcon } from "lucide-react"
import convertDate from '../../utils/convertDate'
import maskEmail from "../../utils/maskEmail"
import { fadeInUp, stagger, hoverScale } from '../../utils/snippets'

const NewUsers = ({ topProfiles }: any) => {
    if (topProfiles) {
        return (
            <>
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

            </>
        )
    }
}

export default NewUsers