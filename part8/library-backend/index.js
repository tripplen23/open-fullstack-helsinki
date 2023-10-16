const { ApolloServer, UserInputError } = require("@apollo/server");
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
        const author = await Author.findOne({ name: args.author });

        const books = await Book.find({
          $and: [
            { author: { $in: author.id } },
            { genres: { $in: args.genre } },
          ],
        }).populate("author");

        return books;
      }

      // TODO: If we only query the book genre
      if (args.genre) {
        const books = await Book.find({
          genres: { $in: args.genre },
        }).populate("author");

        return books;
      }

      // TODO: If we only query the book author
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        const books = await Book.find({
          author: { $in: author.id },
        }).populate("author");

        return books;
      }

      // TODO: Otherwise, when we query allBooks without any argument.
      else {
        return await Book.find({}).populate("author");
      }
    },

    allAuthors: async (root, args) => {
      return Author.find({});
    },
  },
  Author: {
    bookCount: async (root) =>
      await Book.find({ author: root.id }).countDocuments(),
  },

  Mutation: {
    addBook: async (root, args) => {
      /*
      // TODO: Book title should be unique
      if (books.find((book) => book.title === args.title)) {
        
      }
      */
      // TODO: Save a new author in case he/she is new to the database.
      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new GraphQLError(
            "Author's name should be longer than 4 characters",
            {
              extensions: {
                code: "BAD_USER_INPUT",
                invalidArgs: args.author,
                error,
              },
            }
          );
        }
      }

      // TODO: Add a new book
      else {
        const book = new Book({ ...args, author: author.id });

        try {
          await book.save();
        } catch (error) {
          throw new GraphQLError(error.message, {
            extensions: {
              code: "BAD_USER_INPUT",
              invalidArgs: args.title,
            },
          });
        }
      }
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        return null;
      }

      const updatedAuthor = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
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
