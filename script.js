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
      updateStandings(groupDiv, groups[groupName], groupName);
      generateKnockoutStage();
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

function loadSavedResults(groupDiv, groupName) {
  let savedResults =
    JSON.parse(localStorage.getItem(`results_${groupName}`)) || {};
  let savedStandings = JSON.parse(
    localStorage.getItem(`standings_${groupName}`)
  );

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
  let leftContainer = document.getElementById("knockout-left");
  let rightContainer = document.getElementById("knockout-right");
  let quarterfinalLeftContainer = document.getElementById("quarterfinal-left");
  let quarterfinalRightContainer =
    document.getElementById("quarterfinal-right");
  let semifinalLeftContainer = document.getElementById("semifinal-left");
  let semifinalRightContainer = document.getElementById("semifinal-right");
  let finalContainer = document.getElementById("final-match");

  leftContainer.innerHTML = "";
  rightContainer.innerHTML = "";
  quarterfinalLeftContainer.innerHTML = "";
  quarterfinalRightContainer.innerHTML = "";
  semifinalLeftContainer.innerHTML = "";
  semifinalRightContainer.innerHTML = "";
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

  console.log(knockoutTeams);
  let matches = [];

  matches.push([knockoutTeams[0], knockoutTeams[3]]);
  matches.push([knockoutTeams[4], knockoutTeams[7]]);
  matches.push([knockoutTeams[8], knockoutTeams[11]]);
  matches.push([knockoutTeams[12], knockoutTeams[15]]);
  matches.push([knockoutTeams[2], knockoutTeams[1]]);
  matches.push([knockoutTeams[6], knockoutTeams[5]]);
  matches.push([knockoutTeams[10], knockoutTeams[9]]);
  matches.push([knockoutTeams[14], knockoutTeams[13]]);

  // for (let i = 0; i < knockoutTeams.length; i += 2) {
  //   if (i + 1 < knockoutTeams.length) {
  //     matches.push([knockoutTeams[i], knockoutTeams[i + 1]]);
  //   }
  // }

  console.log(matches);

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
    finals: [{ team1: "", team2: "" }],
    tercer: [{ team1: "", team2: "" }],
  };

  matches.forEach((match, index) => {
    let matchDiv = createMatch(
      index + 1,
      match[0].team,
      match[1].team,
      "quarterfinals",
      Math.floor(index / 2)
    );
    if (index < 4) {
      leftContainer.appendChild(matchDiv);
    } else {
      rightContainer.appendChild(matchDiv);
    }
    rounds.vuitens.push({ team1: match[0].team, team2: match[1].team });
  });

  // Afegir quarts de finals buits
  for (let i = 0; i < 4; i++) {
    let quarterDiv = createMatch(9 + i, "", "", "semifinals", 0);
    if (i < 2) {
      quarterfinalLeftContainer.appendChild(quarterDiv);
    } else {
      quarterfinalRightContainer.appendChild(quarterDiv);
    }
  }

  // Afegir semifinals buides
  for (let i = 0; i < 2; i++) {
    let semiDiv = createMatch(13 + i, "", "", "finals", 0);
    if (i === 0) {
      semifinalLeftContainer.appendChild(semiDiv);
    } else {
      semifinalRightContainer.appendChild(semiDiv);
    }
  }

  // Afegir final i tercer lloc
  finalContainer.appendChild(createMatch(15, "", "", "", 0)); // Final
  finalContainer.appendChild(createMatch(16, "", "", "", 0)); // 3r lloc
}

function createMatch(id, team1, team2, nextRound, nextIndex) {
  let matchDiv = document.createElement("div");
  matchDiv.classList.add("match");
  matchDiv.innerHTML = `
      <p><strong>Partit ${id}:</strong> <span id="team-${id}-1">${
    team1 || "?"
  }</span> vs <span id="team-${id}-2">${team2 || "?"}</span></p>
      <input type="number" class="score" id="score-${id}-team1" min="0" placeholder="GF">
      <input type="number" class="score" id="score-${id}-team2" min="0" placeholder="GF">
      <button onclick="determineWinner(${id}, '${nextRound}', ${nextIndex})">Guardar</button>
  `;
  return matchDiv;
}

function determineWinner(matchId, nextRound, nextIndex) {
  let score1 = parseInt(
    document.getElementById(`score-${matchId}-team1`).value
  );
  let score2 = parseInt(
    document.getElementById(`score-${matchId}-team2`).value
  );

  if (isNaN(score1) || isNaN(score2)) {
    alert("Si us plau, introdueix un resultat vàlid.");
    return;
  }

  let winner =
    score1 > score2
      ? document.getElementById(`team-${matchId}-1`).innerText
      : document.getElementById(`team-${matchId}-2`).innerText;
  let loser =
    score1 < score2
      ? document.getElementById(`team-${matchId}-1`).innerText
      : document.getElementById(`team-${matchId}-2`).innerText;

  if (nextRound === "semifinals") {
    document.getElementById(`team-13-${nextIndex + 1}`).innerText = winner;
  } else if (nextRound === "finals") {
    document.getElementById("team-15-1").innerText = winner; // Final
    document.getElementById("team-16-1").innerText = loser; // 3r lloc
  } else if (matchId === 15) {
    alert(`🏆 El campió és ${winner}!`);
  } else if (matchId === 16) {
    alert(`🥉 ${winner} guanya el tercer lloc!`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  createLeague();
  generateKnockoutStage();
});
