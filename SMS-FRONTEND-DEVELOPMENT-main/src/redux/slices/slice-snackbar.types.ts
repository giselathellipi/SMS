export interface SnackBarOptions {
  id?: string;
  type?: "success" | "error" | "warning" | "info" | undefined;
  message?: string | undefined;
}
