const imgWhite = new Image();
const imgBlack = new Image();
const imgWhite2 = new Image();
const imgBlack2 = new Image();

imgWhite.src = "wb.png";
imgBlack.src = "bb.png";

imgWhite2.src = "wh.png";
imgBlack2.src = "bh.png";

function drawPawn(row, col, color, isKing = false) {
  const x = col * gridSize + gridSize / 2;
  const y = row * gridSize + gridSize / 2;
  const radius = gridSize / 3; // Radius of the circle

  // Draw shadow
  ctx.beginPath();
  ctx.ellipse(
    x + 3,
    y + 3,
    radius * 1.1,
    radius * 0.9,
    Math.PI / 4,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Subtle shadow
  ctx.fill();

  let gradient = null;
  let stokeLine = null;

  if (color === "black") {
    gradient = ctx.createRadialGradient(
      x,
      y - radius / 4,
      radius / 6,
      x,
      y,
      radius
    );
    gradient.addColorStop(0, "rgba(50, 50, 50, 0.8)");
    gradient.addColorStop(0.5, "rgba(30, 30, 30, 0.6)");
    gradient.addColorStop(1, "rgba(10, 10, 10, 0.4)");
    stokeLine = "rgba(9, 7, 7, 0.3)";
  } else {
    gradient = ctx.createRadialGradient(
      x,
      y - radius / 4,
      radius / 6,
      x,
      y,
      radius
    );
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.8)");
    gradient.addColorStop(0.5, "rgba(200, 200, 255, 0.4)");
    gradient.addColorStop(1, "rgba(150, 150, 200, 0.2)");
    stokeLine = "rgba(214, 205, 205, 0.3)";
  }

  // Draw main glass pawn circle
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = gradient; // Apply the glass-like gradient
  ctx.fill();

  // Add an outer glow effect for the glass
  ctx.lineWidth = 2;
  ctx.strokeStyle = stokeLine; // Soft white glow
  ctx.stroke();

  // Add inner reflections
  ctx.beginPath();
  ctx.arc(x - radius / 4, y - radius / 4, radius / 3, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)"; // Inner highlight
  ctx.fill();

  ctx.beginPath();
  ctx.arc(x + radius / 5, y + radius / 5, radius / 5, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(255, 255, 255, 0.2)"; // Second reflection
  ctx.fill();

  // Draw "👑" for king pawn
  // if (isKing) {
  //   ctx.font = `${radius}px sans-serif`;
  //   ctx.fillStyle = "gold"; // Golden crown
  //   ctx.textAlign = "center";
  //   ctx.textBaseline = "middle";
  //   ctx.fillText("👑", x, y); // Position slightly above center
  // }

  if (isKing) {
    ctx.save();
    let auraColors;
    if (color === "white") {
      auraColors = [
        "rgba(255, 215, 0, 0.6)",
        "rgba(255, 204, 0, 0.4)",
        "rgba(255, 255, 0, 0.2)",
      ];
    } else {
      auraColors = [
        "rgba(128, 0, 128, 0.6)",
        "rgba(75, 0, 130, 0.4)",
        "rgba(50, 0, 80, 0.2)",
      ];
    }
    // for (let i = 1; i <= 3; i++) {
    //   ctx.beginPath();
    //   ctx.arc(x, y, radius + i * 3, 0, Math.PI * 2);
    //   ctx.strokeStyle = auraColors[i - 1]; // Layered aura colors
    //   ctx.lineWidth = 5;
    //   ctx.stroke();
    // }
    for (let i = 1; i <= 3; i++) {
      // Create random jitter offset to give flame-like effect
      const jitterX = Math.random() * 4 - 2; // Random horizontal offset between -2 and 2
      const jitterY = Math.random() * 4 - 2; // Random vertical offset between -2 and 2

      ctx.beginPath();
      ctx.arc(x + jitterX, y + jitterY, radius + i * 3, 0, Math.PI * 2); // Apply jitter to the circle center
      ctx.strokeStyle = auraColors[i - 1]; // Layered aura colors
      ctx.lineWidth = 6; // Thicker lines for a fire effect
      ctx.lineJoin = "round"; // Rounded corners for a smoother flame-like effect

      ctx.stroke();
    }
    ctx.restore();
  }
}

function drawPieceBack(row, col, color) {
  ctx.beginPath();
  ctx.arc(
    col * gridSize + gridSize / 2,
    row * gridSize + gridSize / 2,
    gridSize / 3, // Radius
    0,
    Math.PI * 2
  );
  ctx.fillStyle = color;
  ctx.fill();
}

function drawGreenBack(row, col) {
  ctx.beginPath();
  ctx.arc(
    col * gridSize + gridSize / 2,
    row * gridSize + gridSize / 2,
    gridSize / 3,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = "green";
  ctx.fill();
}

function drawBlueKing(row, col) {
    const x = col * gridSize + gridSize / 2;
    const y = row * gridSize + gridSize / 2;
    const radius = gridSize / 3; // Radius of the circle
  
    // Draw shadow
    ctx.beginPath();
    ctx.arc(x + 3, y + 3, radius, 0, Math.PI * 2); // Offset for shadow
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)"; // Semi-transparent black
    ctx.fill();
  
    // Draw blue circle
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = "blue";
    ctx.fill();
  
    // Add border
    ctx.lineWidth = 4; // Thickness of the border
    ctx.strokeStyle = "darkblue"; // Border color
    ctx.stroke();
  
    // Add gradient for more depth
    const gradient = ctx.createRadialGradient(x, y, radius * 0.1, x, y, radius);
    gradient.addColorStop(0, "lightblue"); // Highlight color
    gradient.addColorStop(1, "blue"); // Main color
    ctx.fillStyle = gradient;
    ctx.fill();
  
    // Draw crown
    const crownHeight = radius * 0.7; // Height of the crown
    const crownWidth = radius * 1.2; // Width of the crown
    const crownX = x - crownWidth / 2; // Top-left x of crown
    const crownY = y - crownHeight / 2; // Top of the circle to place crown
  
    ctx.beginPath();
    ctx.moveTo(crownX, crownY + crownHeight); // Bottom left of crown
    ctx.lineTo(crownX + crownWidth * 0.2, crownY); // First peak
    ctx.lineTo(crownX + crownWidth * 0.4, crownY + crownHeight * 0.5); // First valley
    ctx.lineTo(crownX + crownWidth * 0.6, crownY); // Second peak
    ctx.lineTo(crownX + crownWidth * 0.8, crownY + crownHeight * 0.5); // Second valley
    ctx.lineTo(crownX + crownWidth, crownY); // Third peak
    ctx.lineTo(crownX + crownWidth, crownY + crownHeight); // Bottom right of crown
    ctx.closePath();
  
    // Fill crown with golden gradient
    const crownGradient = ctx.createLinearGradient(
      crownX,
      crownY,
      crownX,
      crownY + crownHeight
    );
    crownGradient.addColorStop(0, "gold");
    crownGradient.addColorStop(1, "darkgoldenrod");
    ctx.fillStyle = crownGradient;
    ctx.fill();
  
    // Add crown border
    ctx.lineWidth = 2;
    ctx.strokeStyle = "brown";
    ctx.stroke();
  }

function drawBlueBack(row, col) {
  const x = col * gridSize + gridSize / 2;
  const y = row * gridSize + gridSize / 2;
  const outerRadius = gridSize / 3; // Outer circle radius
  const innerRadius = gridSize / 3; // Inner circle radius

  // Draw shadow
  ctx.beginPath();
  ctx.arc(x + 5, y + 5, outerRadius, 0, Math.PI * 2); // Offset for shadow
  ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
  ctx.fill();

  // Draw outer circle with gradient
  const outerGradient = ctx.createRadialGradient(x, y, outerRadius * 0.1, x, y, outerRadius);
  outerGradient.addColorStop(0, "#d1d1d1"); // Light gray
  outerGradient.addColorStop(1, "#6e6e6e"); // Dark gray

  ctx.beginPath();
  ctx.arc(x, y, outerRadius, 0, Math.PI * 2);
  ctx.fillStyle = outerGradient;
  ctx.fill();

  // Draw inner circle with gradient
  const innerGradient = ctx.createRadialGradient(x, y, innerRadius * 0.1, x, y, innerRadius);
  innerGradient.addColorStop(0, "#ffffff"); // White (highlight)
  innerGradient.addColorStop(1, "#a1a1a1"); // Medium gray

  ctx.beginPath();
  ctx.arc(x, y, innerRadius, 0, Math.PI * 2);
  ctx.fillStyle = innerGradient;
  ctx.fill();

  // Add border (optional)
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#4d4d4d"; // Darker gray for the border
  ctx.stroke();
}

function drawWhiteBack(row, col, pieceSize) {
    ctx.drawImage(
      imgWhite,
      col - pieceSize / 2,
      row - pieceSize / 2,
      pieceSize,
      pieceSize
    );
  }
  
  function drawRedBack(row, col, pieceSize) {
    ctx.drawImage(
      imgBlack,
      col - pieceSize / 2,
      row - pieceSize / 2,
      pieceSize,
      pieceSize
    );
  }