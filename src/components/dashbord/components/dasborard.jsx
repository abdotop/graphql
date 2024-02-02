import { fetchData, getRank } from "../../../tools/tools.js";
import {
  languageData,
  donesInLanguage,
  Transactions,
} from "../../../config/query.js";
import { useEffect, useRef, useState } from "react";
import { progress } from "../../../config/query.js";

function setProgress(circle, progress) {
  //   // Calculez la circonférence du cercle
  var radius = circle.r.baseVal.value;
  var circumference = radius * 2 * Math.PI;
  //   // Définissez les propriétés de trait de tiret pour créer l'effet d'anneau
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = `${circumference}`;
  //   // Calculez le décalage de trait de tiret en fonction de la valeur de progression
  var offset = circumference - (progress / 100) * circumference;
  //   // Appliquez le décalage à l'élément SVG
  circle.animate(
    [{ strokeDashoffset: circumference }, { strokeDashoffset: offset }],
    {
      duration: 2000,
      easing: "linear",
      fill: "forwards",
    }
  );
}

const transaction = (name, calback) => {
  fetchData(donesInLanguage(name, `name\ntype`)).then((result) => {
    calback(result.data.data.transaction);
  });
};

function Transaction(item) {
  return (
    <div className="transaction">
      <span className="type">{item.object.type}</span>
      <span className="name">{item.object.name}</span>
    </div>
  );
}

function Card({ item, setTransactions }) {
  // Créez une référence pour l'élément SVG
  const cicleRef = useRef(null);
  const xpRef = useRef(null);
  const PourcentRef = useRef(null);

  const changeTransactions = (event) => {
    const name = event.currentTarget.getAttribute("notation");
    transaction(name, setTransactions);
  };

  // Utilisez la référence pour récupérer l'élément SVG
  useEffect(() => {
    fetchData(languageData(item.notation)).then((data) => {
      const obj = data.data.data;
      const projectDone = obj.transaction.length || 0;
      let totalPoject;
      let progress = 0;
      if (projectDone !== 0) {
        totalPoject = obj.object.length || 0;
        progress = Math.round((projectDone * 100) / totalPoject);
      }
      const xp = obj["transaction_aggregate"].aggregate.sum.amount;
      PourcentRef.current.innerHTML = `${progress} %`;
      xpRef.current.innerHTML = `${xp / 1000} xp`;

      setProgress(cicleRef.current, progress);
    });
  }, []);

  return (
    <div notation={item.notation} onClick={changeTransactions} className="card">
      <div className="poucent">
        <svg>
          <circle cx="50px" cy="50px" r="40px" />
          <circle
            ref={cicleRef}
            className="progress"
            cx="50px"
            cy="50px"
            r="40px"
          />
        </svg>
        <h1 ref={PourcentRef}></h1>
      </div>
      <h1>{item.name}</h1>
      <h4 ref={xpRef}></h4>
    </div>
  );
}
// JavaScript
const lang = [
  { name: "Go", notation: "Go" },
  { name: "Js", notation: "JavaScript" },
  { name: "Rust", notation: "rust" },
];

export function Dashboard() {
  const xpdiv = useRef(null);
  const rankdiv = useRef(null);
  const leveldiv = useRef(null);
  const [transactions, setTransactions] = useState([]);

  const changeTransactions = () => {
    fetchData(Transactions).then((result) => {
      setTransactions(result.data.data.transaction);
    });
  };

  useEffect(() => {
    fetchData(progress).then((result) => {
      const data = result.data.data;
      const level = data["event_user"][0].level;
      const xp = data["transaction_aggregate"].aggregate.sum.amount;
      xpdiv.current.innerHTML = `${Math.round(xp / 1000)} kB`;
      leveldiv.current.innerHTML = level;
      rankdiv.current.innerHTML = getRank(level);
      setTransactions(data.transaction);
    });
  }, []);
  return (
    <div className="container">
      <div className="subContainer one">
        {/* <div className="progress"> */}
        <div onClick={changeTransactions} className="totalXp">
          <div className="level">
            <h4 className="level-cicle">
              level <span ref={leveldiv}></span>
            </h4>
            <h4 className="rank">
              Current rank: <span ref={rankdiv}></span>
            </h4>
          </div>
          <h4 ref={xpdiv} className="xp"></h4>
          <svg></svg>
        </div>
        <div className="progress">
          {lang.map((item, index) => (
            <Card key={index} item={item} setTransactions={setTransactions} />
          ))}
        </div>
      </div>
      <div className="subContainer tow">
        <div className="text">Transactions</div>
        <div className="content">
          {transactions.map((item, index) => (
            <Transaction key={index} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
