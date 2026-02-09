document.addEventListener('DOMContentLoaded', () => {
    /* --- Mood Page Logic --- */
    const moodCards = document.querySelectorAll('.mood-card');
    const moodResponse = document.getElementById('mood-response');
    const moodQuoteText = document.getElementById('mood-quote');

    if (moodCards.length > 0 && moodResponse) {
        moodCards.forEach(card => {
            card.addEventListener('click', () => {
                const mood = card.getAttribute('data-mood');
                let quote = "Take a deep breath."; // default default

                // Try to get from fetched data (quotesData is global from quotes-data.js), else fallback
                if (typeof quotesData !== 'undefined' && quotesData[mood] && quotesData[mood].length > 0) {
                    const randomIndex = Math.floor(Math.random() * quotesData[mood].length);
                    quote = quotesData[mood][randomIndex];
                } else if (typeof fallbackQuotes !== 'undefined' && fallbackQuotes[mood]) {
                    quote = fallbackQuotes[mood][0];
                }

                if (quote) {
                    moodQuoteText.textContent = `"${quote}"`;
                    moodResponse.classList.remove('hidden');

                    // Smooth scroll to the response
                    moodResponse.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            });
        });
    }
});
