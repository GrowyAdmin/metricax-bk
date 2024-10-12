import {response} from 'express'

class ResponseDTO {
  res = response;

  constructor(res) {
    this.res = res;
  }

  async customResponse(response) {
    const defaultRes = {
      codeResponse: 200,
      result: true,
      message: "",
      data: null,
    };

    const customResult = { ...defaultRes, ...response };

    return this.res.status(customResult.codeResponse).json({ ...customResult });
  }

  async successResponse(response) {
    const defaultRes = {
      codeResponse: 200,
      result: true,
      message: "",
      data: null,
    };
    const customResult = { ...defaultRes, ...response };

    return this.res.status(customResult.codeResponse).json({ ...customResult });
  }

  async errorServerResponse(response) {
    const defaultRes = {
      codeResponse: 500,
      result: false,
      message: "Ha sucedido un error, por favor intente más tarde.",
      data: null,
    };
    const customResult = { ...defaultRes, ...response };
    return this.res.status(customResult.codeResponse).json({ ...customResult });
  }

}

export default ResponseDTO;
