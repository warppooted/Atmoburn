// ==UserScript==
// @name         AtmoBurn - Known Universe in Table Format
// @namespace    https://beta7.atmoburn.com/known_universe.php
// @homepageURL  https://github.com/warppooted/Atmoburn/blob/main/knownUniverseSummary/readme.md
// @version      0.3
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
            #known-universe-table { border-collapse: collapse; box-shadow: 0 0 10px rgba(0,0,0,0.3); table-layout: fixed; }
            #known-universe-table th, #known-universe-table td { background-color: DarkGray; color: white; border: 1px solid #ccc; padding: 8px; font-size: 10.5px;  }
            #known-universe-table th { background: #1C1C1C; color: #CCCCCC; }
            #known-universe-table th.col-resource { width: 35px; }
            #known-universe-table td {background-color: white; color: black;}
            #known-universe-tbody td { background: #3D3D3D; color: #CCCCCC;}            
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
                  <th>Terra Diff</th>
                  <th class="col-resource">Iron</th>
                  <th class="col-resource">Bauxite</th>
                  <th class="col-resource">Titanium</th>
                  <th class="col-resource">Tungsten</th>
                  <th class="col-resource">Uranium</th>
                  <th class="col-resource">Copper</th>
                  <th class="col-resource">Gold</th>
                  <th class="col-resource">Lithium</th>
                  <th class="col-resource">Quartz</th>
                  <th class="col-resource">Lime</th>
                  <th class="col-resource">Carbon</th>
                  <th class="col-resource">Fert</th>
                  <th>Habitability</th>
                </tr>
            </thead>
            <tbody id="known-universe-tbody"></tbody>
        </i>
    `;

    //Inserting the table into the DOM
    targetElement.insertAdjacentElement('afterend', container);

    // Returns an array of just the planets within the search parameters (excludes planets with the "colmenu" class)
    const planetNodes = document.querySelectorAll("a[href*=showPlanet]");
    const planetArray = [...planetNodes].filter(node => {return node.className === ""});
    // console.log(planetArray);  // For Testing

    // Function which builds a list of spans with specified text
    const searchSpan = (text) => {
      const allSpans = document.querySelectorAll("span");
      const filteredSpans = [...allSpans].filter(span => span.textContent.includes(text));
      return filteredSpans;
    };
    // console.log(searchSpan('Class:')); // For Testing

    // Array of search fields
    const searchTextArray = ['Class:', 'Atmosphere:', 'Weather:', 'Gravity:', 'Temperature:', 'Terraforming Difficulty:', 'iron:', 'bauxite:', 'titanium:', 'tungsten:', 'uranium:', 'copper:', 'gold:', 'lithium:', 'quartz:', 'lime:', 'carbon:', 'fertility:', 'Habitability:'];

    // Function to build each row of the table - currently only including name
    const addTableRows = () => {
      for (let i=0; i<planetArray.length; i++){
       
        // Creates a table row and places the planet name into the first cell
        const name = planetArray[i].outerHTML;
        const tableRow = `
          <tr>
          <td>${name}</td>
          </tr>          
          `
        // Selects the summary table and inserts the row at the end
        const targetTB = document.querySelector('#known-universe-tbody');
        targetTB.insertAdjacentHTML('beforeend', tableRow);
        
        // Specifies the new row for data to be added to
        const currentRow = targetTB.rows[i];

        // Runs through the searchTextArray and puts the textContent into each td cell
          for (let cell=0; cell<searchTextArray.length; cell++){
          const searchText = searchTextArray[cell];
          const cellData = searchSpan(searchText)[i].textContent;
          const trimmedCellData = cellData.replace(searchText, '').trim();          
          const newCell = currentRow.insertCell();
          newCell.textContent = trimmedCellData;
          newCell.style.textAlign = 'center';
          
          // Conditional formatting thresholds for cells
          const redThreshold = 0;
          const yellowThreshold = 29;
          const greenThreshold = 39;

          // Get number values for percentages
          const numValue = parseFloat(trimmedCellData);

          // Color cells based on conditional formatting thresholds. Skips the Weather, Gravity and Temperature columns
          if (searchText !== 'Weather:' && searchText !== 'Gravity:' && searchText !== 'Temperature:') {
            if (numValue > greenThreshold){
              newCell.style.color = 'green';
              newCell.style.fontWeight = 'bold';
            } else if (numValue > yellowThreshold){
            newCell.style.color = 'yellow';
            } else if (numValue === redThreshold){
            newCell.style.color = 'red';
            }
          }
        }
      };
    };

    addTableRows();    
})();
