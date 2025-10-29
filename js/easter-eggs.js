// Easter Eggs - Fun little touches for students
// These make the site memorable and fun!

class EasterEggs {
    constructor() {
        this.konamiCode = [];
        this.konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        this.clickCount = 0;
    }

    init() {
        this.setupKonamiCode();
        this.setupLogoClick();
        this.setupSubjectCardDoubleClick();
        this.addFunnyTooltips();
    }

    setupKonamiCode() {
        document.addEventListener('keydown', (e) => {
            this.konamiCode.push(e.key);
            if (this.konamiCode.length > this.konamiPattern.length) {
                this.konamiCode.shift();
            }

            if (this.arraysEqual(this.konamiCode, this.konamiPattern)) {
                this.activateKonami();
                this.konamiCode = [];
            }
        });
    }

    activateKonami() {
        // Fun celebration animation
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
        document.body.style.animation = 'none';
        
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.style.position = 'fixed';
                confetti.style.left = Math.random() * 100 + '%';
                confetti.style.top = '-10px';
                confetti.style.width = '10px';
                confetti.style.height = '10px';
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                confetti.style.borderRadius = '50%';
                confetti.style.pointerEvents = 'none';
                confetti.style.zIndex = '10000';
                confetti.style.animation = `fall ${1 + Math.random() * 2}s linear forwards`;
                document.body.appendChild(confetti);
                
                setTimeout(() => confetti.remove(), 3000);
            }, i * 50);
        }

        // Show message
        const message = document.createElement('div');
        message.className = 'fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[10001] bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-2xl text-center';
        message.innerHTML = '<h2 class="text-2xl font-bold mb-2"><i class="fas fa-trophy text-yellow-500 mr-2"></i>Congratulations!</h2><p>You found the easter egg! <i class="fas fa-book text-blue-500 mr-1"></i>Study hard!</p>';
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.style.transition = 'opacity 0.5s';
            message.style.opacity = '0';
            setTimeout(() => message.remove(), 500);
        }, 3000);
    }

    setupLogoClick() {
        const logo = document.querySelector('header h1 a, header h1');
        if (logo) {
            logo.style.cursor = 'pointer';
            logo.addEventListener('click', (e) => {
                e.preventDefault();
                this.clickCount++;
                if (this.clickCount === 5) {
                    logo.style.animation = 'spin 0.5s ease';
                    setTimeout(() => {
                        logo.style.animation = '';
                        this.clickCount = 0;
                    }, 500);
                }
            });
        }
    }

    setupSubjectCardDoubleClick() {
        document.addEventListener('dblclick', (e) => {
            const subjectCard = e.target.closest('.subject-card');
            if (subjectCard) {
                subjectCard.style.animation = 'none';
                setTimeout(() => {
                    subjectCard.style.animation = 'bounce 0.5s ease';
                    setTimeout(() => {
                        subjectCard.style.animation = '';
                    }, 500);
                }, 10);
            }
        });
    }

    addFunnyTooltips() {
        // Add fun tooltips to various elements
        const elements = document.querySelectorAll('[data-subject-id]');
        elements.forEach((el, index) => {
            const tooltips = [
                'Double-click for a surprise! 👀',
                'This subject is awesome! 💪',
                'Click me! I dare you! 🚀',
                'Study time! 📖',
                'You got this! ✨'
            ];
            
            el.addEventListener('mouseenter', () => {
                const tooltip = document.createElement('div');
                tooltip.className = 'absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-50';
                tooltip.textContent = tooltips[index % tooltips.length];
                el.style.position = 'relative';
                el.appendChild(tooltip);
                
                setTimeout(() => tooltip.remove(), 2000);
            });
        });
    }

    arraysEqual(a, b) {
        return a.length === b.length && a.every((val, index) => val === b[index]);
    }
}

// Initialize easter eggs
document.addEventListener('DOMContentLoaded', () => {
    const easterEggs = new EasterEggs();
    easterEggs.init();
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

