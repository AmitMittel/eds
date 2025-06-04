export default function decorate(block) {
  const ul = document.createElement('ul');
  const contentDivs = [];

  [...block.children].forEach((row, index) => {
    const cols = row.children;

    if (cols.length >= 2) {
      const tabLabel = cols[0].textContent.trim();
      const tabContent = cols[1];

      const li = document.createElement('li');
      const a = document.createElement('a');
      const tabId = `tab${index + 1}`;

      a.textContent = tabLabel;
      a.href = '#';
      a.dataset.index = tabId;
      li.append(a);
      ul.append(li);

      const content = tabContent.cloneNode(true);
      content.setAttribute('data-index', tabId);
      content.classList.add('tab-content');
      content.style.display = 'none'; // hide all initially
      contentDivs.push(content);
    }
  });

  // Clear old content and rebuild
  block.textContent = '';
  block.append(ul);
  contentDivs.forEach((content) => block.append(content));

  // Activate first tab by default
  const links = ul.querySelectorAll('a');
  const contents = block.querySelectorAll('.tab-content');

  function activateTab(tabId) {
    links.forEach((link) => {
      link.classList.toggle('active', link.dataset.index === tabId);
    });

    contents.forEach((div) => {
      div.style.display = div.dataset.index === tabId ? 'block' : 'none';
    });
  }

  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      activateTab(link.dataset.index);
    });
  });

  // Show first tab by default
  if (links.length) {
    activateTab(links[0].dataset.index);
  }
}
