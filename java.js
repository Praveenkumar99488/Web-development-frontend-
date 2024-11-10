 function generateMatrixInput() {
      const matrixSize = document.getElementById("matrix-size").value;
      const matrixContainer = document.getElementById("matrix-container");
      matrixContainer.innerHTML = ""; // Clear any previous matrix inputs

      const table = document.createElement("table");
      table.classList.add("matrix-table");

      for (let i = 0; i < matrixSize; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < matrixSize; j++) {
          const cell = document.createElement("td");
          const input = document.createElement("input");
          input.type = "number";
          input.classList.add("matrix-input");
          input.id = `matrix-${i}-${j}`;
          cell.appendChild(input);
          row.appendChild(cell);
        }
        table.appendChild(row);
      }
      matrixContainer.appendChild(table);
    }
