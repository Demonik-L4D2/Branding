// KONAMI CODE EASTER EGG
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

function playEerieSound() {
  const audio = new Audio('mega_mob_incoming.wav');
  audio.volume = 0.8;
  audio.play().catch(e => {
      console.warn("Could not play horde audio:", e);
  });
}

function triggerEasterEgg() {
    playEerieSound();
    document.body.style.animation = 'shake 0.5s infinite';
    
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'black';
    overlay.style.zIndex = '9999';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 1.5s ease';
    overlay.style.pointerEvents = 'all';

    const text = document.createElement('div');
    text.style.color = '#e50914';
    text.style.fontFamily = '"Oswald", sans-serif';
    text.style.fontSize = 'min(10vw, 4rem)';
    text.style.textTransform = 'uppercase';
    text.style.opacity = '0';
    text.style.transition = 'opacity 1.5s ease 1s';
    text.style.textAlign = 'center';
    text.style.padding = '20px';
    text.innerText = 'The Horde Approaches...';
    
    overlay.appendChild(text);
    document.body.appendChild(overlay);

    if (!document.getElementById('shake-style')) {
        const style = document.createElement('style');
        style.id = 'shake-style';
        style.innerHTML = `
            @keyframes shake {
                0% { transform: translate(1px, 1px) rotate(0deg); }
                10% { transform: translate(-1px, -2px) rotate(-1deg); }
                20% { transform: translate(-3px, 0px) rotate(1deg); }
                30% { transform: translate(3px, 2px) rotate(0deg); }
                40% { transform: translate(1px, -1px) rotate(1deg); }
                50% { transform: translate(-1px, 2px) rotate(-1deg); }
                60% { transform: translate(-3px, 1px) rotate(0deg); }
                70% { transform: translate(3px, 1px) rotate(-1deg); }
                80% { transform: translate(-1px, -1px) rotate(1deg); }
                90% { transform: translate(1px, 2px) rotate(0deg); }
                100% { transform: translate(1px, -2px) rotate(-1deg); }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        overlay.style.opacity = '1';
        text.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        text.style.transition = 'opacity 1s ease';
        text.style.opacity = '0';
    }, 2500);

    setTimeout(() => {
      window.location.href = 'lore.html';
    }, 4000);
}

function handleInput(input) {
  if (input === konamiCode[konamiIndex]) {
    konamiIndex++;
    if (konamiIndex === konamiCode.length) {
      triggerEasterEgg();
      konamiIndex = 0;
    }
  } else {
    konamiIndex = 0;
  }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
  handleInput(key);
});

// Mobile support (Swipes + Taps)
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
  touchStartY = e.changedTouches[0].screenY;
}, {passive: true});

document.addEventListener('touchend', e => {
  let touchEndX = e.changedTouches[0].screenX;
  let touchEndY = e.changedTouches[0].screenY;
  
  const dx = touchEndX - touchStartX;
  const dy = touchEndY - touchStartY;
  const absDx = Math.abs(dx);
  const absDy = Math.abs(dy);
  
  // Threshold for tap vs swipe
  if (Math.max(absDx, absDy) < 30) {
      // Treat as tap. Map the last 2 inputs of Konami to taps for mobile users.
      if (konamiCode[konamiIndex] === 'b' || konamiCode[konamiIndex] === 'a') {
          handleInput(konamiCode[konamiIndex]); 
      } else {
          handleInput('tap'); // will reset
      }
      return;
  }
  
  if (absDx > absDy) {
    if (dx > 0) handleInput('ArrowRight');
    else handleInput('ArrowLeft');
  } else {
    if (dy > 0) handleInput('ArrowDown');
    else handleInput('ArrowUp');
  }
}, {passive: true});
