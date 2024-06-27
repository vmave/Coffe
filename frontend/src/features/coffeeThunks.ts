import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Coffee } from "./coffeeSlice";

export interface ErrorResponse {
  message: string;
  statusCode: number;
}

const api = axios.create({
  baseURL: "http://localhost:5555",
});

export const fetchCoffee = createAsyncThunk<Coffee[]>(
  "coffee/fetchCoffee",
  async () => {
    try {
      const response = await api.get("/coffee");
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch coffee!");
    }
  }
);

type ThunkApiConfig = {
  rejectValue: ErrorResponse;
};

export const addCoffeeAsync = createAsyncThunk<
  Coffee,
  FormData,
  ThunkApiConfig
>("coffee/addCoffee", async (coffee: FormData, { rejectWithValue }) => {
  try {
    const response = await api.post("/coffee", coffee);
    return response.data as Coffee;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data.message);
    }
    return rejectWithValue({
      message: "An unexpected error occurred",
      statusCode: 500,
    });
  }
});
