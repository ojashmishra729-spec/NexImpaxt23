"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Card } from "@/components/ui/Card"
import { VoiceInput } from "@/components/ui/VoiceInput"
import WalletSummary from "@/components/wallet/WalletSummary"
import { api, Problem } from "@/lib/data"
import { MdSearch, MdFilterList, MdLocationOn, MdPeople, MdAccessTime, MdArrowForward } from "react-icons/md"

export default function Dashboard() {
  const [problems, setProblems] = useState<Problem[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    category: "",
    region: "",
    urgency: ""
  })
  const [showFilters, setShowFilters] = useState(false)
  const [userProfile, setUserProfile] = useState<any>(null)
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const problemsData = await api.getProblems(filters)
      const userData = await api.getUserProfile()
      setProblems(problemsData)
      setUserProfile(userData)
      setLoading(false)
    }
    
    fetchData()
  }, [filters])
  
  const handleFilterChange = (key: string, value: string) => {
    setFilters({
      ...filters,
      [key]: value === filters[key] ? "" : value // Toggle filter if already selected
    })
  }
  
  const handleVoiceCommand = (text: string) => {
    // Simple voice command processing
    const lowerText = text.toLowerCase()
    
    if (lowerText.includes("show") || lowerText.includes("find")) {
      // Extract category from voice command
      const categories = ["health", "education", "environment", "poverty", "equality"]
      const foundCategory = categories.find(cat => lowerText.includes(cat))
      
      if (foundCategory) {
        setFilters({
          ...filters,
          category: foundCategory.charAt(0).toUpperCase() + foundCategory.slice(1)
        })
      }
    }
  }
  
  const handleAIRecommendations = async () => {
    setLoading(true)
    
    // Simulate AI processing delay
    setTimeout(() => {
      // Filter problems based on user skills
      const recommendedProblems = problems.filter((_, index) => index % 2 === 0)
      setProblems(recommendedProblems)
      setLoading(false)
    }, 1000)
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-impact-blue">NexImpact</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {userProfile && (
                <>
                  <div className="flex items-center">
                    <div className="mr-4 text-right hidden sm:block">
                      <p className="font-medium">{userProfile.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{userProfile.impactPoints} Impact Points</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url(${userProfile.avatar})` }} />
                  </div>
                  <div className="ml-4 w-48">
                    <WalletSummary 
                      impactPoints={userProfile.impactPoints} 
                      pendingRewards={userProfile.pendingRewards || 2} 
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero section with voice input */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-impact-blue to-purpose-purple rounded-3xl p-8 text-white">
            <div className="max-w-3xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Discover Impact Projects
              </h1>
              <p className="text-lg mb-8 opacity-90">
                Use your skills to solve real-world problems and make a global impact
              </p>
              
              <div className="mb-6">
                <VoiceInput 
                  placeholder="Speak to search projects or use commands..."
                  onTranscript={handleVoiceCommand}
                  className="bg-white bg-opacity-10 border-white border-opacity-20"
                />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <Button 
                  variant="light"
                  onClick={handleAIRecommendations}
                >
                  Suggest Tasks for Me
                </Button>
                
                <Button 
                  variant="outline" 
                  className="text-white border-white border-opacity-50 hover:bg-white hover:bg-opacity-10"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <MdFilterList className="mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Filters */}
        {showFilters && (
          <motion.section 
            className="mb-8"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Filter Projects</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="font-medium mb-3">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Health", "Education", "Environment", "Poverty", "Equality"].map((category) => (
                      <Button
                        key={category}
                        variant={filters.category === category ? "primary" : "outline"}
                        size="sm"
                        onClick={() => handleFilterChange("category", category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Regions</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Africa", "Asia", "Europe", "North America", "South America"].map((region) => (
                      <Button
                        key={region}
                        variant={filters.region === region ? "primary" : "outline"}
                        size="sm"
                        onClick={() => handleFilterChange("region", region)}
                      >
                        {region}
                      </Button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-3">Urgency</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Low", "Medium", "High"].map((urgency) => (
                      <Button
                        key={urgency}
                        variant={filters.urgency === urgency ? "primary" : "outline"}
                        size="sm"
                        onClick={() => handleFilterChange("urgency", urgency)}
                      >
                        {urgency}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </motion.section>
        )}
        
        {/* Projects Grid */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {filters.category || filters.region || filters.urgency 
                ? "Filtered Projects" 
                : "Discover Impact Projects"}
            </h2>
            
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Showing {problems.length} projects
            </div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 dark:bg-gray-700 h-48 rounded-t-xl"></div>
                  <div className="bg-white dark:bg-slate-800 p-4 rounded-b-xl">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-3 w-3/4"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 w-1/2"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-4 w-full"></div>
                    <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : problems.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500 dark:text-gray-400 mb-4">No projects match your filters</p>
              <Button onClick={() => setFilters({ category: "", region: "", urgency: "" })}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {problems.map((problem) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div 
                      className="h-48 bg-cover bg-center"
                      style={{ backgroundImage: `url(${problem.image})` }}
                    >
                      <div className="h-full w-full bg-black bg-opacity-20 p-4 flex items-start justify-between">
                        <span className="px-3 py-1 bg-purpose-purple rounded-full text-sm font-medium text-white">
                          {problem.category}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium text-white ${
                          problem.urgency === "High" 
                            ? "bg-red-500" 
                            : problem.urgency === "Medium" 
                              ? "bg-yellow-500" 
                              : "bg-green-500"
                        }`}>
                          {problem.urgency} Urgency
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-bold mb-2">{problem.title}</h3>
                      
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                        <MdLocationOn className="mr-1" />
                        <span>{problem.location}</span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                        {problem.description}
                      </p>
                      
                      <div className="mt-auto">
                        <div className="flex justify-between text-sm mb-2">
                          <div className="flex items-center">
                            <MdPeople className="mr-1 text-impact-blue" />
                            <span>{problem.solvers} Solvers</span>
                          </div>
                          <div className="flex items-center">
                            <MdAccessTime className="mr-1 text-impact-blue" />
                            <span>{problem.progress}% Complete</span>
                          </div>
                        </div>
                        
                        <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-4">
                          <div 
                            className="h-full bg-impact-blue rounded-full"
                            style={{ width: `${problem.progress}%` }}
                          ></div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="block text-sm text-gray-500 dark:text-gray-400">Impact Points</span>
                            <span className="font-bold text-impact-blue">{problem.impactPoints}</span>
                          </div>
                          
                          <Link href={`/problems/${problem.id}`}>
                            <Button>
                              View Details <MdArrowForward className="ml-1" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}