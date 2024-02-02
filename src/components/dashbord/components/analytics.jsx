import { useEffect, useRef } from "react";
import { fetchData } from "../../../tools/tools.js";
import { squil } from "../../../config/query.js";



function drawChart(data, svg) {
  var html = "";
  var x = 25;

  for (let i = 0; i < data.length; i++) {
    var rectHeight = data[i].percentage * 3;
    var rectY = 450 - rectHeight;
    var rectWidth = 25;
    var rectX = x;
    var labelX = x + rectWidth / 2;
    var labelY = rectY - 5;
    var label = data[i].type.split("skill_")[1] + " " + data[i].percentage.toFixed(0) + "%";

    html +=
      `<g>`+'<rect x="' +
      rectX +
      '" y="' +
      rectY +
      '" width="' +
      rectWidth +
      '" height="' +
      rectHeight +
      '" />';
    html +=
      '<text class="label" x="' +
      labelX +
      '" y="' +
      labelY +
      '" text-anchor="middle" font-size="11">' +
      label +
      "</text>"+`</g>`;

    x += 55;
  }

  svg.innerHTML = html;
}

function pourcentageTransactions(transactions) {
  const types = {};
  let total = 0;

  for (const transaction of transactions) {
    if (transaction.type in types) {
      types[transaction.type] += transaction.amount;
    } else {
      types[transaction.type] = transaction.amount;
    }
    total += transaction.amount;
  }

  const result = [];
  for (const type in types) {
    const amount = types[type];
    const percentage = (amount / total) * 100;
    result.push({ type, amount, percentage });
  }

  return result;
}


export function Analytics() {
  const svg = useRef(null);
  useEffect(() => {
    fetchData(squil).then((result) => {
      const skill = result.data.data.skillTransactions;
      const data = pourcentageTransactions(skill);
      // console.log();
      drawChart(data, svg.current);
    });
  });

  return (
    <>
      <div className="analytics">
      {/* <div className="text">skill-progresse</div> */}
        <svg width="850" height="450" ref={svg}></svg>
      </div>
    </>
  );
}
