import { Href, router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface IQuickLink {
  title: string;
  icon: any;
  linkTo: Href | undefined;
}
export const QuickLink = ({ title, icon, linkTo }: IQuickLink) => {
  return (
    <TouchableOpacity
      style={styles.quickLinkCard}
      onPress={() => linkTo && router.push(linkTo)}
    >
      <View style={[styles.quickLinkIcon, { backgroundColor: "#005EE8" }]}>
        <Image source={icon} style={{ width: 30, height: 30 }} />
      </View>
      <Text style={styles.quickLinkText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  quickLinkCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    width: 230,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "flex-start",
    borderWidth: 1,
    marginRight: 30,
    borderColor: "#F3F4F6",
  },
  quickLinkIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  quickLinkText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#005EE8",
    textAlign: "center",
  },
});
