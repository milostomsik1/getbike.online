import { UserSchema } from './User/user.mongoose.model';
import { AdSchema } from './Ad/ad.mongoose.model';
import { CategorySchema } from './Category/category.mongoose.model';
import { SubcategorySchema } from './Subcategory/subcategory.mongoose.model';
import { RatingSchema } from './Rating/rating.mongoose.model';
import { NotificationSchema } from './Notification/notification.mongoose.model';
import { ThreadSchema } from './Thread/thread.mongoose.model';
import { MessageSchema } from './Message/message.mongoose.model';
import mongoose from 'mongoose';

export default {
  Query: {
    users() {
      return UserSchema.find();
    },
    async user(_, {id, ad}) {
      if (id) {
        return await UserSchema.findById(id)
      } else if (ad) {
        const doc = await AdSchema.findById(ad);
        return await UserSchema.findById(doc.user);
      }
    },
    userCount() {
      return UserSchema.count();
    },
    ads(_, {ids, categories, subcategories}) {
      if (ids) {
        return Promise.all(ids.map(id => AdSchema.findById(id)));
      } else if (categories) {
        return AdSchema.find({category: {$in: categories}})
      } else if (subcategories) {
        return AdSchema.find({subcategory: {$in: subcategories}})
      }
      return AdSchema.find();
    },
    ad(_, {id}) {
      return AdSchema.findById(id);
    },
    adCount() {
      return AdSchema.count();
    },
    categories() {
      return CategorySchema.find();
    },
    category(_, {id}) {
      return CategorySchema.findById(id);
    },
    categoryCount() {
      return CategorySchema.count();
    },
    subcategories() {
      return SubcategorySchema.find();
    },
    subcategory(_, {id}) {
      return SubcategorySchema.findById(id);
    },
    subcategoryCount() {
      return SubcategorySchema.count();
    },
    ratings() {
      return SubcategorySchema.find();
    },
    rating(_, {id}) {
      return SubcategorySchema.findById(id);
    },
    ratingCount() {
      return RatingSchema.count();
    },
    notifications() {
      return SubcategorySchema.find();
    },
    notification(_, {id}) {
      return SubcategorySchema.findById(id);
    },
    notificationCount() {
      return NotificationSchema.count();
    },
    threads() {
      return SubcategorySchema.find();
    },
    thread(_, {id}) {
      return SubcategorySchema.findById(id);
    },
    threadCount() {
      return ThreadSchema.count();
    },
    messages() {
      return SubcategorySchema.find();
    },
    message(_, {id}) {
      return SubcategorySchema.findById(id);
    },
    messageCount() {
      return MessageSchema.count();
    }
  },

  Mutation: {
    createUser(_, args) {
      return UserSchema.create(args);
    },
    deleteUser(_, {id}) {
      return UserSchema.findByIdAndRemove(id);
    },
    createAd(_, args) {
      return AdSchema.create(args);
    },
    deleteAd(_, {id}) {
      return AdSchema.findByIdAndRemove(id);
    },
    createCategory(_, {name}) {
      return CategorySchema.create({name});
    },
    deleteCategory(_, {id}) {
      return CategorySchema.findByIdAndRemove(id);
    },
    async createSubcategory(_, args) {
      const newSubcategory = await SubcategorySchema.create(args);
      const category = await CategorySchema.findById(args.category);
      category.subcategories.push(newSubcategory._id);
      await CategorySchema.findByIdAndUpdate(category._id, category);
      return newSubcategory;
    },
    deleteSubcategory(_, {id}) {
      return SubcategorySchema.findByIdAndRemove(id);
    }
  },

  User: {
    ads({ads}) {
      return Promise.all(ads.map(ad => AdSchema.findById(ad)));
    },
    favorites({favorites}) {
      return Promise.all(favorites.map(favorite => AdSchema.findById(favorite)));
    },
    ratings({ratings}) {
      return Promise.all(ratings.map(rating => RatingSchema.findById(rating)));
    },
    notifications({notifications}) {
      return Promise.all(notifications.map(notification => NotificationSchema.findById(notification)));
    }
  },

  Ad: {
    user({user}) {
      return UserSchema.findById(user);
    },
    category({category}) {
      return CategorySchema.findById(category);
    },
    subcategory({subcategory}) {
      return SubcategorySchema.findById(subcategory);
    },
  },

  Category: {
    subcategories({subcategories}) {
      return Promise.all(subcategories.map(subcategory => SubcategorySchema.findById(subcategory)));
    }
  },

  Subcategory: {
    category({category}) {
      return CategorySchema.findById(category);
    }
  },

  Rating: {
    user({user}) {
      return UserSchema.findById(user);
    },
    ad({ad}) {
      return UserSchema.findById(ad);
    }
  },

  Notification: {
    user({user}) {
      return UserSchema.findById(user);
    }
  },

  Message: {
    sender({sender}) {
      return UserSchema.findById(sender);
    },
    recipient({recipient}) {
      return UserSchema.findById(recipient);
    }
  },

  Thread: {
    participants({participants}) {
      return Promise.all(participants.map(participant => UserSchema.findById(participant)));
    },
    ad({ad}) {
      return UserSchema.findById(ad);
    },
    messages({messages}) {
      return Promise.all(messages.map(message => MessageSchema.findById(message)));
    }
  },
};
