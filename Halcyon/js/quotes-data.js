// Placeholder for Google Sheet CSV URL
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSdQH3iZt29nz5DxLN9gG4DXkw5ClhnmFCXkEazlHngEPLfQapVGbpbhOjFfLsS_wZJxGwaw8qqVpq6/pub?gid=1583308783&single=true&output=csv';

// Fallback quotes in case fetch fails or URL isn't set
const fallbackQuotes = {
    "anxious": ["Take a deep breath. You are safe right now."],
    "sad": ["It's okay to feel this way."],
    "overwhelmed": ["Focus on one small thing at a time."],
    "lonely": ["You are connected to so many people."],
    "tired": ["Rest is productive."],
    "stressed": ["This stress is temporary."]
};

let quotesData = {}; // parsed data: { 'anxious': ['quote1', 'quote2'], ... }

// Function to parse CSV text robustly
function parseCSV(text) {
    const lines = text.split(/\r?\n/); // Handle both \n and \r\n
    const result = {};

    // Skip header (i=1)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Parse CSV line handling quotes
        const parts = [];
        let current = '';
        let inQuotes = false;

        for (let j = 0; j < line.length; j++) {
            const char = line[j];
            if (char === '"') {
                inQuotes = !inQuotes;
            } else if (char === ',' && !inQuotes) {
                parts.push(current);
                current = '';
            } else {
                current += char;
            }
        }
        parts.push(current); // Push last part

        if (parts.length >= 2) {
            // Normalize mood to lowercase to match data-mood attributes in HTML
            const mood = parts[0].trim().toLowerCase();
            let quote = parts[1].trim();

            // Remove wrapping quotes if present
            if (quote.startsWith('"') && quote.endsWith('"')) {
                quote = quote.slice(1, -1);
            }
            // Handle double quotes unescaping
            quote = quote.replace(/""/g, '"');

            // Only add if mood is not empty
            if (mood) {
                if (!result[mood]) {
                    result[mood] = [];
                }
                result[mood].push(quote);
            }
        }
    }
    return result;
}

// Fetch Data
async function fetchQuotes() {
    if (SHEET_URL.includes('PASTE_YOUR')) {
        console.log("Using fallback quotes. Please update SHEET_URL.");
        return;
    }

    try {
        // Add timestamp to prevent caching
        const bustCacheUrl = SHEET_URL + '&t=' + new Date().getTime();
        console.log("Fetching from:", bustCacheUrl);

        const response = await fetch(bustCacheUrl, {
            cache: "no-store"
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        // console.log("Raw CSV text (first 100 chars):", text.substring(0, 100));

        quotesData = parseCSV(text);
        // console.log("Parsed keys:", Object.keys(quotesData));
        // console.log("Sample quote for 'anxious':", quotesData['anxious'] ? quotesData['anxious'][0] : 'None');

        console.log("Halcyon: Quotes loaded successfully.");
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

// Auto-fetch on load
fetchQuotes();
