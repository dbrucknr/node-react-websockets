import { useSelector } from "react-redux";

export const Messenger = () => {
  const user = useSelector((state) => state.authReducer.user);
  return (
    <div>
      <h1>Messenger Screen</h1>
      <p>Welcome {user.firstName}</p>
    </div>
  );
};
