"use client"
import React from 'react'
import Image from "next/image"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { X, Image as ImageIcon } from "lucide-react"

const Popup = (props) => {
    const { selectedProfile, handleCloseProfile } = props;

    return (
        <>
            <Dialog open={!!selectedProfile} onOpenChange={handleCloseProfile}>
                <DialogContent className="sm:max-w-[425px] p-0 bg-white overflow-hidden max-h-[75vh] flex flex-col">
                    {selectedProfile && (
                        <>
                            <div className="relative bg-gray-900 text-white p-4">
                                <button
                                    onClick={handleCloseProfile}
                                    className="absolute top-2 right-2 text-white hover:text-gray-300"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                <div className="flex items-center space-x-3">
                                    <Avatar className="w-16 h-16 border-2 border-white">
                                        <AvatarImage src={selectedProfile.imgSrc == "/placeholder.svg" ? "/placeholder.svg" : `https://exam.shekhauniexam.in/${selectedProfile.imgSrc}`} alt={selectedProfile.studentName} />
                                    </Avatar>
                                    <div>
                                        <h2 className="text-xl font-bold">{selectedProfile.studentName}</h2>
                                        <p className="text-sm text-gray-300">Roll No - {" " + selectedProfile.rollNo}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="p-4 space-y-3 overflow-y-auto flex-grow">
                                <div className="grid grid-cols-2 gap-3 text-xs">
                                    <div>
                                        <p className="text-gray-500">Father's Name</p>
                                        <p className="font-medium">{selectedProfile.fatherName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Mother's Name</p>
                                        <p className="font-medium">{selectedProfile.motherName}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Course</p>
                                        <p className="font-medium">{selectedProfile.course}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">College</p>
                                        <p className="font-medium break-words">{selectedProfile.college}</p>
                                    </div>
                                    <div className="col-span-2">
                                        <p className="text-gray-500">Address</p>
                                        <p className="font-medium break-words">{selectedProfile.address}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Email</p>
                                        <p className="font-medium break-words">{selectedProfile.email}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Mobile</p>
                                        <p className="font-medium">{selectedProfile.mobile}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">ABCID</p>
                                        <p className="font-medium">{selectedProfile.abcId}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Aadhaar</p>
                                        <p className="font-medium">{selectedProfile.aadharNo}</p>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 mb-1">Signature</p>
                                    <Image src={selectedProfile.imgSrcSign == "/placeholder.svg" ? "/placeholder.svg" : `https://exam.shekhauniexam.in/${selectedProfile.imgSrcSign}`} alt={selectedProfile.studentName}
                                         width={120} height={40} />
                                </div>
                            </div>
                   
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default Popup