import deleteLocation from "../../../graphql/mutations/deleteLocation";

describe("deleteLocation Mutation Testing", () => {
  it("deleteLocation Mutation Snapshots correctly", () => {
    expect(deleteLocation).toMatchSnapshot();
  });
});
