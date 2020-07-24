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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jvb2svaW5kZXgudHMiXSwibmFtZXMiOlsiYm9va01vZHVsZSIsIkdyYXBoUUxNb2R1bGUiLCJuYW1lIiwidHlwZURlZnMiLCJyZXNvbHZlcnMiLCJpbXBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBQ0E7O0FBQ0E7O0FBRU8sSUFBTUEsVUFBVSxHQUFHLElBQUlDLG1CQUFKLENBQWtCO0FBQ3hDQyxFQUFBQSxJQUFJLEVBQUUsWUFEa0M7QUFFeENDLEVBQUFBLFFBQVEsRUFBUkEsa0JBRndDO0FBR3hDQyxFQUFBQSxTQUFTLEVBQVRBLG9CQUh3QztBQUl4Q0MsRUFBQUEsT0FBTyxFQUFFO0FBSitCLENBQWxCLENBQW5CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR3JhcGhRTE1vZHVsZSB9IGZyb20gJ0BncmFwaHFsLW1vZHVsZXMvY29yZSc7XG5pbXBvcnQgeyByZXNvbHZlcnMgfSBmcm9tICcuL3Jlc29sdmVycyc7XG5pbXBvcnQgeyB0eXBlRGVmcyB9IGZyb20gJy4vdHlwZS1kZWZzJztcblxuZXhwb3J0IGNvbnN0IGJvb2tNb2R1bGUgPSBuZXcgR3JhcGhRTE1vZHVsZSh7XG4gICAgbmFtZTogXCJCb29rTW9kdWxlXCIsXG4gICAgdHlwZURlZnMsXG4gICAgcmVzb2x2ZXJzLFxuICAgIGltcG9ydHM6IFtdXG59KTsiXX0=