
const names = {
  今風: [
    { name: "結愛", yomi: "ゆあ", gender: "女の子" },
    { name: "陽翔", yomi: "はると", gender: "男の子" },
    { name: "心結", yomi: "みゆ", gender: "女の子" }
  ],
  古風: [
    { name: "文乃", yomi: "あやの", gender: "女の子" },
    { name: "清志郎", yomi: "せいしろう", gender: "男の子" },
    { name: "千代", yomi: "ちよ", gender: "女の子" }
  ],
  キラキラ: [
    { name: "煌星", yomi: "こうせい", gender: "男の子" },
    { name: "夢空", yomi: "そら", gender: "女の子" },
    { name: "星輝", yomi: "せら", gender: "未定" }
  ]
};

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

document.getElementById("generate-button").addEventListener("click", () => {
  const lastName = document.getElementById("last-name").value.trim();
  const type = document.querySelector('input[name="type"]:checked')?.value;
  const gender = document.querySelector('input[name="gender"]:checked')?.value;

  if (!lastName || !type || !gender) {
    alert("苗字・性別・タイプを選んでください");
    return;
  }

  const filteredList = names[type].filter(n => n.gender === gender || n.gender === "未定");
  const chosen = getRandom(filteredList);

  const ranks = ["SSS", "SS", "S", "A", "B", "C", "D"];
  const fortune = {
    love: getRandom(ranks),
    study: getRandom(ranks),
    money: getRandom(ranks),
    home: getRandom(ranks),
    total: getRandom(ranks)
  };

  alert(
    `名前: ${lastName} ${chosen.name}（${chosen.yomi}）\n` +
    `恋愛運: ${fortune.love}\n学業運: ${fortune.study}\n金運: ${fortune.money}\n家庭運: ${fortune.home}\n総合運: ${fortune.total}`
  );
});
