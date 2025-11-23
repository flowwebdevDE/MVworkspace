const darkmodeToggle = document.getElementById('darkmode-toggle');
  const body = document.body;
  darkmodeToggle.addEventListener('click', () => {
    body.classList.toggle('darkmode');
  });

  const logoutBtn = document.getElementById('logout-btn');
  const logoutConfirm = document.getElementById('logout-confirm');
  const confirmYes = document.getElementById('confirm-yes');
  const confirmNo = document.getElementById('confirm-no');

  logoutBtn.addEventListener('click', () => {
    logoutConfirm.style.display = 'flex';
    setTimeout(() => logoutConfirm.classList.add('show'), 10);
  });

  confirmNo.addEventListener('click', () => {
    logoutConfirm.classList.remove('show');
    setTimeout(() => { logoutConfirm.style.display = 'none'; }, 250);
  });

  confirmYes.addEventListener('click', () => {
    logoutConfirm.classList.remove('show');
    setTimeout(() => {
      logoutConfirm.style.display = 'none';
      window.location.href = '../index.html';
    }, 250);
  });

// Datum und Uhrzeit im Header anzeigen
document.addEventListener('DOMContentLoaded', () => {
    const datetimeContainer = document.getElementById('datetime-container');

    if (datetimeContainer) {
        function updateDateTime() {
            const now = new Date();
            const dateOptions = { weekday: 'long', day: 'numeric', month: 'long' };
            const timeString = now.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
            const dateString = now.toLocaleDateString('de-DE', dateOptions);

            datetimeContainer.textContent = `${dateString} - ${timeString}`;
        }
        updateDateTime(); // Sofort ausführen
        setInterval(updateDateTime, 1000); // Jede Sekunde aktualisieren
    }
});