import ApiClient from "@/services/api-client";
import { useMutation } from "@tanstack/react-query";

interface Order {
  user: number;
  products: { _id: number; quantity: number }[];
  shipping_address: string;
}

const apiClient = new ApiClient<any>("api/order");
export const usePayment = () => {
  return useMutation({
    mutationFn: (orderdetails: Order) => apiClient.post(orderdetails),
  });
};
