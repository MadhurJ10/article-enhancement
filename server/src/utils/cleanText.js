export function cleanText(rawText, maxLength = 8000) {
  if (!rawText) return "";

  let text = rawText;

  
  text = text.replace(/<[^>]*>/g, " ");

  
  text = text.replace(/[{[\]}"]/g, " ");

  
  text = text.replace(/\\n|\\t|\\r/g, " ");

  
  text = text.replace(/\s+/g, " ").trim();

  
  if (text.length > maxLength) {
    text = text.slice(0, maxLength);
  }

  return text;
}
