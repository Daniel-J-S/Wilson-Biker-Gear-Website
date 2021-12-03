exports.handler = async function ({ queryStringParameters }) {
    const { id, price, weight } = queryStringParameters;
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id,
        price,
        dimensions: {
          weight,
        },
        url: `https://wilsonbikergear.com/.netlify/functions/checkout?id=${id}&price=${price}`
      }),
    };
  };