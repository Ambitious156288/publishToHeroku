const fileMiddleware = (path) => {
  return (request, response, next) => {
    try {
      request.filePath = path;
      next();
    } catch (e) {
      console.log(e);
    }
  };
};

export default fileMiddleware;
