import { MessengerService } from "../../services/messengerService";

export const RETRIEVE_THREADS = "RETRIEVE_THREADS";

export const retrieveThreads = () => (dispatch) => {
  return MessengerService.retrieveThreads()
    .then((data) => {
      console.log(data);
      data.forEach((thread) => {
        thread.Users.forEach((participant) => {
          participant.status = "offline";
        });
        thread.Messages.reverse();
      });
      dispatch({ type: RETRIEVE_THREADS, payload: data });
      return data;
    })
    .catch((err) => {
      throw err;
    });
};
