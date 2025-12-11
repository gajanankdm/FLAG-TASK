const cl = console.log;

const countryRows= document.getElementById("countryRows");




//https://restcountries.com/v3.1/all?fields=name,cca2,flags,region

const BASE_URL=`https://restcountries.com/v3.1/all`;

async function fetchalldata(){
    try{
let COUNTRY_URL = `${BASE_URL}/?fields=name,cca2,flags,region`
//?

let res = await fetch(COUNTRY_URL,{
    method:"GET",
    body:null
})

let data = await res.json()


if(!res.ok){
    throw new Error("something went wrong!!!")
}

data.map(c=>{
    const col= document.createElement('div');
    col.className=`col-12 col-sm-6 col-lg-3 col-md-4 mb-3 d-flex`;
    col.innerHTML=` 
    
    <div 
    class="card countryCard shadow-sm "
         style="width: 18rem;"
         role="button"
         aria-label="country card: Antigua and Barbuda"
         data-code="${c.cca2}"
         >
  <img 
  src="${c.flags.png}" 
  class="card-img-top"
   alt="${c.flags.alt}"
    title="${c.flags.alt}">
  <div class="card-body">
    <h5 class="card-title mb-1">${c.name.common ||c.nmae.official }</h5>
      <p class="card-text text-muted mb-0"><small>Code: <strong>${c.cca2}</strong></small></p>
  </div>
</div>`



col.addEventListener("click", () => {
    window.location.href=`country.html?code=${c.cca2}&test=testQueryPArams`


})

countryRows.append(col)



})

 }catch(err){
        cl(`something went wrong!!`)

    }

}

fetchalldata()

