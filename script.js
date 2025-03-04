const puntsInicials = {
  europa: 41,
  uesa: 40,
  espanyol: 40,
  terrassa: 38,
  torrent: 37,
  valencia: 36,
  sabadell: 35,
  elche: 35,
  baleares: 35,
  lleida: 34,
  alzira: 29,
  olot: 27,
  ibiza: 27,
  peña: 26,
  cornella: 24,
  andratx: 21,
  badalona: 16,
  mallorca: 11,
};

const partitsInicials = Object.fromEntries(
  Object.keys(puntsInicials).map((equip) => [equip, 23])
);

console.log(partitsInicials);

const equipToId = {
  "CE Europa": "europa",
  "UE Sant Andreu": "uesa",
  "RCD Espanyol B": "espanyol",
  "Terrassa FC": "terrassa",
  "Torrent CF": "torrent",
  "Valencia-Mestalla": "valencia",
  "CE Sabadell FC": "sabadell",
  "Elche CF B": "elche",
  "CD Atlético Baleares": "baleares",
  "Lleida FC": "lleida",
  "UD Alzira": "alzira",
  "UE Olot": "olot",
  "CD Ibiza Islas Pitiusas": "ibiza",
  "SCR Peña Deportiva": "peña",
  "UE Cornellà": "cornella",
  "CE Andratx": "andratx",
  "CF Badalona Futur": "badalona",
  "RCD Mallorca B": "mallorca",
};

const jornades = {
  24: [
    ["RCD Mallorca B", "CE Andratx"],
    ["Elche CF B", "CD Ibiza Islas Pitiusas"],
    ["SCR Peña Deportiva", "Torrent CF"],
    ["Terrassa FC", "Valencia-Mestalla"],
    ["CF Badalona Futur", "CD Atlético Baleares"],
    ["CE Europa", "RCD Espanyol B"],
    ["UE Olot", "UE Cornellà"],
    ["UD Alzira", "Lleida FC"],
    ["CE Sabadell FC", "UE Sant Andreu"],
  ],
  25: [
    ["CE Andratx", "CE Europa"],
    ["Valencia-Mestalla", "CF Badalona Futur"],
    ["RCD Espanyol B", "SCR Peña Deportiva"],
    ["CD Atlético Baleares", "CE Sabadell FC"],
    ["CD Ibiza Islas Pitiusas", "RCD Mallorca B"],
    ["Torrent CF", "Terrassa FC"],
    ["UE Cornellà", "UD Alzira"],
    ["Lleida FC", "Elche CF B"],
    ["UE Sant Andreu", "UE Olot"],
  ],
  26: [
    ["Valencia-Mestalla", "CD Atlético Baleares"],
    ["Elche CF B", "UE Cornellà"],
    ["RCD Mallorca B", "Lleida FC"],
    ["CE Europa", "CD Ibiza Islas Pitiusas"],
    ["SCR Peña Deportiva", "CE Andratx"],
    ["Terrassa FC", "RCD Espanyol B"],
    ["UD Alzira", "UE Sant Andreu"],
    ["CF Badalona Futur", "Torrent CF"],
    ["UE Olot", "CE Sabadell FC"],
  ],
  27: [
    ["UE Cornellà", "RCD Mallorca B"],
    ["Lleida FC", "CE Europa"],
    ["RCD Espanyol B", "CF Badalona Futur"],
    ["CD Atlético Baleares", "UE Olot"],
    ["CD Ibiza Islas Pitiusas", "SCR Peña Deportiva"],
    ["CE Andratx", "Terrassa FC"],
    ["Torrent CF", "Valencia-Mestalla"],
    ["CE Sabadell FC", "UD Alzira"],
    ["UE Sant Andreu", "Elche CF B"],
  ],
  28: [
    ["UD Alzira", "UE Olot"],
    ["Elche CF B", "CE Sabadell FC"],
    ["RCD Mallorca B", "UE Sant Andreu"],
    ["CE Europa", "UE Cornellà"],
    ["CF Badalona Futur", "CE Andratx"],
    ["Valencia-Mestalla", "RCD Espanyol B"],
    ["SCR Peña Deportiva", "Lleida FC"],
    ["Terrassa FC", "CD Ibiza Islas Pitiusas"],
    ["Torrent CF", "CD Atlético Baleares"],
  ],
  29: [
    ["UE Olot", "Elche CF B"],
    ["CE Sabadell FC", "RCD Mallorca B"],
    ["UE Cornellà", "SCR Peña Deportiva"],
    ["Lleida FC", "Terrassa FC"],
    ["RCD Espanyol B", "Torrent CF"],
    ["CD Atlético Baleares", "UD Alzira"],
    ["CD Ibiza Islas Pitiusas", "CF Badalona Futur"],
    ["CE Andratx", "Valencia-Mestalla"],
    ["UE Sant Andreu", "CE Europa"],
  ],
  30: [
    ["Elche CF B", "UD Alzira"],
    ["CE Europa", "CE Sabadell FC"],
    ["CF Badalona Futur", "Lleida FC"],
    ["Valencia-Mestalla", "CD Ibiza Islas Pitiusas"],
    ["RCD Espanyol B", "CD Atlético Baleares"],
    ["RCD Mallorca B", "UE Olot"],
    ["SCR Peña Deportiva", "UE Sant Andreu"],
    ["Terrassa FC", "UE Cornellà"],
    ["Torrent CF", "CE Andratx"],
  ],
  31: [
    ["UE Olot", "CE Europa"],
    ["UE Cornellà", "CF Badalona Futur"],
    ["CE Sabadell FC", "SCR Peña Deportiva"],
    ["Lleida FC", "Valencia-Mestalla"],
    ["CE Andratx", "RCD Espanyol B"],
    ["CD Atlético Baleares", "Elche CF B"],
    ["CD Ibiza Islas Pitiusas", "Torrent CF"],
    ["UE Sant Andreu", "Terrassa FC"],
    ["UD Alzira", "RCD Mallorca B"],
  ],
  32: [
    ["RCD Mallorca B", "Elche CF B"],
    ["CE Europa", "UD Alzira"],
    ["CF Badalona Futur", "UE Sant Andreu"],
    ["Valencia-Mestalla", "UE Cornellà"],
    ["RCD Espanyol B", "CD Ibiza Islas Pitiusas"],
    ["CE Andratx", "CD Atlético Baleares"],
    ["SCR Peña Deportiva", "UE Olot"],
    ["Torrent CF", "Lleida FC"],
    ["Terrassa FC", "CE Sabadell FC"],
  ],
  33: [
    ["RCD Mallorca B", "CD Atlético Baleares"],
    ["Elche CF B", "CE Europa"],
    ["UD Alzira", "SCR Peña Deportiva"],
    ["UE Olot", "Terrassa FC"],
    ["CE Sabadell FC", "CF Badalona Futur"],
    ["UE Cornellà", "Torrent CF"],
    ["CD Ibiza Islas Pitiusas", "CE Andratx"],
    ["Lleida FC", "RCD Espanyol B"],
    ["UE Sant Andreu", "Valencia-Mestalla"],
  ],
  34: [
    ["CE Europa", "RCD Mallorca B"],
    ["Terrassa FC", "UD Alzira"],
    ["CF Badalona Futur", "UE Olot"],
    ["Valencia-Mestalla", "CE Sabadell FC"],
    ["RCD Espanyol B", "UE Cornellà"],
    ["CE Andratx", "Lleida FC"],
    ["CD Atlético Baleares", "CD Ibiza Islas Pitiusas"],
    ["SCR Peña Deportiva", "Elche CF B"],
    ["Torrent CF", "UE Sant Andreu"],
  ],
};

const resultatsFixos = {
  "resultat-mallorca-andratx": "2",
  "resultat-elche-ibiza": "2",
  "resultat-peña-torrent": "X",
  "resultat-terrassa-valencia": "2",
  "resultat-badalona-baleares": "2",
  "resultat-europa-espanyol": "1",
  "resultat-olot-cornella": "1",
  "resultat-alzira-lleida": "2",
  "resultat-sabadell-uesa": "2",
  "resultat-andratx-europa": "1",
  "resultat-valencia-badalona": "1",
  "resultat-espanyol-peña": "X",
  "resultat-baleares-sabadell": "1",
  "resultat-ibiza-mallorca": "1",
  "resultat-torrent-terrassa": "1",
  "resultat-cornella-alzira": "X",
  "resultat-lleida-elche": "X",
  "resultat-uesa-olot": "1",
};

let jornadaActual = localStorage.getItem("jornadaActual")
  ? parseInt(localStorage.getItem("jornadaActual"))
  : 26; // Ara és global i no es reiniciarà incorrectament

const totalJornades = 34; // Nombre total de jornades

// Funció per generar la taula de partits dinàmicament
function generaTaulaPartits() {
  const partitsContainer = document.getElementById("partits-container");
  partitsContainer.innerHTML = ""; // Esborrem contingut previ

  let resultatsGuardats = JSON.parse(localStorage.getItem("resultats")) || {};

  Object.keys(jornades).forEach((jornada) => {
    const jornadaDiv = document.createElement("div");
    jornadaDiv.classList.add("jornada");
    jornadaDiv.id = `jornada-${jornada}`;
    jornadaDiv.style.display = jornada == jornadaActual ? "block" : "none"; //Només mostra la jornada actual

    const table = document.createElement("table");
    table.innerHTML = `
    <thead>
      <tr>
        <th>Local</th>
        <th>Visitant</th>
        <th>Resultat</th>
      </tr>
    </thead>
    <tbody>
      ${jornades[jornada]
        .map(([local, visitant]) => {
          const selectId = `resultat-${equipToId[local]}-${equipToId[visitant]}`;
          // Comprovar si el resultat està als fixos
          const resultatFix = resultatsFixos[selectId] || null;

          // Prioritzar resultats fixos sobre els guardats
          const valorGuardat = resultatFix || resultatsGuardats[selectId] || "";
          return `
            <tr>
                <td>${local}</td>
                <td>${visitant}</td>
                <td>
                  <select id="${selectId}" ${resultatFix ? "disabled" : ""}>
                    <option value="">—</option>
                    <option value="1" ${
                      valorGuardat === "1" ? "selected" : ""
                    }>1</option>
                    <option value="X" ${
                      valorGuardat === "X" ? "selected" : ""
                    }>X</option>
                    <option value="2" ${
                      valorGuardat === "2" ? "selected" : ""
                    }>2</option>
                  </select>
                </td>
              </tr>
          `;
        })
        .join("")}
    </tbody>
  `;
    jornadaDiv.appendChild(table);
    partitsContainer.appendChild(jornadaDiv);
  });

  // Afegir event listeners per a cada select per actualitzar la classificació
  document.querySelectorAll("select:not([disabled])").forEach((select) => {
    select.addEventListener("change", function () {
      guardaResultats();
      actualitzaClassificacio(); //  Quan es canvia un resultat, recalculam la classificació
    });
  });
}

// Funció per mostrar la jornada actual
function mostraJornada(jornada) {
  document.getElementById("num-jornada").textContent = jornada;
  localStorage.setItem("jornadaActual", jornada);
  generaTaulaPartits();
  actualitzaClassificacio();
  document.getElementById("boto-anterior").disabled = jornada === 24;
  document.getElementById("boto-seguent").disabled = jornada === totalJornades;
}

// Funció per guardar resultats al localStorage
function guardaResultats() {
  let resultats = JSON.parse(localStorage.getItem("resultats")) || {};

  // Afegir o mantenir resultats fixos
  Object.keys(resultatsFixos).forEach((id) => {
    resultats[id] = resultatsFixos[id];
  });

  // Guardar resultats dels selects editables
  document
    .querySelectorAll("#partits-container select:not([disabled])")
    .forEach((select) => {
      resultats[select.id] = select.value;
    });
  localStorage.setItem("resultats", JSON.stringify(resultats));
}

// Funció per generar la classificació
function generaClassificacio() {
  const punts = { ...puntsInicials };
  const partits = { ...partitsInicials };

  // Ordenem la classificació per punts
  let classificacio = Object.keys(punts)
    .map((id) => ({
      id,
      nom: Object.keys(equipToId).find((key) => equipToId[key] === id),
      punts: punts[id],
      partits: partits[id],
    }))
    .sort((a, b) => b.punts - a.punts);

  // Generem la taula de classificació
  const tbody = document.querySelector(".classification tbody");
  tbody.innerHTML = "";

  classificacio.forEach((equip, index) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${equip.nom}</td>
      <td id="punts-${equip.id}">${equip.punts}</td>
      <td id="partits-${equip.id}">${equip.partits}</td>
    `;
    tbody.appendChild(fila);

    // Assignació de colors segons la posició
    if (index === 0) {
      fila.style.backgroundColor = "#28a745"; // Verd fort per al 1r lloc
      fila.style.color = "#fff";
    } else if (index >= 1 && index <= 4) {
      fila.style.backgroundColor = "#90ee90"; // Verd clar per al 2n-5è lloc
    } else if (index === 12) {
      fila.style.backgroundColor = "#ff9999"; // Vermell suau per al 13è lloc
    } else if (index >= 13 && index <= 17) {
      fila.style.backgroundColor = "#dc3545"; // Vermell fort per al 14è-18è lloc
      fila.style.color = "#fff";
    }
  });
}

function actualitzaClassificacio() {
  const punts = { ...puntsInicials };
  const partits = { ...partitsInicials };
  const selects = document.querySelectorAll("select");

  selects.forEach((select) => {
    const resultat = select.value;
    if (!resultat) return;

    const fila = select.closest("tr");
    const local = fila.children[0].textContent.trim();
    const visitant = fila.children[1].textContent.trim();

    const idLocal = equipToId[local] || null;
    const idVisitant = equipToId[visitant] || null;

    if (idLocal && idVisitant) {
      partits[idLocal] += 1;
      partits[idVisitant] += 1;
      if (resultat === "1") {
        punts[idLocal] += 3;
      } else if (resultat === "2") {
        punts[idVisitant] += 3;
      } else if (resultat === "X") {
        punts[idLocal] += 1;
        punts[idVisitant] += 1;
      }
    }
  });

  let classificacio = Object.keys(punts)
    .map((id) => ({
      id,
      nom: Object.keys(equipToId).find((key) => equipToId[key] === id),
      punts: punts[id],
      partits: partits[id],
    }))
    .sort((a, b) => b.punts - a.punts);

  const tbody = document.querySelector(".classification tbody");
  tbody.innerHTML = "";

  classificacio.forEach((equip, index) => {
    let fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${index + 1}</td>
      <td>${equip.nom}</td>
      <td id="punts-${equip.id}">${equip.punts}</td>
      <td id="partits-${equip.id}">${equip.partits}</td>
    `;
    tbody.appendChild(fila);

    // Assignació de colors segons la posició
    if (index === 0) {
      fila.style.backgroundColor = "#28a745"; // Verd fort per al 1r lloc
      fila.style.color = "#fff";
    } else if (index >= 1 && index <= 4) {
      fila.style.backgroundColor = "#90ee90"; // Verd clar per al 2n-5è lloc
    } else if (index === 12) {
      fila.style.backgroundColor = "#ff9999"; // Vermell suau per al 13è lloc
    } else if (index >= 13 && index <= 17) {
      fila.style.backgroundColor = "#dc3545"; // Vermell fort per al 14è-18è lloc
      fila.style.color = "#fff";
    }

    tbody.appendChild(fila);
  });

  // Guarda els resultats després d'actualitzar la classificació
  guardaResultats();
}

document.addEventListener("DOMContentLoaded", function () {
  // Event listeners per als botons de canvi de jornada
  document
    .getElementById("boto-anterior")
    .addEventListener("click", function () {
      if (jornadaActual > 24) {
        jornadaActual--;
        mostraJornada(jornadaActual);
      }
    });

  document
    .getElementById("boto-seguent")
    .addEventListener("click", function () {
      if (jornadaActual < totalJornades) {
        jornadaActual++;
        mostraJornada(jornadaActual);
      }
    });

  // Afegim resultats fixos al localStorage en carregar la pàgina
  guardaResultats();
  // Mostrem la jornada guardada o la per defecte
  mostraJornada(jornadaActual);
  generaClassificacio();
  actualitzaClassificacio();
});

document
  .getElementById("boto-restablir")
  .addEventListener("click", function () {
    if (
      confirm(
        "Segur que vols restablir tots els resultats? Aquesta acció no es pot desfer."
      )
    ) {
      // Recuperem els resultats guardats
      let resultatsGuardats =
        JSON.parse(localStorage.getItem("resultats")) || {};

      // Esborrem només els resultats editables (no els fixos)
      document.querySelectorAll("select").forEach((select) => {
        if (!select.disabled) {
          select.value = ""; //  Reiniciem només els selects editables
          delete resultatsGuardats[select.id]; //  Eliminem del localStorage
        }
      });

      // Tornem a guardar només els resultats fixos
      Object.keys(resultatsFixos).forEach((id) => {
        resultatsGuardats[id] = resultatsFixos[id];
      });

      localStorage.setItem("resultats", JSON.stringify(resultatsGuardats));

      // Tornem a la jornada 26 i ho guardem
      jornadaActual = 26;
      mostraJornada(jornadaActual);
      localStorage.setItem("jornadaActual", jornadaActual);

      actualitzaClassificacio();
      console.log("Classificació actualitzada després de restablir.");
    }
  });
