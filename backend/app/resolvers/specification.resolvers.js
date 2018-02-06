export default {
  Query: {
    specificationKeys(parentValue, args, {Specification}) {
      return Specification.findAll();
    },
    specificationKey(parentValue, {id}, {Specification}) {
      return Specification.findOne({where: {id}})
    },
    specificationKeyCount(parentValue, args, {Specification}) {
      return Specification.count();
    },
    specifications(parentValue, args, {AdSpecification}) {
      return AdSpecification.findAll();
    },
    specification(parentValue, {id}, {AdSpecification}) {
      return AdSpecification.findOne({where: {id}});
    },
    specificationCount(parentValue, args, {AdSpecification}) {
      return AdSpecification.count();
    }
  },

  Mutation: {
    createSpecificationKey(parentValue, args, {Specification}) {
      return Specification.create({
        ...args,
        categoryId: args.category,
        name: args.name
      });
    },
    async updateSpecificationKey(parentValue, args, {Specification}) {
      // await Specification.update(args, {where: {id: args.id}});
      // return Specification.findOne({where: {id: args.id}});
    },
    async deleteSpecificationKey(parentValue, {id}, {Specification}) {
      const specificationKey = await Specification.findOne({where: {id}});
      await Specification.destroy({where: {id}});
      return specificationKey;
    },
    createSpecification(parentValue, args, {AdSpecification}) {
      return AdSpecification.create({
        ...args,
        adId: args.ad,
        specificationId: args.specificationKey,
      });
    },
    async updateSpecification(parentValue, args, {AdSpecification}) {
      // await AdSpecification.update()
      //
    },
    async deleteSpecification(parentValue, {id}, {AdSpecification}) {
      const specification = await AdSpecification.findOne({where: {id}});
      await AdSpecification.destroy({where: {id}});
      return specification;
    },
  },

  Specification: {
    async name(parentValue, args, {Specification}) {
      const {specificationId} = parentValue.dataValues;
      const spec = await Specification.findOne({where: {id: specificationId}});
      const {name} = spec.dataValues;
      return name;
    },
    ad({adId}, args, {Ad}) {
      return Ad.findOne({where: {id: adId}});
    }
  },
  SpecificationKey: {
    category({categoryId}, args, {Category}) {
      return Category.findOne({where: {id: categoryId}});
    }
  }
}