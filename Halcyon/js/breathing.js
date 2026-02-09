document.addEventListener('DOMContentLoaded', () => {
    /* --- Breathing Exercise Logic --- */
    const breathingContainer = document.querySelector('.breathing-container');
    if (breathingContainer) {
        const circle = document.querySelector('.circle');
        const startBtn = document.getElementById('start-breathing');
        const stopBtn = document.getElementById('stop-breathing');
        const cycleDisplay = document.getElementById('cycle-count');
        const instructionText = document.getElementById('breath-instruction');

        let cycleCount = 0;
        let isBreathing = false;
        let animationTimeout;
        let instructionInterval;

        // 4-4-4 Method (12 seconds total)
        // Inhale: 4s
        // Hold: 4s
        // Exhale: 4s
        const CYCLE_DURATION = 12000;

        function updateInstructions() {
            if (!isBreathing) return;

            // Helper to update text with animation
            const setText = (text) => {
                instructionText.classList.remove('text-pulse');
                void instructionText.offsetWidth; // Trigger reflow
                instructionText.textContent = text;
                instructionText.classList.add('text-pulse');
            };

            // Immediate start: Breathe In
            setText("Breathe In");

            // Schedule "Hold" at 4s
            setTimeout(() => {
                if (isBreathing) setText("Hold");
            }, 4000);

            // Schedule "Breathe Out" at 8s
            setTimeout(() => {
                if (isBreathing) setText("Breathe Out");
            }, 8000);
        }

        startBtn.addEventListener('click', () => {
            if (!isBreathing) {
                isBreathing = true;
                circle.classList.add('animating');

                // Start first cycle instructions immediately
                updateInstructions();

                // Increment counter at the end of each full cycle
                // Set interval to repeat every 12s
                instructionInterval = setInterval(() => {
                    if (isBreathing) {
                        cycleCount++;
                        cycleDisplay.textContent = cycleCount;
                        updateInstructions();
                    }
                }, CYCLE_DURATION);
            }
        });

        stopBtn.addEventListener('click', () => {
            if (isBreathing) {
                isBreathing = false;
                circle.classList.remove('animating');
                instructionText.classList.remove('text-pulse');
                instructionText.textContent = "Ready?";

                // Clear intervals/timeouts
                clearInterval(instructionInterval);

                // Note: We don't reset cycleCount so user sees progress
            }
        });
    }
});
