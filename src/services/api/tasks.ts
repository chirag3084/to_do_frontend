import { TCreateFormSchema, TEditFormSchema } from "@/schemas/task-schema";
import { useAuthStore } from "@/stores/auth-store";
import { Task } from "@/types/types";
import axios from "axios";

export const getTasksOnUserAPI = async () => {
  const token = useAuthStore.getState().token;

  const response = await axios.get<Task[]>(
    "http://localhost:5000/api/v1/tasks/user",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data;
};

export const createTaskAPI = async (data: {
  formData: TCreateFormSchema;
  token: string | null;
}) => {
  const { formData, token } = data;

  await axios.post("http://localhost:5000/api/v1/tasks", formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateTaskAPI = async (data: {
  formData: TEditFormSchema;
  taskId: number;
  token: string | null;
}) => {
  const { formData, token, taskId } = data;

  await axios.put(`http://localhost:5000/api/v1/tasks/${taskId}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteTaskAPI = async (data: {
  taskId: number;
  token: string | null;
}) => {
  const { token, taskId } = data;

  await axios.delete(`http://localhost:5000/api/v1/tasks/${taskId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Add this to the bottom of tasks.ts

// 1. Define the response shape (Update this based on what your API actually returns)
export interface AnalyzeResponse {
  label: string; // e.g., "POSITIVE", "NEGATIVE"
  score: number; // e.g., 0.98
}

// 2. The API Function
export const analyzeTextAPI = async (text: string) => {
  // We use the full URL here since it's different from your localhost backend
  const response = await axios.post<AnalyzeResponse>(
    "https://chiragsurti10-to-do.hf.space/analyze",
    {
      text: text,
    }
  );

  return response.data;
};
      

