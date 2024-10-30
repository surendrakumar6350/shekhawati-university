interface User {
    picture?: string;
}

interface Community {
    id: number;
    name: string;
    description: string;
    location: string;
    memberCount: number;
    tags: string[];
}

interface Event {
    id: number;
    name: string;
    date: string;
    location: string;
}

interface TechTalk {
    id: number;
    title: string;
    speaker: string;
}

interface Speaker {
    id: number;
    name: string;
    role: string;
    avatar: string;
}

interface LearnItem {
    id: number;
    title: string;
}

export type {LearnItem, Speaker, TechTalk, Event, Community, User}