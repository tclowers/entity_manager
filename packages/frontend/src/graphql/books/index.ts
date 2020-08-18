import { gql } from '@apollo/client';

export const query = gql`
    query Books {
        books {
            title,
            author
        }
    }
`;

