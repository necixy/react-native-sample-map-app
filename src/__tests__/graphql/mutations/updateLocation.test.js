import updateLocation from "../../../graphql/mutations/updateLocation";

describe("updateLocation Mutation Testing", () => {
  it("updateLocation Mutation Snapshots correctly", () => {
    expect(updateLocation).toMatchSnapshot();
  });
});
