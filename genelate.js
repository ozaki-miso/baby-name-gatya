function generateNameAndFortune(names, lastName, type, gender) {
  const getRandom = array => array[Math.floor(Math.random() * array.length)];

  const weightedRandomRank = () => {
    const ranks = ["SSS", "SS", "S", "A", "B", "C", "D"];
    const probabilities = [0.01, 0.02, 0.194, 0.194, 0.194, 0.194, 0.194];
    const rand = Math.random();
    let cumulative = 0;
    for (let i = 0; i < ranks.length; i++) {
      cumulative += probabilities[i];
      if (rand < cumulative) return ranks[i];
    }
    return "D";
  };

  const filteredList = names.filter(n =>
    n.type === type && (n.gender === gender || n.gender === "両方")
  );

  if (filteredList.length === 0) return null;

  const chosen = getRandom(filteredList);

  const fortune = {
    love: weightedRandomRank(),
    study: weightedRandomRank(),
    money: weightedRandomRank(),
    home: weightedRandomRank(),
    health: weightedRandomRank()
  };

  localStorage.setItem("result", JSON.stringify({
    name: lastName + " " + chosen.name,
    yomi: chosen.yomi,
    origin: chosen.origin,
    fortunes: fortune
  }));

  return true;
}
