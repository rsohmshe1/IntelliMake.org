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
  const nav = scope.querySelector('[data-nav]');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isHidden = nav.classList.toggle('hidden');
    const expanded = !isHidden;
    toggle.setAttribute('aria-expanded', expanded);
    toggle.classList.toggle('open', expanded);
  });
}

injectPartial('header', 'header.html');
injectPartial('footer', 'footer.html');
