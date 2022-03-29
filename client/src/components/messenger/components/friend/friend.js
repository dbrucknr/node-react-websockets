export const Friend = ({ thread }) => {
  return (
    <div>
      <p>
        {thread.Users[0].firstName} {thread.Users[0].lastName}
      </p>
    </div>
  );
};
