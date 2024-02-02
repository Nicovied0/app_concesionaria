const generateCodeMiddleware = (req, res, next) => {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";

  for (let i = 0; i < 6; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }

  req.randomCode = code;
  next();
};

module.exports = generateCodeMiddleware;
