/* ===== BAINT Wallet V2.3 Demo Script ===== */

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggle = document.getElementById("theme-toggle");
const connectBtn = document.getElementById("connect-wallet");
const balanceCard = document.getElementById("balance");
const deployBtn = document.getElementById("deploy-btn");
const deployStatus = document.getElementById("deploy-status");
const sendBtn = document.getElementById("send-btn");
const sendStatus = document.getElementById("send-status");
const txList = document.getElementById("tx-list");

// Local balances
let balances = {
  MIMUSD: 1000.0,
  BAINT: 500.0,
};

// Transaction history
let transactions = [];

/* PAGE SWITCHING */
navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const pageId = link.dataset.page;
    navLinks.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
    pages.forEach(p => p.classList.remove("active"));
    document.getElementById(pageId).classList.add("active");
  });
});

/* THEME TOGGLE */
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  themeToggle.textContent = document.body.classList.contains("light") ? "☀️" : "🌙";
  localStorage.setItem("theme", document.body.classList.contains("light") ? "light" : "dark");
});

// Load theme preference
window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
    themeToggle.textContent = "☀️";
  }
});

/* CONNECT WALLET (MOCK) */
connectBtn.addEventListener("click", () => {
  connectBtn.textContent = "Wallet Connected ✅";
  connectBtn.disabled = true;
  balanceCard.classList.remove("hidden");
});

/* DEPLOY MOCK STABLECOIN */
deployBtn.addEventListener("click", () => {
  deployStatus.textContent = "⏳ Deploying mock $MIMUSD...";
  setTimeout(() => {
    deployStatus.textContent = "✅ Deployment successful! $MIMUSD test token ready.";
  }, 2000);
});

/* SEND TOKENS */
sendBtn.addEventListener("click", () => {
  const address = document.getElementById("send-address").value;
  const amount = parseFloat(document.getElementById("send-amount").value);
  const token = document.getElementById("token-type").value;

  if (!address || isNaN(amount) || amount <= 0) {
    sendStatus.textContent = "⚠️ Invalid input.";
    return;
  }

  if (balances[token] < amount) {
    sendStatus.textContent = "❌ Insufficient balance.";
    return;
  }

  // Simulate transaction
  balances[token] -= amount;
  document.getElementById(`${token.toLowerCase()}-balance`).textContent = balances[token].toFixed(2);
  sendStatus.textContent = `✅ Sent ${amount} ${token} to ${address}`;
  
  const tx = {
    type: "Send",
    token,
    amount,
    to: address,
    time: new Date().toLocaleTimeString(),
  };
  transactions.unshift(tx);
  renderTransactions();
});

/* TRANSACTION RENDER */
function renderTransactions() {
  if (!txList) return;
  txList.innerHTML = "";
  if (transactions.length === 0) {
    txList.innerHTML = "<li>No transactions yet.</li>";
    return;
  }
  transactions.forEach(tx => {
    const li = document.createElement("li");
    li.textContent = `${tx.time} — ${tx.type} ${tx.amount} ${tx.token} → ${tx.to}`;
    txList.appendChild(li);
  });
      }
