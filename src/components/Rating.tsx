import React from "react";

interface RatingProps {
  rating: number;
}

export function Rating({ rating }: RatingProps) {
  const roundedRating = Math.round(rating);

  const stars = Array.from({ length: 5 }, (_, index) => (
    <svg
      key={index}
      xmlns="http://www.w3.org/2000/svg"
      className={`h-5 w-5 fill-current ${
        index < roundedRating ? "text-yellow-500" : "text-gray-300"
      }`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 0l2.823 6.764 6.849.547c.887.07 1.246 1.18.587 1.78l-5.255 4.702 1.618 6.803c.209.874-.802 1.568-1.607 1.105L10 16.693l-6.915 4.202c-.806.487-1.815-.231-1.606-1.105L4.415 8.091.564 6.311c-.659-.598-.3-1.71.587-1.78L7.177 6.764 10 0z"
        clipRule="evenodd"
      />
    </svg>
  ));

  return <div className="flex">{stars}</div>;
}
