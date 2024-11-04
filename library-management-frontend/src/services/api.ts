// src/services/api.ts
import axios, { AxiosResponse } from 'axios';

// Custom API Error class
export class ApiError extends Error {
  statusCode?: number;
  responseData?: any;

  constructor(message: string, statusCode?: number, responseData?: any) {
    super(message);
    this.statusCode = statusCode;
    this.responseData = responseData;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// Axios client setup
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

const handleApiResponse = async <T>(request: Promise<AxiosResponse<T>>): Promise<T> => {
  try {
    const response = await request;
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      const responseData = error.response?.data;
      throw new ApiError(`API call failed with status ${statusCode}: ${error.message}`, statusCode, responseData);
    } else {
      throw new Error('An unexpected error occurred');
    }
  }
};

// Exported API functions
export const fetchBooks = () => handleApiResponse(apiClient.get('/books'));
export const fetchBookDetails = (id: number) => handleApiResponse(apiClient.get(`/books/${id}`));
export const fetchUsers = () => handleApiResponse(apiClient.get('/users'));
export const fetchUserDetails = (id: number) => handleApiResponse(apiClient.get(`/users/${id}`));
export const borrowBook = (userId: number, bookId: number) =>
  handleApiResponse(apiClient.post(`/users/${userId}/borrow/${bookId}`));
export const returnBook = (userId: number, bookId: number, score: number) =>
  handleApiResponse(apiClient.post(`/users/${userId}/return/${bookId}`, { score: Number(score) }));

// New endpoints for creating books and users
export const createBook = (bookData: { name: string; score?: number }) =>
  handleApiResponse(apiClient.post('/books', bookData));

export const createUser = (userData: { name: string }) =>
  handleApiResponse(apiClient.post('/users', userData));
