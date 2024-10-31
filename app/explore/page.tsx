"use client";

import Header from "../NewComponents/Header";
import Footer from "../NewComponents/Footer";
import BreadCrumb from "../NewComponents/BreadCrumb";
import React from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, MapPinIcon, UsersIcon, PlayCircleIcon, PlusCircleIcon, FileText } from "lucide-react";
import type { LearnItem, Speaker, TechTalk, Event, Community, User } from "../types/explorepage";


export default function Page() {

    return (
        <>
            <Header />
            <main className="flex-1 px-4 py-4 bg-gradient-to-b from-purple-100 to-pink-100">
                <BreadCrumb
                    imageSrc={'/breadcrumbs/community.jpg'}
                    overlayText="Join Communities & Grow Your Network"
                />
                <div className="container mx-auto px-4 py-8">
                    <h2 className="text-2xl font-semibold mb-4">Featured Communities</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <main className="lg:col-span-2 space-y-8">
                            {/* Featured Communities */}
                            <section>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {featuredCommunities.map((community: Community) => (
                                        <CommunityCard key={community.id} community={community} featured />
                                    ))}
                                </div>
                            </section>

                            {/* Popular Communities */}
                            <section>
                                <h2 className="text-2xl font-semibold mb-4">Popular Communities</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {popularCommunities.map((community: Community) => (
                                        <CommunityCard key={community.id} community={community} />
                                    ))}
                                </div>
                            </section>
                        </main>

                        {/* Sidebar */}
                        <aside className="space-y-8">
                            {/* Upcoming Events */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Upcoming Events</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {upcomingEvents.map((event: Event) => (
                                            <EventItem key={event.id} event={event} />
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Latest Tech Talks */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Latest Tech Talks</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {latestTechTalks.map((talk: TechTalk) => (
                                            <li key={talk.id} className="flex items-start space-x-2">
                                                <PlayCircleIcon className="w-5 h-5 mt-1 text-primary" />
                                                <div>
                                                    <a href="/coming-soon" className="font-medium hover:underline">{talk.title}</a>
                                                    <p className="text-sm text-muted-foreground">{talk.speaker}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Speakers to Follow */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Youtubers for Learning</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-4">
                                        {speakersToFollow.map((speaker: Speaker) => (
                                            <li key={speaker.id} className="flex items-center space-x-2">
                                                <Avatar>
                                                    <AvatarImage src={speaker.avatar} alt={speaker.name} />
                                                    <AvatarFallback>{speaker.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{speaker.name}</p>
                                                    <p className="text-sm text-muted-foreground">{speaker.role}</p>
                                                </div>
                                                <Button variant="outline" size="sm" className="ml-auto">
                                                    <PlusCircleIcon className="w-4 h-4 mr-1" />
                                                    Follow
                                                </Button>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Learn & Explore */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Learn & Explore</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {learnAndExplore.map((item: LearnItem) => (
                                            <li key={item.id}>
                                                <a href="/coming-soon" className="text-primary hover:underline">{item.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>

                            {/* Learn & Explore */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Blogs by Students</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {learnAndExplore.map((item: LearnItem) => (
                                            <li key={item.id} className="flex items-center space-x-2">
                                                <FileText className="w-5 h-5 mt-1 text-primary" />
                                                <a href="/coming-soon" className="text-primary hover:underline">{item.title}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        </aside>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

// CommunityCard component
function CommunityCard({ community, featured = false }: { community: Community; featured?: boolean }) {
    return (
        <Card className={featured ? "border-primary" : ""}>
            <CardHeader>
                <CardTitle>{community.name}</CardTitle>
                <CardDescription>{community.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{community.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                    <UsersIcon className="w-4 h-4" />
                    <span>{community.memberCount} members</span>
                </div>
                <div className="flex flex-wrap gap-2">
                    {community.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter>
                <Link href='/coming-soon'>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300">Join</Button>
                </Link>
            </CardFooter>
        </Card>
    );
}

// EventItem component
function EventItem({ event }: { event: Event }) {
    return (
        <li className="flex items-start space-x-2">
            <CalendarIcon className="w-5 h-5 mt-1 text-primary" />
            <div>
                <p className="font-medium">{event.name}</p>
                <p className="text-sm text-muted-foreground">{event.date}</p>
                <p className="text-sm text-muted-foreground">{event.location}</p>
            </div>
        </li>
    );
}

// Sample data
const featuredCommunities: Community[] = [
    {
        id: 1,
        name: "AI Innovators",
        description: "A community for AI enthusiasts and researchers.",
        location: "Global",
        memberCount: 5000,
        tags: ["machine learning", "deep learning", "neural networks"],
    },
    {
        id: 2,
        name: "Design Thinkers",
        description: "For UX/UI designers and creative problem solvers.",
        location: "San Francisco, CA",
        memberCount: 3500,
        tags: ["design", "ux", "ui"],
    },
];

const popularCommunities: Community[] = [
    {
        id: 3,
        name: "Game Dev United",
        description: "Uniting game developers from all backgrounds.",
        location: "Online",
        memberCount: 10000,
        tags: ["game development", "unity", "unreal engine"],
    },
    {
        id: 4,
        name: "Web Wizards",
        description: "For full-stack web developers and enthusiasts.",
        location: "New York, NY",
        memberCount: 7500,
        tags: ["web development", "javascript", "react"],
    },
    {
        id: 5,
        name: "Data Science Hub",
        description: "Exploring the world of data science and analytics.",
        location: "London, UK",
        memberCount: 4000,
        tags: ["data science", "analytics", "big data"],
    },
];

const upcomingEvents: Event[] = [
    { id: 1, name: "AI Conference 2024", date: "2024-12-10", location: "Los Angeles, CA" },
    { id: 2, name: "Web Development Workshop", date: "2024-11-15", location: "Remote" },
];

const latestTechTalks: TechTalk[] = [
    { id: 1, title: "Introduction to Quantum Computing", speaker: "Dr. Jane Doe" },
    { id: 2, title: "The Future of AI", speaker: "John Smith" },
];

const speakersToFollow: Speaker[] = [
    { id: 1, name: "Alice Johnson", role: "AI Researcher", avatar: "/images/alice.jpg" },
    { id: 2, name: "Bob Lee", role: "Front-End Developer", avatar: "/images/bob.jpg" },
];

const learnAndExplore: LearnItem[] = [
    { id: 1, title: "Understanding Machine Learning" },
    { id: 2, title: "Advanced CSS Techniques" },
];
