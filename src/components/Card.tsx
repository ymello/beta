import React from "react";
import { DeleteModal } from "./DeleteModal";
import { Rating } from "./Rating";
import { UpdateModal } from "./UpdateModal";

interface CardProps {
  id: number;
  title: string;
  description: string;
  image: string;
  rating: number;
  tag: string;
  price: number;
  discountPercentage: number;
  stock: number;
  brand: string;
  images: string[];
}

export function Card({
  id,
  title,
  description,
  image,
  rating,
  tag,
  price,
  discountPercentage,
  stock,
  brand,
  images,
}: CardProps) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image} alt="" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{description}</p>

        <div className="pt-4 pb-2 space-y-3">
          <Rating rating={rating} />
          <div className="flex items-center gap-1">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{brand}
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #{tag}
            </span>
          </div>
        </div>
        <div className="py-2">
          <p className="text-gray-700 text-base">Preço: R${price.toFixed(2)}</p>
          <p className="text-gray-700 text-base">
            Desconto: {discountPercentage.toFixed(2)}%
          </p>
          <p className="text-gray-700 text-base">Estoque: {stock}</p>
        </div>

        <div className="flex items-center justify-between">
          <DeleteModal title={title} id={id} />
          <UpdateModal title={title} id={id} description={description} />
        </div>
      </div>
      <div className="flex justify-center mt-4 overflow-x-auto min-w-full">
        {images.map((urlImagem, índice) => (
          <img
            key={índice}
            className="w-20 h-20 object-cover mx-2 my-2"
            src={urlImagem}
            alt={`Produto ${índice + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
