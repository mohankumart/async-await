// usd cad 23
// 23 usd is worth 28 cad. you can these in the following countries


const axios = require('axios')

const getExchangeRate =async (from, to)=>{
    try {
        let response = await axios.get(`http://api.fixer.io/latest?base=${from}`)
        return response.data.rates[to]
    }catch(err){
        throw new Error(`Invalid ${from}`)
    }
    
}

getExchangeRate('USdD','INR').then((rate)=>{
    console.log(rate)
}).catch((err)=>{
    console.log(err.message)
})


const getCountries = (currencyCode) => {
    return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response)=>{
        return response.data.map((country) => country.name)
    })
}

const convertCurrency = (from, to, amount) => {
    var countries
    return getCountries(to).then((tempCountries)=>{
        countries = tempCountries
        return getExchangeRate(from, to)
    }).then((rate)=>{
        const exchangedAmount = amount * rate;
        return `${amount} ${from} is worth ${exchangedAmount} ${to}. This currency accepted in the countries ${countries.join(',')}`
    })
}

const convertCurrencyAlt = async (from, to, amount) => {
    var countries = await getCountries(to)
    var rate = await getExchangeRate(from, to)

    const exchangedAmount = amount * rate;
    return `${amount} ${from} is worth ${exchangedAmount} ${to}. This currency accepted in the countries ${countries.join(',')}`
}

// convertCurrencyAlt('USD','INR', 1).then((res)=>{
//     console.log(res)
// })

// getCountries('inr').then((countreis)=>{
//     console.log(countreis)
// })

// getExchangeRate('USD', 'CAD').then((rate)=>{
//     console.log(rate)
// })