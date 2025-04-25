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


  megjelenitFilmLista(filmLista);
});
