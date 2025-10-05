"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { VoiceInput } from "@/components/ui/VoiceInput"
import Link from "next/link"
import { MdArrowBack, MdArrowForward, MdCheck } from "react-icons/md"

const steps = [
  {
    id: "welcome",
    title: "Welcome to NexImpact",
    description: "The world's first AI-powered global impact marketplace"
  },
  {
    id: "purpose",
    title: "Speak Your Purpose",
    description: "Tell us what impact you want to make in the world"
  },
  {
    id: "skills",
    title: "Your Skills",
    description: "Let's match your abilities with global challenges"
  },
  {
    id: "preferences",
    title: "Set Your Preferences",
    description: "Customize your experience"
  },
  {
    id: "complete",
    title: "You're All Set!",
    description: "Ready to make an impact"
  }
]

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(0)
  const [transcript, setTranscript] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [preferences, setPreferences] = useState({
    regions: [] as string[],
    categories: [] as string[],
    remote: true,
    notifications: true
  })

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleTranscript = (text: string) => {
    setTranscript(text)
    
    // Simulate AI processing of the transcript
    setTimeout(() => {
      // Extract skills based on the transcript
      const extractedSkills = ["Web Development", "Data Analysis", "Project Management"]
      setSkills(extractedSkills)
      
      // Move to next step after processing
      handleNext()
    }, 2000)
  }

  const handleSkillToggle = (skill: string) => {
    if (skills.includes(skill)) {
      setSkills(skills.filter(s => s !== skill))
    } else {
      setSkills([...skills, skill])
    }
  }

  const handlePreferenceToggle = (type: 'regions' | 'categories', value: string) => {
    if (preferences[type].includes(value)) {
      setPreferences({
        ...preferences,
        [type]: preferences[type].filter(item => item !== value)
      })
    } else {
      setPreferences({
        ...preferences,
        [type]: [...preferences[type], value]
      })
    }
  }

  const handleBooleanPreference = (key: 'remote' | 'notifications') => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key]
    })
  }

  // Animation variants
  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-impact-blue to-purpose-purple flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800">
          <motion.div 
            className="h-full bg-impact-blue"
            initial={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <div className="p-8 md:p-12">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <Link href="/" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <span className="sr-only">Back to home</span>
              <MdArrowBack className="h-6 w-6" />
            </Link>
            
            <div className="flex items-center gap-2">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep 
                      ? "bg-impact-blue" 
                      : index < currentStep 
                        ? "bg-green-500" 
                        : "bg-gray-300 dark:bg-gray-700"
                  }`}
                  initial={{ scale: index === currentStep ? 1.5 : 1 }}
                  animate={{ scale: index === currentStep ? 1.5 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            
            <div className="w-6" />
          </div>
          
          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="min-h-[400px]"
            >
              {currentStep === 0 && (
                <div className="text-center">
                  <h1 className="text-4xl font-bold gradient-text mb-6">
                    {steps[currentStep].title}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                    {steps[currentStep].description}
                  </p>
                  
                  <div className="max-w-md mx-auto">
                    <p className="text-gray-600 dark:text-gray-400 mb-8">
                      Join thousands of skilled individuals already creating positive change around the world.
                    </p>
                    
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={handleNext}
                    >
                      Get Started
                    </Button>
                    
                    <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                      Already have an account? <Link href="/login" className="text-impact-blue hover:underline">Sign in</Link>
                    </p>
                  </div>
                </div>
              )}
              
              {currentStep === 1 && (
                <div className="text-center">
                  <h1 className="text-4xl font-bold gradient-text mb-6">
                    {steps[currentStep].title}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                    {steps[currentStep].description}
                  </p>
                  
                  <VoiceInput 
                    onTranscript={handleTranscript}
                    placeholder="Tap the microphone and tell us what impact you want to make..."
                    className="mb-8"
                  />
                  
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
                    Or skip voice input and continue manually
                  </p>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleNext}
                  >
                    Continue Manually
                  </Button>
                </div>
              )}
              
              {currentStep === 2 && (
                <div>
                  <h1 className="text-3xl font-bold gradient-text mb-6">
                    {steps[currentStep].title}
                  </h1>
                  
                  {transcript && (
                    <div className="mb-8 p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Based on what you told us:</p>
                      <p className="text-gray-700 dark:text-gray-300 italic">"{transcript}"</p>
                    </div>
                  )}
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    We've identified these skills. Please confirm or modify:
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
                    {["Web Development", "Mobile Development", "Data Science", "AI/ML", "Design", "Project Management", "Content Creation", "Marketing", "Education", "Healthcare", "Environmental Science"].map((skill) => (
                      <Button
                        key={skill}
                        variant={skills.includes(skill) ? "primary" : "outline"}
                        size="sm"
                        onClick={() => handleSkillToggle(skill)}
                        icon={skills.includes(skill) ? <MdCheck className="h-4 w-4" /> : undefined}
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button onClick={handleNext}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div>
                  <h1 className="text-3xl font-bold gradient-text mb-6">
                    {steps[currentStep].title}
                  </h1>
                  
                  <div className="space-y-8 mb-8">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Regions of Interest</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Africa", "Asia", "Europe", "North America", "South America", "Oceania", "Global"].map((region) => (
                          <Button
                            key={region}
                            variant={preferences.regions.includes(region) ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => handlePreferenceToggle('regions', region)}
                          >
                            {region}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Impact Categories</h3>
                      <div className="flex flex-wrap gap-2">
                        {["Education", "Health", "Environment", "Poverty", "Equality", "Infrastructure", "Innovation", "Peace", "Partnerships"].map((category) => (
                          <Button
                            key={category}
                            variant={preferences.categories.includes(category) ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => handlePreferenceToggle('categories', category)}
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Available for remote work</span>
                        <Button
                          variant={preferences.remote ? "primary" : "outline"}
                          size="sm"
                          onClick={() => handleBooleanPreference('remote')}
                        >
                          {preferences.remote ? "Yes" : "No"}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span>Receive notifications</span>
                        <Button
                          variant={preferences.notifications ? "primary" : "outline"}
                          size="sm"
                          onClick={() => handleBooleanPreference('notifications')}
                        >
                          {preferences.notifications ? "Yes" : "No"}
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button onClick={handleNext}>
                      Continue
                    </Button>
                  </div>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="text-center">
                  <div className="mb-8 flex justify-center">
                    <div className="h-24 w-24 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <MdCheck className="h-12 w-12 text-green-600 dark:text-green-400" />
                    </div>
                  </div>
                  
                  <h1 className="text-4xl font-bold gradient-text mb-6">
                    {steps[currentStep].title}
                  </h1>
                  <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
                    Your profile is ready. Start exploring impact projects that match your skills and interests.
                  </p>
                  
                  <div className="max-w-md mx-auto">
                    <Button 
                      size="lg" 
                      className="w-full"
                      onClick={() => window.location.href = '/dashboard'}
                    >
                      Go to Dashboard <MdArrowForward className="ml-2" />
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}