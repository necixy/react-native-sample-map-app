import { StyleSheet } from "react-native";

export default StyleSheet.create({
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 50,
    padding: 20,
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
    margin: 5
  },
  errorMsg: {
    marginTop: 50,
    alignSelf: "center"
  }
});
