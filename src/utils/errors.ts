import { AppError } from "@/types/errorTypes";

export const createError = (message: string, statusCode: number): AppError => {
  return { message, statusCode };
};

export const notFoundError = (message: string): never => {
  throw createError(message, 404);
};

export const badRequestError = (message: string): never => {
  throw createError(message, 400);
};

export const unauthorizedError = (message: string): never => {
  throw createError(message, 401);
};

export const forbiddenError = (message: string): never => {
  throw createError(message, 403);
};
export const serverError = (message: string): never => {
  throw createError(message, 500);
};
