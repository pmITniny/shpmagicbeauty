popunjavanjeSpanova();

function popunjavanjeSpanova(){
    document.getElementById('BrojProizvodaSpan').textContent=localStorage.getItem('kolicinaKorpe');
    document.getElementById('VrednostKorpeSpan').textContent=localStorage.getItem('vrednostKorpe');
}

let dugmePoruciKorpa=document.getElementById('PoruciKorpa');
dugmePoruciKorpa.addEventListener('click',proveraPorucivanje);

let imePrezime=document.getElementById('ImePrezime');
let adresa=document.getElementById('Adresa');
let grad=document.getElementById('Grad');
let telefon=document.getElementById('Telefon');
let poruka=document.getElementById('Poruka');
let divPodaci=document.getElementById('Podaci');

function proveraPorucivanje(){
    if(imePrezime.value!="" && adresa.value!="" && grad.value!="" && telefon.value!=""){
        poruka.innerText="Uspešno ste poručili!";
        divPodaci.classList.remove('CrveniOkvir');
        isprazniPolja();
    }
    else{
        poruka.innerText="Niste popunili sve podatke!";
        divPodaci.classList.add('CrveniOkvir');
    }
}

function isprazniPolja(){
    imePrezime.value="";
    adresa.value="";
    grad.value="";
    telefon.value="";
    document.getElementById('BrojProizvodaSpan').textContent=0;
    document.getElementById('VrednostKorpeSpan').textContent=0;
}