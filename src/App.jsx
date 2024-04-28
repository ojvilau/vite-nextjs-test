import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            {[1, 2, 3, 4, 5].map((id) => (
              <li>
                <Link to={`/users/${id}`}>User {id}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route
            path="/about"
            render={(props) => <About location={props.location} />}
          />
          <Route path={["/users/:id", "/users"]} component={Users} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About({ location }) {
  return <h2>About ({location.pathname})</h2>;
}

function Users() {
  const params = useParams();
  const id = +params.id;
  const [count, setCount] = useState(Number.isNaN(id) ? 0 : id);

  useEffect(() => {
    setCount(Number.isNaN(id) ? 0 : id);
  }, [id]);

  return (
    <>
      <h2>Users ({count})</h2>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
    </>
  );
}
