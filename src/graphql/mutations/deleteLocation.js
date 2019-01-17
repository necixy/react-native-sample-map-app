import gql from "graphql-tag";
export default gql`
  mutation DeleteLocation($id: ID!) {
    deleteLocation(id: $id)
  }
`;
