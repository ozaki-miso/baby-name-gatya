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

    // -------------------------
    // フォームの状態を復元する処理
    // -------------------------
    function restoreFormState() {
      const lastName = sessionStorage.getItem('lastName');
      const gender = sessionStorage.getItem('gender');
      const type = sessionStorage.getItem('type');

      if (lastName) {
        document.getElementById('last-name').value = lastName;
      }

      if (gender) {
        const genderRadio = document.querySelector(`input[name="gender"][value="${gender}"]`);
        if (genderRadio) genderRadio.checked = true;
      }

      if (type) {
        const typeRadio = document.querySelector(`input[name="type"][value="${type}"]`);
        if (typeRadio) typeRadio.checked = true;
      }
    }

    // ページ読み込み時に状態を復元
    window.addEventListener('DOMContentLoaded', restoreFormState);

    // -------------------------
    // ガチャ実行ボタンの処理
    // -------------------------
    document.getElementById("generate-button").addEventListener("click", () => {
      const lastName = document.getElementById("last-name").value.trim();
      const type = document.querySelector('input[name="type"]:checked')?.value;
      const gender = document.querySelector('input[name="gender"]:checked')?.value;

      if (!lastName || !type || !gender) {
        alert("苗字・性別・タイプを選んでください");
        return;
      }

      // 🔹 入力値をセッションストレージに保存
      sessionStorage.setItem('lastName', lastName);
      sessionStorage.setItem('gender', gender);
      sessionStorage.setItem('type', type);

      const filteredList = names.filter(n =>
        n.type === type && (n.gender === gender || n.gender === "両方")
      );

      if (filteredList.length === 0) {
        alert("該当する名前が見つかりませんでした");
        return;
      }

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

      window.location.href = "/gacha.html";
    });
  })
  .catch(error => {
    console.error("名前データの読み込みに失敗しました:", error);
  });

