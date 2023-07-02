import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  const blog = {
    title: 'Title',
    author: 'Author',
    url: 'https://www.frontendtest.com/',
    likes: 0,
    user: {
      username: 'binhfnef',
      name: 'binh',
    },
  };

  let component;
  beforeEach(() => {
    component = render(<Blog key={blog.id} blog={blog} />);
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
    screen.debug();
  });

  test('Rendering URL and number of likes when view button is clicked', async () => {
    const viewButton = component.container.querySelector('.view-btn');
    await userEvent.click(viewButton);

    expect(component.queryByText(blog.url)).toBeInTheDocument();
    expect(component.queryByText('like')).toBeInTheDocument();

    screen.debug();
  });
});
