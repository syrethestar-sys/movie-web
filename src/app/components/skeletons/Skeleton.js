export const Skeleton = ({ className = "" }) => {
  return (
    <div className={`relative overflow-hidden rounded-md ${className}`}>
      <div className="animate-shimmer absolute inset-0 bg-linear-to-r from-transparent via-white/40 to-transparent" />
    </div>
  );
};
