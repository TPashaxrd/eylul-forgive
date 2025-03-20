const noBtn = document.getElementById('noBtn');
const successMessage = document.getElementById('successMessage');
const container = document.getElementById('mainContainer');


const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);


noBtn.addEventListener('touchstart', function(e) {
    e.preventDefault(); 
    moveButton();
});


if (!isMobile) {
    noBtn.addEventListener('mouseover', function() {
        moveButton();
    });
}


noBtn.addEventListener('click', function(e) {
    if (isMobile) {
        e.preventDefault();
        moveButton();
    }
});


function moveButton() {
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    

    const maxX = window.innerWidth - btnRect.width;
    const maxY = window.innerHeight - btnRect.height;
    

    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);
    

    randomX = Math.max(10, Math.min(randomX, maxX - 10));
    randomY = Math.max(10, Math.min(randomY, maxY - 10));
    

    const currentX = btnRect.left;
    const currentY = btnRect.top;
    

    noBtn.style.position = 'fixed';
    noBtn.style.top = randomY + 'px';
    noBtn.style.left = randomX + 'px';
    noBtn.style.transition = 'all 0.2s ease-out';
}


function accept() {
    successMessage.style.display = 'flex';
    

    createConfetti();
    

    playSound();
}


function createConfetti() {
    const colors = [
        '#2ecc71', '#3498db', '#e74c3c', '#f1c40f', '#9b59b6',
        '#1abc9c', '#e67e22', '#34495e', '#7f8c8d', '#16a085'
    ];
    
    const confettiCount = 200;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            

            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const delay = Math.random() * 0.5;
            

            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}vw`;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            document.body.appendChild(confetti);
            

            setTimeout(() => {
                confetti.remove();
            }, (duration + delay) * 1000);
        }, i * 10);
    }
}


function playSound() {

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const audioCtx = new AudioContext();
    

    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    
    oscillator.type = 'sine';
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    

    const notes = [261.63, 329.63, 392.00, 523.25]; 
    const startTime = audioCtx.currentTime;
    
    notes.forEach((note, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.frequency.value = note;
        osc.type = 'sine';
        
        gain.gain.value = 0;
        gain.gain.setValueAtTime(0, startTime + i * 0.1);
        gain.gain.linearRampToValueAtTime(0.3, startTime + i * 0.1 + 0.01);
        gain.gain.linearRampToValueAtTime(0, startTime + i * 0.1 + 0.3);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start(startTime + i * 0.1);
        osc.stop(startTime + i * 0.1 + 0.3);
    });
}