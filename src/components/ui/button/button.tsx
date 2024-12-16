import React from 'react'
import { ButtonProps } from './button.types'

export const Button = ({ children, onClick, className }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 w-full py-2 bg-[#2A59FE] text-white rounded-[4px] text-base ${
        className || ''
      }`}
    >
      {children}
    </button>
  )
}
