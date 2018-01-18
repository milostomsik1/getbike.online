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
    }
  }
};
