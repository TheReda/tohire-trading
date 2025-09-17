"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Optional: log to your monitoring here
  console.error(error);

  return (
    <html>
      <body className="min-h-screen grid place-items-center p-8 text-center">
        <div>
          <h1 className="text-4xl font-bold">Something went wrong</h1>
          <p className="mt-2 text-gray-500">An unexpected error occurred.</p>
          <button
            onClick={() => reset()}
            className="mt-6 inline-flex items-center gap-2 rounded-lg px-4 py-2 border"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
