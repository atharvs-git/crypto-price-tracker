async function sendCryptoData() {
    let userInput = document.getElementById("cryptoInput").value
    .trim()
    .toLowerCase()
    if (!userInput) {
        document.getElementById("cryptoResult").innerHTML =
            "Please enter a cryptocurrency name"
        return
    }
    try {
        let response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&ids=${userInput}`)
        let data = await response.json()
         
    if (data.length > 0){
        document.getElementById("cryptoResult").innerHTML = "Loading..."
        let changeColor = data[0].price_change_percentage_24h > 0
        ? "green"
        : "red"
        document.getElementById("cryptoResult").innerHTML = `
        <div class = "card">
            <img src="${data[0].image}" alt="${data[0].name} logo" class="crypto-logo">
            <p>Name: ${data[0].name}</p>
            <p>Symbol: ${data[0].symbol.toUpperCase()}</p>
            <p>Current Price: $${data[0].current_price}</p>
            <p>Market Cap: $${data[0].market_cap.toLocaleString()}</p>
            <p>Market Cap Rank: ${data[0].market_cap_rank}</p>
            <p>Market Cap Change: $${data[0].market_cap_change_24h}</p>
            <p>24h Price Change: $${data[0].price_change_24h}</p>
            <p>24h Change: <span style="color: ${changeColor}">${data[0].price_change_percentage_24h}%</span></p>
        </div>
        `
    }else{
        document.getElementById("cryptoResult").innerHTML = "cryptocurrency not found"
    }
    } catch (error) {
        document.getElementById("cryptoResult").innerHTML ="Failed to fetch data"
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        sendCryptoData()
    }
})
setInterval(() => {
   let value = document.getElementById("cryptoInput").value.trim()

   if(value){
      sendCryptoData()
   }
}, 30000)
    