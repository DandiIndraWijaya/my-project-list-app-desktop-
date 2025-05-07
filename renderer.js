let allProjects = [];

function createProjectCard(name) {
  const card = document.createElement('div');
  card.className = 'project-card';

  const icon = document.createElement('div');
  icon.className = 'project-icon';
  icon.textContent = name.charAt(0).toUpperCase();

  const label = document.createElement('div');
  label.textContent = name;
  label.style.flexGrow = '1';

  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '4px';

  const vscodeBtn = document.createElement('button');
  vscodeBtn.textContent = 'VSCode';
  vscodeBtn.onclick = (e) => {
    e.stopPropagation();
    window.electronAPI.openVSCode(name);
  };

  const terminalBtn = document.createElement('button');
  terminalBtn.textContent = 'Terminal';
  terminalBtn.onclick = (e) => {
    e.stopPropagation();
    window.electronAPI.openTerminal(name);
  };

  const explorerBtn = document.createElement('button');
  explorerBtn.textContent = '📁';
  explorerBtn.onclick = (e) => {
    e.stopPropagation();
    window.electronAPI.openExplorer(name);
  };

  actions.appendChild(vscodeBtn);
  actions.appendChild(terminalBtn);
  actions.appendChild(explorerBtn);

  card.appendChild(icon);
  card.appendChild(label);
  card.appendChild(actions);

  // card.onclick = () => {
  //   // Default action if whole card is clicked
  //   window.electronAPI.openVSCode(name);
  //   window.electronAPI.openTerminal(name);
  //   window.electronAPI.openExplorer(name);
  // };

  return card;
}

function renderProjects(filter = '') {
  const list = document.getElementById('project-list');
  list.innerHTML = '';
  allProjects
    .filter(name => name.toLowerCase().includes(filter.toLowerCase()))
    .forEach(name => {
      const card = createProjectCard(name);
      list.appendChild(card);
    });
}

window.electronAPI.getProjects().then(projects => {
  allProjects = projects;
  renderProjects();
});

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('search-input');
  searchInput.addEventListener('input', (e) => {
    renderProjects(e.target.value);
  });
});

