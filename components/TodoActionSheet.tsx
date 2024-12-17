import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { BottomSheet, BottomSheetProps } from "../components/BottomSheet";

interface TodoActionSheetProps extends BottomSheetProps {
  todoId?: string;
  isLoading?: boolean;
  onComplete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
  onDelete: (id: string) => void;
}

export const TodoActionSheet: React.FC<TodoActionSheetProps> = ({
  onComplete,
  onEdit,
  onDelete,
  todoId,
  isLoading,
  title,
  onClose,
  visible,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editedTodo, setEditedTodo] = useState("");

  const clearAllAndClose = () => {
    setEditedTodo("");
    setIsEditing(false);
    setIsDeleting(false);
    onClose?.();
  };

  const completeTodo = () => {
    if (todoId) {
      onComplete(todoId);
    }
  };

  const saveEdit = () => {
    if (todoId && editedTodo && editedTodo !== title && editedTodo !== "") {
      onEdit(todoId, editedTodo);
      clearAllAndClose();
    }
  };

  const deleteTodo = () => {
    if (todoId) {
      onDelete(todoId);
      clearAllAndClose();
    }
  };

  const renderLoading = () => (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size={"large"} color={Colors.tint} />
    </View>
  );

  const renderEditView = () => (
    <View style={styles.actionFormContainer}>
      <TextInput
        style={styles.todoInput}
        value={editedTodo}
        onChangeText={setEditedTodo}
      />
      <Pressable onPress={saveEdit}>
        <View style={styles.saveEditButton}>
          <Text style={styles.saveEditText}>Save</Text>
        </View>
      </Pressable>
    </View>
  );

  const renderDeleteView = () => (
    <View style={styles.actionFormContainer}>
      <Text style={styles.actionItemText}>
        Are you sure you want to delete the Todo item "{title}"?
      </Text>

      <Pressable onPress={deleteTodo}>
        <View style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </View>
      </Pressable>
    </View>
  );

  return (
    <BottomSheet title={title} onClose={clearAllAndClose} visible={visible}>
      {todoId ? (
        isLoading ? (
          renderLoading()
        ) : isEditing ? (
          renderEditView()
        ) : isDeleting ? (
          renderDeleteView()
        ) : (
          <>
            <Pressable onPress={completeTodo}>
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

            <Pressable onPress={() => setIsEditing(true)}>
              <View style={styles.actionItem}>
                <Text style={styles.actionItemText}>Edit</Text>
                <Ionicons name="pencil-outline" size={20} color={Colors.text} />
              </View>
            </Pressable>
            <View style={styles.itemSeparator} />

            <Pressable onPress={() => setIsDeleting(true)}>
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
        )
      ) : null}
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  itemSeparator: {
    backgroundColor: Colors.border,
    width: "100%",
    height: StyleSheet.hairlineWidth,
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
  loaderContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  actionFormContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  todoInput: {
    backgroundColor: Colors.inputBackground,
    color: Colors.tint,
    padding: 8,
    borderRadius: 8,
  },
  saveEditButton: {
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
  },
  saveEditText: {
    fontSize: 13,
    textAlign: "center",
    color: Colors.tint,
  },
  deleteButton: {
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.error,
    borderRadius: 8,
  },
  deleteButtonText: {
    fontSize: 13,
    textAlign: "center",
    color: Colors.error,
  },
});
