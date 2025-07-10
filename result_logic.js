document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("result"));
  if (!data) return;

  document.getElementById("name").textContent = data.name;
  document.getElementById("yomi").textContent = "（" + data.yomi + "）";
  document.getElementById("origin").textContent = data.origin || "（名前の由来がここに入ります）";

  const categories = ["love", "study", "money", "home", "total"];
  const fortunes = data.fortunes || {}; // ← 保存された値を使う

  categories.forEach(cat => {
    const rank = fortunes[cat];
    const score = getScoreByRank(rank); // ← スコアはランクに応じて決め打ち
    const bar = document.querySelector(`#${cat} .gauge-bar`);
    const label = document.querySelector(`#${cat} .label`);
    const rankLabel = document.querySelector(`#${cat} .rank`);

    bar.style.width = Math.min(score, 100) + "%";
    label.textContent = score;
    rankLabel.textContent = rank;
    rankLabel.className = "rank rank-" + rank;
  });

  // レーダーチャート描画
  const ctx = document.getElementById("fortuneChart").getContext("2d");
  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: ['恋愛運', '学業運', '金運', '家庭運', '健康運'],
      datasets: [{
        label: 'スコア',
        data: [
          getScoreByRank(fortunes.love),
          getScoreByRank(fortunes.study),
          getScoreByRank(fortunes.money),
          getScoreByRank(fortunes.home),
          getScoreByRank(fortunes.total)
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

// ランクに応じてスコアをざっくり決める（見た目用）
function getScoreByRank(rank) {
  switch (rank) {
    case "SSS": return 100;
    case "SS": return 99;
    case "S": return 90;
    case "A": return 75;
    case "B": return 60;
    case "C": return 45;
    case "D": return 25;
    default: return 0;
  }
}

