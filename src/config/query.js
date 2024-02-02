export const user = {
  query: `
    {
        user {
            id
            login
            firstName
            lastName
            email
            attrs
            createdAt
            auditRatio
            totalUp
            totalDown
            campus
          }
    }
    `,
};

export const squil = {
  query: `
  {
    skillTransactions: transaction(
      where: {
        type: { _ilike: "%skill%" }
      },order_by:{createdAt:desc}

    ) {
      type
      amount
    }
  }
`,
};

export const level = {
  query: `
    {
        event_user (where: {event: {path: {_like:"/dakar/div-01"}}},order_by:{user:{login:asc}},limit:1 ) {
          level
        }
    }
    `,
};

export const progress = {
  query: `
  {
    event_user (where: {event: {path: {_like:"/dakar/div-01"}}},order_by:{user:{login:asc}},limit:1 ) {
      level
    }
    transaction_aggregate(
      where: { 
        type: {_eq: "xp"}, 
        event: {path: {_eq: "/dakar/div-01"}}, 
      }
    ) {
      aggregate {
        sum {
          amount
        }
      }
    }
    transaction(
      where: { 
        type: {_eq: "xp"}, 
        event: {path: {_eq: "/dakar/div-01"}}, 
      },order_by:{createdAt:desc}
    ) {
      object {
       name
       type
      }
    }
  }
  
  `,
};

export const Transactions = {
  query: `
  {
    transaction(
      where: { 
        type: {_eq: "xp"}, 
        event: {path: {_eq: "/dakar/div-01"}}, 
      },order_by:{createdAt:desc}
    ) {
      object {
       name
       type
      }
    }
  }
  `,
};

export const languageData = (language, schema = `name`) => {
  return {
    query: `
        {
            object (where: {attrs: {_contains: {language: "${language}"}}}){
             ${schema}
           }
           transaction_aggregate(
            where: { 
              type: {_eq: "xp"}, 
              event: {path: {_eq: "/dakar/div-01"}}, 
              object: {
                attrs: {
                  _contains: { language: "${language}" }
                }
              }
            }
          ) {
            aggregate {
              sum {
                amount
              }
            }
          }
          transaction(
            where: { 
              type: {_eq: "xp"}, 
              event: {path: {_eq: "/dakar/div-01"}}, 
              object: {
                attrs: {
                  _contains: { language: "${language}" }
                }
              }
            },order_by:{createdAt:desc}
          ) {
            object {
             ${schema}
            }
          }
        }
        `,
  };
};

export const donesInLanguage = (language, schema = `name`) => {
  return {
    query: `
        {
            transaction(
              where: { 
                type: {_eq: "xp"}, 
                event: {path: {_eq: "/dakar/div-01"}}, 
                object: {
                  attrs: {
                    _contains: { language: "${language}" }
                  }
                }
              },order_by:{createdAt:desc}
            ) {
              object {
               ${schema}
              }
            }
        }       
        `,
  };
};

export const totalXp = () => {
  // JavaScript
  return {
    query: `
        {
            transaction_aggregate(
              where: { 
                type: {_eq: "xp"}, 
                event: {path: {_eq: "/dakar/div-01"}}, 
              }
            ) {
              aggregate {
                sum {
                  amount
                }
              }
            }
        }          
        `,
  };
};

export const totalXpInLanguaue = (language) => {
  // JavaScript
  return {
    query: `
        {
            transaction_aggregate(
              where: { 
                type: {_eq: "xp"}, 
                event: {path: {_eq: "/dakar/div-01"}}, 
                object: {
                  attrs: {
                    _contains: { language: "${language}" }
                  }
                }
              }
            ) {
              aggregate {
                sum {
                  amount
                }
              }
            }
        }          
        `,
  };
};
