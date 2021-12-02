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
          height: 0,
          length: 0
        },
        url: `https://wilson-biker-gear-test.netlify.app/.netlify/functions/store?id=${id}&price=${price}`
      }),
    };
  };