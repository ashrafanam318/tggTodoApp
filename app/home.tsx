import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
  ListRenderItem,
  Keyboard,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { Todo } from "@/shared/types";
import { TodoActionSheet } from "@/components/TodoActionSheet";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [actionsVisible, setActionsVisible] = useState(false);

  const onAddNew = () => {
    setTodos((prev) => [
      ...prev,
      { id: prev.length.toString(), title: newTodo },
    ]);
    setNewTodo("");
    Keyboard.dismiss();
  };

  const showActions = (item: Todo) => {
    setSelectedTodo(item);
    setActionsVisible(true);
  };

  const hideActions = () => {
    setActionsVisible(false);
    setSelectedTodo(null);
  };

  const renderTodoItem: ListRenderItem<Todo> = ({ item }) => {
    return (
      <Pressable onPress={() => showActions(item)}>
        <View style={styles.todoContainer}>
          <Text style={styles.todoText}>{item.title}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.newTodoInput}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={onAddNew}
        />
        <Pressable style={styles.addNewButton} onPress={onAddNew}>
          <Text style={styles.addNewTitle}>Add New</Text>
        </Pressable>
      </View>
      <Pressable style={styles.completedTasksButton}>
        <View style={styles.completedTasksTextContainer}>
          <Text style={styles.completedTasksText}>Completed Tasks</Text>
          <Ionicons name={"arrow-forward"} color={Colors.success} />
        </View>
      </Pressable>

      <FlatList
        data={todos}
        keyboardDismissMode={"on-drag"}
        contentContainerStyle={styles.todoListContainer}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderTodoItem}
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />

      <TodoActionSheet
        visible={actionsVisible}
        onClose={hideActions}
        title={selectedTodo?.title}
        todoId={selectedTodo?.id}
        onComplete={(id) => {
          Alert.alert("Complete", selectedTodo?.title + " " + id);
        }}
        onEdit={(id, title) => {
          Alert.alert("Editing complete", title + " " + id);
        }}
        onDelete={(id) => {
          Alert.alert("deleting complete", selectedTodo?.title + " " + id);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingHorizontal: 20,
    paddingTop: 20,
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
  completedTasksButton: {
    paddingRight: 20,
    paddingVertical: 16,
    alignSelf: "flex-end",
  },
  completedTasksText: {
    fontSize: 13,
    color: Colors.success,
    textAlign: "right",
    marginRight: 4
  },
  completedTasksTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  todoListContainer: { paddingHorizontal: 20, paddingBottom: 20 },
  todoText: {
    flex: 1,
    fontSize: 16,
    color: Colors.tint,
    marginRight: 24,
  },
  todoContainer: {
    padding: 16,
    flexDirection: "row",
    color: Colors.text,
    borderColor: Colors.border,
  },
  itemSeparator: {
    backgroundColor: Colors.border,
    width: "100%",
    height: StyleSheet.hairlineWidth,
  },
});
