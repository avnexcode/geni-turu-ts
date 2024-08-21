export default interface MessageResponse {
  message: string;
  endpoints?: {
    emojis: string;
    products: string;
    categories: string;
  };
}