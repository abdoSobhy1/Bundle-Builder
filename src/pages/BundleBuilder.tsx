export const BundleBuilder = () => {
  return (
    <div className="min-h-screen">
      <main className="mx-auto max-w-7xl px-4 py-8 md:py-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_400px]">
          <section aria-label="Bundle builder steps" className="space-y-4">
            <h1>Main app content</h1>
          </section>
          <aside
            aria-label="Bundle review"
            className="lg:sticky lg:top-6 lg:self-start">
            <h1>Review panel</h1>
          </aside>
        </div>
      </main>
    </div>
  );
};
