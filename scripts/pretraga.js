let pretrazi=document.getElementById('Pretrazi');
pretrazi.addEventListener('click',pretraga);

let nazivProiz=document.getElementById('Naziv');
let brend=document.getElementById('Brend');
let cena=document.getElementById('Cena');
let kategorija=document.getElementById('Kategorija');
let listaProiz=document.getElementById('ListaProizvoda');

let listaKorpa=document.getElementById('ListaProizKorpa');

let ddlCena=document.getElementById('Cena');

let niz=[];

//-----------ucitavanje stranice kad se unese url------------------------------------
let kategorijaURLceo=window.location.search;
console.log(kategorijaURLceo);
if(kategorijaURLceo!=""){
    let kategorijaURL = kategorijaURLceo.split("?")[1].split("=")[1];
    niz=podaci.filter((proizvod)=>{
        if (proizvod['kategorija'].toUpperCase().includes(kategorijaURL.toUpperCase())) {
            return true;
        }
        else {
            return false;
        }
    })    
    prikaziProizvode(niz);
    sortiranje();
    }
else{
    pretraga();
}


//--------------pretraga -------------------------------------------------------------------------

function pretraga(event){

    niz=podaci.filter(function (proizvod){
        if((proizvod.naziv.toUpperCase().includes(nazivProiz.value.toUpperCase()))){
            return true;
           }
           else{
               return false;
           }
});
    prikaziProizvode(niz);
    sortiranje();

}

//--------prikaz(kreiranje) proizvoda-----------------------------------------------------

function prikaziProizvode(niz){
    listaProiz.innerHTML='';
    for(i=0; i < niz.length; i++){
        let jedanProizvod=document.createElement('div');
        jedanProizvod.classList.add('Proizvod');

        //slika
        let divSlika=document.createElement('div');
        divSlika.classList.add('Slika');
        let slika=document.createElement('img');
        slika.classList.add('SlikaProizvoda');
        slika.src=niz[i]["slika"];
        divSlika.appendChild(slika);
        jedanProizvod.appendChild(divSlika);

        //srednji deo
        let naslovCenaProiz=document.createElement('div');
        naslovCenaProiz.classList.add('SrednjiDeo');
        
        //naslov
        let naslovProiz=document.createElement('div');
        naslovProiz.classList.add('Naslov');
        let naslovh=document.createElement('h3');
        naslovh.textContent=niz[i]['naziv'];
        naslovProiz.appendChild(naslovh);
        naslovCenaProiz.appendChild(naslovProiz);
        
        //cena
        let divCena=document.createElement('div');
        divCena.classList.add('Cena');
        let pasusCena=document.createElement('p');
        pasusCena.textContent="Cena: " + niz[i]["cena"] + " dinara";
        divCena.appendChild(pasusCena);
        naslovCenaProiz.appendChild(divCena);
        jedanProizvod.appendChild(naslovCenaProiz);

        //dugme
        let divDugme=document.createElement('div');
        divDugme.classList.add('dugmeKorpa');
        let dugmeDodaj=document.createElement('button');
        dugmeDodaj.classList.add('btnDodajUKorpu');
        dugmeDodaj.textContent="Dodaj u korpu";
        divDugme.appendChild(dugmeDodaj);
        jedanProizvod.appendChild(divDugme);

        //poslednji div
        let poslednjiDiv=document.createElement('div');
        let pasusProcitaj=document.createElement('p');
        pasusProcitaj.classList.add('ProcitajVise');
        pasusProcitaj.classList.add('SakrijOpis');
        pasusProcitaj.textContent="Pročitaj više";
        poslednjiDiv.appendChild(pasusProcitaj);
        let divOpis=document.createElement('div');
        divOpis.classList.add('Opis');
        let pasusOpis=document.createElement('p');
        pasusOpis.textContent=niz[i]['opis'];
        divOpis.appendChild(pasusOpis);
        poslednjiDiv.appendChild(divOpis);
        jedanProizvod.appendChild(poslednjiDiv);
        listaProiz.appendChild(jedanProizvod);

        dugmeDodaj.addEventListener('click',dodavanjeUKorpu);
        
        //za dodatno otvaranje opisa
        pasusProcitaj.addEventListener("click", (event)=>{
            if(pasusProcitaj.classList.contains('SakrijOpis')){
                pasusProcitaj.innerText='Pročitaj manje';
                pasusProcitaj.classList.remove('SakrijOpis');
            }
            else if(!pasusProcitaj.classList.contains('SakrijOpis')){
                pasusProcitaj.innerText='Pročitaj više';
                pasusProcitaj.classList.add('SakrijOpis');
            }
        });
    }
}



//------------------sortiraj po ceni------------------------------------------------------

ddlCena.addEventListener('change',sortiranje);

function sortiranje() {
    if(ddlCena.value==='Rastuce'){
        niz.sort((proizvod1,proizvod2)=>{
            if (proizvod1.cena > proizvod2.cena) { 
                return 1; 
                } else if (proizvod1.cena < proizvod2.cena) { 
                return -1; 
                } else { 
                return 0; 
                } 
        })
    }
    else if(ddlCena.value==='Opadajuce'){
        niz.sort((proizvod1,proizvod2)=>{
            if (proizvod1.cena < proizvod2.cena) { 
                return 1; 
                } else if (proizvod1.cena > proizvod2.cena) { 
                return -1; 
                } else { 
                return 0; 
                } 
        })
    }
    prikaziProizvode(niz);
}


//--------------------pregledaj korpu------------------------------------------------------------

let vrednostKorpe=document.getElementById('VrednostKorpe');
let kolicinaKorpe=document.getElementById('KolicinaKorpe');
let buttonKorpa=document.getElementById('PregledajKorpu');
let brojProizvodaUKorpi=0;
let vrednostKorpeDin=0;



buttonKorpa.addEventListener('click',()=>{
    document.getElementById('kontejnerKorpa').classList.remove('Sakriveno');
        vrednostKorpe.innerText='Vrednost korpe: ' + vrednostKorpeDin + ' din';
        kolicinaKorpe.innerText='Količina proizvoda: ' + brojProizvodaUKorpi;
});


//-------------zatvori korpu-----------------------------------------------------------------------

let zatvoriKorpu=document.getElementById('ZatvoriKorpu');
zatvoriKorpu.addEventListener('click',()=>{
    document.getElementById('kontejnerKorpa').classList.add('Sakriveno');
})



//----------------dodaj proizvod u korpu----------------------------------------------------------


prikaziDugmeUKorpi();
let pasusBrojProizKorpa=document.getElementById('BrojProizKorpa');

function dodavanjeUKorpu(element){
    brojProizvodaUKorpi++;
    let naslovTargeta=element.target.parentElement.parentElement.children[1].children[0].textContent;

    let proizvodIzBaze=podaci.filter((proizvod)=>{
        return(proizvod.naziv.toUpperCase()===naslovTargeta.toUpperCase())
    })

    kreiranjeNovogProizKorpa(proizvodIzBaze);

    function kreiranjeNovogProizKorpa(proizvodIzBaze){
        let jedanProizKorpa=document.createElement('div');
        jedanProizKorpa.classList.add('ProizvodiUKorpi');
        
        //slika
        let slikaKorpa=document.createElement('img');
        slikaKorpa.src=proizvodIzBaze[0]['slika'];
        jedanProizKorpa.appendChild(slikaKorpa);
        
        //naziv proizvoda u korpi
        let nazivPrKorpa=document.createElement('div');
        nazivPrKorpa.classList.add('NazivProizKorpa');
        let pasusNazivPrKorpa=document.createElement('p');
        pasusNazivPrKorpa.textContent=proizvodIzBaze[0]['naziv'];
        nazivPrKorpa.appendChild(pasusNazivPrKorpa);
        jedanProizKorpa.appendChild(nazivPrKorpa);
        
        //cena korpa
        let divCenaKorpa=document.createElement('div');
        divCenaKorpa.classList.add('CenaProizKorpa');
        let pasusCenaKorpa=document.createElement('p');
        pasusCenaKorpa.innerText='Cena: ';
        let spanCenaKorpa=document.createElement('span');
        spanCenaKorpa.innerText=proizvodIzBaze[0]['cena'];
        pasusCenaKorpa.appendChild(spanCenaKorpa);
        divCenaKorpa.appendChild(pasusCenaKorpa);
        jedanProizKorpa.appendChild(divCenaKorpa);
        
        //kolicina korpa
        let divKolKorpa=document.createElement('div');
        divKolKorpa.classList.add('KolicinaProizKorpa');
        let pasusKolKorpa=document.createElement('p');
        pasusKolKorpa.innerText="Količina: 1";
        divKolKorpa.appendChild(pasusKolKorpa);
        jedanProizKorpa.appendChild(divKolKorpa);
        
        //dugme
        let dugmeIzbaciKorpa=document.createElement('button');
        dugmeIzbaciKorpa.classList.add('IzbaciKorpa');
        dugmeIzbaciKorpa.textContent="Izbaci proizvod";
        jedanProizKorpa.appendChild(dugmeIzbaciKorpa);
        
        //u listu
        listaKorpa.appendChild(jedanProizKorpa);

        vrednostKorpeDin+=proizvodIzBaze[0]['cena'];
        prikaziDugmeUKorpi();
        upisVrednostiKolicineLS();

        //-----------------------------------------brisanje iz korpe--------------------------
        dugmeIzbaciKorpa.addEventListener('click',()=>{
            let stavkaZaBrisanje=dugmeIzbaciKorpa.parentElement;
            brojProizvodaUKorpi--;
            vrednostKorpeDin-=parseFloat(stavkaZaBrisanje.children[2].children[0].children[0].textContent);
            vrednostKorpe.innerText='Vrednost korpe: ' + vrednostKorpeDin + ' din';
            kolicinaKorpe.textContent='Količina proizvoda: ' + brojProizvodaUKorpi;
            pasusBrojProizKorpa.textContent="Broj proizvoda: " + brojProizvodaUKorpi;
            stavkaZaBrisanje.parentElement.removeChild(stavkaZaBrisanje);
            prikaziDugmeUKorpi();
            upisVrednostiKolicineLS();
        })
    }
    pasusBrojProizKorpa.textContent="Broj proizvoda: " + brojProizvodaUKorpi;        

}


//-korpa dugme------------------------------------------------------------------------------
function prikaziDugmeUKorpi(){
    if(brojProizvodaUKorpi===0){
        document.getElementById('DugmePoruci').classList.add('Sakriveno');
    }
    else{
        document.getElementById('DugmePoruci').classList.remove('Sakriveno');
    }
}


//kategorije------------------------------------------------------------------------
let filtriraneKategorije=document.getElementById('Kategorija');
filtriraneKategorije.addEventListener('change',prikaziKategoriju);

function prikaziKategoriju(){
    let izabranaKategorija=filtriraneKategorije.value;
    let postavkaQuery = new URLSearchParams(location.search);
    postavkaQuery.set('kategorija', izabranaKategorija);
    let noviURL = window.location.pathname + '?' + postavkaQuery.toString();
    history.pushState(null, '', noviURL);

    niz=podaci.filter((proizvod)=>{
        let kategorijaQuery = window.location.search;
        let kategorijaQueryIzdvojena = kategorijaQuery.split("?")[1].split("=")[1];
        if (proizvod['kategorija'].toUpperCase().includes(kategorijaQueryIzdvojena.toUpperCase())) {
            return true;
        }
        else {
            return false;
        }
    })
    
    prikaziProizvode(niz);
    sortiranje();
    
}



//-----------upisi u local storage--------------------------------------
function upisVrednostiKolicineLS(){
    localStorage.setItem('vrednostKorpe',vrednostKorpeDin);
    localStorage.setItem('kolicinaKorpe',brojProizvodaUKorpi);
}