import { UserSchema } from './User/user.mongoose.model';
import { AdSchema } from './Ad/ad.mongoose.model';
import { CategorySchema } from './Category/category.mongoose.model';
import { SubcategorySchema } from './Subcategory/subcategory.mongoose.model';
import { RatingSchema } from './Rating/rating.mongoose.model';
import { NotificationSchema } from './Notification/notification.mongoose.model';
import { ThreadSchema } from './Thread/thread.mongoose.model';
import { MessageSchema } from './Message/message.mongoose.model';


export default {
  Query: {
    users() {
      return UserSchema.find();
    },
    user(_, {id}) {
      return UserSchema.findById(id);
    },
    ads() {
      return AdSchema.find();
    },
    ad(_, {id}) {
      return AdSchema.findById(id);
    },
    categories() {
      return CategorySchema.find();
    },
    category(_, {id}) {
      return CategorySchema.findById(id);
    },
    subcategories() {
      return SubcategorySchema.find();
    },
    subcategory(_, {id}) {
      return SubcategorySchema.findById(id);
    },
    ratings() {
      return SubcategorySchema.find();
    },
    rating(_, {id}) {
      return SubcategorySchema.findById(id);
    },
    notifications() {
      return SubcategorySchema.find();
    },
    notification(_, {id}) {
      return SubcategorySchema.findById(id);
    },
    threads() {
      return SubcategorySchema.find();
    },
    thread(_, {id}) {
      return SubcategorySchema.findById(id);
    },
    messages() {
      return SubcategorySchema.find();
    },
    message(_, {id}) {
      return SubcategorySchema.findById(id);
    },
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
    },
  },
};
