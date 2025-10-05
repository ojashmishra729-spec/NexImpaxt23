"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "glass" | "outline"
  isHoverable?: boolean
  isFlippable?: boolean
}

export function Card({
  className,
  variant = "default",
  isHoverable = false,
  isFlippable = false,
  children,
  ...props
}: CardProps) {
  const variants = {
    default: "bg-white dark:bg-slate-900 shadow-md",
    glass: "glassmorphism",
    outline: "border border-gray-200 dark:border-gray-800",
  }

  return (
    <motion.div
      className={cn(
        "rounded-2xl p-6",
        variants[variant],
        isHoverable && "card-hover",
        className
      )}
      whileHover={isHoverable ? { y: -5, scale: 1.02 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  )
}