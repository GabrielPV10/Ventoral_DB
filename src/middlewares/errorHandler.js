export function errorHandler(err, req, res, next) {
  console.error(err); // Imprime el error en la consola del servidor
  const status = 500;
  const message = "Internal Server Error";
  res.status(status).json({ error: message });
}