import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Pressable,
  ListRenderItem,
  ActivityIndicator,
  Platform,
  RefreshControl,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { Todo } from "../shared/types";
import { TodoActionSheet } from "../components/TodoActionSheet";
import { useTodos } from "../hooks/useTodos";

export default function HomeScreen() {
  const [newTodo, setNewTodo] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [actionsVisible, setActionsVisible] = useState(false);

  const showActions = (item: Todo) => {
    setSelectedTodo(item);
    setActionsVisible(true);
  };

  const hideActions = () => {
    setActionsVisible(false);
    setSelectedTodo(null);
  };

  const {
    todos,
    refetchTodos,
    isLoading,
    editTodo,
    deleteTodo,
    completeTodo,
    createTodo,
  } = useTodos();

  const addNewTodo = () => {
    createTodo(newTodo);
    setNewTodo("");
    Keyboard.dismiss();
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
      <Pressable style={styles.logoutButton}>
        <View style={styles.logoutTextContainer}>
          <Ionicons name={"arrow-back"} color={Colors.tint} />
          <Text style={styles.logoutText}>Logout</Text>
        </View>
      </Pressable>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.newTodoInput}
          value={newTodo}
          onChangeText={setNewTodo}
          onSubmitEditing={addNewTodo}
        />
        <Pressable style={styles.addNewButton} onPress={addNewTodo}>
          <Text style={styles.addNewTitle}>Add New</Text>
        </Pressable>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl onRefresh={refetchTodos} refreshing={isLoading} />
        }
        data={todos}
        keyboardDismissMode={"on-drag"}
        contentContainerStyle={styles.todoListContainer}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderTodoItem}
        ListHeaderComponent={
          isLoading ? (
            <ActivityIndicator
              style={{ marginTop: 20 }}
              size={"small"}
              color={Colors.tint}
            />
          ) : null
        }
        ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
      />

      <TodoActionSheet
        visible={actionsVisible}
        onClose={hideActions}
        title={selectedTodo?.title}
        todoId={selectedTodo?._id}
        onComplete={(_id) => completeTodo(_id)}
        onEdit={(_id, title) => editTodo({ _id, title })}
        onDelete={(_id) => deleteTodo(_id)}
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
    paddingTop: 16,
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
  logoutButton: {
    paddingLeft: 20,
    paddingTop: Platform.select({ default: 8, web: 20 }),
    alignSelf: "flex-start",
  },
  logoutText: {
    fontSize: 13,
    color: Colors.tint,
    textAlign: "left",
    marginLeft: 4,
  },
  logoutTextContainer: {
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
