fetch("name_data.json")
  .then(response => response.json())
  .then(names => {
    function getRandom(array) {
      return array[Math.floor(Math.random() * array.length)];
    }

    
function weightedRandomRank() {
  const ranks = ["SSS", "SS", "S", "A", "B", "C", "D"];
  const probabilities = [0.01, 0.02, 0.194, 0.194, 0.194, 0.194, 0.194];
  const rand = Math.random();
  let cumulative = 0;
  for (let i = 0; i < ranks.length; i++) {
    cumulative += probabilities[i];
    if (rand < cumulative) return ranks[i];
  }
  return "D"; // fallback
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

      const fortune = {
        love: weightedRandomRank(),
        study: weightedRandomRank(),
        money: weightedRandomRank(),
        home: weightedRandomRank(),
        total: weightedRandomRank()
      };

      localStorage.setItem("result", JSON.stringify({
        name: lastName + " " + chosen.name,
        yomi: chosen.yomi,
        fortunes: fortune
      }));

      window.location.href = "/gacha.html";
    });
  });
