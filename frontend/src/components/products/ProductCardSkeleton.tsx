const ProductCardSkeleton = () => {
  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-square skeleton-loader" />
      
      {/* Content skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-3 w-16 skeleton-loader rounded" />
        <div className="space-y-1.5">
          <div className="h-4 w-full skeleton-loader rounded" />
          <div className="h-4 w-3/4 skeleton-loader rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-12 skeleton-loader rounded" />
          <div className="h-3 w-8 skeleton-loader rounded" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-5 w-20 skeleton-loader rounded" />
          <div className="h-4 w-16 skeleton-loader rounded" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
