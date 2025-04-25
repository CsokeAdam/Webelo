document.addEventListener("DOMContentLoaded", () => {
  const filmek = [
    { title: "A remény rabjai", year: 1994, genre: "Dráma", director: "Frank Darabont" },
    { title: "Eredet", year: 2010, genre: "Sci-fi", director: "Christopher Nolan" },
    { title: "Titanic", year: 1997, genre: "Romantikus", director: "James Cameron" },
    { title: "A sötét lovag", year: 2008, genre: "Akció", director: "Christopher Nolan" }
  ];

  let filmLista = [...filmek]; // aktuálisan megjelenített lista

  const tableBody = document.querySelector("#filmTable tbody");
  const form = document.getElementById("filmForm");
  const searchInput = document.getElementById("searchInput");
  let szerkesztettIndex = null;

  function megjelenitFilmLista(lista) {
    tableBody.innerHTML = "";
    lista.forEach((film, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${film.title}</td>
        <td>${film.year}</td>
        <td>${film.genre}</td>
        <td>${film.director}</td>
        <td>
          <button onclick="szerkesztFilm(${index})">✏️</button>
          <button onclick="torolFilm(${index})">🗑️</button>
        </td>
      `;

      tableBody.appendChild(row);
    });
  }

  window.torolFilm = function(index) {
    const film = filmLista[index];
    const eredetiIndex = filmek.indexOf(film);
    if (eredetiIndex !== -1 && confirm("Biztosan törölni szeretnéd ezt a filmet?")) {
      filmek.splice(eredetiIndex, 1);
      filmLista = [...filmek];
      megjelenitFilmLista(filmLista);
    }
  };

  window.szerkesztFilm = function(index) {
    const film = filmLista[index];
    szerkesztettIndex = filmek.indexOf(film);

    document.getElementById("title").value = film.title;
    document.getElementById("year").value = film.year;
    document.getElementById("genre").value = film.genre;
    document.getElementById("director").value = film.director;
  };

  

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const ujFilm = {
      title: document.getElementById("title").value.trim(),
      year: parseInt(document.getElementById("year").value),
      genre: document.getElementById("genre").value.trim(),
      director: document.getElementById("director").value.trim()
    };

    if (ujFilm.title.length < 2 || isNaN(ujFilm.year) || ujFilm.year < 1900 || ujFilm.year > 2100 || ujFilm.genre.length < 2 || ujFilm.director.length < 2) {
      alert("Kérlek adj meg érvényes adatokat minden mezőben!");
      return;
    }

    if (szerkesztettIndex !== null) {
      filmek[szerkesztettIndex] = ujFilm;
      szerkesztettIndex = null;
    } else {
      filmek.push(ujFilm);
    }

    form.reset();
    filmLista = [...filmek];
    megjelenitFilmLista(filmLista);
  });

  searchInput.addEventListener("input", () => {
    const keresett = searchInput.value.toLowerCase();
    filmLista = filmek.filter(film =>
      film.title.toLowerCase().includes(keresett) ||
      film.year.toString().includes(keresett) ||
      film.genre.toLowerCase().includes(keresett) ||
      film.director.toLowerCase().includes(keresett)
    );
    megjelenitFilmLista(filmLista);
  });

  // Rendezi a filmLista-t, nem az eredeti tömböt
  window.rendezOszlop = function(mezo) {
    filmLista.sort((a, b) => {
      if (typeof a[mezo] === 'string') {
        return a[mezo].localeCompare(b[mezo]);
      } else {
        return a[mezo] - b[mezo];
      }
    });
    megjelenitFilmLista(filmLista);
  };

  megjelenitFilmLista(filmLista);
});
