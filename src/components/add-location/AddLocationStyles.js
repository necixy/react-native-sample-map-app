import { StyleSheet } from "react-native";
import theme from "../../config/theme";

export default StyleSheet.create({
  container: {
    flex: 1
  },
  addressInput: {
    padding: 20,
    backgroundColor: "#f5f5f5"
  },
  listContainer: {
    flex: 1
  },
  listHeader: {
    padding: 20,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  listHeaderLbl: {
    color: "#777"
  },
  list: {
    flex: 1
  },
  listItem: {
    minHeight: 50,
    padding: 20,
    marginTop: 2,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1
  },
  errorMsg: {
    marginTop: 50,
    alignSelf: "center",
    color: theme.primary
  }
});
