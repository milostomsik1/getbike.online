export default `
type Query {
  users: [User]
  user(
    id: ID
    ad: ID
    ): User
  userCount: Int
  ads(
    ids: [ID!]
    categories: [ID!]
    subcategories: [ID!]
    ): [Ad]
  ad(id: ID!): Ad
  adCount: Int
  categories: [Category]
  category(id: ID!): Category
  categoryCount: Int
  subcategories: [Subcategory]
  subcategory(id: ID!): Subcategory
  subcategoryCount: Int
  ratings: [Rating]
  rating(id: ID!): Rating
  ratingCount: Int
  notifications: [Notification]
  notification(id: ID!): Notification
  notificationCount: Int
  threads: [Thread]
  thread(id: ID!): Thread
  threadCount: Int
  messages: [Message]
  message(id: ID!): Message
  messageCount: Int
}

type Mutation {
  createUser(
    name: String!
    email: String!
    password: String!
    location: LocationInput!
  ): User
  deleteUser(id: ID!): User
  createAd(
    user: ID!
    title: String!
    views: Int
    availability: String
    price: PriceInput!
    status: String
    category: ID!
    subcategory: ID!
    description: String!
    specifications: String!
    thumbnail: String
    images: [String!]
    tradable: Boolean
    tradeMethods: [String!]!
    type: AdTypeInput
    isRated: Boolean
  ): Ad
  deleteAd(id: ID!): Ad
  createCategory(name: String!): Category
  deleteCategory(id: ID!): Category
  createSubcategory(
    name: String!
    category: ID!
  ): Subcategory
  deleteSubcategory(id: ID!): Subcategory
  createThread(
    participants: [ID!]!
    ad: ID!
    messages: [ID!]
  ): Thread
  deleteThread(id: ID!): Thread
  createMessage(
    threadId: ID!
    sender: ID!
    recipient: ID!
    content: String!
  ): Message
  softDeleteMessage(
    message: ID!
    user: ID!
    thread: ID!
  ): Message
  softDeleteMessages(
    messages: [ID!]!
    user: ID!
    thread: ID!
  ): [Message]
  deleteMessage(
    message: ID!
    thread: ID!
  ): Message
  deleteMessages(
    messages: [ID!]!
    thread: ID!
  ): [Message]
  createRating(
    user: ID!
    ad: ID!
    type: String
    description: Int
    communication: Int!
    trade: Int!
    comment: String!
  ): Rating
  deleteRating(id: ID!): Rating
  createNotification(
    user: ID!
    title: String!
    content: String!
  ): Notification
  deleteNotification(id: ID!): Notification
}

type Location {
  country: String
  city: String
}

input LocationInput {
  country: String
  city: String
}

type Contact {
  phone: String
}

type User {
  id: ID
  name: String!
  email: String!
  password: String!
  ads: [Ad]
  canCreateAds: Boolean
  favorites: [Ad]
  ratings: [Rating]
  threads: [Thread]
  notifications: [Notification]
  location: Location
  contact: Contact
  created: String
  updated: String
}

type Price {
  amount: Int
  currency: String
}

input PriceInput {
  amount: Int
  currency: String
}

type AdType {
  name: String
  expires: String
}

input AdTypeInput {
  name: String
  expires: String
}

type Ad {
  id: ID
  user: User
  title: String
  views: Int
  availability: String
  price: Price
  status: String
  category: Category
  subcategory: Subcategory
  description: String
  specifications: String
  thumbnail: String
  images: [String!]
  tradable: Boolean
  tradeMethods: [String]
  type: AdType
  isRated: Boolean
  created: String
  refreshed: String
  updated: String
}

type Category {
  id: ID
  name: String
  subcategories: [Subcategory]
}

type Subcategory {
  id: String
  name: String
  category: Category
}

type Rating {
  id: ID
  user: User
  ad: Ad
  type: String
  description: Int
  communication: Int
  trade: Int
  comment: String
  created: String
}

type Notification {
  id: ID
  user: User
  title: String
  content: String
  created: String
}

type Message {
  id: ID
  sender: User
  recipient: User
  content: String
  deletedBy: [User]
  created: String
}

type Thread {
  id: ID
  participants: [User]
  ad: Ad
  messages: [Message]
  created: String
  updated: String
}
`;