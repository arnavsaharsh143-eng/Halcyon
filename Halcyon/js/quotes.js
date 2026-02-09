document.addEventListener('DOMContentLoaded', () => {
    /* --- Quotes & Chat Logic --- */
    const quoteText = document.getElementById('quote-text');
    const newQuoteBtn = document.getElementById('new-quote');
    const chatInput = document.getElementById('chat-message');
    const shareBtn = document.getElementById('share-btn');
    const chatFeed = document.getElementById('chat-feed');

    let allQuotes = [];
    let availableQuotes = [];

    // Fetch quotes from the local CSV file (daily_quotes.csv has 150 quotes)
    async function loadQuotes() {
        try {
            const response = await fetch('CSV files/daily_quotes.csv');
            if (!response.ok) throw new Error("Failed to load quotes CSV");

            const text = await response.text();
            const lines = text.split('\n');

            // Skip header and empty lines
            allQuotes = lines.slice(1)
                .map(line => {
                    const parts = line.split(/,(.+)/); // Split on first comma only
                    if (parts.length < 2) return null;
                    let quote = parts[1].trim();
                    if (quote.startsWith('"') && quote.endsWith('"')) {
                        quote = quote.slice(1, -1);
                    }
                    return quote.replace(/""/g, '"');
                })
                .filter(q => q);

            availableQuotes = [...allQuotes];
            displayNewQuote();
        } catch (error) {
            console.error("Error loading quotes:", error);
            // Minimal fallback
            allQuotes = ["You are enough.", "Keep going.", "Breathe."];
            availableQuotes = [...allQuotes];
            displayNewQuote();
        }
    }

    function displayNewQuote() {
        if (availableQuotes.length === 0) {
            availableQuotes = [...allQuotes];
        }

        const randomIndex = Math.floor(Math.random() * availableQuotes.length);
        const quote = availableQuotes.splice(randomIndex, 1)[0];

        if (quoteText) {
            quoteText.style.opacity = 0;
            setTimeout(() => {
                quoteText.textContent = `"${quote}"`;
                quoteText.style.opacity = 1;
            }, 300);
        }
    }

    if (newQuoteBtn) {
        newQuoteBtn.addEventListener('click', displayNewQuote);
    }

    /* --- Chat Logic --- */
    if (shareBtn && chatInput && chatFeed) {
        shareBtn.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.textContent = message;
                chatFeed.prepend(messageElement);
                chatInput.value = '';
            }
        });
    }

    // Start loading
    loadQuotes();
});
