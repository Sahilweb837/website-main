export default function ProductSkeleton() {
  return (
    <div className="w-full max-w-[200px] bg-white rounded-md p-2">
      {/* Image */}
      <div className="sk w-full aspect-square rounded-sm" />

      {/* Title */}
      <div className="mt-3 space-y-2">
        <div className="sk h-3 w-full rounded" />
        <div className="sk h-3 w-4/5 rounded" />
      </div>

      {/* Price + rating */}
      <div className="mt-3 flex items-center gap-2">
        <div className="sk h-4 w-14 rounded" />
        <div className="sk h-3 w-10 rounded" />
      </div>

      {/* Offer */}
      <div className="sk h-3 w-2/3 rounded mt-2" />
    </div>
  );
}