import React from "react";
import { View, Text, StyleSheet, Modal, Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export interface BottomSheetProps {
  visible?: boolean;
  onClose?: () => void;
  title?: string;
  children?: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  visible,
  onClose,
  title,
  children,
}) => {
  return (
    <Modal
      animationType={Platform.select({ default: "slide", web: "fade" })}
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalTitleContainer}>
            <Text
              style={styles.modalTitle}
              ellipsizeMode="tail"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Ionicons
              name={"close"}
              size={20}
              color={Colors.border}
              onPress={onClose}
            />
          </View>

          <View style={styles.childrenContainer}>{children}</View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.background,
  },
  newTodoInput: {
    backgroundColor: Colors.inputBackground,
    color: Colors.tint,
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 12,
  },
  addNewButton: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
    borderColor: Colors.border,
  },
  addNewTitle: {
    fontSize: 13,
    color: Colors.tint,
  },
  todoText: {
    flex: 1,
    fontSize: 14,
    color: Colors.tint,
    marginRight: 24,
  },
  todoContainer: {
    padding: 10,
    flexDirection: "row",
    color: Colors.text,
    borderColor: Colors.border,
  },
  itemSeparator: {
    backgroundColor: Colors.border,
    width: "100%",
    height: StyleSheet.hairlineWidth,
  },
  modalContainer: {
    flex: 1,
    alignItems: Platform.select({ web: "center" }),
    justifyContent: Platform.select({ web: "center", default: "flex-end" }),
    backgroundColor: Colors.modalTintedBackground,
  },
  modalContent: {
    alignItems: "center",
    backgroundColor: Colors.inputBackground,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 32,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    ...Platform.select({
      web: {
        minWidth: 360,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      },
    }),
  },
  modalTitleContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    width: "100%",
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    marginRight: 12,
    color: Colors.text,
  },
  childrenContainer: {
    backgroundColor: Colors.background,
    borderRadius: 20,
    width: "100%",
    height: 180,
    padding: 20,
  },
  actionItem: {
    flexDirection: "row",
    paddingVertical: 12,
    width: "100%",
  },
  actionItemText: { fontSize: 18, color: Colors.text, flex: 1 },
});
