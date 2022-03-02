const { ApolloServer, gql } = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const Genre = require('./models/genre')
const jwt = require('jsonwebtoken')
const { UserInputError, AuthenticationError } = require('apollo-server-errors')
const User = require('./models/user')
require('dotenv').config()

const JWT_SECRET = process.env.SECRET

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message)
  })

const typeDefs = gql`
  type Book {
    title: String!
    published: Int!
    author: String!
    id: ID!
    genres: [String!]!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    books: [Book!]!
    bookCount: Int
  }

  type Genre {
    name: String!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    allGenres: [Genres!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favoriteGenre: String
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.genre) {
        return Book.find({ genre: args.genre })
      } else{
        return Book.find({})
      }
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => context.currentUser,
    allGenres: async () => Genre.find({})
  },
  Author: {
    async books(root) {
      return Book.find({ author: root.name })
    },
    async bookCount(root) {
      let authBooks = Book.find({ author: root.name})
      return authBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentGenres = Genre.find({})
      const book = new Book({ title: args.title, author: args.author, published: args.published, genres: args.genres })
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not Authenticated")
      }

      try {
        if (currentGenres.some(args.genre)) {
          await book.save()
        } else {
          const newGenre = new Genre({name: args.genre})
          await newGenre.save()
          await book.save
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      const author = await Author.findOne({ name: args.name })
      author.born = args.setBornTo
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError("Not Authenticated")
      }

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return author 
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new UserInputError("Wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id
      }

      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})