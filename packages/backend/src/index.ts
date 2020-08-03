import '/config'; // loading .env file values
import { ApolloServer } from 'apollo-server';
import { bookModule } from '/modules/book';

const server = new ApolloServer({
    modules: [bookModule]
 });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});