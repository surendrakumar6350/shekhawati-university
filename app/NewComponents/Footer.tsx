"use client"
import React from 'react'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="py-6 w-full shrink-0 items-center px-4 md:px-6 border-t border-purple-200 bg-white bg-opacity-80 backdrop-blur-md">
            <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
                <p className="text-xs text-gray-600">
                    © 2024 All rights reserved.
                </p>
                <nav className="flex gap-4 sm:gap-6 mt-4 sm:mt-0">
                    <Link
                        className="text-xs hover:underline underline-offset-4 text-purple-800"
                        href="#"
                    >
                        Terms of Service
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4 text-purple-800"
                        href="#"
                    >
                        Privacy Policy
                    </Link>
                    <Link
                        className="text-xs hover:underline underline-offset-4 text-purple-800"
                        href="#"
                    >
                        Contact Us
                    </Link>
                </nav>
            </div>
        </footer>
    )
}

export default Footer