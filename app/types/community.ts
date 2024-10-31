type Channel = {
    id: string
    name: string
    type: 'text' | 'voice'
}

type Category = {
    id: string
    name: string
    channels: Channel[]
}

type Message = {
    id: number
    user: string
    content: string
    timestamp: string
}

type User = {
    id: string
    name: string
    status: 'online' | 'offline'
    picture?: string;
    role: string
}

export type {Channel, Category, Message, User}