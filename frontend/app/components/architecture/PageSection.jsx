export default function PageSection({
  title,
  subtitle,
  children,
  dark = false,
}) {
  return (
    <section
      className={`py-28 ${
        dark ? "bg-slate-900/40" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-10">

        {(title || subtitle) && (
          <div className="mb-16 max-w-4xl">

            {title && (
              <h2 className="text-4xl font-bold tracking-tight">
                {title}
              </h2>
            )}

            {subtitle && (
              <p className="mt-6 text-lg leading-8 text-slate-400">
                {subtitle}
              </p>
            )}

          </div>
        )}

        {children}

      </div>
    </section>
  );
}