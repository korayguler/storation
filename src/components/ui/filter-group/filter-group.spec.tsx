import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { FilterGroup } from './filter-group'
import { jest } from '@jest/globals'

describe('FilterGroup', () => {
  const mockItems = [
    { id: '1', name: 'Item 1' },
    { id: '2', name: 'Item 2' },
    { id: '3', name: 'Another Item' },
  ]
  const mockOnChange = jest.fn()

  test('renders filter group with items', () => {
    render(
      <FilterGroup
        title="Test Filter"
        items={mockItems}
        onChange={mockOnChange}
        value=""
        showSearch={false}
      />
    )

    expect(screen.getByText('Test Filter')).toBeInTheDocument()
    expect(screen.getByLabelText('Item 1')).toBeInTheDocument()
    expect(screen.getByLabelText('Item 2')).toBeInTheDocument()
    expect(screen.getByLabelText('Another Item')).toBeInTheDocument()
  })

  test('shows search input when showSearch is true', () => {
    render(
      <FilterGroup
        title="Searchable Filter"
        items={mockItems}
        onChange={mockOnChange}
        value=""
        showSearch={true}
      />
    )

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
  })

  test('filters items based on search input', () => {
    render(
      <FilterGroup
        title="Searchable Filter"
        items={mockItems}
        onChange={mockOnChange}
        value=""
        showSearch={true}
      />
    )

    const searchInput = screen.getByPlaceholderText('Search')
    fireEvent.change(searchInput, { target: { value: 'Another' } })

    expect(screen.getByLabelText('Another Item')).toBeInTheDocument()
    expect(screen.queryByLabelText('Item 1')).not.toBeInTheDocument()
    expect(screen.queryByLabelText('Item 2')).not.toBeInTheDocument()
  })

  test('displays "Filter not found" when no items match search', () => {
    render(
      <FilterGroup
        title="Searchable Filter"
        items={mockItems}
        onChange={mockOnChange}
        value=""
        showSearch={true}
      />
    )

    const searchInput = screen.getByPlaceholderText('Search')
    fireEvent.change(searchInput, { target: { value: 'Nonexistent' } })

    expect(screen.getByText('Filter not found')).toBeInTheDocument()
  })

  test('calls onChange when an item is selected', () => {
    render(
      <FilterGroup
        title="Selectable Filter"
        items={mockItems}
        onChange={mockOnChange}
        value=""
        showSearch={false}
      />
    )

    const checkbox = screen.getByLabelText('Item 1')
    fireEvent.click(checkbox)

    expect(mockOnChange).toHaveBeenCalled()
  })

  test('checkbox is checked when value includes the item id', () => {
    render(
      <FilterGroup
        title="Preselected Filter"
        items={mockItems}
        onChange={mockOnChange}
        value="1"
        showSearch={false}
      />
    )

    const checkbox = screen.getByLabelText('Item 1')
    expect(checkbox).toBeChecked()
  })
})
