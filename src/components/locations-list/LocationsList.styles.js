import { StyleSheet } from "react-native";

export default StyleSheet.create({
  list: {
    marginTop: 10,
    borderTopColor: "#ccc",
    borderTopWidth: 1
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 40,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 2,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  itemDetails: {
    flex: 1
  },
  itemBtnContainer: {
    flexDirection: "row"
  },
  itemBtn: {
    marginLeft: 10
  },
  itemBtnIcon: {
    width: 25,
    height: 25,
    marginHorizontal: 5
  },
  errorMsg: {
    marginTop: 50,
    alignSelf: "center"
  }
});
