
function obtenerDatos() {
    //document.getElementById("timeF").style.backgroundColor="red";
    
    N0 = document.getElementById("bacInitNumber").value;
    tazaCrecimiento = document.getElementById("tc").value/100; //%
    t0 = document.getElementById("timeI").value;
    tf = document.getElementById("timeF").value; //Horas

    localStorage.setItem("N0", N0);
    localStorage.setItem("tazaCrecimiento", tazaCrecimiento);
    localStorage.setItem("t0", t0);
    localStorage.setItem("tf", tf);
}


