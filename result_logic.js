document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("result"));
  if (!data) return;

  document.getElementById("name").textContent = data.name;
  document.getElementById("yomi").textContent = "（" + data.yomi + "）";
  document.getElementById("origin").textContent = data.origin || "（名前の由来がここに入ります）";

  const categories = ["love", "study", "money", "home", "total"];
  const fortunes = {};
  
  categories.forEach(cat => {
    const score = weightedRandomScore();
    const rank = getRankByScore(score);
    fortunes[cat] = Math.floor(score); // レーダーチャート用に保存

    const bar = document.querySelector(`#${cat} .gauge-bar`);
    const label = document.querySelector(`#${cat} .label`);
    const rankLabel = document.querySelector(`#${cat} .rank`);

    bar.style.width = Math.min(score, 100) + "%";
    label.textContent = Math.floor(score);
    rankLabel.textContent = rank;

    // クラスは既存のrankクラスは残しつつrank-ランク名を付与
    rankLabel.className = "rank rank-" + rank;
  });

  // レーダーチャート描画
  const ctx = document.getElementById("fortuneChart").getContext("2d");
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['恋愛運', '学業運', '金運', '家庭運', '総合運'],
      datasets: [{
        label: 'スコア',
        data: [
          fortunes.love,
          fortunes.study,
          fortunes.money,
          fortunes.home,
          fortunes.total
        ],
        backgroundColor: 'rgba(255, 105, 180, 0.2)',
        borderColor: 'rgba(255, 105, 180, 1)',
        pointBackgroundColor: 'rgba(255, 105, 180, 1)'
      }]
    },
    options: {
      responsive: true,
      scale: {
        r: {
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            backdropColor: 'transparent'
          }
        }
      }
    }
  });
});

function weightedRandomScore() {
  const rand = Math.random();
  if (rand < 0.01) return 100;                          // 1%でSSS
  if (rand < 0.03) return 98 + Math.random() * 1;       // 2%でSS
  if (rand < 0.20) return 80 + Math.random() * 15;      // 17%でS
  if (rand < 0.50) return 65 + Math.random() * 15;      // 30%でA
  if (rand < 0.80) return 50 + Math.random() * 15;      // 30%でB
  if (rand < 0.95) return 30 + Math.random() * 20;      // 15%でC
  return Math.random() * 30;                            // 5%でD
}

function getRankByScore(score) {
  if (score >= 100) return "SSS";
  if (score >= 98) return "SS";
  if (score >= 80) return "S";
  if (score >= 65) return "A";
  if (score >= 50) return "B";
  if (score >= 30) return "C";
  return "D";
}

