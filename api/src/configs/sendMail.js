const axios = require("axios");

const sendData = async (req, res) => {
  const { email } = req.body;

  const code = req.randomCode;

  const requestData = {
    email: email,
    subject: "Codigo de registro",
    html: `
      <div style="margin: 0;padding: 0;">
        <div style="background-color: rgb(246, 251, 255);width: 100%;font-family:sans-serif;padding: 2rem 0;">
          <h2 style="text-align: center">Te compartimos el código para acceder y ser parte del rol administrativo de una concesionaria.</h2>
          <br>
          <br>
          <p style="text-align: center">Ingresa el siguiente código:</p>
          <div style="display: flex;justify-content: center;">
            <h1 style="text-align: center; font-size: 3rem; color: #005da9; background-color: #fff; display: flex; align-items: center; padding: 2rem; justify-content: center;margin: 0 auto;">${code}</h1>
          </div>
          <br>
          <h1 style="text-align: center;font-size:3rem;">AutoMarket</h1>
          <br>
          <div style="display: flex;align-items: center;justify-content: space-evenly;padding: 1rem;">
            <img src="https://notech-company.vercel.app/assets/icons/notechblack.png" style="height: 3rem;margin-bottom: 10px;margin:0" alt="notech.jpeg" />
            <p>
              <span>contacto.notech@gmail.com</span>
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    const response = await axios.post(
      "https://notech-microservice.vercel.app/api/sendMail/code",
      requestData
    );

    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
  }
};

module.exports = sendData;
