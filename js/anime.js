'use strict';

const $select = document.getElementById("seleccionar"),$contImg = document.getElementsByClassName("contenedorImg")[0],$btnOtra = document.getElementById("otra"),$alerta = document.getElementById("alerta"),$cargando = document.getElementById("cargando"),$selecciona = document.getElementById("seleccion");

$select.addEventListener("change",()=>{
    getImage($select.value);
});

$select.value = "escoger";

const getImage = async (category) => {
    try
    {
        if(category === 'escoger'){
            $select.value = $btnOtra.getAttribute("href");
            throw{type:'Selecciona una Opci&oacute;n.'}
        }
        $selecciona.classList.remove("seleccion");
        $cargando.classList.remove("esconder");
        if($contImg.firstElementChild.id === "cont") $contImg.removeChild($contImg.firstElementChild);
        const resultados = await fetch(`https://api.waifu.pics/sfw/${category}`);
        const image = await resultados.json();
        const img = document.createElement("img"), div = document.createElement("div");
        div.setAttribute("id","cont");
        img.setAttribute("src",image.url);
        img.setAttribute("alt",category);
        img.setAttribute("class","contener");
        div.appendChild(img);
        const fragmento = document.createDocumentFragment();
        fragmento.appendChild(div);
        $contImg.insertBefore(fragmento,$btnOtra);
        $btnOtra.setAttribute("href",category);
        $btnOtra.classList.remove("esconder");
        $cargando.classList.add("esconder");
    }
    catch(error){
        alerta.innerHTML = `<p>${error.type}</p>`;
        alerta.classList.add("alerta");
        setTimeout(()=>{alerta.classList.remove("alerta")},2000);
    }
}

$btnOtra.addEventListener("click",(e)=>{
    e.preventDefault();
    $contImg.removeChild($contImg.firstElementChild);
    $btnOtra.classList.add("esconder");
    let $url = $btnOtra.getAttribute("href");
    $cargando.classList.remove("esconder");
    getImage($url);
});
