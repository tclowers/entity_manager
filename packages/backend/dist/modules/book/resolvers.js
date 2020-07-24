"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

var _book = require("providers/book");

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
var resolvers = {
  Query: {
    books: function books() {
      return _book.list;
    }
  }
};
exports.resolvers = resolvers;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2R1bGVzL2Jvb2svcmVzb2x2ZXJzLnRzIl0sIm5hbWVzIjpbInJlc29sdmVycyIsIlF1ZXJ5IiwiYm9va3MiLCJsaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7QUFDQTtBQUNPLElBQU1BLFNBQVMsR0FBRztBQUNyQkMsRUFBQUEsS0FBSyxFQUFFO0FBQ0hDLElBQUFBLEtBQUssRUFBRTtBQUFBLGFBQU1DLFVBQU47QUFBQTtBQURKO0FBRGMsQ0FBbEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBsaXN0IH0gZnJvbSBcInByb3ZpZGVycy9ib29rXCI7XG5cbi8vIFJlc29sdmVycyBkZWZpbmUgdGhlIHRlY2huaXF1ZSBmb3IgZmV0Y2hpbmcgdGhlIHR5cGVzIGRlZmluZWQgaW4gdGhlXG4vLyBzY2hlbWEuIFRoaXMgcmVzb2x2ZXIgcmV0cmlldmVzIGJvb2tzIGZyb20gdGhlIFwiYm9va3NcIiBhcnJheSBhYm92ZS5cbmV4cG9ydCBjb25zdCByZXNvbHZlcnMgPSB7XG4gICAgUXVlcnk6IHtcbiAgICAgICAgYm9va3M6ICgpID0+IGxpc3QsXG4gICAgfSxcbn07Il19