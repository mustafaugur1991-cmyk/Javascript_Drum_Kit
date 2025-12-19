// Ses çalma ve animasyon tetikleme fonksiyonu
function playSound(e) {
    const keyCode = e.keyCode || this.getAttribute('data-key');
    const audio = document.querySelector(`audio[data-key="${keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${keyCode}"]`);

    // EĞER TUŞ TANIMLIYSA (Enstrüman çalar)
    if (audio && key) {
        audio.currentTime = 0;
        audio.play();
        key.classList.add('playing');
    } 
    /// 2. DURUM: Tanımlananlar haricinde HERHANGİ bir klavye tuşuna basıldıysa
    else if (e.type === 'keydown') {
        const body = document.querySelector('body');
        const errorAudio = document.querySelector('#errorSound');
        
        // Görsel efekti başlat (Sarsılma)
        body.classList.add('invalid-key');

        // hata.mp3 dosyasını çal
        if (errorAudio) {
            errorAudio.currentTime = 0;
            errorAudio.play();
        }

        // Animasyon bittiğinde (0.5 saniye sonra) görsel efekti kaldır
        setTimeout(() => {
            body.classList.remove('invalid-key');
        }, 500);
    }
}

// Animasyon bitince temizleme fonksiyonu
function removeTransition(e) {
    if (e.propertyName !== 'transform') return; // Sadece transform bitince çalış
    this.classList.remove('playing'); // Sınıfı kaldır
}

// Klavye olaylarını dinle
window.addEventListener('keydown', playSound);

// Mouse tıklama ve animasyon bitiş olaylarını dinle
const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition); // Animasyon bitişini takip et
    key.addEventListener('click', playSound); // Tıklamayı takip et
});