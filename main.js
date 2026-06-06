const myHabits = [
    "Despertarse pronto (8am) ⏰",
    "Gimnasio 💪",
    "No sobrepensar 🚫",
    "Aprender 📚",
    "Seguimiento presupuesto 💰",
    "Trabajo en el proyecto 🚀",
    "Pensar las cosas 🧘",
    "Diario de objetivos 📒",
    "Dormir temprano (12pm) 🌙"
];

let dataStore = JSON.parse(localStorage.getItem('mindform_vfinal')) || {};

function renderUI() {
    const tableBody = document.getElementById('habits-body');
    const analysis = document.getElementById('analysis-list');
    tableBody.innerHTML = '';
    analysis.innerHTML = '';

    let globalCount = 0;

    myHabits.forEach(habit => {
        let habitCount = 0;
        const row = document.createElement('div');
        row.className = 'habit-row';
        row.innerHTML = `<div class="habit-name">${habit}</div>`;
        
        for (let day = 0; day < 7; day++) {
            const id = `${habit}-${day}`;
            const isChecked = dataStore[id] ? 'checked' : '';
            if(dataStore[id]) { habitCount++; globalCount++; }
            row.innerHTML += `<input type="checkbox" class="cell-check" id="${id}" ${isChecked} onchange="update('${id}')">`;
        }
        tableBody.appendChild(row);

        // Actualizar barra de análisis
        const pct = Math.round((habitCount / 7) * 100);
        analysis.innerHTML += `
            <div class="habit-stat-item">
                <div style="display:flex; justify-content:space-between">
                    <span>${habit.split(' ')[0]}</span><span>${pct}%</span>
                </div>
                <div class="bar-bg"><div class="bar-fill" style="width:${pct}%"></div></div>
            </div>`;
    });

    const totalPct = Math.round((globalCount / (myHabits.length * 7)) * 100);
    document.getElementById('main-percent').innerText = totalPct + '%';
    drawChart(globalCount);
}

window.update = (id) => {
    dataStore[id] = document.getElementById(id).checked;
    localStorage.setItem('mindform_vfinal', JSON.stringify(dataStore));
    renderUI();
};

let chartInstance;
function drawChart(val) {
    const ctx = document.getElementById('habitChart').getContext('2d');
    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['PROGRESO'],
            datasets: [{
                data: [val],
                backgroundColor: '#d72638',
                borderColor: '#000',
                borderWidth: 2
            }]
        },
        options: { 
            scales: { y: { beginAtZero: true, max: myHabits.length * 7 } },
            plugins: { legend: { display: false } }
        }
    });
}

renderUI();
