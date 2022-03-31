import { MessengerService } from "../../services/messengerService";

export const RETRIEVE_THREADS = "RETRIEVE_THREADS";
export const SET_CURRENT_THREAD = "SET_CURRENT_THREAD";
export const FRIENDS_ONLINE = "FRIENDS_ONLINE";
export const FRIEND_ONLINE = "FRIEND_ONLINE";
export const FRIEND_OFFLINE = "FRIEND_OFFLINE";
export const SET_SOCKET = "SET_SOCKET";

export const retrieveThreads = () => async (dispatch) => {
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

export const setCurrentThread = (thread) => async (dispatch) => {
  dispatch({ type: SET_CURRENT_THREAD, payload: thread });
};

export const onlineFriends = (friends) => async (dispatch) => {
  dispatch({ type: FRIENDS_ONLINE, payload: friends });
};

export const onlineFriend = (friend) => async (dispatch) => {
  dispatch({ type: FRIEND_ONLINE, payload: friend });
};

export const offlineFriend = (friend) => async (dispatch) => {
  dispatch({ type: FRIEND_OFFLINE, payload: friend });
};

export const setSocket = (socket) => async (dispatch) => {
  dispatch({ type: SET_SOCKET, payload: socket });
};
