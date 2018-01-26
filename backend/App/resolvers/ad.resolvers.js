export default {
  Query: {
    ads(parentValue, args, {Ad}) {
      return Ad.findAll();
    },
    ad(parentValue, {id}, {Ad}) {
      return Ad.findOne({where: {id}});
    }
  },

  Mutation: {
    createAd(parentValue, args, {Ad}) {
      return Ad.create(args);
    },
    // updateAd(parentValue, args, context) {
    //   return null;
    // },
    deleteAd(parentValue, args, context) {
      return null;
    },
  },

  Ad: {

  }
}