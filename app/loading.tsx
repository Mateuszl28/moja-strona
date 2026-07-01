export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center"
      role="status"
      aria-label="Ładowanie"
    >
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--line)] border-t-accent" />
    </div>
  );
}
