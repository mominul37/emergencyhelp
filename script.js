// navbar section element 
let heartCount = 0;
let coinCount = 100;
let copyCount = 0;
let callHistory = [];

// // select elements
// const copyBtnNavbar = document.querySelector("header button");
// const historyList = document.getElementById("cart-box");
// const cardsContainer = document.getElementById("emergency-container");

// function functionNavbar() {
//   document.getElementById("heart-count").innerText = heartCount;
//   document.getElementById("coin-count").innerText = coinCount;
//   document.getElementById("copy-count").innerText = copyCount;
// }


navbar update function
function functionNavbar() {
  document.querySelectorAll(".bg-violet-200")[0].innerHTML =
    `<img src="/assets/heart.png" class="h-[15px] w-[20px]" alt=""> <span>${heartCount}</span>`;
  document.querySelectorAll(".bg-violet-200")[1].innerHTML =
    `<img src="/assets/coin.png" class="h-[15px] w-[20px]" alt=""> <span>${coinCount}</span>`;
  copyBtnNavbar.innerText = `Copy ${copyCount}`;
}

heart function
function handleHeart() {
  heartCount += 1;
  functionNavbar();
}

// copy function
function handleCopy(number) {
  navigator.clipboard.writeText(number);
  copyCount += 1;
  functionNavbar();
  alert(`Copied: ${number}`);
}

// call function
function handleCall(name, phone) {
  if (coinCount < 20) {
    alert("You don't have enough coins to make a call!");
    return;
  }
  coinCount -= 20;
  const time = new Date().toLocaleTimeString();
  callHistory.push({ name, phone, time });
  functionNavbar();
  renderHistory();
}

// render call history
function renderHistory() {
  if (!document.getElementById("history-items")) {
    historyList.innerHTML = `
      <div class="flex justify-between pl-6">
        <h1><span><i class="fa-regular fa-clock"></i></span> Call history</h1>
        <div class="rounded-lg pr-6">
          <button class="btn btn-success !text-white !rounded-3xl" id="clearBtn">Clear</button>
        </div>
      </div>
      <div id="history-items" class="p-4 space-y-4"></div>
    `;

    // clear button handler
    document.getElementById("clearBtn").onclick = () => {
      callHistory = [];
      document.getElementById("history-items").innerHTML = "";
    };
  }

  // history items render
  const historyItems = document.getElementById("history-items");
  historyItems.innerHTML = ""; 

  callHistory.forEach((item) => {
    const div = document.createElement("div");
    div.className = "p-3 bg-blue-100 rounded-xl shadow-md";
    div.innerHTML = `
      <h2 class="font-bold text-green-700">${item.name}</h2>
      <p class="text-black">${item.phone}</p>
      <span class="text-gray-500 text-sm">${item.time}</span>
    `;
    historyItems.appendChild(div);
  });
}

// Event delegation
cardsContainer.addEventListener("click", function (e) {
  // Heart click
  if (e.target.closest(".card-heart")) {
    handleHeart();
  }

  // Copy click
  if (e.target.closest(".btn-copy")) {
    const card = e.target.closest(".card-item");
    const number = card.querySelector("h1").innerText;
    handleCopy(number);
  }

  // Call click
  if (e.target.closest(".btn-call")) {
    const card = e.target.closest(".card-item");
    const name = card.querySelector("h2").innerText;
    const number = card.querySelector("h1").innerText;
    handleCall(name, number);
  }
});

functionNavbar();
