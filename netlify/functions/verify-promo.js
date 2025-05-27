exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  const { promoCode } = JSON.parse(event.body);
  const validPromoCode = process.env.PROMO_CODE;

  if (promoCode === validPromoCode) {
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: true })
    };
  } else {
    return {
      statusCode: 200,
      body: JSON.stringify({ valid: false })
    };
  }
};