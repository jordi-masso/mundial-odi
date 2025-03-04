document.addEventListener("DOMContentLoaded", function () {
  const groups = {
    "Grupo A": [
      "Andreu Buenafuente",
      "Carme Arcarazo",
      "Marta Huguet",
      "Àlex Roca",
    ],
    "Grupo B": [
      "Pilar Rahola",
      "Pau Serrasolsas",
      "Basha Changue",
      "Juana Dolores",
    ],
    "Grupo C": [
      "Víctor Amela",
      "Sheila Peris",
      "Javier Cárdenas",
      "Josep Maria Bartomeu",
    ],
    "Grupo D": [
      "Ricard Ustrell",
      "El Dandy de Barcelona",
      "Joan Coscubiela",
      "Jordi Évole",
    ],
    "Grupo E": [
      "Joan Tardà",
      "Sergi Cristóbal Jané",
      "Josep Borrell",
      "Xavier Sala i Martín",
    ],
    "Grupo F": [
      "Josep Guardiola",
      "Carlos Carrizosa",
      "Josep Pedrerol",
      "Joan Canadell",
    ],
    "Grupo G": [
      "Anthony Corey",
      "Inés Arrimadas",
      "Tian Baena",
      "Jéssica Albiach",
    ],
    "Grupo H": ["Ada Colau", "Pol Molina", "Marc Lesan", "Arqueòleg Glamurós"],
  };

  const leagueContainer = document.getElementById("league");

  function createLeague() {
    for (const groupName in groups) {
      const groupDiv = document.createElement("div");
      groupDiv.classList.add("group");
      groupDiv.innerHTML = `<h2>${groupName}</h2>`;

      const matches = generateMatches(groups[groupName]);
      matches.forEach((match) => {
        const matchDiv = document.createElement("div");
        matchDiv.classList.add("match");
        matchDiv.innerHTML = `
                  <span>${match[0]}</span>
                  <input type="number" min="0" class="score" data-team="${match[0]}">
                  <span>vs</span>
                  <input type="number" min="0" class="score" data-team="${match[1]}">
                  <span>${match[1]}</span>
              `;
        groupDiv.appendChild(matchDiv);
      });

      const button = document.createElement("button");
      button.textContent = "Actualitzar Classificació";
      button.addEventListener("click", () =>
        updateStandings(groupDiv, groups[groupName])
      );
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
                  ${groups[groupName]
                    .map(
                      (team) => `
                      <tr data-team="${team}">
                          <td>${team}</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                          <td>0</td>
                      </tr>
                  `
                    )
                    .join("")}
              </tbody>
          `;
      groupDiv.appendChild(table);

      leagueContainer.appendChild(groupDiv);
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

  function updateStandings(groupDiv, teams) {
    let standings = {};
    teams.forEach(
      (team) => (standings[team] = { points: 0, gf: 0, gc: 0, dg: 0 })
    );

    const matches = groupDiv.querySelectorAll(".match");
    matches.forEach((match) => {
      const inputs = match.querySelectorAll(".score");
      let team1 = inputs[0].getAttribute("data-team");
      let team2 = inputs[1].getAttribute("data-team");

      let goals1 =
        inputs[0].value.trim() === "" ? null : parseInt(inputs[0].value);
      let goals2 =
        inputs[1].value.trim() === "" ? null : parseInt(inputs[1].value);

      // Si algun dels valors és nul, ignorem aquest partit
      if (goals1 === null || goals2 === null) return;

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

  createLeague();
});
