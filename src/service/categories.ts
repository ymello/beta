import axiosInstance from "@/utils/axiosConfig";
import { useMutation, useQuery, useQueryClient } from "react-query";

const API_URL = "/products/categories";
const API_URL2 = "/products/category";

export const useGetCategories = () => {
  return useQuery("categories", async () => {
    const { data } = await axiosInstance.get(API_URL);
    return data;
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation((newCategory: string) =>
    axiosInstance.post(API_URL, { category: newCategory })
  );
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    ({
      oldCategory,
      updatedCategory,
    }: {
      oldCategory: string;
      updatedCategory: string;
    }) =>
      axiosInstance.put(`${API_URL}/${oldCategory}`, {
        category: updatedCategory,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (category: string) => axiosInstance.delete(`${API_URL}/${category}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("categories");
      },
    }
  );
};

export const useGetProductsByCategory = (
  category: string,
  enabled: boolean
) => {
  return useQuery(
    ["products", "category", category],
    async () => {
      const { data } = await axiosInstance.get(`${API_URL2}/${category}`);
      return data.products;
    },
    {
      enabled: enabled && !!category,
    }
  );
};
