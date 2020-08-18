import { GraphQLModule } from '@graphql-modules/core';
import { resolvers } from './resolvers';
import { typeDefs } from './type-defs';

export const bookModule = new GraphQLModule({
  name: 'BookModule',
  typeDefs,
  resolvers,
  imports: [],
});
