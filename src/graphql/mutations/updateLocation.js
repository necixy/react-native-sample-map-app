import gql from "graphql-tag";
export default gql`
  mutation UpdateLocation(
    $id: ID!
    $name: String!
    $address: String!
    $lat: Float!
    $lng: Float!
  ) {
    updateLocation(
      id: $id
      name: $name
      address: $address
      lat: $lat
      lng: $lng
    ) {
      id
      name
      address
      lat
      lng
    }
  }
`;
