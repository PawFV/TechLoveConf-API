const JWT = require('jsonwebtoken');

module.exports = function (req, res, next) {

   const token = req.header('auth-token');
   if (!token) return res.status(401).json({ message: 'Access Denied' });

   try {
      const verified = JWT.verify(token, process.env.TOKEN_SECRET);
      req.user = verified;
   } catch (error) {
      return res.status(400).json({ message: 'Invalid Token' });
   }
   next();
}

