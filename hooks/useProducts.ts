import ApiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

type ProductData = any;

export const useProducts = () => {

    const apiClient = new ApiClient<ProductData>(`api/products`);

    return useQuery({
        queryKey: ["products"],
        queryFn: () => apiClient.get(),
        // enabled: !!user_id,
    });
};
