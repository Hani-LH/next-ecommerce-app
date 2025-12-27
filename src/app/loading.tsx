export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-surface-200 rounded-full" />
        <div className="absolute inset-0 border-4 border-brand-600 rounded-full border-t-transparent animate-spin" />
      </div>
      <p className="mt-4 text-surface-600">Loading...</p>
    </div>
  );
}
