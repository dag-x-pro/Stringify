const canvas = document.getElementById('artCanvas');
const ctx = canvas.getContext('2d');
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const mdfColorPicker = document.getElementById('mdfColorPicker');
const cableColorPicker = document.getElementById('cableColorPicker');
const nailsColorPicker = document.getElementById('nailsColorPicker');
const cableThickness = document.getElementById('cableThickness');
const saveBtn = document.getElementById('saveBtn');
const generateBtn = document.getElementById('generateBtn');
const resetBtn = document.getElementById('resetBtn');
const toggleSidebar = document.getElementById('toggleSidebar');
const sidebar = document.getElementById('sidebar');

let nails = [];
let selectedNails = [];

// Function to set MDF background color
function setMDFBackground() {
    ctx.fillStyle = mdfColorPicker.value;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
setMDFBackground();

// Add event listeners to canvas for nail placement and string art generation
canvas.addEventListener('click', placeNail);

// Toggle Sidebar
toggleSidebar.addEventListener('click', () => {
    sidebar.classList.toggle('show');
});

// Place nails when clicking on the MDF (canvas)
function placeNail(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    nails.push({ x, y });
    drawNail(x, y);
}

// Draw nails on the canvas
function drawNail(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = nailsColorPicker.value;
    ctx.fill();
    ctx.closePath();
}

// Generate string art based on nails clicked
generateBtn.addEventListener('click', () => {
    setMDFBackground();
    nails.forEach(nail => drawNail(nail.x, nail.y)); // Redraw nails

    if (nails.length < 2) return; // Need at least 2 nails to create string art

    ctx.strokeStyle = cableColorPicker.value;
    ctx.lineWidth = cableThickness.value;

    ctx.beginPath();
    ctx.moveTo(nails[0].x, nails[0].y); // Start at the first nail

    // Connect the nails with cables
    for (let i = 1; i < nails.length; i++) {
        ctx.lineTo(nails[i].x, nails[i].y);
    }

    ctx.stroke();
    ctx.closePath();
});

// Reset the canvas and clear all nails
resetBtn.addEventListener('click', () => {
    setMDFBackground();
    nails = []; // Clear nails array
    selectedNails = [];
});

// Save canvas as PNG
saveBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'string-art.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});
