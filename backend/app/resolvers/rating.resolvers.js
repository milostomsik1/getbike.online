export default {
  Query: {
    ratings(parentValue, args, {Rating}) {
      return Rating.findAll();
    },
    rating(parentValue, {id}, {Rating}) {
      return Rating.findOne({where: {id}});
    },
    ratingCount(parentValue, args, {Rating}) {
      return Rating.count();
    }
  },

  Mutation: {
    createRating(parentValue, args, {Rating}) {
      return Rating.create({
        ...args,
        userId: args.user,
        adId: args.ad
      });
    },
    async deleteRating(parentValue, {id}, {Rating}) {
      const rating = await Rating.findOne({where: {id}});
      await Rating.destroy({where: {id}});
      return rating;
    },
  },

  Rating: {
    user({userId}, args, {User}) {
      return User.findOne({where: {id: userId}});
    },
    ad({adId}, args, {Ad}) {
      return Ad.findOne({where: {id: adId}});
    }
  }
}