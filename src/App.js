import './App.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser, createUser, updateUser, deleteUser, patchUser } from './features/user/userSlice';


function App() {

  //Users
  const user = useSelector((state) => { return state.idyUser.data });
  const loading = useSelector((state) => { return state.idyUser.loading });
  const error = useSelector((state) => { return state.idyUser.error });
  const dispatch = useDispatch();


  const handle_FetchUser = () => {
    dispatch(fetchUser());
  };

  const handle_CreateUser = () => {
    dispatch(createUser({ 'userId': 'surya' }));
  };

  const handle_UpdateUser = (id, userData) => {
    dispatch(updateUser({ id, userData }));
  };

  const handle_DeleteUser = (id) => {
    dispatch(deleteUser(id));
  };

  const handle_PatchUser = async (id, updatedData) => {
    try {
      await dispatch(patchUser({ id, userData: updatedData }));
    } catch (error) {
      console.log('Error updating user:', error.message);
    }
  };


  useEffect(() => {
    handle_FetchUser();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
      <ul>
        {user.map(user => (
          <li key={user.id}>{user.userId}</li>
        ))}
      </ul>
      <button onClick={handle_CreateUser}>CREATE USER</button>
      <button onClick={() => { handle_DeleteUser(7) }}>DELETE USER</button>
      <button onClick={() => { handle_UpdateUser(12, { 'userId': 'rohit' }) }}>UPDATE USER</button>
      <button onClick={() => { handle_PatchUser(1, { 'config': { "language": "mr" } }) }}>PATCH USER</button>
    </>

  );
}

export default App;
