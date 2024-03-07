import React from "react";
import { Card } from "./Card";

interface ProductListProps {
  products: any[];
}

export function ProductList({ products }: ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
      {products.map((product: any) => (
        <Card
          key={product.id}
          title={product.title}
          description={product.description}
          image={product.thumbnail}
          rating={product.rating}
          tag={product.category}
          price={product.price}
          discountPercentage={product.discountPercentage}
          stock={product.stock}
          brand={product.brand}
          images={product.images}
        />
      ))}
    </div>
  );
}
