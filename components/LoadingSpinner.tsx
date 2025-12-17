'use client'

import React from 'react'
import { Capacitor } from '@capacitor/core'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  text?: string
  fullScreen?: boolean
  className?: string
  color?: 'blue' | 'emerald'
}

// Animated logo URL - consistent across the app
const LOADING_LOGO_URL = 'https://jtrxdcccswdwlritgstp.supabase.co/storage/v1/object/public/contractor-logos/RushrLogoAnimation.gif'

// Universal Full-Screen Loading Component - Pure white background with animated logo
// Matches the iOS native splash screen exactly - no safe area padding to avoid colored gaps
export function FullScreenLoading() {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFFFFF',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999
      }}
    >
      <img
        src={LOADING_LOGO_URL}
        alt="Loading..."
        style={{ width: 64, height: 64, objectFit: 'contain' }}
      />
    </div>
  )
}

// Rushr logo URL
const RUSHR_LOGO_URL = 'https://jtrxdcccswdwlritgstp.supabase.co/storage/v1/object/public/contractor-logos/Rushr%20Logo%20Vector.svg'

// iOS Native Loading Component - Splash style with pulsing logo
function IOSNativeLoader({ size = 'lg', text }: { size?: 'sm' | 'md' | 'lg' | 'xl', text?: string }) {
  const logoSizes = {
    sm: 64,
    md: 80,
    lg: 96,
    xl: 112
  }

  const logoSize = logoSizes[size]

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: logoSize, height: logoSize }}>
        {/* Pulsing background - matches splash screen */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: 'rgba(255,255,255,0.2)',
            animation: 'rushr-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
          }}
        />
        {/* White container with logo */}
        <div
          className="relative bg-white rounded-3xl flex items-center justify-center shadow-2xl"
          style={{ width: logoSize, height: logoSize, padding: logoSize * 0.125 }}
        >
          <img
            src={RUSHR_LOGO_URL}
            alt="Rushr"
            className="w-full h-full object-contain"
          />
        </div>
      </div>
      {text && (
        <p className="text-white/80 text-sm mt-4">{text}</p>
      )}
      <style jsx>{`
        @keyframes rushr-ping {
          0% { transform: scale(1); opacity: 0.8; }
          75%, 100% { transform: scale(1.3); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
  fullScreen = false,
  className = '',
  color = 'blue'
}: LoadingSpinnerProps) {
  const isNative = typeof window !== 'undefined' && Capacitor.isNativePlatform()

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  // iOS Native: Green gradient fullscreen with pulsing Rushr logo (matches splash)
  if (isNative) {
    if (fullScreen) {
      return (
        <div
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'linear-gradient(160deg, #10b981 0%, #059669 50%, #047857 100%)' }}
        >
          <IOSNativeLoader size={size} text={text} />
        </div>
      )
    }

    return (
      <div
        className={`min-h-screen flex items-center justify-center ${className}`}
        style={{ background: 'linear-gradient(160deg, #10b981 0%, #059669 50%, #047857 100%)' }}
      >
        <IOSNativeLoader size={size} text={text} />
      </div>
    )
  }

  // Web: Original behavior with text
  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <img
        src="https://jtrxdcccswdwlritgstp.supabase.co/storage/v1/object/public/contractor-logos/RushrLogoAnimation.gif"
        alt="Loading..."
        className={`${sizeClasses[size]} object-contain`}
      />
      {text && (
        <p className={`${textSizes[size]} text-gray-600 font-medium`}>
          {text}
        </p>
      )}
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50">
        {spinner}
      </div>
    )
  }

  return spinner
}

// Inline loading spinner for buttons
export function ButtonSpinner({ className = 'w-5 h-5' }: { className?: string }) {
  const isNative = typeof window !== 'undefined' && Capacitor.isNativePlatform()

  if (isNative) {
    // iOS: Simple white spinner for buttons
    return (
      <div className={`${className} relative`}>
        <div className="absolute inset-0 rounded-full border-2 border-white/30 border-t-white animate-spin" />
      </div>
    )
  }

  return (
    <img
      src="https://jtrxdcccswdwlritgstp.supabase.co/storage/v1/object/public/contractor-logos/RushrLogoAnimation.gif"
      alt="Loading..."
      className={`${className} object-contain`}
    />
  )
}

// Page loading wrapper - iOS native aware
export function PageLoading({ children, isLoading, loadingText = 'Loading...' }: {
  children: React.ReactNode
  isLoading: boolean
  loadingText?: string
}) {
  const isNative = typeof window !== 'undefined' && Capacitor.isNativePlatform()

  if (isLoading) {
    if (isNative) {
      // iOS: Green gradient fullscreen with pulsing Rushr logo (matches splash)
      return (
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: 'linear-gradient(160deg, #10b981 0%, #059669 50%, #047857 100%)' }}
        >
          <IOSNativeLoader size="lg" text={loadingText} />
        </div>
      )
    }

    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text={loadingText} />
      </div>
    )
  }

  return <>{children}</>
}

// Dedicated iOS native loading screen component - Green gradient splash style
export function IOSLoadingScreen({ size = 'lg', text }: { size?: 'sm' | 'md' | 'lg' | 'xl', text?: string }) {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #10b981 0%, #059669 50%, #047857 100%)' }}
    >
      <IOSNativeLoader size={size} text={text} />
    </div>
  )
}
