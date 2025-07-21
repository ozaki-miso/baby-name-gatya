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


function getScoreByRank(rank) {
  switch (rank) {
    case "SSS":
      return 100;
    case "SS":
      return getRandomInt(96, 99);
    case "S":
      return getRandomInt(91, 95);
    case "A":
      return getRandomInt(80, 90);
    case "B":
      return getRandomInt(70, 79);
    case "C":
      return getRandomInt(55, 69);
    case "D":
      return getRandomInt(30, 54);
    default:
      return 0;
  }
}

// 最小値と最大値の範囲で整数を返す関数
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


document.getElementById("love-message").textContent = "あなたの恋愛運は絶好調！";
document.getElementById("study-message").textContent = "集中力が高まり勉強がはかどる一日！";
document.getElementById("money-message").textContent = "臨時収入の予感あり！";
document.getElementById("home-message").textContent = "家族と過ごす時間が心を癒します。";
document.getElementById("total-message").textContent = "健康面では良好ですが、無理は禁物！";
