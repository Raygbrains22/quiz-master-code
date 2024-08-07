function printHighscores() {
  const highscores = JSON.parse(localStorage.getItem('highscores')) || [];

  highscores.sort((a, b) => b.score - a.score);

  highscores.forEach(score => {
      const li = document.createElement('li');
      li.textContent = `${score.initials} - ${score.score}`;
      const ol = document.getElementById('highscores');
      ol.appendChild(li);
  });
}

function clearHighscores() {
  localStorage.removeItem('highscores');
  window.location.reload();
}

document.getElementById('clear').onclick = clearHighscores;

printHighscores();
