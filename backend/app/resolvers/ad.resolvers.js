export default {
  Query: {
    ads(parentValue, {title, category}, {Ad, Sequelize}) {
      const filters = {};
      if (title) filters.title = {[Sequelize.Op.iLike]: `%${title}%`};
      if (category) filters.categoryId = category;
      return Ad.findAll({where: filters});
    },
    ad(parentValue, {id}, {Ad}) {
      return Ad.findOne({where: {id}});
    },
    adCount(parentValue, args, {Ad}) {
      return Ad.count();
    },
    featuredAds(parentValue, args, {Ad}) {
      return Ad.findAll({where: {typeName: 'Featured'}});
    },
    premiumAds(parentValue, args, {Ad}) {
      return Ad.findAll({where: {typeName: 'Premium'}});
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
    async updateAd(parentValue, args, {Ad}) {
      await Ad.update(args, {where: {id: args.id}});
      return Ad.findOne({where: {id: args.id}});
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
  }
}