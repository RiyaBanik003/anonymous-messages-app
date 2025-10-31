//just a TypeScript interface to standardize how the backend (or frontend API layer) sends responses.
import { Message } from "@/app/model/User";

// A generic interface for API responses
export interface ApiResponse<T> {
    messages: never[];
    success: boolean;              // Did the API call succeed or fail?
    data?: T;                      // Optional: The actual data being returned (can be any type T)
    message?: string;              // Optional: A message (like "User created successfully" or "Error: invalid token")
    isAcceptingMessages?: boolean; // Optional: Some extra field (for chat availability)
}
// <T> → generic type parameter. Makes this reusable. For example:

// ApiResponse<User> → response returns a User.

// ApiResponse<string> → response returns just a string.

// ApiResponse<void> → response with no data, only message/success.

// success: boolean → quick flag to check if API worked or not.

// data?: T → optional. Holds actual response data (user object, token, posts, etc.).

// message?: string → optional. Human-readable message.