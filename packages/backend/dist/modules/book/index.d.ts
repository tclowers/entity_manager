import { GraphQLModule } from '@graphql-modules/core';
export declare const bookModule: GraphQLModule<any, any, any, {
    Query: {
        books: () => {
            title: string;
            author: string;
        }[];
    };
}>;
