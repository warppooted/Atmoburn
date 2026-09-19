// ==UserScript==
// @name         AtmoBurn - Known Universe in Table Format
// @namespace    https://beta7.atmoburn.com/known_universe.php
// @version      2026-09-18
// @description  try to take over the universe
// @author       CavalryMaid
// @match        https://*.atmoburn.com/known_universe.php
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

     //Finding the element we want to insert the table after
     const targetElement = document.querySelector(".highlight.aligncenter.padding5.lineheight.margintop");

     // Creating the table structure
     const container = document.createElement('div');

     // Specifications for the table
        container.innerHTML = `
        <style>
            #known-universe-table { border-collapse: collapse; box-shadow: 0 0 10px rgba(0,0,0,0.3); }
            #known-universe-table th, #known-universe-table td { background-color: DarkGray; color: white; border: 1px solid #ccc; padding: 8px; font-size: 12px;  }
            #known-universe-table th { background: #1C1C1C; color: #CCCCCC; }
            #known-universe-table td {background-color: white; color: black;}
        </style>
        <table id="known-universe-table">
            <thead>
                <tr>
                  <th>Planet</th>
                  <th>Class</th>
                  <th>Atmo</th>
                  <th>Weather</th>
                  <th>Grav</th>
                  <th>Temp</th>
                  <th>Habitability</th>
                  <th>Terra Diff</th>
                  <th>Iron</th>
                  <th>Bauxite</th>
                  <th>Titanium</th>
                  <th>Tungsten</th>
                  <th>Uranium</th>
                  <th>Copper</th>
                  <th>Gold</th>
                  <th>Lithium</th>
                  <th>Quartz</th>
                  <th>Lime</th>
                  <th>Carbon</th>
                  <th>Fert.</th>
                </tr>
            </thead>
            <tbody id="known-universe-tbody"></tbody>
        </i>
    `;

    // Returns an array of just the planets within the search parameters (excludes planets with the "colmenu" class)
    const planetNodes = document.querySelectorAll("a[href*=showPlanet]");
    const planetArray = [...planetNodes].filter(node => {return node.className === ""});
    console.log(planetArray);

    // planetArray.forEach((planet) => console.log(planet.innerHTML)); //testing - to check planet name list output


    //Inserting the table into the DOM
    targetElement.insertAdjacentElement('afterend', container);

    // Building function to query each element for the items we want
    const getSpec = (phrase) => {
    const span = Array.from(document.querySelectorAll('.light span'))
                      .find(el => el.textContent.includes(phrase));
    return span ? span.textContent.replace(phrase, '').trim() : '';
    };

    // Extracting planet specs - "name" does not currently work
    const name = planetArray[0].outerHTML;
    const pClass = getSpec('Class:');
    const atmosphere = getSpec('Atmosphere:');
    const weather = getSpec('Weather:');
    const gravity = getSpec('Gravity:');
    const temp = getSpec('Temperature:');
    const habitability = getSpec('Habitability:');
    const terraforming = getSpec('Terraforming Difficulty:');
    const iron = getSpec('iron:');
    const bauxite = getSpec('bauxite:');
    const titanium = getSpec('titanium:');
    const tungsten = getSpec('tungsten:');
    const uranium = getSpec('uranium:');
    const copper = getSpec('copper:');
    const gold = getSpec('gold:');
    const lithium = getSpec('lithium:');
    const quartz = getSpec('quartz:');
    const lime = getSpec('lime:');
    const carbon = getSpec('carbon:');
    const fertility = getSpec('fertility:');

    // Generate the <tr> Row Element
    const newRowHTML = `
    <tr>
        <td>${name}</td>
        <td>${pClass}</td>
        <td>${atmosphere}</td>
        <td>${weather}</td>
        <td>${gravity}</td>
        <td>${temp}</td>
        <td>${habitability}</td>
        <td>${terraforming}</td>
        <td>${iron}</td>
        <td>${bauxite}</td>
        <td>${titanium}</td>
        <td>${tungsten}</td>
        <td>${uranium}</td>
        <td>${copper}</td>
        <td>${gold}</td>
        <td>${lithium}</td>
        <td>${quartz}</td>
        <td>${lime}</td>
        <td>${carbon}</td>
        <td>${fertility}</td>
    </tr>
    `;

    // Inject the row into the container table
    const targetTableBody = document.querySelector('#known-universe-tbody');
    if (targetTableBody) {
        targetTableBody.insertAdjacentHTML('beforeend', newRowHTML);
    }

})();
