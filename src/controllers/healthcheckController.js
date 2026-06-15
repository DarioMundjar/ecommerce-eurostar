const healthcheck = (req, res) => {
  return res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
};

module.exports = {
  healthcheck
};
