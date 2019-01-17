import React, { Component } from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import { ApolloProvider } from "react-apollo";
import { withClientState } from "apollo-link-state";
import KEYS from "./src/config/keys";

import routes from "./src/config/routes";
const RootStack = routes;

const cache = new InMemoryCache();
const stateLink = withClientState({
  cache,
  defaults: {
    testing: {
      __typename: "testing",
      name: "",
      age: 0
    }
  }
});

const authLink = setContext(async (_, { headers }) => {
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers
    }
  };
});

const client = new ApolloClient({
  cache,
  link: authLink.concat(
    ApolloLink.from([
      stateLink,
      new HttpLink({ uri: `${KEYS.BASE_URL}/graphql` })
    ])
  )
});
// make client to rewrite the defaults every time the store resets
client.onResetStore(stateLink.writeDefaults);

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    );
  }
}
