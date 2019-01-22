import locations from "../../../graphql/queries/locations";

describe("Locations Query Testing", () => {
  it("Locations Query Snapshots correctly", () => {
    expect(locations).toMatchSnapshot();
  });
});
