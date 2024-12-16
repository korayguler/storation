import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { jest } from '@jest/globals'
import { Button } from './button'

describe('Button', () => {
  const buttonText = 'Click Me'
  const mockOnClick = jest.fn()

  it('renders the button with children text', () => {
    render(<Button onClick={mockOnClick}>{buttonText}</Button>)

    const buttonElement = screen.getByRole('button', { name: buttonText })
    expect(buttonElement).toBeInTheDocument()
  })

  it('triggers onClick handler when clicked', () => {
    render(<Button onClick={mockOnClick}>{buttonText}</Button>)

    const buttonElement = screen.getByRole('button', { name: buttonText })
    fireEvent.click(buttonElement)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
