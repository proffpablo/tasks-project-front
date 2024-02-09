import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {

  const { isAuthenticated, logOut, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10">
      <Link to={
        isAuthenticated ? "/tasks" : "/"
      }>
      <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>
              Welcome {user.username}
            </li>
            <li>
              <Link
                to="/add-task" 
                className="bg-indigo-500 px-4 py-1 rounded-md"
                >
                  Add Task
                </Link>
            </li>
            <li>
              <Link 
                to="/" 
                onClick={() => { 
                  logOut(); 
                  }}
                  >Logout
                </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link 
                to="/login"
                className="bg-indigo-500 px-4 py-1 rounded-md"
              >
                Login
              </Link>
            </li>
            <li>
              <Link 
                to="/register"
                className="bg-indigo-500 px-4 py-1 rounded-md"
                >
                  Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar;