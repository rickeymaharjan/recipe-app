import { Skeleton } from "./ui/skeleton"

const CardSkeleton = ({ amount }) => {
  const skeletonCards = Array.from({ length: amount })
  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(270px,_1fr))] gap-6">
      {skeletonCards.map((_, index) => (
        <div key={index} className="p-4 aspect-[4/3] border rounded-lg shadow">
          <Skeleton className="w-full h-full bg-gray-300 rounded-lg mb-4" />
          <div className="flex gap-2 items-center">
            <Skeleton className="rounded-full w-8 h-8 bg-gray-300" />
            <Skeleton className="w-3/4 h-6 bg-gray-300" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardSkeleton
