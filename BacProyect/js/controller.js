//Controlador de Datos
//Controlador de DB
var {ipcRenderer} = require('electron');
//Init Canvas
var canvas = document.getElementById("thecanvas");
var ctx = canvas.getContext('2d'),
    cx = 150,
    cy = 150,
    radius = 150;

//Init vars
var N = 0
var N0 = 0
var tazaCrecimiento = 0
var t0 = 0
var tf = 0

function initCanvas(){

    ctx.fillStyle = '#ebf1f4';//Color de fondo
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';//Color Circunferencia

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.closePath();

    ctx.fill();
}

initCanvas();
//Calcular crecimiento de la muestra
exports.calculeExample = ()=>{
    initCanvas();
        //N=N0*(e(u(t-t0)))
    N0 = document.getElementById("bacInitNumber").value
    tazaCrecimiento = document.getElementById("tc").value/100 //%
    t0 = document.getElementById("timeI").value
    tf = document.getElementById("timeF").value //Horas

    N = Math.round(N0*Math.pow(Math.E,tazaCrecimiento*(tf-t0)));

    if(N%2==0){
    }else{N-=1}
    
    document.getElementById("N").innerHTML=N

    // Crear Puntos de forma Aleatoria
    ctx.fillStyle = '#69A644';//Color de Puntos

    while (N) {
        var pt_angle = Math.random() * 2 * Math.PI;
        var pt_radius_sq = Math.random() * radius * radius;
        var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
        var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
        ctx.fillRect(pt_x + canvas.width / 2, pt_y + canvas.width / 2, 2, 2);
        N--;
    }
}



exports.dbPOST = () =>{
    N0 = document.getElementById("bacInitNumber").value
    tazaCrecimiento = document.getElementById("tc").value/100 //%
    t0 = document.getElementById("timeI").value
    tf = document.getElementById("timeF").value //Horas

    N = Math.round(N0*Math.pow(Math.E,tazaCrecimiento*(tf-t0)));

    if(N%2==0){
    }else{N-=1}

    processData={
        N0 : N0,
        tc : tazaCrecimiento ,
        t0 : t0,
        tf : tf ,
        N : N,
    }
    ipcRenderer.send('postData',processData);

    
}

exports.dbGET = ()=>{
    ipcRenderer.send('getData');
}

ipcRenderer.on('postDataOk',(e,args)=>{
    console.log('Calculo Correcto');
})

ipcRenderer.on('getDataOk',(e,args)=>{
    elements=JSON.parse(args);
    //Oder By date
    function comp(a, b) {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    
    elements.sort(comp);


    document.getElementById('data').innerHTML =''
    let count=0
    elements.forEach(element => {
        count++
        console.log(element)
    document.getElementById('data').innerHTML +=`
        <tr>
            <th scope="row">${count}</th>
            <td>${element.N0}</td>
            <td>${element.t0}</td>
            <td>${element.tf}</td>
            <td>${element.tc}</td>
            <td>${element.N}</td>
            <td>${element.date.substring(0 , 10)}</td>
        </tr>`
    });
    
})