const axios = require("axios");

const sendContact = async (
  emailDealership,
  email,
  name,
  subject,
  message,
  idVehicle
) => {
  const requestData = {
    email: emailDealership,
    subject: `${name} te consulto por un vehiculo`,
    html: `
      <div style="margin: 0;padding: 0;">
        <div style="background-color: rgb(246, 251, 255);width: 100%;font-family:sans-serif;padding: 2rem 0;">
          <h2>${name} te quiere consultar por este <a href="https://automarket-dev.vercel.app/vehicles/detail/${idVehicle}">Vehiculo</a>.</h2>
          <br>
          <h3>Contactalo a travez de este email: ${email}</h3>
          <br>
          <div>
           <h4>Asunto: ${subject}</h4>
           <p>Mensaje: ${message}</p>
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
      `${process.env.URL_MICROSERVICES}/sendMail/code`,
      requestData
    );

    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

module.exports = sendContact;
