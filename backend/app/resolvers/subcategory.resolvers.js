export default {
  Query: {
    subcategories(parentValue, args, {Subcategory}) {
      return Subcategory.findAll();
    },
    subcategory(parentValue, {id}, {Subcategory}) {
      return Subcategory.findOne({where: {id}});
    },
    subcategoryCount(parentValue, args, {Subcategory}) {
      return Subcategory.count();
    }
  },

  Mutation: {
    createSubcategory(parentValue, args, {Subcategory}) {
      return Subcategory.create({
        ...args,
        categoryId: args.category
      });
    },
    async updateSubcategory(parentValue, args, {Subcategory}) {
      return null; // UPDATE HERE
    },
    async deleteSubcategory(parentValue, {id}, {Subcategory}) {
      const subcategory = await Subcategory.findOne({where: {id}});
      await Subcategory.destroy({where: {id}});
      return subcategory;
    },
  },

  Subcategory: {
    category({categoryId}, args, {Category}) {
      return Category.findOne({where: {id: categoryId}});
    }
  }
}