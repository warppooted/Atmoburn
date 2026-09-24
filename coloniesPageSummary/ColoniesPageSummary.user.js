// ==UserScript==
// @name         AtmoBurn - Colonies Page Summary
// @namespace    CavalryMaid.AtmoBurn.ColoniesPage
// @version      v0.0.1 initial
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
    const tableHeaders = ['Colony', 'Population', 'Wealth', 'Surplus', 'Happiness', 'Education', 'Crime', 'Unemployment'];

    // Table initialization and styles
    summaryTable.innerHTML = `
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
    const targetHeaders = document.querySelector('#colonies-overview-table-header');

    for (let i=0; i<tableHeaders.length; i++){
        const headerText = tableHeaders[i];
        const newHeader = targetHeaders.insertCell();
        newHeader.textContent = headerText;
    };

})();
