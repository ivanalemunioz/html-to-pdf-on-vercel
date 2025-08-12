"use client";

import { useState } from "react";

const defaultHtml = `<p style="text-align:center">
  Hello World! 
  <br />
  <b>
    This PDF was created using 
    <br />
    <a href="https://github.com/ivanalemunioz/html-to-pdf-on-vercel">
      https://github.com/ivanalemunioz/html-to-pdf-on-vercel
    </a>
  </b>
</p>`;

export default function HomePage() {
  const [html, setHtml] = useState(defaultHtml);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPDF = async () => {
    if (!html) {
      setError("Please enter a valid HTML.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/pdf?html=${encodeURIComponent(html)}`
      );
      if (!response.ok) {
        throw new Error("Failed to create PDF.");
      }
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = 'output.pdf'; // Desired filename
      document.body.appendChild(link); // Temporarily add to the DOM
      link.click(); // Programmatically click the link to trigger download
      document.body.removeChild(link); // Remove the link
      URL.revokeObjectURL(objectUrl); // Release the object URL
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          HTML to PDF on Vercel using Puppeteer
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Enter the HTML below to generate a PDF using Puppeteer running in
          a Vercel Function.
        </p>
        <div className="flex gap-2 flex-col">
          <textarea
            value={html}
            rows={13}
            onChange={(e) => setHtml(e.target.value)}
            placeholder="https://vercel.com"
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black focus:outline-none font-mono"
          />
          <button
            onClick={createPDF}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Creating PDF..." : "Create PDF"}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </main>
  );
}
