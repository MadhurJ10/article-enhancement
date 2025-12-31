export function cleanText(rawText, maxLength = 8000) {
  if (!rawText) return "";

  let text = rawText;

  // 1️⃣ Remove HTML tags
  text = text.replace(/<[^>]*>/g, " ");

  // 2️⃣ Remove JSON-like noise (keys, braces)
  text = text.replace(/[{[\]}"]/g, " ");

  // 3️⃣ Remove escaped characters
  text = text.replace(/\\n|\\t|\\r/g, " ");

  // 4️⃣ Remove extra spaces
  text = text.replace(/\s+/g, " ").trim();

  // 5️⃣ Limit length (VERY IMPORTANT for LLM)
  if (text.length > maxLength) {
    text = text.slice(0, maxLength);
  }

  return text;
}
