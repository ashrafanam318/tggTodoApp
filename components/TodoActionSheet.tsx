import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { Colors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheet, BottomSheetProps } from "@/components/BottomSheet";
import { Todo } from "@/shared/types";

interface TodoActionSheetProps extends BottomSheetProps {
  todoId?: string;
  onCompletePress: (id: string) => void;
  onEditPress: (id: string) => void;
  onDeletePress: (id: string) => void;
}

export const TodoActionSheet: React.FC<TodoActionSheetProps> = ({
  onCompletePress,
  onEditPress,
  onDeletePress,
  todoId,
  ...modalProps
}) => {
  return (
    <BottomSheet {...modalProps}>
      {todoId ? (
        <>
          <Pressable onPress={() => onCompletePress(todoId)}>
            <View style={styles.actionItem}>
              <Text style={styles.actionItemText}>Complete</Text>
              <Ionicons
                name="checkbox-outline"
                size={20}
                color={Colors.success}
              />
            </View>
          </Pressable>
          <View style={styles.itemSeparator} />

          <Pressable onPress={() => onEditPress(todoId)}>
            <View style={styles.actionItem}>
              <Text style={styles.actionItemText}>Edit</Text>
              <Ionicons name="pencil-outline" size={20} color={Colors.text} />
            </View>
          </Pressable>
          <View style={styles.itemSeparator} />

          <Pressable onPress={() => onDeletePress(todoId)}>
            <View style={styles.actionItem}>
              <Text style={styles.actionItemText}>Delete</Text>
              <Ionicons
                name="trash-bin-outline"
                size={20}
                color={Colors.error}
              />
            </View>
          </Pressable>
        </>
      ) : null}
    </BottomSheet>
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
  actionContainer: {
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
