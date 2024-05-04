import { useGetUsersQuery } from "app/apiSlice";

type User = {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
};

export default function Users() {
  const { data, isLoading, isError } = useGetUsersQuery({});
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching users</div>;

  const users = data && data.users;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users &&
          users.map((user: User) => (
            <li key={user.id}>
              {user.username} - {user.email}
            </li>
          ))}
      </ul>
    </div>
  );
}
