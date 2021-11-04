const staticMiddleware = (filePath) => {
  return (request, response, next) => {
    request.staticPath = filePath;
    next();
  };
};

export default staticMiddleware;
