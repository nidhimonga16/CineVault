// Movie dataset
const movies = [
  {
    id: 1,
    title: "Inception",
    genre: "Sci-Fi",
    rating: 8.8,
    year: 2010,
    image: "images/inception.jpg",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the task of planting an idea into the mind of a C.E.O.",
    trending: true,
    topRated: true
  },
  {
    id: 2,
    title: "The Dark Knight",
    genre: "Action",
    rating: 9.0,
    year: 2008,
    image: "images/dark-knight.jpg",
    description: "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    trending: true,
    topRated: true
  },
  {
    id: 3,
    title: "Interstellar",
    genre: "Sci-Fi",
    rating: 8.6,
    year: 2014,
    image: "images/interstellar.jpg",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    trending: false,
    topRated: true
  },
  {

    id: 4,
    title: "Parasite",
    genre: "Thriller",
    rating: 8.5,
    year: 2019,
    image: "images/parasite.jpg",
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    trending: true,
    topRated: true
  },
  {
    id: 5,
    title: "The Shawshank Redemption",
    genre: "Drama",
    rating: 9.3,
    year: 1994,
    image: "images/shawshank.jpg",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    trending: false,
    topRated: true
  },
  {
    id: 6,
    title: "Avengers: Endgame",
    genre: "Action",
    rating: 8.4,
    year: 2019,
    image: "images/endgame.jpg",
    description: "After the devastating events of Infinity War, the Avengers assemble once more to reverse Thanos' actions and restore balance to the universe.",
    trending: true,
    topRated: false
  },
  {
    id: 7,
    title: "Joker",
    genre: "Drama",
    rating: 8.4,
    year: 2019,
    image: "images/joker.jpg",
    description: "A gritty character study of Arthur Fleck, a failed stand-up comedian who turns to a life of crime and chaos in Gotham City.",
    trending: true,
    topRated: false
  },
  {
    id: 8,
    title: "Get Out",
    genre: "Horror",
    rating: 7.7,
    year: 2017,
    image: "images/getout.jpg",
    description: "A young African-American visits his white girlfriend's parents for the weekend, where his uneasiness grows as a series of disturbing discoveries unfold.",
    trending: false,
    topRated: false
  },
  {
    id: 9,
    title: "The Matrix",
    genre: "Sci-Fi",
    rating: 8.7,
    year: 1999,
    image: "images/matrix.jpg",
    description: "A computer hacker learns that his entire reality is a simulation and joins a rebellion against the machines controlling it.",
    trending: false,
    topRated: true
  },
  {
    id: 10,
    title: "Pulp Fiction",
    genre: "Thriller",
    rating: 8.9,
    year: 1994,
    image: "images/pulpfiction.jpg",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    trending: false,
    topRated: true
  },
  {
    id: 11,
    title: "Dune",
    genre: "Sci-Fi",
    rating: 8.0,
    year: 2021,
    image: "images/dune.jpg",
    description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.",
    trending: true,
    topRated: false
  },
  {
    id: 12,
    title: "Everything Everywhere All at Once",
    genre: "Sci-Fi",
    rating: 7.8,
    year: 2022,
    image: "images/eeaao.jpg",
    description: "A middle-aged Chinese immigrant is swept up in an insane adventure in which she alone can save the world by exploring other universes.",
    trending: true,
    topRated: false
  }
];

const POSTER_FALLBACK = "images/placeholder.jpg";

function safeImg(src, alt, extraClasses) {
  const cls = extraClasses ? `img-loading ${extraClasses}` : "img-loading";
  return `<img
    src="${src}"
    alt="${alt}"
    class="${cls}"
    onload="this.classList.remove('img-loading')"
    onerror="this.src='${POSTER_FALLBACK}'; this.classList.remove('img-loading');"
  >`;
}


function getWatchlist() {
  const stored = localStorage.getItem("cinevault_watchlist");
  return stored ? JSON.parse(stored) : [];
}

function saveWatchlist(list) {
  localStorage.setItem("cinevault_watchlist", JSON.stringify(list));
}

function addToWatchlist(movieId) {
  const list = getWatchlist();
  if (!list.includes(movieId)) {
    list.push(movieId);
    saveWatchlist(list);
    showToast("Added to Watchlist!");
  } else {
    showToast("Already in Watchlist!");
  }
}

function removeFromWatchlist(movieId) {
  const list = getWatchlist().filter(id => id !== movieId);
  saveWatchlist(list);
  showToast("Removed from Watchlist!");
}

function isInWatchlist(movieId) {
  return getWatchlist().includes(movieId);
}


function showToast(message) {
  const existing = document.getElementById("toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "toast";
  toast.className = "toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("toast-hide");
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}


function buildMovieCard(movie) {
  const inList = isInWatchlist(movie.id);
  return `
    <div class="movie-card" data-id="${movie.id}">
      <div class="card-poster">
        ${safeImg(movie.image, movie.title)}
        <div class="card-overlay">
          <span class="genre-label">${movie.genre}</span>
          <div class="card-actions">
            <button class="btn-watchlist ${inList ? 'in-list' : ''}" onclick="handleWatchlist(${movie.id}, this)">
              ${inList ? '✓ In Watchlist' : '+ Watchlist'}
            </button>
            <button class="btn-details" onclick="openModal(${movie.id})">View Details</button>
          </div>
        </div>
      </div>
      <div class="card-info">
        <span class="rating-badge">⭐ ${movie.rating}</span>
        <h3 class="card-title">${movie.title}</h3>
        <p class="card-year">${movie.year}</p>
      </div>
    </div>
  `;
}

function handleWatchlist(movieId, btn) {
  if (isInWatchlist(movieId)) {
    removeFromWatchlist(movieId);
    btn.textContent = "+ Watchlist";
    btn.classList.remove("in-list");
  } else {
    addToWatchlist(movieId);
    btn.textContent = "✓ In Watchlist";
    btn.classList.add("in-list");
  }
}


function openModal(movieId) {
  const movie = movies.find(m => m.id === movieId);
  if (!movie) return;

  const posterEl = document.getElementById("modal-poster");
  posterEl.classList.add("img-loading");
  posterEl.alt = movie.title;
  posterEl.onload  = () => posterEl.classList.remove("img-loading");
  posterEl.onerror = () => { posterEl.src = POSTER_FALLBACK; posterEl.classList.remove("img-loading"); };
  posterEl.src = movie.image;

  document.getElementById("modal-title").textContent  = movie.title;
  document.getElementById("modal-genre").textContent  = movie.genre;
  document.getElementById("modal-rating").textContent = "⭐ " + movie.rating;
  document.getElementById("modal-year").textContent   = movie.year;
  document.getElementById("modal-desc").textContent   = movie.description;

  const addBtn = document.getElementById("modal-watchlist-btn");
  if (addBtn) {
    const inList = isInWatchlist(movie.id);
    addBtn.textContent = inList ? "✓ In Watchlist" : "+ Add to Watchlist";
    addBtn.className   = "btn-primary" + (inList ? " in-list" : "");
    addBtn.onclick     = () => handleWatchlist(movie.id, addBtn);
  }

  document.getElementById("modal-overlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const overlay = document.getElementById("modal-overlay");
  if (overlay) {
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }
}

document.addEventListener("click", e => { if (e.target.id === "modal-overlay") closeModal(); });
document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });


function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.getAttribute("href") === currentPage) link.classList.add("active");
  });
}

setActiveNav();


const menuToggle = document.getElementById("menu-toggle");
const navMenu    = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    menuToggle.textContent = navMenu.classList.contains("open") ? "✕" : "☰";
  });
}
