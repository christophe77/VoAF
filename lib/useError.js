const useError = () => {
  function handleError(error) {
    throw error;
  }
  return { handleError };
};
module.exports = useError;
