import addLocation from "../../../graphql/mutations/addLocation";

describe("addLocation Mutation Testing", () => {
  it("addLocation Mutation Snapshots correctly", () => {
    expect(addLocation).toMatchSnapshot();
  });
});
