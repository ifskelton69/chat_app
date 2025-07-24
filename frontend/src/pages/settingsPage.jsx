import React from 'react'
import { useTheme } from '../store/useTheme'
import { THEMES } from '../constants/index.js'
import { Check, Palette, MessageCircle } from 'lucide-react'

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How are you?", isSent: false },
  { id: 2, content: "I'm doing great! Thanks for asking 😊", isSent: true },
  { id: 3, content: "That's awesome!", isSent: false },
]

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='min-h-screen pt-20 pb-10'>
      <div className='container mx-auto px-4 max-w-6xl'>
        <div className='space-y-8'>
          {/* Header */}
          <div className='text-center space-y-2'>
            <div className='flex items-center justify-center gap-2 mb-4'>
              <Palette className='w-8 h-8 text-primary' />
              <h1 className='text-3xl font-bold'>Appearance Settings</h1>
            </div>
            <p className='text-base-content/70 text-lg'>
              Customize your chat experience with beautiful themes
            </p>
          </div>

          {/* Current Theme Info */}
          <div className='bg-base-200 rounded-2xl p-6'>
            <div className='flex items-center gap-3 mb-4'>
              <div className='w-4 h-4 rounded-full bg-primary'></div>
              <h2 className='text-xl font-semibold'>
                Current Theme: {theme.charAt(0).toUpperCase() + theme.slice(1)}
              </h2>
            </div>
            
            {/* Chat Preview */}
            <div className='bg-base-100 rounded-xl p-4 space-y-3'>
              <div className='flex items-center gap-2 mb-3'>
                <MessageCircle className='w-4 h-4 text-primary' />
                <span className='text-sm font-medium text-base-content/70'>Preview</span>
              </div>
              {PREVIEW_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-2xl ${
                      message.isSent
                        ? 'bg-primary text-primary-content rounded-br-md'
                        : 'bg-base-200 text-base-content rounded-bl-md'
                    }`}
                  >
                    <p className='text-sm'>{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Theme Selection */}
          <div className='bg-base-200 rounded-2xl p-6'>
            <h2 className='text-xl font-semibold mb-6 flex items-center gap-2'>
              <span>Choose Your Theme</span>
              <span className='text-sm text-base-content/50'>({THEMES.length} available)</span>
            </h2>
            
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4'>
              {THEMES.map((t) => (
                <button
                  key={t}
                  className={`
                    group relative flex flex-col items-center gap-3 p-4 rounded-xl 
                    transition-all duration-200 hover:scale-105
                    ${theme === t 
                      ? "bg-primary/10 ring-2 ring-primary shadow-lg" 
                      : "bg-base-100 hover:bg-base-300 hover:shadow-md"
                    }
                  `}
                  onClick={() => setTheme(t)}
                >
                  {/* Selected indicator */}
                  {theme === t && (
                    <div className='absolute -top-2 -right-2 bg-primary text-primary-content w-6 h-6 rounded-full flex items-center justify-center'>
                      <Check className='w-3 h-3' />
                    </div>
                  )}
                  
                  {/* Color Preview */}
                  <div className='relative w-full h-12 rounded-lg overflow-hidden' data-theme={t}>
                    <div className='absolute inset-0 grid grid-cols-4 gap-1 p-1'>
                      <div className='rounded bg-primary'></div>
                      <div className='rounded bg-secondary'></div>
                      <div className='rounded bg-accent'></div>
                      <div className='rounded bg-neutral'></div>
                    </div>
                  </div>
                  
                  {/* Theme Name */}
                  <span className={`
                    text-xs font-medium text-center w-full
                    ${theme === t ? "text-primary font-semibold" : "text-base-content/70"}
                  `}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Popular Themes Section */}
          <div className='bg-base-200 rounded-2xl p-6'>
            <h3 className='text-lg font-semibold mb-4'>Popular Themes</h3>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
              {['dark', 'light', 'dracula', 'cyberpunk'].map((popularTheme) => (
                <button
                  key={popularTheme}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg transition-all
                    ${theme === popularTheme 
                      ? "bg-primary text-primary-content" 
                      : "bg-base-100 hover:bg-base-300"
                    }
                  `}
                  onClick={() => setTheme(popularTheme)}
                >
                  <div className='w-6 h-6 rounded-full' data-theme={popularTheme}>
                    <div className='w-full h-full rounded-full bg-primary'></div>
                  </div>
                  <span className='font-medium'>
                    {popularTheme.charAt(0).toUpperCase() + popularTheme.slice(1)}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Categories */}
          <div className='grid md:grid-cols-2 gap-6'>
            {/* Light Themes */}
            <div className='bg-base-200 rounded-2xl p-6'>
              <h3 className='text-lg font-semibold mb-4'>Light Themes</h3>
              <div className='space-y-2'>
                {['light', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'garden', 'lofi', 'pastel', 'fantasy', 'wireframe', 'cmyk', 'autumn', 'acid', 'lemonade', 'winter'].map((lightTheme) => (
                  <button
                    key={lightTheme}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg transition-all
                      ${theme === lightTheme 
                        ? "bg-primary text-primary-content" 
                        : "hover:bg-base-100"
                      }
                    `}
                    onClick={() => setTheme(lightTheme)}
                  >
                    {lightTheme.charAt(0).toUpperCase() + lightTheme.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Dark Themes */}
            <div className='bg-base-200 rounded-2xl p-6'>
              <h3 className='text-lg font-semibold mb-4'>Dark Themes</h3>
              <div className='space-y-2'>
                {['dark', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'forest', 'aqua', 'black', 'luxury', 'dracula', 'business', 'night', 'coffee', 'dim', 'nord', 'sunset'].map((darkTheme) => (
                  <button
                    key={darkTheme}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg transition-all
                      ${theme === darkTheme 
                        ? "bg-primary text-primary-content" 
                        : "hover:bg-base-100"
                      }
                    `}
                    onClick={() => setTheme(darkTheme)}
                  >
                    {darkTheme.charAt(0).toUpperCase() + darkTheme.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage