"use client"

import { motion } from "framer-motion"
import React from "react"
import { cn } from "@/lib/utils"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  isLoading?: boolean
  icon?: React.ReactNode
  iconPosition?: "left" | "right"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    children, 
    variant = "primary", 
    size = "md", 
    isLoading = false,
    icon,
    iconPosition = "left",
    ...props 
  }, ref) => {
    const variants = {
      primary: "bg-impact-blue hover:bg-impact-blue/90 text-white",
      secondary: "bg-purpose-purple hover:bg-purpose-purple/90 text-white",
      accent: "bg-sunrise-gold hover:bg-sunrise-gold/90 text-gray-900",
      outline: "border border-impact-blue text-impact-blue hover:bg-impact-blue/10",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300",
    }

    const sizes = {
      sm: "h-9 px-3 text-sm rounded-xl",
      md: "h-11 px-5 rounded-xl",
      lg: "h-14 px-8 text-lg rounded-2xl",
    }

    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-impact-blue disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        whileTap={{ scale: 0.98 }}
        whileHover={{ y: -2 }}
        {...props}
      >
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </span>
        )}
        <span className={cn("flex items-center gap-2", isLoading && "opacity-0")}>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </span>
      </motion.button>
    )
  }
)

Button.displayName = "Button"

export { Button }