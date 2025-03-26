const groups = {
  "Grup A": [
    "Andreu Buenafuente",
    "Carme Arcarazo",
    "Marta Huguet",
    "Àlex Roca",
  ],
  "Grup B": [
    "Pilar Rahola",
    "Pau Serrasolsas",
    "Basha Changue",
    "Juana Dolores",
  ],
  "Grup C": [
    "Víctor Amela",
    "Sheila Peris",
    "Javier Cárdenas",
    "Josep Maria Bartomeu",
  ],
  "Grup D": [
    "Ricard Ustrell",
    "El Dandy de Barcelona",
    "Joan Coscubiela",
    "Jordi Évole",
  ],
  "Grup E": [
    "Joan Tardà",
    "Sergi Cristóbal Jané",
    "Josep Borrell",
    "Xavier Sala i Martín",
  ],
  "Grup F": [
    "Josep Guardiola",
    "Carlos Carrizosa",
    "Josep Pedrerol",
    "Joan Canadell",
  ],
  "Grup G": [
    "Anthony Corey",
    "Inés Arrimadas",
    "Tian Baena",
    "Jéssica Albiach",
  ],
  "Grup H": ["Ada Colau", "Pol Molina", "Marc Lesan", "Arqueòleg Glamurós"],
};

const leagueContainer = document.getElementById("league");

function createLeague() {
  for (const groupName in groups) {
    const groupDiv = document.createElement("div");
    groupDiv.classList.add("group");
    groupDiv.innerHTML = `<h2>${groupName}</h2>`;

    const matches = generateMatches(groups[groupName]);
    matches.forEach((match, index) => {
      const matchDiv = document.createElement("div");
      matchDiv.classList.add("match");
      const matchId = `${groupName}-match-${index}`;

      matchDiv.innerHTML = `
        <span>${match[0]}</span>
        <input type="number" min="0" class="score" data-match="${matchId}" data-team="${match[0]}">
        <span>vs</span>
        <input type="number" min="0" class="score" data-match="${matchId}" data-team="${match[1]}">
        <span>${match[1]}</span>
      `;
      groupDiv.appendChild(matchDiv);
    });

    const button = document.createElement("button");
    button.textContent = "Actualitzar Classificació";
    button.id = `update-${groupName.replace(/\s+/g, "-").toLowerCase()}`;
    button.addEventListener("click", () => {
      updateAllStandings();
    });
    groupDiv.appendChild(button);

    const table = document.createElement("table");
    table.classList.add("table");
    table.innerHTML = `
      <thead>
          <tr>
              <th>Equip</th>
              <th>Punts</th>
              <th>GF</th>
              <th>GC</th>
              <th>DG</th>
          </tr>
      </thead>
      <tbody>
      </tbody>
    `;
    groupDiv.appendChild(table);

    leagueContainer.appendChild(groupDiv);

    loadSavedResults(groupDiv, groupName);
  }
}

function generateMatches(teams) {
  return [
    [teams[0], teams[1]],
    [teams[2], teams[3]],
    [teams[0], teams[2]],
    [teams[1], teams[3]],
    [teams[0], teams[3]],
    [teams[1], teams[2]],
  ];
}

let grupAResults = {
  "Grup A-match-0": {
    "Andreu Buenafuente": 9,
    "Carme Arcarazo": 2,
  },
  "Grup A-match-1": {
    "Marta Huguet": 10,
    "Àlex Roca": 3,
  },
  "Grup A-match-4": {
    "Andreu Buenafuente": 6,
    "Àlex Roca": 7,
  },
  "Grup A-match-5": {
    "Carme Arcarazo": 4,
    "Marta Huguet": 9,
  },
};

let grupBResults = {
  "Grup B-match-0": {
    "Pilar Rahola": 11,
    "Pau Serrasolsas": 1,
  },
  "Grup B-match-1": {
    "Basha Changue": 4,
    "Juana Dolores": 7,
  },
  "Grup B-match-4": {
    "Pilar Rahola": 11,
    "Juana Dolores": 1,
  },
  "Grup B-match-5": {
    "Pau Serrasolsas": 3,
    "Basha Changue": 8,
  },
};

let grupCResults = {
  "Grup C-match-0": {
    "Víctor Amela": 7,
    "Sheila Peris": 4,
  },
  "Grup C-match-1": {
    "Javier Cárdenas": 5,
    "Josep Maria Bartomeu": 5,
  },
  "Grup C-match-4": {
    "Víctor Amela": 6,
    "Josep Maria Bartomeu": 4,
  },
  "Grup C-match-5": {
    "Sheila Peris": 4,
    "Javier Cárdenas": 7,
  },
};

let grupDResults = {
  "Grup D-match-0": {
    "Ricard Ustrell": 2,
    "El Dandy de Barcelona": 9,
  },
  "Grup D-match-1": {
    "Joan Coscubiela": 5,
    "Jordi Évole": 6,
  },
  "Grup D-match-4": {
    "Ricard Ustrell": 4,
    "Jordi Évole": 8,
  },
  "Grup D-match-5": {
    "El Dandy de Barcelona": 6,
    "Joan Coscubiela": 6,
  },
};

let grupEResults = {
  "Grup E-match-0": {
    "Joan Tardà": 7,
    "Sergi Cristóbal Jané": 6,
  },
  "Grup E-match-1": {
    "Josep Borrell": 7,
    "Xavier Sala i Martin": 6,
  },
  "Grup E-match-4": {
    "Joan Tardà": 4,
    "Xavier Sala i Martin": 8,
  },
  "Grup E-match-5": {
    "Sergi Cristóbal Jané": 3,
    "Josep Borrell": 8,
  },
};

let grupFResults = {
  "Grup F-match-0": {
    "Josep Guardiola": 3,
    "Carlos Carrizosa": 9,
  },
  "Grup F-match-1": {
    "Josep Pedrerol": 10,
    "Joan Canadell": 2,
  },
  "Grup F-match-4": {
    "Josep Guardiola": 4,
    "Joan Canadell": 7,
  },
  "Grup F-match-5": {
    "Carlos Carrizosa": 8,
    "Josep Pedrerol": 3,
  },
};

let grupGResults = {
  "Grup G-match-0": {
    "Anthony Corey": 7,
    "Inés Arrimadas": 5,
  },
  "Grup G-match-1": {
    "Tian Baena": 8,
    "Jéssica Albiach": 5,
  },
  "Grup G-match-4": {
    "Anthony Corey": 7,
    "Jéssica Albiach": 3,
  },
  "Grup G-match-5": {
    "Inés Arrimadas": 6,
    "Tian Baena": 5,
  },
};

let grupHResults = {
  "Grup H-match-0": {
    "Ada Colau": 6,
    "Pol Molina": 6,
  },
  "Grup H-match-1": {
    "Marc Lesan": 2,
    "Arqueòleg Glamurós": 10,
  },
  "Grup H-match-4": {
    "Ada Colau": 1,
    "Arqueòleg Glamurós": 8,
  },
  "Grup H-match-5": {
    "Pol Molina": 5,
    "Marc Lesan": 5,
  },
};

function loadSavedResults(groupDiv, groupName) {
  let savedResults =
    JSON.parse(localStorage.getItem(`results_${groupName}`)) || {};
  let savedStandings = JSON.parse(
    localStorage.getItem(`standings_${groupName}`)
  );

  if (groupName === "Grup A") {
    savedResults = { ...savedResults, ...grupAResults };
  }

  if (groupName === "Grup B") {
    savedResults = { ...savedResults, ...grupBResults };
  }

  if (groupName === "Grup C") {
    savedResults = { ...savedResults, ...grupCResults };
  }

  if (groupName === "Grup D") {
    savedResults = { ...savedResults, ...grupDResults };
  }

  if (groupName === "Grup E") {
    savedResults = { ...savedResults, ...grupEResults };
  }

  if (groupName === "Grup F") {
    savedResults = { ...savedResults, ...grupFResults };
  }

  if (groupName === "Grup G") {
    savedResults = { ...savedResults, ...grupGResults };
  }

  if (groupName === "Grup H") {
    savedResults = { ...savedResults, ...grupHResults };
  }

  // Guardem els resultats fusionats a localStorage per assegurar persistència
  localStorage.setItem(`results_${groupName}`, JSON.stringify(savedResults));

  const matches = groupDiv.querySelectorAll(".match");

  matches.forEach((match, index) => {
    const inputs = match.querySelectorAll(".score");
    let matchId = `${groupName}-match-${index}`;

    if (savedResults[matchId]) {
      let teams = Object.keys(savedResults[matchId]);
      inputs[0].value = savedResults[matchId][teams[0]];
      inputs[1].value = savedResults[matchId][teams[1]];
    }
  });

  if (savedStandings) {
    displayStandings(groupDiv, savedStandings);
  }

  updateStandings(groupDiv, groups[groupName], groupName);
}

function updateAllStandings() {
  const groupDivs = document.querySelectorAll(".group");

  let index = 0;
  for (const groupName in groups) {
    const groupDiv = groupDivs[index];
    const teams = groups[groupName];

    updateStandings(groupDiv, teams, groupName);
    index++;
  }

  generateKnockoutStage();
}

function updateStandings(groupDiv, teams, groupName) {
  let standings = {};
  teams.forEach(
    (team) => (standings[team] = { points: 0, gf: 0, gc: 0, dg: 0 })
  );

  const matches = groupDiv.querySelectorAll(".match");
  let resultsToSave = {};

  matches.forEach((match, index) => {
    const inputs = match.querySelectorAll(".score");
    let matchId = `${groupName}-match-${index}`;
    let team1 = inputs[0].getAttribute("data-team");
    let team2 = inputs[1].getAttribute("data-team");

    let goals1 =
      inputs[0].value.trim() === "" ? null : parseInt(inputs[0].value);
    let goals2 =
      inputs[1].value.trim() === "" ? null : parseInt(inputs[1].value);

    if (goals1 === null || goals2 === null) return;

    resultsToSave[matchId] = { [team1]: goals1, [team2]: goals2 };

    standings[team1].gf += goals1;
    standings[team1].gc += goals2;
    standings[team2].gf += goals2;
    standings[team2].gc += goals1;

    if (goals1 > goals2) {
      standings[team1].points += 3;
    } else if (goals1 < goals2) {
      standings[team2].points += 3;
    } else {
      standings[team1].points += 1;
      standings[team2].points += 1;
    }
  });

  teams.forEach((team) => {
    standings[team].dg = standings[team].gf - standings[team].gc;
  });

  localStorage.setItem(`results_${groupName}`, JSON.stringify(resultsToSave));
  localStorage.setItem(`standings_${groupName}`, JSON.stringify(standings));

  displayStandings(groupDiv, standings);
}

function displayStandings(groupDiv, standings) {
  const sortedTeams = Object.keys(standings).sort((a, b) => {
    return (
      standings[b].points - standings[a].points ||
      standings[b].dg - standings[a].dg ||
      standings[b].gf - standings[a].gf
    );
  });

  const tbody = groupDiv.querySelector("tbody");
  tbody.innerHTML = sortedTeams
    .map(
      (team) => `
      <tr data-team="${team}">
          <td>${team}</td>
          <td>${standings[team].points}</td>
          <td>${standings[team].gf}</td>
          <td>${standings[team].gc}</td>
          <td>${standings[team].dg}</td>
      </tr>
    `
    )
    .join("");
}

function showTab(tabId) {
  document.querySelectorAll(".tab-content").forEach((tab) => {
    tab.style.display = "none";
  });
  document.getElementById(tabId).style.display = "block";
}

function generateKnockoutStage() {
  let roundOf16Container = document.getElementById("round-of-16");
  let quarterFinalsContainer = document.getElementById("quarter-finals");
  let semiFinalsContainer = document.getElementById("semi-finals");
  let finalContainer = document.getElementById("final-match");

  // Netejar contingut anterior
  roundOf16Container.innerHTML = "";
  quarterFinalsContainer.innerHTML = "";
  semiFinalsContainer.innerHTML = "";
  finalContainer.innerHTML = "";

  let knockoutTeams = [];

  for (const groupName in groups) {
    let standings = JSON.parse(localStorage.getItem(`standings_${groupName}`));

    if (standings) {
      let sortedTeams = Object.keys(standings).sort((a, b) => {
        return (
          standings[b].points - standings[a].points ||
          standings[b].dg - standings[a].dg ||
          standings[b].gf - standings[a].gf
        );
      });

      if (sortedTeams.length >= 2) {
        knockoutTeams.push({ team: sortedTeams[0], group: groupName });
        knockoutTeams.push({ team: sortedTeams[1], group: groupName });
      }
    }
  }

  let rounds = {
    vuitens: [],
    quarts: [
      { team1: "", team2: "" },
      { team1: "", team2: "" },
      { team1: "", team2: "" },
      { team1: "", team2: "" },
    ],
    semifinals: [
      { team1: "", team2: "" },
      { team1: "", team2: "" },
    ],
    final: [{ team1: "", team2: "" }],
  };

  rounds.vuitens.push([knockoutTeams[0], knockoutTeams[3]]);
  rounds.vuitens.push([knockoutTeams[4], knockoutTeams[7]]);
  rounds.vuitens.push([knockoutTeams[8], knockoutTeams[11]]);
  rounds.vuitens.push([knockoutTeams[12], knockoutTeams[15]]);
  rounds.vuitens.push([knockoutTeams[2], knockoutTeams[1]]);
  rounds.vuitens.push([knockoutTeams[6], knockoutTeams[5]]);
  rounds.vuitens.push([knockoutTeams[10], knockoutTeams[9]]);
  rounds.vuitens.push([knockoutTeams[14], knockoutTeams[13]]);

  for (let i = 0; i < rounds.vuitens.length; i += 1) {
    let matchDiv = createMatch(
      i + 1,
      rounds.vuitens[i][0].team,
      rounds.vuitens[i][1].team,
      "quarts",
      i
    );
    roundOf16Container.appendChild(matchDiv);
  }

  // Crear espais buits per quarts de final
  for (let i = 0; i < 4; i++) {
    let matchDiv = createMatch(9 + i, "", "", "semifinals", i);
    quarterFinalsContainer.appendChild(matchDiv);
  }

  // Crear espais buits per semifinals
  for (let i = 0; i < 2; i++) {
    let matchDiv = createMatch(13 + i, "", "", "final", i);
    semiFinalsContainer.appendChild(matchDiv);
  }

  // Crear títol per la final de consolació
  const consolationTitle = document.createElement("h3");
  consolationTitle.textContent = "Final de Consolació";
  consolationTitle.classList.add("match-title");
  finalContainer.appendChild(consolationTitle);

  // Crear espai per la final de consolació
  finalContainer.appendChild(createMatch(15, "", "", "", 0));

  // Crear títol per la final
  const finalTitle = document.createElement("h3");
  finalTitle.textContent = "Final Absoluta";
  finalTitle.classList.add("match-title");
  finalContainer.appendChild(finalTitle);

  // Crear espai per la final
  finalContainer.appendChild(createMatch(16, "", "", "", 0));
}

function createMatch(id, team1, team2, nextRound, nextIndex) {
  let matchDiv = document.createElement("div");
  matchDiv.classList.add("match");

  matchDiv.innerHTML = `
    <div class="match-row">
      <span class="team-name" id="team-${id}-1">${team1 || "?"}</span>
      <input type="number" class="score" id="score-${id}-team1" min="0">
      <span class="vs">vs</span>
      <input type="number" class="score" id="score-${id}-team2" min="0">
      <span class="team-name" id="team-${id}-2">${team2 || "?"}</span>
      <button class="save-button" onclick="determineAllWinners()">Guardar</button>
    </div>
  `;

  return matchDiv;
}

function determineAllWinners() {
  const allMatches = document.querySelectorAll(".match-row");

  allMatches.forEach((matchRow) => {
    const inputs = matchRow.querySelectorAll(".score");
    if (inputs.length !== 2) return;

    const input1 = inputs[0];
    const input2 = inputs[1];

    const score1 = parseInt(input1.value);
    const score2 = parseInt(input2.value);

    if (isNaN(score1) || isNaN(score2)) return;

    // Extraure l'id del partit a partir dels ID dels inputs
    const idRegex = /score-(\d+)-team/;
    const match = input1.id.match(idRegex);
    if (!match) return;

    const matchId = parseInt(match[1]);

    const team1Name = matchRow.querySelector(`#team-${matchId}-1`)?.innerText;
    const team2Name = matchRow.querySelector(`#team-${matchId}-2`)?.innerText;

    const winner = score1 > score2 ? team1Name : team2Name;
    const loser = score1 < score2 ? team1Name : team2Name;

    // Decideix a quina ronda anem (aquí pots afinar més si vols)
    let nextRound = "";
    let nextIndex = -1;

    if (matchId >= 1 && matchId <= 8) {
      nextRound = "quarts";
      nextIndex = matchId - 1;
    } else if (matchId >= 9 && matchId <= 12) {
      nextRound = "semifinals";
      nextIndex = matchId - 9;
    } else if (matchId >= 13 && matchId <= 14) {
      nextRound = "final";
      nextIndex = matchId - 13;
    } else if (matchId === 15 || matchId === 16) {
      // finals
      if (matchId === 16) {
        alert(`🏆 El campió és ${winner}!`);
      } else if (matchId === 15) {
        alert(`🥉 ${winner} guanya el tercer lloc!`);
      }
      return;
    }

    if (nextRound === "quarts") {
      let index = nextIndex % 2 === 0 ? 1 : 2;
      document.getElementById(
        `team-${9 + Math.round((nextIndex - 1) / 2)}-${index}`
      ).innerText = winner;
    } else if (nextRound === "semifinals") {
      let index = nextIndex % 2 === 0 ? 1 : 2;
      document.getElementById(
        `team-${13 + Math.round((nextIndex - 1) / 2)}-${index}`
      ).innerText = winner;
    } else if (nextRound === "final") {
      let index = nextIndex % 2 === 0 ? 1 : 2;
      document.getElementById(`team-15-${index}`).innerText = loser; // 3r lloc
      document.getElementById(`team-16-${index}`).innerText = winner; // Final
    } else if (matchId === 16) {
      alert(`🏆 El campió és ${winner}!`);
    } else if (matchId === 15) {
      alert(`🥉 ${winner} guanya el tercer lloc!`);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  createLeague();
  generateKnockoutStage();
});
