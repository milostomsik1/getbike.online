export default {
  Query: {
    ads(parentValue, args, {Ad}) {
      return Ad.findAll();
    },
    ad(parentValue, {id}, {Ad}) {
      return Ad.findOne({where: {id}});
    },
    adCount(parentValue, args, {Ad}) {
      return Ad.count();
    }
  },

  Mutation: {
    createAd(parentValue, args, {Ad}) {
      return Ad.create({
        ...args,
        userId: args.user,
        categoryId: args.category,
        subcategoryId: args.subcategory
      });
    },
    async deleteAd(parentValue, {id}, {Ad}) {
      const ad = await Ad.findOne({where: {id}});
      await Ad.destroy({where: {id}});
      return ad;
    },
  },

  Ad: {
    user({userId}, args, {User}) {
      return User.findOne({where: {id: userId}});
    },
    category({categoryId}, args, {Category}) {
      return Category.findOne({where: {id: categoryId}});
    },
    subcategory({subcategoryId}, args, {Subcategory}) {
      return Subcategory.findOne({where: {id: subcategoryId}});
    }
  }
}