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
var vel = 0;

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

    var rangoH = 0;
    var bacTiempo = [];
    var bacTiempoCustom = [];
    var conteoBac = 0;
    var equilibrio = 1;
    var divHora = 4;
    var contadorSi = 1;
    var val = 0;
    var anterior = 0;

    initCanvas();
        //N=N0*(e(u(t-t0)))
    N0 = document.getElementById("bacInitNumber").value
    tazaCrecimiento = document.getElementById("tc").value/100 //%
    t0 = document.getElementById("timeI").value
    tf = document.getElementById("timeF").value //Horas
    vel = Number(document.getElementById("velocidad").value);
    rangoH = tf-t0;

    N = Math.round(N0*Math.pow(Math.E,tazaCrecimiento*(tf-t0)));

    for (let ii = 0; ii<rangoH; ii++) {
        N = Math.round(N0*Math.pow(Math.E,tazaCrecimiento*(ii)));
        bacTiempo.push(N);
        /* for (let k = 0; k<3; k++) {
            //bacTiempoCustom.push(Math.round(N/3));
            if(bacTiempo.length===1) {
                //val = (list[f]/n)*k;
                val = (N/divHora)*equilibrio
                } else {
                //v=f-1
                anterior = bacTiempo.length-1;
                //val = list[v] + ((list[f]-list[v])/n)*k;
                val = bacTiempo[anterior] + ((N-bacTiempo[anterior])/divHora)*equilibrio
             }

            //val = (N/divHora)*equilibrio
            equilibrio = equilibrio*2;
            bacTiempoCustom.push(val);
            if (contadorSi==3) {
        
                contadorSi=0;
                equilibrio=1;
            }
             contadorSi=contadorSi + 1;

        } */
    }
    //document.getElementById('simon').innerHTML += bacTiempo;

    if(N%2==0){
    }else{N-=1}
    
    //document.getElementById("N").innerHTML=N

    // Crear Puntos de forma Aleatoria
    ctx.fillStyle = '#69A644';//Color de Puntos

    for (let x = 0; x < bacTiempo.length; x++) {
    setTimeout(function(y) {   
        N = bacTiempo[y] - conteoBac;
        conteoBac += N;
        //document.getElementById('simon').innerHTML += " ciclo: " +y+" N: "+ N + "- conteo: "+ conteoBac;
        document.getElementById("N").innerHTML=conteoBac;
        //document.getElementById('simon').innerHTML += bacTiempoCustom;
        /* for (let z = 0; z < 3; z++) { */
            while (N) {
                var pt_angle = Math.random() * 2 * Math.PI;
                var pt_radius_sq = Math.random() * radius * radius;
                var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
                var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
                ctx.fillRect(pt_x + canvas.width / 2, pt_y + canvas.width / 2, 2, 2);
                N--;
            }
       /*  } */
        
    }, x * vel, x); 
    }

    /* while (N) {
        var pt_angle = Math.random() * 2 * Math.PI;
        var pt_radius_sq = Math.random() * radius * radius;
        var pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
        var pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
        ctx.fillRect(pt_x + canvas.width / 2, pt_y + canvas.width / 2, 2, 2);
        N--;
    } */
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
            <td><button class="btn btn-danger" id="${element._id}" onclick="remove(this);">Eliminar</button></td>
        </tr>`
    });
    
})

exports.dbDelete=(id)=>{
    ipcRenderer.send('deleteData',id);
}

ipcRenderer.on('deleteOk',(e,args)=>{
    this.dbGET();
})
//deleteOk