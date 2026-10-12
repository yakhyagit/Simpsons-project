let posts = [
  { author: "Homer", date: "2026-03-10", title: "Munkit", content: "Tietääkö kukaan mistä saa parhaita munkkeja?" },
  { author: "Bart", date: "2026-03-09", title: "Jäynä", content: "Kuka tulee mukaan tekemään kepposta rehtorille?" }
];

function renderPosts() {
  const container = document.getElementById('forum-posts');
  if (!container) return;
  container.innerHTML = '';
  posts.forEach(p => {
    container.innerHTML += `
      <div class="forum-post">
        <h3>${p.title}</h3>
        <p><small><strong>${p.author}</strong> - ${p.date}</small></p>
        <p style="margin-top: 5px;">${p.content}</p>
      </div>
    `;
  });
}

function handlePostSubmit(e) {
  e.preventDefault();
  const author = document.getElementById('author').value;
  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const date = new Date().toISOString().split('T')[0];

  posts.unshift({ author, title, content, date });
  renderPosts();
  document.getElementById('post-dialog').close();
  e.target.reset();
}

function openGallery(locName) {
  const section = document.getElementById('gallery-section');
  const title = document.getElementById('gallery-title');
  const grid = document.getElementById('gallery-images');
  if (!section) return;

  section.style.display = 'block';
  title.innerText = locName + " - Galleria";
  grid.innerHTML = '';

  for (let i = 1; i <= 6; i++) {
    const url = `https://placehold.co/400x300/5C9ED9/FFFFFF?text=${encodeURIComponent(locName)}+${i}`;
    grid.innerHTML += `<div class="card"><img src="${url}" onclick="showModal('${url}')"></div>`;
  }
}

function selectCharacter(name) {
  const section = document.getElementById('character-detail');
  if (!section) return;
  section.style.display = 'block';
  document.getElementById('char-name').innerText = name;
  document.getElementById('char-desc').innerText = `${name} on keskeinen hahmo Springfieldissä.`;
  document.getElementById('actor-info').innerHTML = `Ääninäyttelijä: <a href="https://www.imdb.com" target="_blank">IMDB Profiili</a>`;

  const memeGrid = document.getElementById('meme-gallery');
  memeGrid.innerHTML = '';
  for (let i = 1; i <= 6; i++) {
    const url = `https://placehold.co/300x300/FCCB00/000000?text=${name}+Meemi+${i}`;
    memeGrid.innerHTML += `<div class="card"><img src="${url}" onclick="showModal('${url}')"></div>`;
  }
}

function switchTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

  if (tab === 'info') {
    document.querySelectorAll('.tab-btn')[0].classList.add('active');
    document.getElementById('tab-info').classList.add('active');
  } else {
    document.querySelectorAll('.tab-btn')[1].classList.add('active');
    document.getElementById('tab-memes').classList.add('active');
  }
}

function showModal(src) {
  const modal = document.getElementById('image-modal');
  document.getElementById('modal-src').src = src;
  modal.style.display = 'flex';
}

function closeModal() {
  document.getElementById('image-modal').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  renderPosts();
});