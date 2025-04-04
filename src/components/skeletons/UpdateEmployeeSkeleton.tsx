import { Skeleton } from '@/components/ui/skeleton';

const UpdateEmployeeSkeleton = () => (
  <div className="space-y-4 text-marine flex flex-col gap-2">
    <div>
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div>
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div>
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-10 w-full" />
    </div>
    <div className="flex justify-end gap-4 pt-4">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-32" />
    </div>
  </div>
);

export default UpdateEmployeeSkeleton;
