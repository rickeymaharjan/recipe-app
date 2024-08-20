import { Skeleton } from "../ui/skeleton"

export default function RecipePageSkeleton() {
  return (
    <div className="flex flex-col px-[100px] mb-5 mt-2">
      {/* Profile section */}
      <div className="sticky top-0 flex items-center justify-between w-full py-3 mb-4 bg-gray-50">
        <div className="flex">
          <Skeleton className="w-12 h-12 rounded-full bg-gray-300" />
          <div className="flex flex-col justify-center ml-4">
            <Skeleton className="w-24 h-4 mb-2 bg-gray-300" />
            <Skeleton className="w-16 h-3 bg-gray-300" />
          </div>
        </div>

        <div className="flex gap-2">
          <Skeleton className="w-[35px] h-[35px] rounded-full bg-gray-300" />
          <Skeleton className="w-[35px] h-[35px] rounded-full bg-gray-300" />
        </div>
      </div>

      <div className="flex gap-16 bg-gray-50">
        {/* Left side */}
        <div className="w-[380px]">
          {/* Recipe image */}
          <Skeleton className="w-full h-[530px] mb-8 rounded-md bg-gray-300" />

          {/* Ingredients list */}
          <div className="w-full bg-white border px-[30px] py-[25px] rounded-xl">
            <Skeleton className="w-40 h-6 mb-4 bg-gray-300" />

            <div className="flex flex-col gap-3">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div key={index} className="flex justify-between mb-5">
                    <Skeleton className="w-32 h-4 bg-gray-300" />
                    <Skeleton className="w-16 h-4 bg-gray-300" />
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex-1 pt-3">
          {/* Recipe info */}
          <div className="flex flex-col gap-8">
            <Skeleton className="w-[460px] h-[60px] bg-gray-300" />
            <Skeleton className="w-full h-[60px] max-w-[600px] bg-gray-300" />
            <Skeleton className="w-full h-4 max-w-[600px] bg-gray-300" />

            <div className="flex gap-5">
              {Array(3)
                .fill(null)
                .map((_, index) => (
                  <Skeleton key={index} className="w-24 h-4 bg-gray-300" />
                ))}
            </div>

            <div className="flex flex-col gap-4">
              <Skeleton className="w-40 h-4 bg-gray-300" />
              <div className="flex gap-4">
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <Skeleton key={index} className="w-24 h-4 bg-gray-300" />
                  ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="flex flex-col gap-1 bg-white border px-[30px] py-[25px] rounded-xl">
              <Skeleton className="w-40 h-6 mb-4 bg-gray-300" />
              {Array(7)
                .fill(null)
                .map((_, index) => (
                  <Skeleton
                    key={index}
                    className="w-full h-4 bg-gray-300 mb-10"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
