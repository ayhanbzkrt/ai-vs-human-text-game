let countdown;
let votes = { 1: { AI: 0, Human: 0, Total: 0 }, 2: { AI: 0, Human: 0, Total: 0 } };

// PIN Doğrulama ve Oyun Başlatma
document.getElementById('pinSubmit').addEventListener('click', function() {
    var pin = document.getElementById('pinInput').value;
    if (pin === '1903') {
        document.getElementById('startButton').disabled = false;
        document.getElementById('pinArea').style.display = 'none';
        alert('PIN doğru! Oyunu başlatabilirsiniz.');
    } else {
        alert('Yanlış PIN!');
    }
});

document.getElementById('startButton').addEventListener('click', function() {
    this.disabled = true; // Başlat butonunu devre dışı bırak
    startTimer(60);
    resetVotes();
});

function vote(textId, choice) {
    if (!countdown) return; // Geri sayım başlamadan oylama yapılamaz
    votes[textId][choice]++;
    votes[textId]['Total']++;
    showResults(); // Her oylamadan sonra sonuçları güncelle
}

function startTimer(duration) {
    let timer = duration, seconds;
    document.getElementById('timer').textContent = `${timer} saniye kaldı`;
    countdown = setInterval(function() {
        seconds = parseInt(timer % 60, 10);
        document.getElementById('timer').textContent = `${seconds} saniye kaldı`;

        if (timer <= 5) {
            document.getElementById('timer').style.color = "#ff0000"; // Son 5 saniye için kırmızı renk
            document.getElementById('timer').textContent = `Acele edin! ${seconds} saniye kaldı`;
        }

        if (--timer < 0) {
            clearInterval(countdown);
            countdown = null; // Geri sayımı sıfırla
            document.getElementById('startButton').disabled = true; // Butonu tekrar devre dışı bırak
            document.getElementById('timer').textContent = "Süre doldu!";
            showResults(); // Sonuçları göster
        }
    }, 1000);
}

function showResults() {
    for (let textId = 1; textId <= 2; textId++) {
        const result = votes[textId];
        const aiPercentage = ((result.AI / result.Total) * 100).toFixed(2);
        const humanPercentage = ((result.Human / result.Total) * 100).toFixed(2);
        document.getElementById(`result${textId}`).innerHTML = `AI: %${aiPercentage}, İnsan: %${humanPercentage}`;
    }
}

function resetVotes() {
    votes = { 1: { AI: 0, Human: 0, Total: 0 }, 2: { AI: 0, Human: 0, Total: 0 } };
    for (let textId = 1; textId <= 2; textId++) {
        document.getElementById(`result${textId}`).innerHTML = '';
    }
    document.getElementById('timer').style.color = "#000"; // Sayacın rengini sıfırla
}
