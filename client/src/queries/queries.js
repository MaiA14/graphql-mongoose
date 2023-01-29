import { gql } from 'apollo-boost';

const getCreatorsQuery = gql`
    {
        creators {
            name
            id
        }
    }
`;

const getAllSeriesQuery = gql`
    {
        allSeries {
            name
            id
        }
    }
`;

const addSeriesMutation = gql`
    mutation AddSeries($name: String!, $genre: String!, $creatorId: ID!){
        addSeries(name: $name, genre: $genre, creatorId: $creatorId){
            name
            id
        }
    }
`;

const getSeriesQuery = gql`
    query GetSeries($id: ID){
        series(id: $id) {
            id
            name
            genre
            creator {
                id
                name
                age
                series {
                    name
                    id
                }
            }
        }
    }
`;

export { getCreatorsQuery, getAllSeriesQuery, addSeriesMutation, getSeriesQuery };
