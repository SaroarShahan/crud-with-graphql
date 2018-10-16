const graphql = require("graphql");
const _ = require("lodash");
const userModel = require("../models/userModel");
const compayModel = require("../models/companyModel");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql;

const CompanyType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    discription: { type: GraphQLString },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        console.log(parent);
        return userModel.find({ companyID: parent.id });
      }
    }
  })
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    age: { type: GraphQLInt },
    companyID: { type: GraphQLID },
    company: {
      type: CompanyType,
      resolve(parent, args) {
        return compayModel.findById(parent.companyID);
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return userModel.find();
      }
    },
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return userModel.findById(args.id);
      }
    },
    company: {
      type: CompanyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return compayModel.findById(args.id);
      }
    },
    companies: {
      type: new GraphQLList(CompanyType),
      resolve(parent, args) {
        return compayModel.find();
      }
    }
  }
});

const Mutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyID: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        const user = new userModel({
          firstname: args.firstname,
          lastname: args.lastname,
          username: args.username,
          email: args.email,
          age: args.age,
          companyID: args.companyID
        });

        return user.save();
      }
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstname: { type: new GraphQLNonNull(GraphQLString) },
        lastname: { type: new GraphQLNonNull(GraphQLString) },
        username: { type: new GraphQLNonNull(GraphQLString) },
        email: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        companyID: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        return userModel.findByIdAndUpdate(args.id, args);
      }
    },
    deleteUser: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return userModel.findByIdAndRemove(args.id);
      }
    },
    addCompany: {
      type: CompanyType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        discription: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        const company = new compayModel({
          name: args.name,
          discription: args.discription
        });

        return company.save();
      }
    },
    updateCompany: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        discription: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parent, args) {
        return compayModel.findByIdAndUpdate(args.id, args);
      }
    },
    deleteCompany: {
      type: CompanyType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(paren, args) {
        return compayModel.findByIdAndRemove(args.id);
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
