// Przejście między stronami przez CSS (klasa .page-enter). template.tsx montuje się przy
// każdej nawigacji, więc animacja odpala się ponownie — bez framer-motion i bez "use client".
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div id="main-content" tabIndex={-1} className="page-enter">
      {children}
    </div>
  );
}
