function getFastApiErrors(error) {
  let errorMessage = "";

  const allowedStatusCodes = [400, 401, 404, 409];

  if (error.response) {
    if (allowedStatusCodes.includes(error.response.status)) {
      console.log("1");
      errorMessage = error.response.data.detail;
    } else {
      console.log("2");

      let nameString = error.response.data.detail[0]["loc"][1];
      errorMessage = error.response.data.detail[0]["msg"].replace(
        /String|value|Field/g,
        nameString
      );
    }
  } else if (error.request) {
    console.log("3");
    console.log(error.message);
    errorMessage = `${error.message}: No se recibió respuesta del servidor`;
  } else {
    console.log("4");
    console.log("Error de configuración de la solicitud", error.message);
    errorMessage = error.message;
  }

  return errorMessage;
}

export default getFastApiErrors;
