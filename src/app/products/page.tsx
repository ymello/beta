"use client";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import React, { useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProductList } from "@/components/ProductList";
import { useGetProducts, useSearchProducts } from "@/service/products";
import {
  useGetCategories,
  useGetProductsByCategory,
} from "@/service/categories";

const schema = yup.object().shape({
  search: yup.string(),
  category: yup.string(),
});

export default function ProductPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);

  const { register, handleSubmit, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  const { data: productsData, isLoading: isLoadingProducts } = useGetProducts(
    1,
    10
  );

  const { data: categoriesData, isLoading: isLoadingCategories } =
    useGetCategories();

  const { data: searchedProductsData, isLoading: isLoadingSearchedProducts } =
    useSearchProducts(query, !!query);

  const {
    data: productsByCategoryData,
    isLoading: isLoadingProductsByCategory,
  } = useGetProductsByCategory(selectedCategory, !!selectedCategory);

  const handleSearch = (data: any) => {
    if (data.category) {
      setSelectedCategory(data.category);
      setQuery("");
      setValue("search", "");
    } else {
      setQuery(data.search);
      setSelectedCategory("");
      setValue("category", "");
    }
  };

  useEffect(() => {
    if (productsByCategoryData) {
      setProducts(productsByCategoryData);
    } else if (searchedProductsData) {
      setProducts(searchedProductsData.products);
    } else if (productsData) {
      setProducts(productsData.products);
    }
  }, [productsByCategoryData, searchedProductsData, productsData]);

  if (
    isLoadingProducts ||
    isLoadingCategories ||
    isLoadingSearchedProducts ||
    isLoadingProductsByCategory
  )
    return <div>Loading...</div>;
  return (
    <div className="h-full container mx-auto py-10 space-y-5">
      <div className="bg-indigo-500 rounded-lg p-14">
        <form onSubmit={handleSubmit(handleSearch)} className="space-y-5">
          <label className="text-center font-bold text-white text-4xl mb-10">
            Pesquise o produto por nome ou categoria
          </label>

          <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
            <input
              className="text-base text-gray-400 flex-grow outline-none px-2 "
              type="text"
              {...register("search")}
              placeholder="Pesquise o nome do produto"
            />
            <div className="ms:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
              <select
                {...register("category")}
                className="text-base text-gray-800 outline-none border-2 px-4 py-2 rounded-lg"
              >
                <option value="">Todas as categorias</option>
                {categoriesData.map((category: string) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="bg-indigo-500 text-white text-base rounded-lg px-4 py-2 font-thin"
              >
                Pesquisar
              </button>
            </div>
          </div>
        </form>
      </div>
      {products && <ProductList products={products} />}
    </div>
  );
}
