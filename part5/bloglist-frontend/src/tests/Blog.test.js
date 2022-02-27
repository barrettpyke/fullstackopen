import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from '../components/Blog';
import CreateForm from '../components/CreateForm';

const blog = {
  title: 'Test Blog',
  author: 'John Smith',
  website: 'www.google.com',
  likes: 10,
};

test('renders content', () => {
  render(<Blog blog={blog} />);

  const title = screen.queryByText('Test Blog');
  const author = screen.queryByText('John Smith');
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  const url = screen.queryByText('www.google.com');
  const likes = screen.queryByText('10');
  expect(url).toBeNull();
  expect(likes).toBeNull();
});

test('show details', () => {
  render(<Blog blog={blog} />);

  const button = screen.getByRole('button');
  userEvent.click(button);

  const title = screen.queryByText('Test Blog');
  const author = screen.queryByText('John Smith');
  const url = screen.queryByText('www.google.com');
  const likes = screen.queryByText('10');
  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test('like button', () => {
  const addLike = jest.fn();

  render(<Blog blog={blog} addLike={addLike} />);

  const button = screen.getByRole('button');
  userEvent.click(button);
  const like = screen.getByTestId('likes');
  userEvent.click(like);
  userEvent.click(like);

  expect(addLike.mock.calls).toHaveLength(2);
});

test('create form', () => {
  const createBlog = jest.fn();

  render(<CreateForm createBlog={createBlog} />);

  const inputs = screen.getAllByRole('textbox');

  userEvent.type(inputs[0], 'Test Blog');
  userEvent.type(inputs[1], 'John Smith');
  userEvent.type(inputs[2], 'www.google.com');

  const submit = screen.getByTestId('submit');
  userEvent.click(submit);

  expect(createBlog.mock.calls).toHaveLength(1);
  expect(createBlog.mock.calls[0][0].title).toBe('Test Blog');
  expect(createBlog.mock.calls[0][0].author).toBe('John Smith');
  expect(createBlog.mock.calls[0][0].website).toBe('www.google.com');
});
