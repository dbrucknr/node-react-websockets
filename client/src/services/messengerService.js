import api from "./api";

export const MessengerService = {
  retrieveThreads: async () => {
    return api
      .get("/threads")
      .then(({ data }) => {
        return data;
      })
      .catch((err) => {
        throw err;
      });
  },
};
