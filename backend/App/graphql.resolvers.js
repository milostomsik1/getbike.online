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
      return RatingSchema.find();
    },
    rating(_, {id}) {
      return RatingSchema.findById(id);
    },
    ratingCount() {
      return RatingSchema.count();
    },
    notifications() {
      return NotificationSchema.find();
    },
    notification(_, {id}) {
      return NotificationSchema.findById(id);
    },
    notificationCount() {
      return NotificationSchema.count();
    },
    threads() {
      return ThreadSchema.find();
    },
    thread(_, {id}) {
      return ThreadSchema.findById(id);
    },
    threadCount() {
      return ThreadSchema.count();
    },
    messages() {
      return MessageSchema.find();
    },
    message(_, {id}) {
      return MessageSchema.findById(id);
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
      // add code to delete all related info (ads, ratings, notifications, threads, messages)
      return UserSchema.findByIdAndRemove(id);
    },
    async createAd(_, args) {
      const newAd = await AdSchema.create(args);
      const user = await UserSchema.findById(args.id);
      user.ads.push(newAd._id);
      await UserSchema.findByIdAndUpdate(user._id, user);
      return newAd;
    },
    deleteAd(_, {id}) {
      return AdSchema.findByIdAndRemove(id);
    },
    createCategory(_, {name}) {
      return CategorySchema.create({name});
    },
    async deleteCategory(_, {id}) {
      const deletedCategory = await CategorySchema.findByIdAndRemove(id);
      if (deletedCategory) {
        for (const subcategory of deletedCategory.subcategories) {
          await SubcategorySchema.findByIdAndRemove(subcategory);
        }
      }
      return deletedCategory;
    },
    async createSubcategory(_, args) {
      const newSubcategory = await SubcategorySchema.create(args);
      const category = await CategorySchema.findById(args.category);
      category.subcategories.push(newSubcategory._id);
      await CategorySchema.findByIdAndUpdate(category._id, category);
      return newSubcategory;
    },
    async deleteSubcategory(_, {id}) {
      const deletedSubcategory = await SubcategorySchema.findByIdAndRemove(id);
      const category = await CategorySchema.findById(deletedSubcategory.category);
      category.subcategories = category.subcategories.filter(subcategory => subcategory != id);
      await CategorySchema.findByIdAndUpdate(category._id, category);
      return deletedSubcategory;
    },
    createThread(_, args) {
      // add code to add thread to user messages array
      // check if user already has a thread with given recipient
    },
    deleteThread(_, {id}) {
      // problem: deletes thread for both users
    },
    createMessage(_, args) {
      // add code
    },
    deleteMessage(_, {id}) {
      // problem: deletes message for both users
    },
    deleteMessages(_, {ids}) {
      // problem: deletes messages for both users
    },
    async createRating(_, args) {
      const newRating = await RatingSchema.create(args);
      const user = await UserSchema.findById(args.user);
      user.ratings.push(newRating._id);
      await UserSchema.findByIdAndUpdate(user._id, user);
      return newRating;
    },
    async deleteRating(_, {id}) {
      const deletedRating = await RatingSchema.findByIdAndRemove(id);
      if (deletedRating) {
        const user = await UserSchema.findById(deletedRating.user);
        user.ratings = user.ratings.filter(rating => rating != id);
        await UserSchema.findByIdAndUpdate(user._id, user);
      }
      return deletedRating;
    },
    async createNotification(_, args) {
      const newNotification = await NotificationSchema.create(args);
      const user = await UserSchema.findById(args.user);
      user.notifications.push(newNotification._id);
      await UserSchema.findByIdAndUpdate(user._id, user);
      return newNotification;
    },
    async deleteNotification(_, {id}) {
      const deletedNotification = await NotificationSchema.findByIdAndRemove(id);
      if (deletedNotification) {
        const user = await UserSchema.findById(deletedNotification.user);
        user.notifications = user.notifications.filter(notification => notification != id);
        await UserSchema.findByIdAndUpdate(user._id, user);
      }
      return deletedNotification;
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
      return AdSchema.findById(ad);
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
      return AdSchema.findById(ad);
    },
    messages({messages}) {
      return Promise.all(messages.map(message => MessageSchema.findById(message)));
    }
  },
};
