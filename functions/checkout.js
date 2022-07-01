exports.handler = async function ({ queryStringParameters }) {
    const { id, price, weight, color = null } = queryStringParameters;

    const data = color 
    ? {
        id,
        price,
        color,
        dimensions: {
          weight,
        },
        url: `https://wilsonbikergear.com/.netlify/functions/checkout?id=${id}&price=${price}&color=${color}`}
    : {
        id,
        price,
        dimensions: {
          weight,
        },
        url: `https://wilsonbikergear.com/.netlify/functions/checkout?id=${id}&price=${price}`
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    };
  };