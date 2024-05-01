import { Skeleton } from "@/components/ui/skeleton"
export default function SkeletonLoading() {
  return (
    <div className="bg-white dark:bg-gray-950 w-full h-full pb-10 mt-10">
              <div className="mx-4 flex flex-row items-center">
                <Skeleton className="w-14 h-14 rounded-full" />
                <Skeleton className="ml-3 w-[190px] h-[24px] rounded-full" />
              </div>
              <div className="flex flex-col mt-5">
                <Skeleton className="mx-4 w-[170px] h-[24px] rounded-full" />
                <div className="flex justify-center flex-col mt-3 mx-4">
                  <Skeleton className="w-full h-[18px] rounded-full mt-3" />
                  <Skeleton className="w-full h-[18px] rounded-full mt-3" />
                  <Skeleton className="w-full h-[18px] rounded-full mt-3" />
                  
                  <Skeleton className="w-full h-[200px] rounded-lg mt-5" />
                  <div className="flex flex-row justify-between">
                    <Skeleton className="w-full h-[50px] rounded-sm mt-5 mr-2" />
                    <Skeleton className="w-full h-[50px] rounded-sm mt-5 ml-2" />
                  </div>
                  
                </div>
                
              </div>
            </div>
  )
}