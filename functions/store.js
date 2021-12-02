exports.handler = async function ({ queryStringParameters }) {
    const { id, price } = queryStringParameters;
    return {
      statusCode: 200,
      headers: {
        'Content-type': 'Application/json'
      },
      body: JSON.stringify({
        id,
        price,
        url: `https://wilson-biker-gear-test.netlify.app/.netlify/functions/store?id=${id}&price=${price}`
      }),
    };
  };