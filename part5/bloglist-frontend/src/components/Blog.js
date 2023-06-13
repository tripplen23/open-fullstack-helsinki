const Blog = ({ blogs }) => (
  <table>
    <tbody>
      {blogs.map((blog) => (
        <tr key={blog.id}>
          <td>{blog.title}</td>
          <td>{blog.author}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default Blog;
