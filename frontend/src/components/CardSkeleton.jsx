import { Skeleton } from "./ui/skeleton"

const CardSkeleton = ({ amount }) => {
  const skeletonCards = Array.from({ length: amount })
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(270px,_1fr))] gap-6">
      {skeletonCards.map((_, index) => (
        <div key={index} className="p-4 border rounded-lg shadow">
          <Skeleton className="w-full h-40 bg-gray-300 rounded-lg mb-4" />
          <Skeleton className="w-3/4 h-6 bg-gray-300 mb-2" />
          {/* <Skeleton className="w-1/2 h-6 bg-gray-300 mb-2" />
            <Skeleton className="w-full h-4 bg-gray-300" /> */}
        </div>
      ))}
    </div>
  )
}

export default CardSkeleton
