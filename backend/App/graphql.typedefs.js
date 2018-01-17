export default `
type Query {
  users: [User]
  ads: [Ad]
}

type Location {
  country: String
  city: String
}

type Contact {
  phone: String
}

type User {
  id: String
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
  id: String
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
`;