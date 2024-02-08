document.getElementById('startButton').addEventListener('click', function() {
    this.disabled = true; // Ba�lat butonunu devre d��� b�rak
    startTimer(60);
    resetVotes();
});

let votes = { 1: { AI: 0, Human: 0, Total: 0 }, 2: { AI: 0, Human: 0, Total: 0 } };

function vote(textId, choice) {
    votes[textId][choice]++;
    votes[textId].Total++;
}

function startTimer(duration) {
    let timer = duration, seconds;
    document.getElementById('timer').textContent = timer + ' saniye kald�';

    const interval = setInterval(() => {
        seconds = parseInt(timer % 60, 10);
        document.getElementById('timer').textContent = seconds + ' saniye kald�';

        if (timer <= 5) {
            document.getElementById('timer').style.color = "#ff0000"; // Son 5 saniye i�in k�rm�z� renk
            document.getElementById('timer').textContent = "Acele edin! " + seconds + ' saniye kald�';
        }

        if (--timer < 0) {
            clearInterval(interval);
            document.getElementById('startButton').disabled = false; // Butonu tekrar etkinle�tir
            document.getElementById('timer').textContent = "S�re doldu!";
            showResults();
        }
    }, 1000);
}

function showResults() {
    for (let textId = 1; textId <= 2; textId++) {
        const result = votes[textId];
        const aiPercentage = ((result.AI / result.Total) * 100).toFixed(2) || 0;
        const humanPercentage = ((result.Human / result.Total) * 100).toFixed(2) || 0;
        document.getElementById(`result${textId}`).innerHTML = `AI: %${aiPercentage}, �nsan: %${humanPercentage}`;
    }
}

function resetVotes() {
    votes = { 1: { AI: 0, Human: 0, Total: 0 }, 2: { AI: 0, Human: 0, Total: 0 } };
    for (let textId = 1; textId <= 2; textId++) {
        document.getElementById(`result${textId}`).innerHTML = '';
    }
    document.getElementById('timer').style.color = "#000"; // Sayac�n rengini s�f�rla
}
