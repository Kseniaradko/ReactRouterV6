import React from "react";
import {
  Route,
  Link,
  useParams,
  Routes,
  Navigate,
  Outlet
} from "react-router-dom";
import users from "./fakeapi/users";

function UsersLayout() {
  const params = useParams();
  const { userId } = params;
  const isExisted = users.some((user) => user.id === Number(userId));

  if (!isExisted && userId) {
    return <Navigate to="/users" />;
  }

  return (
    <Outlet />
  );
}

function UsersListPage() {
  return (
    <div>
      <br />
      <Link to="/">Home Page</Link>
      <h2>Users List Page</h2>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.id}/profile`}>{user.name}</Link>
            </li>  
          )
        })}
      </ul>
    </div>
  )
}

function UserPage() {
  const params = useParams();
  const { userId } = params;

  return (
    <div>
      <br/>
      <Link to="/">Home Page</Link>
      <h2>User Page</h2>
      <ul>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
        <li>
          <Link to="../edit">Edit User Page</Link>
        </li>
      </ul>
      {`UserId: ${userId}`} 
    </div>
  );
}

function EditUserPage() {
  const params = useParams();
  const { userId } = params;
  const newUserId = Number(userId) + 1;
  return (
    <>
      <h1>Edit User Page</h1>
      <ul>
        <li>
          <Link to="../profile">User Page</Link>
        </li>
        <li>
          <Link to={`../../${newUserId}/profile`}>Another User Page</Link>
        </li>
        <li>
          <Link to="/users">Users List Page</Link>
        </li>
      </ul>
    </>
  )
}

function App() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to="/users">Users List Page</Link>
      <Routes> 
        <Route index />
        <Route path="users">
          <Route index element={<UsersListPage />} />
          <Route path=":userId" element={<UsersLayout />}>
            <Route path="profile" element={<UserPage />} />
            <Route path="edit" element={<EditUserPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;

