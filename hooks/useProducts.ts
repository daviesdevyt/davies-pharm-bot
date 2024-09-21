import { useState, useEffect } from "react";
import ApiClient from "@/services/api-client";

type ProductData = any;

export const useProducts = () => {
  const [data, setData] = useState<ProductData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiClient = new ApiClient<ProductData>(`api/products`);
        const response = await apiClient.get();
        setData(response);
      } catch (err) {
        setError("Error loading products");
      } finally {
        setIsLoading(false);
      }
    };

    const cachedData = localStorage.getItem("products");
    if (cachedData) {
      setData(JSON.parse(cachedData));
      setIsLoading(false);
    } else {
      fetchData();
    }
  }, []);

  useEffect(() => {
    if (data) {
      localStorage.setItem("products", JSON.stringify(data));
    }
  }, [data]);

  return { data, error, isLoading };
};
