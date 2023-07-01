import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  let component;
  const updateLikes = jest.fn();
  const deleteBlog = jest.fn();
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'https://www.frontendtest.com/',
    likes: 0,
  };

  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        updateLikes={updateLikes}
        deleteBlog={deleteBlog}
      />
    );
  });

  test('Rendering title and author of each post but not url or likes by default', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent(
      blog.title
    );
    expect(component.container.querySelector('.author')).toHaveTextContent(
      blog.author
    );

    expect(component.queryByText(blog.url)).not.toBeInTheDocument();
    expect(component.queryByText('like')).not.toBeInTheDocument();
  });
});
