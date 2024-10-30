'use client'

import React, { useState } from 'react'
import { useSelector } from "react-redux";
import Header from "../NewComponents/Header";
import Footer from "../NewComponents/Footer";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/components/ui/dialog"

import {
    Hash,
    Volume2,
    Video,
    Mic,
    Settings,
    Phone,
    Plus,
    FolderPlus,
} from 'lucide-react'

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

export default function CommunityPage() {
    const [categories, setCategories] = useState<Category[]>([
        {
            id: '1',
            name: 'Text Channels',
            channels: [
                { id: 'general', name: 'general', type: 'text' },
                { id: 'introductions', name: 'introductions', type: 'text' },
                { id: 'resources', name: 'resources', type: 'text' },
            ]
        },
        {
            id: '2',
            name: 'Voice Channels',
            channels: [
                { id: 'general-voice', name: 'General Voice', type: 'voice' },
                { id: 'study-group', name: 'Study Group', type: 'voice' },
            ]
        }
    ])
    const [activeChannel, setActiveChannel] = useState<Channel>(categories[0].channels[0])
    const [messages, setMessages] = useState<{ [key: string]: Message[] }>({
        general: [
            { id: 1, user: 'Alice', content: 'Hey everyone! Excited to be here!', timestamp: '2:30 PM' },
            { id: 2, user: 'Bob', content: 'Welcome Alice! Glad to have you join us.', timestamp: '2:31 PM' },
            { id: 3, user: 'Charlie', content: 'Has anyone checked out the new AI model that was released yesterday?', timestamp: '2:35 PM' },
        ],
        introductions: [
            { id: 1, user: 'David', content: 'Hi all, I\'m David. New to the community and looking forward to learning from everyone!', timestamp: '1:45 PM' },
        ],
        resources: [
            { id: 1, user: 'Eve', content: 'Here\'s a great article on the latest advancements in NLP: [link]', timestamp: '11:20 AM' },
        ],
    })
    const [inputMessage, setInputMessage] = useState('')
    const [users] = useState<User[]>([
        { id: '1', name: 'Alice', status: 'online', picture: '/placeholder.svg?height=32&width=32', role: 'Admin' },
        { id: '2', name: 'Bob', status: 'online', picture: '/placeholder.svg?height=32&width=32', role: 'Moderator' },
        { id: '3', name: 'Charlie', status: 'online', picture: '/placeholder.svg?height=32&width=32', role: 'Member' },
        { id: '4', name: 'David', status: 'offline', picture: '/placeholder.svg?height=32&width=32', role: 'Member' },
        { id: '5', name: 'Eve', status: 'offline', picture: '/placeholder.svg?height=32&width=32', role: 'Member' },
    ])
    const [showNewChannelDialog, setShowNewChannelDialog] = useState(false)
    const [newChannelName, setNewChannelName] = useState('')
    const [newChannelType, setNewChannelType] = useState<'text' | 'voice'>('text')
    const [showNewCategoryDialog, setShowNewCategoryDialog] = useState(false)
    const [newCategoryName, setNewCategoryName] = useState('')

    // Sample Community Data
    const CommunityData = {
        communityName: 'AI Innovators',
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (inputMessage.trim() && activeChannel.type === 'text') {
            const newMessage = {
                id: (messages[activeChannel.id]?.length || 0) + 1,
                user: 'You',
                content: inputMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }
            setMessages(prev => ({
                ...prev,
                [activeChannel.id]: [...(prev[activeChannel.id] || []), newMessage]
            }))
            setInputMessage('')
        }
    }

    const handleCreateNewChannel = () => {
        if (newChannelName.trim()) {
            const newChannel: Channel = {
                id: newChannelName.toLowerCase().replace(/\s+/g, '-'),
                name: newChannelName,
                type: newChannelType
            }
            setCategories(prev =>
                prev.map(category =>
                    category.name === (newChannelType === 'text' ? 'Text Channels' : 'Voice Channels')
                        ? { ...category, channels: [...category.channels, newChannel] }
                        : category
                )
            )
            setShowNewChannelDialog(false)
            setNewChannelName('')
        }
    }

    const handleCreateNewCategory = () => {
        if (newCategoryName.trim()) {
            const newCategory: Category = {
                id: Date.now().toString(),
                name: newCategoryName,
                channels: []
            }
            setCategories(prev => [...prev, newCategory])
            setShowNewCategoryDialog(false)
            setNewCategoryName('')
        }
    }

    

    // Specify the type of the user using TypeScript
    const user = useSelector((state: { userSlice: { data: User } }) => state.userSlice.data);
    return (
        <>
            {/* <Header picture={user?.picture} /> */}
            <div className="flex h-screen bg-background text-foreground">
                {/* Channels Sidebar */}
                <aside className="w-64 bg-muted flex flex-col">
                    <div className="p-4 font-semibold text-lg border-b">{CommunityData.communityName}</div>
                    <ScrollArea className="flex-grow">
                        <div className="p-2">
                            {categories.map((category) => (
                                <div key={category.id} className="mb-4">
                                    <h2 className="px-2 mb-2 text-sm font-semibold text-muted-foreground flex items-center justify-between">
                                        {category.name.toUpperCase()}
                                        <Button variant="ghost" size="icon" className="h-4 w-4" onClick={() => setShowNewChannelDialog(true)}>
                                            <Plus className="h-4 w-4" />
                                            <span className="sr-only">Add Channel</span>
                                        </Button>
                                    </h2>
                                    {category.channels.map((channel) => (
                                        <ChannelButton
                                            key={channel.id}
                                            icon={channel.type === 'text' ? <Hash /> : <Volume2 />}
                                            name={channel.name}
                                            active={activeChannel.id === channel.id}
                                            onClick={() => setActiveChannel(channel)}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <Button
                        variant="ghost"
                        className="m-2 justify-start"
                        onClick={() => setShowNewCategoryDialog(true)}
                    >
                        <FolderPlus className="mr-2 h-4 w-4" />
                        Add Category
                    </Button>
                    <UserControls />
                </aside>

                {/* Main Chat Area */}
                <main className="flex-1 flex flex-col">
                    <header className="h-12 border-b flex items-center px-4">
                        <h2 className="font-semibold text-lg flex items-center">
                            {activeChannel.type === 'text' ? <Hash className="mr-2 h-5 w-5" /> : <Volume2 className="mr-2 h-5 w-5" />}
                            {activeChannel.name}
                        </h2>
                    </header>
                    <ScrollArea className="flex-1 p-4">
                        {activeChannel.type === 'text' && messages[activeChannel.id]?.map((message) => (
                            <div key={message.id} className="mb-4">
                                <div className="flex items-start">
                                    <UserAvatar name={message.user} />
                                    <div>
                                        <div className="flex items-baseline">
                                            <UserProfileTrigger name={message.user} users={users}>
                                                <span className="font-semibold mr-2 cursor-pointer hover:underline">{message.user}</span>
                                            </UserProfileTrigger>
                                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                                        </div>
                                        <p>{message.content}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {activeChannel.type === 'voice' && (
                            <div className="flex flex-col items-center justify-center h-full">
                                <h3 className="text-xl font-semibold mb-4">Voice Channel: {activeChannel.name}</h3>
                                <p className="text-muted-foreground mb-4">Click to join the voice chat</p>
                                <Button>
                                    <Phone className="mr-2 h-4 w-4" />
                                    Join Voice
                                </Button>
                            </div>
                        )}
                    </ScrollArea>
                    {activeChannel.type === 'text' && (
                        <form onSubmit={handleSendMessage} className="p-4 border-t">
                            <div className="flex items-center">
                                <Input
                                    type="text"
                                    placeholder={`Message #${activeChannel.name}`}
                                    value={inputMessage}
                                    onChange={(e) => setInputMessage(e.target.value)}
                                    className="flex-1"
                                />
                                <Button type="submit" className="ml-2">Send</Button>
                            </div>
                        </form>
                    )}
                </main>

                {/* Users Sidebar */}
                <aside className="w-64 bg-muted border-l">
                    <ScrollArea className="h-full">
                        <div className="p-4">
                            <h2 className="mb-4 text-sm font-semibold text-muted-foreground">ONLINE — {users.filter(u => u.status === 'online').length}</h2>
                            {users.filter(u => u.status === 'online').map((user) => (
                                <UserItem key={user.id} user={user} />
                            ))}
                            <h2 className="my-4 text-sm font-semibold text-muted-foreground">OFFLINE — {users.filter(u => u.status === 'offline').length}</h2>
                            {users.filter(u => u.status === 'offline').map((user) => (
                                <UserItem key={user.id} user={user} />
                            ))}
                        </div>
                    </ScrollArea>
                </aside>

                {/* New Channel Dialog */}
                <Dialog open={showNewChannelDialog} onOpenChange={setShowNewChannelDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a new channel</DialogTitle>
                            <DialogDescription>
                                Enter a name for your new channel and select its type.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="name" className="text-right">
                                    Name
                                </label>
                                <Input
                                    id="name"
                                    value={newChannelName}
                                    onChange={(e) => setNewChannelName(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="type" className="text-right">
                                    Type
                                </label>
                                <select
                                    id="type"
                                    value={newChannelType}
                                    onChange={(e) => setNewChannelType(e.target.value as 'text' | 'voice')}
                                    className="col-span-3"
                                >
                                    <option value="text">Text Channel</option>
                                    <option value="voice">Voice Channel</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateNewChannel}>Create Channel</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* New Category Dialog */}
                <Dialog open={showNewCategoryDialog} onOpenChange={setShowNewCategoryDialog}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create a new category</DialogTitle>
                            <DialogDescription>
                                Enter a name for your new category.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <label htmlFor="category-name" className="text-right">
                                    Name
                                </label>
                                <Input
                                    id="category-name"
                                    value={newCategoryName}
                                    onChange={(e) => setNewCategoryName(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleCreateNewCategory}>Create Category</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            {/* <Footer /> */}
        </>
    )
}

function ChannelButton({ icon, name, active = false, onClick }: { icon: React.ReactNode, name: string, active?: boolean, onClick: () => void }) {
    return (
        <Button
            variant="ghost"
            className={`w-full justify-start mb-1 ${active ? 'bg-accent text-accent-foreground' : ''}`}
            onClick={onClick}
        >
            {icon}
            <span className="ml-2">{name}</span>
        </Button>
    )
}

function UserControls() {
    return (
        <div className="p-2 border-t bg-background flex items-center">
            <Avatar className="w-8 h-8 mr-2">

                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <div className="font-semibold">User</div>
                <div className="text-xs text-muted-foreground">#1234</div>
            </div>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mic className="h-4 w-4" />
                            <span className="sr-only">Toggle Mic</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Toggle Microphone</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Video className="h-4 w-4" />
                            <span className="sr-only">Toggle Video</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Toggle Video</p>
                    </TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Settings className="h-4 w-4" />
                            <span className="sr-only">Settings</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Settings</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    )
}

function UserItem({ user }: { user: User }) {
    return (
        <div className="flex items-center mb-2">
            <UserAvatar name={user.name} />
            <UserProfileTrigger name={user.name} users={[user]}>
                <span className="flex-1 ml-2 cursor-pointer hover:underline">{user.name}</span>
            </UserProfileTrigger>
            <span className={`w-2 h-2 rounded-full ${user.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
        </div>
    )
}

function UserAvatar({ name }: { name: string }) {
    return (
        <Avatar className="w-8 h-8 mr-2">
            <AvatarFallback>{name[0]}</AvatarFallback>
        </Avatar>
    )
}

function UserProfileTrigger({ name, users, children }: { name: string, users: User[], children: React.ReactNode }) {
    const user = users.find(u => u.name === name)

    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                </DialogHeader>
                {user && (
                    <div className="flex items-center space-x-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={user.picture} />
                            <AvatarFallback>{user.name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="text-lg font-semibold">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.role}</p>
                            <p className="text-sm">Status: {user.status}</p>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    )
}