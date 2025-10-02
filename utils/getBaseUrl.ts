export const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }

  if (process.env.PRODUCTION_HOSTNAME) {
    return `http://${process.env.PRODUCTION_HOSTNAME}:${process.env.PORT}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
};
