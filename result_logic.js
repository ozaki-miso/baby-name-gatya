document.addEventListener("DOMContentLoaded", () => {
  const data = JSON.parse(localStorage.getItem("result"));
  if (!data) return;

  document.getElementById("name").textContent = data.name;
  document.getElementById("yomi").textContent = "（" + data.yomi + "）";
  document.getElementById("origin").textContent = data.origin || "（名前の由来がここに入ります）";

  const categories = ["love", "study", "money", "home", "total"];
  const fortunes = data.fortunes || {}; // 保存された値を使う

  categories.forEach(cat => {
    const rank = fortunes[cat];
    const score = getScoreByRank(rank);
    const bar = document.querySelector(`#${cat} .gauge-bar`);
    const label = document.querySelector(`#${cat} .label`);
    const rankLabel = document.querySelector(`#${cat} .rank`);

    bar.style.width = Math.min(score, 100) + "%";
    label.textContent = score;
    rankLabel.textContent = rank;
    rankLabel.className = "rank rank-" + rank;

    // メッセージ表示
    const msgElem = document.getElementById(`${cat}-message`);
    if (msgElem) {
      msgElem.textContent = setFortuneMessage(cat, rank);
    }
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

// ランクごとのメッセージ一覧
const messages = {
  love: {
    SSS: ["愛情に溢れた毎日が続くでしょう。", "恋愛運は最高峰！素敵な出会いが期待できる。"],
    SS: ["恋愛面で大きな幸運が訪れます。", "大切な人との絆が深まる時期です。"],
    S: ["心が通じ合う恋が始まるかも。", "素敵な恋のチャンスがやってきます。"],
    A: ["恋愛運はまずまず良好です。", "小さな幸せを感じる日々。"],
    B: ["焦らずゆっくり歩みましょう。", "出会いの場には積極的に参加を。"],
    C: ["少し距離を置くことで新しい発見が。", "自分磨きをして運気アップ。"],
    D: ["ゆったり自分の時間を大切に。", "新しいことに挑戦すると吉。"]
  },
  study: {
    SSS: ["学びの神様が味方しています。", "どんな難問もスラスラ解ける日。"],
    SS: ["知識がどんどん吸収できる日。", "勉強に集中できる最高のタイミング。"],
    S: ["良い成績が期待できるでしょう。", "計画的な勉強が実を結びます。"],
    A: ["学習に適した落ち着いた日。", "基礎固めに最適な時期です。"],
    B: ["少しずつ進めていくことが大事。", "周りと協力すると効果アップ。"],
    C: ["疲れを感じたら休息を。", "焦らずマイペースが吉。"],
    D: ["無理は禁物。体調管理を優先して。", "リフレッシュを忘れずに。"]
  },
  money: {
    SSS: ["大きな財運が舞い込みます。", "臨時収入のチャンス到来！"],
    SS: ["貯蓄が順調に増えそうです。", "賢い投資が吉と出る日。"],
    S: ["小さな幸運が続きます。", "節約が成果を生む時期。"],
    A: ["無駄遣いを控えれば安心。", "計画的なお金の使い方が鍵。"],
    B: ["貯金を始める良いタイミング。", "少しずつ未来に備えましょう。"],
    C: ["出費がかさむかも注意。", "無駄遣いに注意を。"],
    D: ["慎重にお金を扱うことが大切。", "急な出費に備えましょう。"]
  },
  home: {
    SSS: ["家族と最高に幸せな時間を。", "家庭の絆がより強く結ばれます。"],
    SS: ["暖かい家族の愛に包まれます。", "安心できる居場所が広がる時。"],
    S: ["家族と過ごす時間が心の栄養に。", "穏やかな日々が期待できます。"],
    A: ["家庭内のコミュニケーションが良好。", "笑顔あふれる日常を楽しんで。"],
    B: ["少しだけ気を使うことが吉。", "家庭の調和を大切にしましょう。"],
    C: ["小さなトラブルは冷静に対処を。", "柔軟な対応が幸運を招きます。"],
    D: ["家族との時間を優先して。", "ゆったり過ごすことが心を癒します。"]
  },
  health: {
    SSS: ["病気知らずの健康体！最強の運気です。", "どんな困難も跳ね返す体力の持ち主。"],
    SS: ["体調は絶好調。エネルギーに満ちています。", "健康面で大きな安心が得られます。"],
    S: ["毎日を元気に過ごせるでしょう。", "体調管理が上手にできる日。"],
    A: ["体調に気を配れば良好です。", "適度な運動でさらに運気アップ。"],
    B: ["無理をしなければ順調。", "ゆっくり休息をとることが大切。"],
    C: ["疲れが出やすいので注意。", "バランスの良い食事を心がけて。"],
    D: ["体調には細心の注意を。", "睡眠をしっかりとることを優先。"]
  }
};

// ランクごとにメッセージをランダム取得
function setFortuneMessage(category, rank) {
  const msgs = messages[category]?.[rank];
  if (!msgs) return "";
  return msgs[Math.floor(Math.random() * msgs.length)];
}
