export default {
  Query: {
    categories(parentValue, args, {Category}) {
      return Category.findAll();
    },
    category(parentValue, {id}, {Category}) {
      return Category.findOne({where: {id}});
    },
    categoryCount(parentValue, args, {Category}) {
      return Category.count();
    }
  },

  Mutation: {
    createCategory(parentValue, args, {Category}) {
      return Category.create(args);
    },
    async updateCategory(parentValue, args, {Category}) {
      // await Category.update(args, {where: {id: args.id}});
      // return Category.findOne({where: {id: args.id}});
    },
    async deleteCategory(parentValue, {id}, {Category}) {
      const category = await Category.findOne({where: {id}});
      await Category.destroy({where: {id}});
      return category;
    },
  },

  Category: {
  }
}