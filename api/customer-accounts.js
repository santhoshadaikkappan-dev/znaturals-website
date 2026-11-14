export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Content-Type'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Memory/Request cache for customer registry
  if (req.method === 'POST') {
    try {
      const customer = req.body;
      if (!customer || !customer.phone) {
        return res.status(400).json({ error: 'Valid customer data with phone is required' });
      }

      return res.status(200).json({
        success: true,
        message: 'Customer account recorded successfully',
        account: customer
      });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(200).json({
    status: 'Customer Accounts Service Online'
  });
}
