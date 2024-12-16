import React from 'react'
import { render, screen } from '@testing-library/react'
import { Container } from './container'

describe('Container', () => {
  test('renders children correctly', () => {
    render(
      <Container>
        <div>Test Child</div>
      </Container>
    )

    expect(screen.getByText('Test Child')).toBeInTheDocument()
  })
})
