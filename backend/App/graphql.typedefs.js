export default `
type Query {
  users: [User]
  user(id: ID!): User
  userCount: Int
  ads: [Ad]
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

type Location {
  country: String
  city: String
}

type Contact {
  phone: String
}

type User {
  id: ID
  name: String
  email: String
  password: String
  ads: [Ad]
  canCreateAds: Boolean
  favorites: [Ad]
  ratings: [Rating]
  messages: [Thread]
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

type AdType {
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
  thumbnail: String
  images: [String]
  tradable: Boolean
  type: AdType
  isRated: Boolean
  created: String
  refreshed: String
  updated: String
}

type Category {
  id: String
  name: String
  subcategories: [Subcategory]
}

type Subcategory {
  id: String
  name: String
  category: Category
}

type Rating {
  id: String
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
  id: String
  user: User
  title: String
  content: String
  created: String
}

type Message {
  id: String
  sender: User
  recipient: User
  content: String
  created: String
}

type Thread {
  id: String
  participants: [User]
  ad: Ad
  messages: [Message]
  created: String
  updated: String
}
`;