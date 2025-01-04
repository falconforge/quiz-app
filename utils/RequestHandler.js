const RequestHandler = {
    response: (res, status, message, data = null) => {
      const response = {
        status,
        message,
        ...(data && { data }),
      };
      res.status(status).json(response);
    },
  };
  
  export default RequestHandler;