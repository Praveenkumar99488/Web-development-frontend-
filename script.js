function generateMatrixInput() {
    const size = document.getElementById("matrix-size").value;
    const container = document.getElementById("matrix-container");
    container.innerHTML = ''; // Clear any existing input fields
    container.style.gridTemplateColumns = `repeat(${size}, auto)`;

    // Create a grid for input
    for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
        const input = document.createElement("input");
        input.type = "number";
        input.id = `cell-${i}-${j}`;
        container.appendChild(input);
    }
    }
    container.className = "matrix-grid";
}

function calculateLDU() {
    const size = parseInt(document.getElementById("matrix-size").value);
    const matrix = [];
    
    // Parsing input matrix
    for (let i = 0; i < size; i++) {
    matrix[i] = [];
    for (let j = 0; j < size; j++) {
        const value = parseFloat(document.getElementById(`cell-${i}-${j}`).value);
        if (isNaN(value)) {
        document.getElementById("error-message").innerText = "Please enter valid numbers in all fields.";
        return;
        }
        matrix[i][j] = value;
    }
    }
    document.getElementById("error-message").innerText = ""; // Clear error message

    // Initialize L, D, U matrices and elimination matrices
    const L = Array.from({ length: size }, () => Array(size).fill(0));
    const D = Array.from({ length: size }, () => Array(size).fill(0));
    const U = JSON.parse(JSON.stringify(matrix)); // Start U as a copy of the input matrix
    const E21 = identityMatrix(size);
    const E31 = identityMatrix(size);
    const E32 = identityMatrix(size);

    // LDU Factorization Logic with Elimination Matrices
    for (let i = 0; i < size; i++) {
    L[i][i] = 1; // Diagonal of L set to 1

    for (let j = i + 1; j < size; j++) {
        const factor = U[j][i] / U[i][i];
        L[j][i] = factor;
        for (let k = i; k < size; k++) {
        U[j][k] -= factor * U[i][k];
        }

        // Set up specific elimination matrices based on i and j values
        if (i === 0 && j === 1) E21[j][i] = -factor;
        if (i === 0 && j === 2) E31[j][i] = -factor;
        if (i === 1 && j === 2) E32[j][i] = -factor;
    }

    // Set diagonal elements of D and normalize U
    D[i][i] = U[i][i];
    for (let j = i; j < size; j++) {
        U[i][j] /= D[i][i];
    }
    }

    // Display matrices
    displayMatrix(L, "LMatrix");
    displayMatrix(D, "DMatrix");
    displayMatrix(U, "UMatrix");
    displayMatrix(E21, "E21Matrix");
    displayMatrix(E31, "E31Matrix");
    displayMatrix(E32, "E32Matrix");
}

function identityMatrix(size) {
    const matrix = Array.from({ length: size }, () => Array(size).fill(0));
    for (let i = 0; i < size; i++) {
    matrix[i][i] = 1;
    }
    return matrix;
}

function displayMatrix(matrix, elementId) {
    const container = document.getElementById(elementId);
    container.innerHTML = ''; // Clear existing output
    container.style.gridTemplateColumns = `repeat(${matrix.length}, auto)`;

    // Display each element
    matrix.forEach(row => {
    row.forEach(value => {
        const cell = document.createElement("div");
        cell.innerText = value.toFixed(2); // Display to 2 decimal places
        container.appendChild(cell);
    });
    });
}