"use client";

import React from "react";

interface BreadCrumbProps {
    imageSrc: string;
    overlayText: string;
}

const BreadCrumb: React.FC<BreadCrumbProps> = ({ imageSrc, overlayText }) => {
    return (
        <section className="relative w-full">
            <div className="container mx-auto px-4">
                <div className="relative h-96 rounded-lg overflow-hidden">
                    <img
                        src={imageSrc}
                        alt="Banner"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center">
                        <h1 className="text-4xl font-bold text-white text-center">
                            {overlayText}
                        </h1>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BreadCrumb;
