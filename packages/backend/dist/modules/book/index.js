"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bookModule = void 0;

var _core = require("@graphql-modules/core");

var _resolvers = require("./resolvers");

var _typeDefs = require("./type-defs");

var bookModule = new _core.GraphQLModule({
  name: "BookModule",
  typeDefs: _typeDefs.typeDefs,
  resolvers: _resolvers.resolvers,
  imports: []
});
exports.bookModule = bookModule;