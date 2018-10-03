const sendError = res => e => res.status(500).send(e);

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.json({ success: false, msg: 'Please login to have access to this action' });
  }
};

module.exports = { sendError, verifyToken };
