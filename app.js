// Client-side reconstitution calculator (no server; runs entirely in the browser).
(function () {
  const mount = document.getElementById("calc-mount");
  if (!mount) return;

  mount.innerHTML = `
    <div class="grid">
      <label>Peptide amount (mg)<input id="peptideMg" type="number" value="5" min="0" step="0.5" /></label>
      <label>BAC water (mL)<input id="bacWaterMl" type="number" value="2" min="0" step="0.5" /></label>
      <label>Desired dose (mcg)<input id="doseMcg" type="number" value="250" min="0" step="10" /></label>
    </div>
    <button id="calcBtn" class="btn">Calculate</button>
    <div id="result" class="result"></div>`;

  function calculate() {
    const peptideMg = Number(document.getElementById("peptideMg").value);
    const bacWaterMl = Number(document.getElementById("bacWaterMl").value);
    const doseMcg = Number(document.getElementById("doseMcg").value);
    const out = document.getElementById("result");

    if (![peptideMg, bacWaterMl, doseMcg].every((n) => Number.isFinite(n) && n > 0)) {
      out.textContent = "Enter positive numbers for all three fields.";
      return;
    }
    const totalMcg = peptideMg * 1000;
    const concentration = totalMcg / bacWaterMl;
    const volumeMl = doseMcg / concentration;
    const totalDoses = totalMcg / doseMcg;

    out.textContent =
      `Concentration: ${concentration.toFixed(1)} mcg/mL\n` +
      `Injection volume: ${volumeMl.toFixed(3)} mL (${(volumeMl * 100).toFixed(1)} units on a U-100 syringe)\n` +
      `Total doses per vial: ${totalDoses.toFixed(1)}`;
  }

  document.getElementById("calcBtn").addEventListener("click", calculate);
})();
