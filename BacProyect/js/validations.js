console.log("validate")
exports.validate=()=>{
    bacInitNumber=document.getElementById('bacInitNumber').value
    tc=document.getElementById('tc').value
    timeI=document.getElementById('timeI').value
    timeF=document.getElementById('timeF').value
    
    if (bacInitNumber=="" || tc==""|| timeI=="" || timeF==""){
        alert("Debe llenar todos los campos");
        erase();
        return false
    }else if (timeI>timeF){
        alert("El tiempo Inicial no puede ser mayor al tiempo final");
        erase();
        return false;
    }else if(timeF>500){
        alert("El simulador tiene un limite de 500 horas para el tiempo final");
        erase();
        return false;
    }else if(typeof(bacInitNumber)!="number" || typeof(tc)!="number"|| typeof(timeF)!="number" || typeof(timeI)!="number"){
        alert("Los valores ingresados deben ser valores numericos");
        erase();
        return false;
    }else{
        return true;
    }

    function erase(){
        bacInitNumber=document.getElementById('bacInitNumber').value=""
        tc=document.getElementById('tc').value=""
        timeI=document.getElementById('timeI').value=""
        timeF=document.getElementById('timeF').value=""
    }
}