import {
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLList
} from 'graphql';

import { UserType } from '../User/user.graphql.model'
import { UserSchema } from '../User/user.mongoose.model'

import { CategoryType } from '../Category/category.graphql.model'
import { CategorySchema } from '../Category/category.mongoose.model'

import { SubcategoryType } from '../Subcategory/subcategory.graphql.model'
import { SubcategorySchema } from '../Subcategory/subcategory.mongoose.model'


//------------------------------
// Subtypes for Ad Type
//------------------------------

// -- Price Input Type
export const PriceInputType = new GraphQLInputObjectType({
  name: 'InputPrice',
  fields: {
    amount: { type: GraphQLInt },
    currency: { type: GraphQLString }
  }
})

// -- Price Type
export const PriceType = new GraphQLObjectType({
  name: 'Price',
  fields: {
    amount: { type: GraphQLInt },
    currency: { type: GraphQLString }
  }
});

// -- Type Input Type
export const TypeInputType = new GraphQLInputObjectType({
  name: 'InputType',
  fields: {
    name: { type: GraphQLString },
    expires: { type: GraphQLString }
  }
})

// -- Type Type
export const TypeType = new GraphQLObjectType({
  name: 'Type',
  fields: {
    name: { type: GraphQLString },
    expires: { type: GraphQLString }
  }
});


//------------------------------
// Field Resolvers
//------------------------------

// -- ID
const id = {
  type: GraphQLID
};

// -- User
const user = () => ({
    type: UserType,
    resolve(parentValue, args) {
      return UserSchema.findById(parentValue.user);
  }
});

// -- Title
const title = {
  type: GraphQLString
};

// -- Views
const views = {
  type: GraphQLString
};

// -- Availability
const availability = {
  type: GraphQLString
};

// -- Price
const price = {
  type: PriceType
};

// -- Status
const status = {
  type: GraphQLString
};

// -- Category
const category = () => ({
  type: CategoryType,
  resolve(parentValue, args) {
    return CategorySchema.findById(parentValue.category);
  }
});

// -- Subcategory
const subcategory = () => ({
  type: SubcategoryType,
  resolve(parentValue, args) {
    return SubcategorySchema.findById(parentValue.subcategory);
  }
});

// -- Description
const description = {
  type: GraphQLString
};

// -- Thumbnail
const thumbnail = {
  type: GraphQLString
};

// -- Images
const images = {
  type: new GraphQLList(GraphQLString)
};

// -- Tradable
const tradable = {
  type: GraphQLBoolean
};

// -- Trade Methods
const tradeMethods = {
  type: new GraphQLList(GraphQLString)
};

// -- Type
const type = {
  type: TypeType
};

// -- Is Ad Rated
const isRated = {
  type: GraphQLBoolean
};

// -- Created
const created = {
  type: GraphQLString
};

// -- Refreshed
const refreshed = {
  type: GraphQLString
};

// -- Updated
const updated = {
  type: GraphQLString
};


//------------------------------
// Ad Type
//------------------------------
export const AdType = new GraphQLObjectType({
  name: 'Ad',
  fields: () => ({
    id,
    user: user(),
    title,
    views,
    availability,
    price,
    status,
    category: category(),
    subcategory: subcategory(),
    description,
    thumbnail,
    images,
    tradable,
    tradeMethods,
    type,
    isRated,
    created,
    refreshed,
    updated
  })
});
