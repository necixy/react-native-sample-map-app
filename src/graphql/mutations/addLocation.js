import gql from "graphql-tag";
export default gql`
  mutation AddLocation(
    $name: String!
    $address: String!
    $lat: Float!
    $lng: Float!
  ) {
    addLocation(name: $name, address: $address, lat: $lat, lng: $lng) {
      id
      name
      address
      lat
      lng
    }
  }
`;
