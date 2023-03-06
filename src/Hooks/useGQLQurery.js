import { useQuery } from "react-query";
import { GraphQLClient, request } from "graphql-request";


export const useGQLQuery = (key, query, variables) => {
    const endpoint = 'https://01.kood.tech/api/graphql-engine/v1/graphql';

    const fetchData = async () => await request(endpoint, query, variables);

    return useQuery([...key], fetchData, { refetchOnWindowFocus: false })
}