document.getElementById("origin").textContent = result.origin;

// スコア生成とランク判定
function weightedRandomScore() {
  const rand = Math.random();
  if (rand < 0.05) return 99 + Math.random();           // 5%でSSS
  if (rand < 0.15) return 95 + Math.random() * 4;       // 10%でSS
  if (rand < 0.40) return 80 + Math.random() * 15;      // 25%でS
  if (rand < 0.65) return 65 + Math.random() * 15;      // 25%でA
  if (rand < 0.85) return 50 + Math.random() * 15;      // 20%でB
  if (rand < 0.95) return 30 + Math.random() * 20;      // 10%でC
  return Math.random() * 30;                            // 5%でD
}

function getRankByScore(score) {
  if (score >= 99) return "SSS";
  if (score >= 95) return "SS";
  if (score >= 80) return "S";
  if (score >= 65) return "A";
  if (score >= 50) return "B";
  if (score >= 30) return "C";
  return "D";
}

document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("result"));
  if (!data) return;

  document.getElementById("name").textContent = data.name;
  document.getElementById("yomi").textContent = "（" + data.yomi + "）";

  const categories = ["love", "study", "money", "home", "total"];
  categories.forEach(cat => {
    const score = weightedRandomScore();
    const rank = getRankByScore(score);
    const bar = document.querySelector(`#${cat} .gauge-bar`);
    const label = document.querySelector(`#${cat} .label`);
    const rankLabel = document.querySelector(`#${cat} .rank`);

    bar.style.width = Math.min(score, 100) + "%";
    label.textContent = Math.floor(score);
    rankLabel.textContent = rank;
  });
});
