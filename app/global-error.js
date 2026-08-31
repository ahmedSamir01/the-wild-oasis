"use client";

export default function GlobalError({ error, reset }) {
  return (
    <html lang="en">
      <body className="bg-primary-950 text-primary-100 min-h-screen flex items-center justify-center">
        <main className="flex flex-col items-center gap-6 text-center px-8">
          <h1 className="text-3xl font-semibold">Something went wrong!</h1>
          <p className="text-lg">{error.message}</p>

          <button
            className="bg-accent-500 text-primary-800 px-6 py-3 text-lg"
            onClick={reset}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
