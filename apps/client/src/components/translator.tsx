import { useState } from "react";

export default function Translator() {
  const [sourceLang, setSourceLang] = useState("en");
  const [targetLang, setTargetLang] = useState("es");
  const [message, setMessage] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setTranslatedText(""); // clear previous
    try {
      const res = await fetch("http://localhost:3000/api/experiments/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sourceLanguage: sourceLang,
          targetLanguage: targetLang,
          message: message,
        }),
      });
      const data = await res.json();
      // If your backend returns { content: "...translation..." }
      setTranslatedText(data?.kwargs?.content || "");
    } catch (err) {
      console.error("Translation error:", err);
      setTranslatedText("⚠️ Translation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4">
      <h2 className="text-2xl font-bold text-gray-800">Translator</h2>

      <div className="flex gap-4">
        {/* Source Language */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
            Source Language
          </label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full rounded-lg border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>

        {/* Target Language */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
            Target Language
          </label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full rounded-lg border-gray-300 p-4 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="es">Spanish</option>
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="de">German</option>
          </select>
        </div>
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
          Message
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full h-32 rounded-lg border-gray-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          placeholder="Enter text to translate..."
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleTranslate}
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {loading ? "Translating..." : "Translate"}
      </button>

      {/* Output */}
      {translatedText && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 text-left">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">Translated Text:</h3>
          <p className="text-gray-800 whitespace-pre-wrap">{translatedText}</p>
        </div>
      )}
    </div>
  );
}
