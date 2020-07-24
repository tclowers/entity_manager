"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.typeDefs = void 0;

var _apolloServer = require("apollo-server");

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.\n\n    # This \"Book\" type defines the queryable fields for every book in our data source.\n    type Book {\n        title: String\n        author: String\n    }\n\n    # The \"Query\" type is special: it lists all of the available queries that\n    # clients can execute, along with the return type for each. In this\n    # case, the \"books\" query returns an array of zero or more Books (defined above).\n    type Query {\n        books: [Book]\n    }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
var typeDefs = (0, _apolloServer.gql)(_templateObject());
exports.typeDefs = typeDefs;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jvb2svdHlwZS1kZWZzLnRzIl0sIm5hbWVzIjpbInR5cGVEZWZzIiwiZ3FsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7O0FBRUE7QUFDQTtBQUNBO0FBQ08sSUFBTUEsUUFBUSxPQUFHQyxpQkFBSCxvQkFBZCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdxbCB9IGZyb20gJ2Fwb2xsby1zZXJ2ZXInO1xuXG4vLyBBIHNjaGVtYSBpcyBhIGNvbGxlY3Rpb24gb2YgdHlwZSBkZWZpbml0aW9ucyAoaGVuY2UgXCJ0eXBlRGVmc1wiKVxuLy8gdGhhdCB0b2dldGhlciBkZWZpbmUgdGhlIFwic2hhcGVcIiBvZiBxdWVyaWVzIHRoYXQgYXJlIGV4ZWN1dGVkIGFnYWluc3Rcbi8vIHlvdXIgZGF0YS5cbmV4cG9ydCBjb25zdCB0eXBlRGVmcyA9IGdxbGBcbiAgICAjIENvbW1lbnRzIGluIEdyYXBoUUwgc3RyaW5ncyAoc3VjaCBhcyB0aGlzIG9uZSkgc3RhcnQgd2l0aCB0aGUgaGFzaCAoIykgc3ltYm9sLlxuXG4gICAgIyBUaGlzIFwiQm9va1wiIHR5cGUgZGVmaW5lcyB0aGUgcXVlcnlhYmxlIGZpZWxkcyBmb3IgZXZlcnkgYm9vayBpbiBvdXIgZGF0YSBzb3VyY2UuXG4gICAgdHlwZSBCb29rIHtcbiAgICAgICAgdGl0bGU6IFN0cmluZ1xuICAgICAgICBhdXRob3I6IFN0cmluZ1xuICAgIH1cblxuICAgICMgVGhlIFwiUXVlcnlcIiB0eXBlIGlzIHNwZWNpYWw6IGl0IGxpc3RzIGFsbCBvZiB0aGUgYXZhaWxhYmxlIHF1ZXJpZXMgdGhhdFxuICAgICMgY2xpZW50cyBjYW4gZXhlY3V0ZSwgYWxvbmcgd2l0aCB0aGUgcmV0dXJuIHR5cGUgZm9yIGVhY2guIEluIHRoaXNcbiAgICAjIGNhc2UsIHRoZSBcImJvb2tzXCIgcXVlcnkgcmV0dXJucyBhbiBhcnJheSBvZiB6ZXJvIG9yIG1vcmUgQm9va3MgKGRlZmluZWQgYWJvdmUpLlxuICAgIHR5cGUgUXVlcnkge1xuICAgICAgICBib29rczogW0Jvb2tdXG4gICAgfVxuYDsiXX0=