const cl = console.log;

const params = new URLSearchParams(window.location.search)
cl(params)

const CODE = params.get('code')
cl(CODE)

const APL_URL = `https://restcountries.com/v3.1/alpha/${CODE}`


async function loadCountry() {
    try {
        let res = await fetch(APL_URL,)
        let data = await res.json()
        if (!res.ok) {
            throw new Error("something went wrong!!!")
        }
        // let curr=Object.values(data[0].currencies)
        // cl(curr)
        document.getElementById('flagImg').src = data[0].flags.png

        document.getElementById('officialName').innerText = data[0].name.common;
        document.getElementById('capital').innerText = data[0].capital?.[0];
        document.getElementById('region').innerText = data[0].region;
        document.getElementById('subregion').innerText = data[0].subregion;
        document.getElementById('population').innerText = data[0].population;
        document.getElementById('area').innerText = data[0].area;
        document.getElementById('languages').innerText = Object.values(data[0].languages || {}.join(","));
        document.getElementById('currencies').innerText = Object.values(data[0].currencies)
            .map(cur => {
                return `${cur.name} ${cur.symbol}`
            })
            .join(', ')
        document.getElementById("mapLink").href = data[0].maps.gooleMaps;

        // if (data[0].borders) {
        //     document.getElementById('borders') = (data[0].borders || [])
        //         .map(c => {
        //             return `<a href="country.html?code=${c}" class="btn btn-link">${c}</a>`;
        //         })
        //         .join(" ");
        // } else {
        //     document.getElementById('borders').innerHTML = `<strong class="text-info">No Border</strong>`
        // }
        let countryBordersLink = (data[0].borders || []).map(c => {
            return `<a href="country.html?code=${c}" class="btn btn-link">${c}</a>`;
        });

        document.getElementById('borders').innerHTML = countryBordersLink.join(",")||`<strong class="text-info">No Border</strong>`


    } catch (err) {
        cl(err)
    }


}
loadCountry()