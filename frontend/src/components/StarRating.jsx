import { useState } from "react"

// Star Component
export const Star = ({
  filled,
  half,
  onClick,
  onMouseEnter,
  onMouseLeave,
  readOnly,
  size = 16, // default size set to 16px
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "black" : half ? "url(#halfGradient)" : "none"}
      stroke="black"
      strokeWidth="2"
      className={`cursor-pointer ${!readOnly ? "cursor-pointer" : ""}`}
      width={size}
      height={size}
      onClick={!readOnly ? onClick : undefined}
      onMouseEnter={!readOnly ? onMouseEnter : undefined}
      onMouseLeave={!readOnly ? onMouseLeave : undefined}
    >
      <defs>
        <linearGradient id="halfGradient">
          <stop offset="50%" stopColor="black" />
          <stop offset="50%" stopColor="none" />
        </linearGradient>
      </defs>
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
      />
    </svg>
  )
}

// Default export for StarRating Component
const StarRating = ({ rating, setRating, readOnly = false, size = 16 }) => {
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => {
        const fullStarValue = i + 1
        const halfStarValue = i + 0.5

        const isFilled = hoverRating
          ? hoverRating >= fullStarValue
          : rating >= fullStarValue

        const isHalf =
          !isFilled && rating >= halfStarValue && rating < fullStarValue

        return (
          <Star
            key={i}
            filled={isFilled}
            half={isHalf}
            readOnly={readOnly}
            size={size} // pass the size prop to each Star component
            onClick={() => setRating(isHalf ? halfStarValue : fullStarValue)}
            onMouseEnter={() => setHoverRating(fullStarValue)}
            onMouseLeave={() => setHoverRating(0)}
          />
        )
      })}
    </div>
  )
}

export default StarRating
