import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import { expect, jest, test } from '@jest/globals'
// import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog component tests', () => {

  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test.com',
    likes: 1,
    user: '64b2cd054ca9eec8e72827cb'
  }

  const user = {
    id: '64afdcf414f08d8b4089208e',
    username: 'username',
    name: 'name',
    passwordHash: '$2b$10$wJq.T9eOcWxhOvjrq/utou19tijIVS0PcydnLki9OxSXI6fwwlZue'
  }

  let mockUpdateBlog = jest.fn()
  let mockDeleteBlog = jest.fn()

  test('renders title and author', () => {

    render(<Blog key={blog.id} blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} user={user}/>)

    const element = screen.getByText('test title by test author')
    expect(element).toBeDefined()

  })

  test('clicking the button triggers the event handler once', async () => {

    const component = render(
      <Blog key={blog.id} blog={blog} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog} user={user}/>
    )

    const button = screen.getByText('view')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent(
      'test.com'
    )

    expect(component.container).toHaveTextContent(
      1
    )

  })

})

