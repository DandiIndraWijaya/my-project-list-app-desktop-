window.electronAPI.getProjects().then(projects => {
  const list = document.getElementById('project-list');

  projects.forEach(name => {
    const card = document.createElement('div');
    card.className = 'project-card';

    const icon = document.createElement('div');
    icon.className = 'project-icon';
    icon.textContent = name[0].toUpperCase(); // ambil huruf awal

    const label = document.createElement('span');
    label.textContent = name;

    card.appendChild(icon);
    card.appendChild(label);

    card.onclick = () => window.electronAPI.openProject(name);

    list.appendChild(card);
  });
});
