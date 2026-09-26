// ==UserScript==
// @name         AtmoBurn - Colonies Page Summary
// @namespace    CavalryMaid.AtmoBurn.ColoniesPage
// @version      v0.0.3
// @description  Big page, many data. Sort sort.
// @author       CavalryMaid
// @match        https://*.atmoburn.com/overview.php?view=1
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// ==/UserScript==

(function() {
    'use strict';

    // Creates the summary table
    const summaryTable = document.createElement('div');

    // Table specs - headers
    const tableHeaders = ['Colony', 'Population', 'Wealth', 'Surplus', 'Food', 'Happiness', 'Education', 'Crime', 'Unemployment'];

    // Table initialization and styles
    summaryTable.innerHTML = `
        <style>
            #colonies-overview-table { border-collapse: collapse; box-shadow: 0 0 10px rgba(0,0,0,0.3); table-layout: fixed; width: 100%; }
            #colonies-overview-table th, #colonies-overview-table td { background-color: #3d3d3d; color: white; border: 1px solid #ccc; padding: 6.5px; font-size: 10.5px;  }                     
        </style>
        <table id='colonies-overview-table'>
            <thead id='colonies-overview-table-header'>
                <tr></tr>
            </thead>
            <tbody id='colonies-overview-table-body'>
            </tbody>
    `;

    // Insert table into the DOM
    const targetElement = document.querySelector(".highlight.padding5.aligncenter");
    targetElement.insertAdjacentElement('afterend', summaryTable);

    // Populate header tables
    const targetHeader = document.querySelector('#colonies-overview-table-header');
    const targetHeaderRow = targetHeader.rows[0];

    for (let i=0; i<tableHeaders.length; i++){
        const headerText = tableHeaders[i];
        const newHeader = targetHeaderRow.insertCell();
        newHeader.textContent = headerText;
    };

    // Get array of colonies shown and append each as a table row - WIP    
    const coloniesInContainer = document.querySelector('#coloniesContainer');
    const allLinks = coloniesInContainer.querySelectorAll('a[href*=view_colony]');
    const visibleColonyArray = [];
    allLinks.forEach(link => {
        if (link.offsetParent !== null){
            visibleColonyArray.push(link);
        }
    });
         
    console.log(visibleColonyArray);  // returns array of divs with #id of visible colonies
    
    for (let i=0; i<visibleColonyArray.length; i++){
        const colonyLink = visibleColonyArray[i].outerHTML;        
                
        const tableRow = `
          <tr>          
          <td>          
          <span style="font-size: 13px; font-weight: 600;">${colonyLink}</span>          
          </td>
          </tr>          
          `
                
        const targetTB = document.querySelector('#colonies-overview-table-body');
        targetTB.insertAdjacentHTML('beforeend', tableRow);
    } 

})();
