feather.replace();

const amountInput = document.getElementById("amount");
const fromCurrency = document.getElementById("from-currency");
const toCurrency = document.getElementById("to-currency");
const convertBtn = document.getElementById("convert-btn");
const result = document.getElementById("result");
const baseCurrency = document.getElementById("base-currency");
const getRatesBtn = document.getElementById("get-rates-btn");
const exchangeRates = document.getElementById("exchange-rates");
const convertMode = document.getElementById("convert-mode");
const exchangeMode = document.getElementById("exchange-mode");
const toggleBtn = document.querySelectorAll(".toggle-btn"); // For selecting all elements with the class "toggle-btn"

const apiKey = "dd8699e5da384e80c9c58ea7";

toggleBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    toggleBtn.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    const mode = btn.getAttribute("data-mode");

    if (mode == "convert") {
      convertMode.style.display = "flex";
      exchangeMode.style.display = "none";

      // for checking
      exchangeRates.innerHTML = "";
      baseCurrency.value = "";
      //-------//
    } else {
      convertMode.style.display = "none";
      exchangeMode.style.display = "flex";
    }
  });
});

convertBtn.addEventListener("click", () => {
  const amount = amountInput.value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${from}/${to}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const rate = data.conversion_rate;
      const convertedAmount = (amount * rate).toFixed(2);
      // consol.log()
      result.innerHTML = `<span class="currency-icon"></span>${convertedAmount} ${to}`;
    })
    .catch((error) => {
      console.log(error);
    });
});

getRatesBtn.addEventListener("click", () => {
  const base = baseCurrency.value;
  fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      //   console.log(data);
      let ratesHtml = "<h3>Exchange Rates</h3><ul>";
      for (const [currency, rate] of Object.entries(data.conversion_rates)) {
        if (currency !== base) {
          ratesHtml += `<li><span class="currency-icon">${currency}</span>${currency}; ${rate.toFixed(
            4
          )}</li>`;
        }
      }
      ratesHtml += "</ul>";
      exchangeRates.innerHTML = ratesHtml;
    })
    .catch((error) => {
      exchangeRates.textContent = "An error occurred.";
    });
});
