import gql from "graphql-tag";
export default gql`
  query {
    locations {
      id
      name
      address
      lat
      lng
    }
  }
`;
