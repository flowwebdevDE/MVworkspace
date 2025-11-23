 const body = document.body;
    const toggle = document.getElementById('darkModeToggle');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsPanel = document.getElementById('settingsPanel');
    const closeSettings = document.getElementById('closeSettings');
    const themeOptions = document.querySelectorAll('.theme-option');
    const clock = document.querySelector('.clock');
    const dateEl = document.querySelector('.date');
    const errorDiv = document.getElementById('error');
    const loginBox = document.getElementById('loginBox');
    const clockColorSelect = document.getElementById("clockColor");
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');

    // Uhrfarbe ändern
    clockColorSelect.addEventListener("change", (e) => {
      clock.style.color = e.target.value;
      dateEl.style.color = e.target.value;
    });

    // Darkmode
    function setDarkMode(enabled) {
      if (enabled) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
      }
    }
    toggle.checked = localStorage.getItem('darkMode') === 'enabled';
    setDarkMode(toggle.checked);
    toggle.addEventListener('change', () => setDarkMode(toggle.checked));

    // Settings Panel
    settingsBtn.addEventListener('click', () => { settingsPanel.classList.toggle('active'); });
    closeSettings.addEventListener('click', () => { settingsPanel.classList.remove('active'); });

    // Theme
    function setTheme(theme) {
      body.className = body.className.replace(/\bbg-theme-\S+/g, '').trim();
      if (theme !== "default") body.classList.add(theme);
      if (toggle.checked) body.classList.add('dark-mode');
      localStorage.setItem('theme', theme);
    }
    function setLoginTheme(theme) {
      loginBox.className = "login-box";
      if (theme !== "default") loginBox.classList.add(theme);
      localStorage.setItem('loginTheme', theme);
    }
    themeOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        if (opt.dataset.theme) setTheme(opt.dataset.theme);
        if (opt.dataset.loginTheme) setLoginTheme(opt.dataset.loginTheme);
        settingsPanel.classList.remove('active');
      });
    });
    const savedTheme = localStorage.getItem('theme') || "default";
    setTheme(savedTheme);
    const savedLoginTheme = localStorage.getItem('loginTheme') || "default";
    setLoginTheme(savedLoginTheme);

    // Login-Logik
    const users = {
      "Felix": {password:"72bf8297458e0883532ef9cd64898e12ac54ead37acfb33a97abd44a8a537c9f",redirect:"../user/index.html"},
      
    };
    function hashMultipleTimes(input, times=5) {
      let result = input;
      for (let i=0; i<times; i++) result = sha256(result);
      return result;
    }
    document.getElementById('loginBtn').addEventListener('click', login);
    [usernameInput, passwordInput].forEach(el => {
      el.addEventListener('keydown', e => {if (e.key==="Enter") login();});
      el.addEventListener('input', () => { errorDiv.style.display='none'; });
    });

    function login() {
      const username = usernameInput.value.trim();
      const password = passwordInput.value;
      const hashedPassword = hashMultipleTimes(password, 5);

      if (users[username] && users[username].password === hashedPassword) {
        sessionStorage.setItem('authenticated','true');
        sessionStorage.setItem('username',username);
        window.location.href = users[username].redirect;
      } else {
        errorDiv.style.display='block';
      }
    }

    // Fokus auf Nutzername beim Laden
    window.addEventListener('DOMContentLoaded', () => {
      usernameInput.focus();
    });