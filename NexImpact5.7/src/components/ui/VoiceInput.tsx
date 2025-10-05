"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./Button"
import { MdMic, MdMicOff } from "react-icons/md"

interface VoiceInputProps {
  onTranscript?: (transcript: string) => void
  placeholder?: string
  className?: string
}

export function VoiceInput({ 
  onTranscript, 
  placeholder = "Speak your purpose...",
  className 
}: VoiceInputProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")

  // Simulate speech recognition since we can't use the actual API in this environment
  const simulateSpeechRecognition = () => {
    setIsListening(true)
    
    // Simulate processing time
    const timer = setTimeout(() => {
      // Mock transcript - in a real app, this would come from the Web Speech API
      const mockTranscripts = [
        "I want to help with education projects in rural areas",
        "Looking for climate change initiatives to contribute to",
        "I'd like to use my coding skills for healthcare solutions",
        "Searching for community development projects in Asia"
      ]
      
      const newTranscript = mockTranscripts[Math.floor(Math.random() * mockTranscripts.length)]
      setTranscript(newTranscript)
      
      if (onTranscript) {
        onTranscript(newTranscript)
      }
      
      setIsListening(false)
    }, 3000)
    
    return () => clearTimeout(timer)
  }

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false)
    } else {
      simulateSpeechRecognition()
    }
  }

  return (
    <div className={`flex flex-col items-center w-full max-w-md mx-auto ${className}`}>
      <motion.div 
        className="relative w-full mb-4 p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-900"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-gray-500 dark:text-gray-400 min-h-[24px]">
          {transcript || placeholder}
        </p>
        
        <AnimatePresence>
          {isListening && (
            <motion.div 
              className="absolute bottom-2 left-1/2 transform -translate-x-1/2 waveform"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {[...Array(9)].map((_, i) => (
                <div key={i} className="waveform-bar" />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <Button
        variant={isListening ? "secondary" : "primary"}
        size="lg"
        onClick={toggleListening}
        icon={isListening ? <MdMicOff /> : <MdMic />}
        className="rounded-full w-16 h-16 flex items-center justify-center p-0"
      >
        <span className="sr-only">{isListening ? "Stop listening" : "Start listening"}</span>
      </Button>
      
      <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
        {isListening ? "Listening..." : "Tap to speak"}
      </p>
    </div>
  )
}