const xValues = ['lvl1:testa','lvl1:testb','lvl2:testa','lvl2:testb'];
const yValues = [14,16,5,12];
const ctx3 = document.getElementById('linechart').getContext('2d');
const linechart = new Chart(ctx3, {
    type: "line",
    data: {
      labels: xValues,
      datasets: [{
        label: 'Response time',
        backgroundColor:"rgba(241, 184, 193, 1.0)",
        borderColor: "rgba(241, 184, 193, 0.1)",
        data: yValues
      }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});