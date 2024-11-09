'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { sendOTP, verifyOTP } from '@/apiCalls/allApiCalls'
import { message } from 'react-message-popup'
import { avatarOptions } from '@/utils/mobileSignUtils'
import { onSubmitPhone, onSubmitOtp, onSubmitProfile } from '@/utils/mobileSignUtils'
import { GoogleLogin } from "@react-oauth/google";
import { googlesignup } from '@/apiCalls/allApiCalls'
import { Sun, Moon } from "lucide-react"
import Cookies from 'js-cookie';

export default function Page() {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [otp, setOtp] = useState('')
  const [name, setName] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('/avatar1.png')
  const [step, setStep] = useState(1)
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    const savedTheme = Cookies.get('theme');
    if (savedTheme) {
      setIsDarkMode(savedTheme === 'dark');
      document.body.classList.toggle('dark', savedTheme === 'dark');
    } else {
      setIsDarkMode(false);
      document.body.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    Cookies.set('theme', newTheme ? 'dark' : 'light', { expires: 7 });
    document.body.classList.toggle('dark', newTheme);
    window.location.reload();
  };


  const success = async (credentialResponse: any) => {
    message.loading('working...', 24000).then(async ({ destory }: any) => {
      const data = await googlesignup(credentialResponse);
      if (data?.success) {
        destory();
        message.success('Login successful 🎉', 4000);
        window.location.href = "/";
      } else {
        destory();
        message.error('Error 😪😯', 4000);
      }
    })
  };

  return (

    <div className={`min-h-screen w-full py-6 sm:py-12 lg:py-24 px-4 sm:px-6 overflow-hidden relative transition-all ${isDarkMode ? 'bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white' : 'bg-gradient-to-br from-blue-50 via-blue-100 to-indigo-200 text-gray-900'}`}>
      <div className="w-full h-full">
        <motion.div
          className="mx-auto flex w-full flex-col justify-center items-center space-y-6 sm:w-[350px]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col space-y-2 text-center">
            <motion.h1
              className="text-2xl sm:text-3xl font-bold tracking-tight"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Create an Account
            </motion.h1>
            <motion.p
              className={`text-sm transition-colors ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {step === 1 && "Enter your phone number to get started"}
              {step === 3 && "Enter the OTP sent to your Whatsapp number"}
              {step === 2 && "Complete your profile"}
            </motion.p>
          </div>
          <motion.div
            className="grid gap-6 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {step === 1 && (
              <form onSubmit={(e) => onSubmitPhone(e, phoneNumber, message, setIsLoading, sendOTP, setStep)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`} htmlFor="phone">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      placeholder="8800800305"
                      type="tel"
                      autoCapitalize="none"
                      autoComplete="tel"
                      autoCorrect="off"
                      disabled={isLoading}
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className={`bg-transparent border focus:ring-2 ${isDarkMode ? 'border-gray-600 focus:ring-indigo-400 text-white' : 'border-gray-200 focus:ring-indigo-500 text-gray-900'}`}
                    />
                  </div>
                  <Button disabled={isLoading} className={`hover:bg-indigo-700 ${isDarkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'}`}>
                    Send OTP
                  </Button>
                </div>
              </form>
            )}
            {step === 3 && (
              <form onSubmit={(e) => onSubmitOtp(e, setIsLoading, otp, message, verifyOTP, phoneNumber, selectedAvatar, name)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Input
                      id="otp"
                      placeholder="Enter OTP"
                      type="text"
                      disabled={isLoading}
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className={`bg-transparent border focus:ring-2 ${isDarkMode ? 'border-gray-600 focus:ring-indigo-400 text-white' : 'border-gray-200 focus:ring-indigo-500 text-gray-900'}`}
                    />
                  </div>
                  <Button disabled={isLoading} className={`hover:bg-indigo-700 ${isDarkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'}`}>
                    Verify OTP
                  </Button>
                </div>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={(e) => onSubmitProfile(e, name, setStep, message)}>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`} htmlFor="name">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      type="text"
                      disabled={isLoading}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`bg-transparent border focus:ring-2 ${isDarkMode ? 'border-gray-600 focus:ring-indigo-400 text-white' : 'border-gray-200 focus:ring-indigo-500 text-gray-900'}`}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className={`${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Choose an Avatar
                    </Label>
                    <RadioGroup
                      value={selectedAvatar}
                      onValueChange={setSelectedAvatar}
                      className="flex flex-wrap justify-center gap-4"
                    >
                      {avatarOptions.map((avatar, index) => (
                        <div key={index} className="flex flex-col items-center">
                          <RadioGroupItem
                            value={avatar}
                            id={`avatar-${index}`}
                            className="sr-only"
                          />
                          <Label
                            htmlFor={`avatar-${index}`}
                            className="cursor-pointer"
                          >
                            <Avatar className={`w-12 h-12 sm:w-16 sm:h-16 border-2 transition-all ${selectedAvatar === avatar ? 'border-indigo-600' : 'border-transparent'
                              }`}>
                              <AvatarImage src={avatar} alt={`Avatar option ${index + 1}`} />
                              <AvatarFallback>Avatar {index + 1}</AvatarFallback>
                            </Avatar>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                  <Button disabled={isLoading} className={`hover:bg-indigo-700 ${isDarkMode ? 'bg-indigo-500 text-white' : 'bg-indigo-600 text-white'}`}>
                    Create Profile
                  </Button>
                </div>
              </form>
            )}
            {step === 1 && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-gray-300 dark:border-gray-600"></span>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-black">OR</span>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <GoogleLogin
                    width="100%"
                    size="large"
                    text="continue_with"
                    onSuccess={success}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
      <motion.button
        className={`fixed bottom-4 right-4 p-3 rounded-full shadow-lg ${isDarkMode ? 'bg-yellow-400 text-gray-900' : 'bg-gray-800 text-white'}`}
        onClick={toggleTheme}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
      </motion.button>
    </div>

  )
}