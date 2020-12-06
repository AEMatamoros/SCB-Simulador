
const graficar = () => {

    //var datos = require('../js/datosEntrada');
    var ctx = document.getElementById('myChart').getContext('2d');
    //console.log(`probando cc: ${datos.datosEntrada()}`);

    var N0 = localStorage.getItem("N0");
    var tazaCrecimiento = localStorage.getItem("tazaCrecimiento");
    var t0 = localStorage.getItem("t0");
    var tf = localStorage.getItem("tf"); 
    var dif = tf-t0;  
    var hora = [];
    var data = [];

    data.push(N0);
    for (let i=1; i <=dif; i++) {
        hora.push("Hora "+i);
        N = Math.round(N0*Math.pow(Math.E,tazaCrecimiento*(i)));
        data.push(N);
       
    }
    console.log("resultado horas: ", hora, data);

    N = Math.round(N0*Math.pow(Math.E,tazaCrecimiento*(tf-t0)));
    console.log('N0', N0, N);

    var chart = new Chart(ctx, {

    // The type of chart we want to create
    type: 'line',

    // The data for our dataset
    data: {
        labels: hora,
        datasets: [{
            label: 'Crecimiento Bacteriano',
            backgroundColor: 'rgb(50,205,50)',
            borderColor: 'rgb(34,139,34)',
            data: data
        }]
    },

    // Configuration options go here
    options: {}
});

return "grafica lista";
};


exports.graficar = graficar;
    