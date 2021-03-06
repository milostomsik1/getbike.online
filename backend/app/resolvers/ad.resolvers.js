export default {
  Query: {
    ads(parentValue, args, {Ad, Sequelize}) {
      const filters = args;
      if (args.title) filters.title = {[Sequelize.Op.iLike]: `%${args.title}%`};
      if (args.category) filters.categoryId = args.category;
      console.log(filters);
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
        categoryId: args.category
      });
    },
    async updateAd(parentValue, args, {Ad}) {
      if (args.user) args.userId = args.user;
      if (args.category) args.categoryId = args.category;

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
    specifications({id}, args, {AdSpecification}) {
      return AdSpecification.findAll({where: {adId: id}});
    }
  }
}