async function injectPartial(id, file) {
  const host = document.getElementById(id);
  if (!host) return;

  try {
    const response = await fetch(file);
    if (!response.ok) throw new Error('Failed to load ' + file);
    host.innerHTML = await response.text();
    if (file === 'header.html') {
      attachNavToggle(host);
    }
  } catch (error) {
    console.error(error);
  }
}

function attachNavToggle(scope) {
  const toggle = scope.querySelector('.nav-toggle');
  const nav = scope.querySelector('.main-nav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    toggle.classList.toggle('open');
  });
}

injectPartial('header', 'header.html');
injectPartial('footer', 'footer.html');
