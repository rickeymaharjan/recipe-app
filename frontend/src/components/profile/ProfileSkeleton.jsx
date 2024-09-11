import { Skeleton } from "../ui/skeleton"

function ProfileSkeleton() {
  const skeletonCards = Array.from({ length: 4 })

  return (
    <div className="common-padding" style={{ minHeight: "calc(100vh - 75px)" }}>
      {/* Top section */}
      <div className="flex items-center gap-5 mt-12 mb-12">
        <Skeleton className="w-32 h-32 rounded-full bg-gray-300" />

        <div className="flex flex-col gap-[10px]">
          <Skeleton className="w-48 h-6 bg-gray-300" />
          <Skeleton className="w-32 h-4 bg-gray-300" />
          <Skeleton className="w-[110px] h-8 rounded-full bg-gray-300" />
        </div>
      </div>
      {/* Tabs */}
      <div className="flex gap-8 text-gray-400 mb-5">
        {[1, 2, 3].map((_, index) => (
          <Skeleton key={index} className="w-20 h-5 bg-gray-300" />
        ))}
      </div>
      {/* Skeleton Cards */}
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(270px,_1fr))] gap-6">
        {skeletonCards.map((_, index) => (
          <div
            key={index}
            className="p-4 aspect-[4/3] border rounded-lg shadow"
          >
            <Skeleton className="w-full h-full bg-gray-300 rounded-lg mb-4" />
            <div className="flex gap-2 items-center">
              <Skeleton className="rounded-full w-8 h-8 bg-gray-300" />
              <Skeleton className="w-3/4 h-6 bg-gray-300" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProfileSkeleton
