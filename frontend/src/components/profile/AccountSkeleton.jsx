import { Skeleton } from "../ui/skeleton"

const AccountSkeleton = () => {
  return (
    <div className="min-h-[100vh] px-64 py-24">
      {/* Profile */}
      <div className="flex gap-4 items-start mb-16">
        <Skeleton className="w-12 h-12 rounded-full bg-gray-300" />

        <div className="flex gap-1 flex-col">
          <Skeleton className="h-8 w-48 bg-gray-300" />
          <Skeleton className="h-4 w-36 bg-gray-300" />
        </div>
      </div>

      <div className="flex gap-10">
        <div className="flex flex-col text-gray-500 gap-2 w-[200px]">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <Skeleton key={index} className="h-6 w-full bg-gray-300" />
            ))}
          <div className="border w-full my-3"></div>
          <Skeleton className="h-6 w-full bg-gray-300 text-red-500" />
        </div>

        <Skeleton className="flex-1 h-80 bg-gray-300" />
      </div>
    </div>
  )
}

export default AccountSkeleton
