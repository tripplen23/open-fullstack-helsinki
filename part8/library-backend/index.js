const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { GraphQLError } = require("graphql");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");

require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;
console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ) : Book!
    editAuthor(
      name: String!
      setBornTo: Int!
    ) : Author
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      // TODO: If we query both genre and authors as the arguments
      if (args.author && args.genre) {
        return Book.filter(
          (book) =>
            book.author === args.author && book.genres.includes(args.genre)
        );
      }

      // TODO: If we only query the book genre
      if (args.genre) {
        const byGenre = (book) => book.genres.includes(args.genre);
        return Book.filter(byGenre);
      }

      // TODO: If we only query the book author
      if (args.author) {
        const byAuthor = (book) =>
          args.author === book.author ? book.author : !book.author;
        return Book.filter(byAuthor);
      }

      // TODO: Otherwise, when we query allBooks without any argument.
      else {
        return Book.find({});
      }
    },

    allAuthors: async (root, args) => {
      return Author.find({});
    },
  },
  Author: {
    bookCount: (root) =>
      Book.filter((book) => book.author === root.name).length,
  },

  Mutation: {
    addBook: async (root, args) => {
      /*
      // TODO: Book title should be unique
      if (books.find((book) => book.title === args.title)) {
        throw new GraphQLError("Book title must be unique.", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
          },
        });
      }
*/
      // TODO: Save a new author in case he/she is new to the database.
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      // TODO: Add a new book
      const book = new Book({ ...args, author: author.id });
      return book.save();
    },

    editAuthor: (root, args) => {
      const author = authors.find((author) => author.name === args.name);
      if (!author) {
        return null;
      }

      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map((author) =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
