import axiosInstance from "@/utils/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "react-query";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string[];
  thumbnail: string;
  images: string[];
}

const API_URL = "/products";

export const useGetProducts = (page: number, limit: number) => {
  return useQuery(["products", page], async () => {
    const { data } = await axiosInstance.get(API_URL, {
      params: {
        limit,
        skip: (page - 1) * limit,
      },
    });
    return data;
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((newProduct: Partial<Product>) =>
    axiosInstance.post(API_URL + "/add", newProduct)
  );
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      id,
      updatedProduct,
    }: {
      id: number;
      updatedProduct: Partial<Product>;
    }) => axiosInstance.put(`${API_URL}/${id}`, updatedProduct),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => axiosInstance.delete(`${API_URL}/${id}`), {
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
};

export const useSearchProducts = (query: string, enabled: boolean) => {
  return useQuery(
    ["search", query],
    async () => {
      const { data } = await axiosInstance.get(`${API_URL}/search`, {
        params: {
          q: query,
        },
      });
      return data;
    },
    {
      enabled: enabled && !!query,
    }
  );
};
