import CONSTANTS from "expo-constants";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../shared/types";

const API_URL = CONSTANTS.expoConfig?.extra?.apiUrl + "/api/todos";

const fetchTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

const deleteTodo = async (_id: Todo["_id"]): Promise<void> => {
  await axios.delete(API_URL + `/${_id}`);
};

const completeTodo = async (_id: Todo["_id"]): Promise<Todo> => {
  const response = await axios.put(API_URL + `/${_id}`, { completed: true });
  return response.data;
};

const editTodo = async ({
  _id,
  title,
}: Pick<Todo, "_id" | "title">): Promise<Todo> => {
  const response = await axios.put(API_URL + `/${_id}`, { title });
  return response.data;
};

const createTodo = async (title: Todo["title"]): Promise<Todo> => {
  const response = await axios.post(API_URL, { title });
  return response.data;
};

export const useTodos = () => {
  const queryClient = useQueryClient();

  const {
    data: todos,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });

  const refreshTodos = () => {
    queryClient
      .invalidateQueries({ queryKey: ["todos"] })
      .then(() => refetch());
  };

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: deleteTodo,
    onSuccess: refreshTodos,
  });

  const completeMutation = useMutation({
    mutationFn: completeTodo,
    onSuccess: refreshTodos,
  });

  const editMutation = useMutation({
    mutationFn: editTodo,
    onSuccess: refreshTodos,
  });

  const createMutation = useMutation({
    mutationFn: createTodo,
    onSuccess: refreshTodos,
  });

  return {
    todos,
    isLoading,
    isError,
    refetchTodos: refetch,
    deleteTodo: deleteMutation.mutate,
    completeTodo: completeMutation.mutate,
    editTodo: editMutation.mutate,
    createTodo: createMutation.mutate,
  };
};
