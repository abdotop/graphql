import axios from "axios";
import { Base64 } from 'js-base64';
import { endpoint, jwtKey, signInEndpoint } from "../config/config.js";
import { user } from "../config/query.js";
export const fetchData = async (
  schema = {
    query: `
    query {
      user {
        login
      }
    }
  `,
  }
) => {
  const token = sessionStorage.getItem(jwtKey) || "";

  return await axios.post(endpoint, schema, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export async function validateToken() {
  try {
    const response = await fetchData(user);

    if (response.data.errors) {
      return [false, null];
    }
    return [true, response.data];
  } catch (error) {
    return [false, null];
  }
}

export const submitSignIn = async (e, callback) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const credentials = Base64.encode([formData.get("Username").trim(), formData.get("password")].join(":"))
  // const credentials = btoa(urlencoded;
  console.log(credentials);

  try {
    const response = await axios.post(
      signInEndpoint,
      {},
      {
        headers: {
          Authorization: `Basic ${credentials}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const token = sessionStorage.setItem(jwtKey, response.data);
    callback([true, response.data]);
  } catch (error) {
    callback([false, error.response.data.error]);
  }
};

export const logout = (setSession) => {
  setSession([false, null]);
  sessionStorage.removeItem(jwtKey);
};

export function getRank(level) {
  if (level <= 10) {
    return "Beginner developer";
  } else if (level <= 20) {
    return "Apprentice developer";
  } else if (level <= 30) {
    return "Assistant developer";
  } else if (level <= 40) {
    return "Basic developer";
  } else if (level <= 50) {
    return "Junior developer";
  } else {
    return "Level is beyond the defined range";
  }
}

const top = {
  query: `
    {
      user{
       id
       transactions (where: {type: {_eq: "xp" } }, order_by: { createdAt: desc } ) {
         amount
         type
         userId
       }
     }
   }   
    `,
};

export async function name() {
  const response = await fetchData(top);
  const transactions = response.data.data.user[0].transactions
  // console.log(transactions);
  let totalAmount = transactions.reduce(
    (total, transaction) => total + transaction.amount,
    0
  );
  let numberOfTransactions = transactions.length;

  console.log("Montant total :", totalAmount);
  console.log("Nombre de transactions :", numberOfTransactions);
}
