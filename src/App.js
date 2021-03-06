import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import useAuthListener from "./hooks/use-auth-listener";
import UserContext from "./context/user";
import ProtectedRoute from "./helpers/protected-route";
import IsUserLoggedIn from "./helpers/is-user-logged-in";

const NotFound = lazy(() => import("./pages/not-found"));
const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Profile = lazy(() => import("./pages/profile"));

function App() {
  const { user } = useAuthListener();
  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense
          fallback={
            <div
              style={{
                background: "white",
                height: "100vh",
                width: "100%",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <img
                  // className={className}
                  src="/gif/loader.gif"
                  alt={`default `}
                ></img>
              </div>
            </div>
          }
        >
          <Switch>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              user={user}
              loggedInPath={ROUTES.DASHBOARD}
              path={ROUTES.SIGN_UP}
            >
              <SignUp />
            </IsUserLoggedIn>
            <Route path={ROUTES.PROFILE} component={Profile} />
            <Route path={ROUTES.NOT_FOUND} component={NotFound} />
            <ProtectedRoute user={user} path={ROUTES.DASHBOARD}>
              <Dashboard />
            </ProtectedRoute>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// import { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import * as ROUTES from "./constants/routes";
// import UserContext from "./context/user";
// import useAuthListener from "./hooks/use-auth-listener";

// import ProtectedRoute from "./helpers/protected-route";

// const Login = lazy(() => import("./pages/login"));
// const SignUp = lazy(() => import("./pages/sign-up"));
// const Dashboard = lazy(() => import("./pages/dashboard"));
// const Profile = lazy(() => import("./pages/profile"));
// const NotFound = lazy(() => import("./pages/not-found"));

// export default function App() {
//   const { user } = useAuthListener();

//   return (
//     <UserContext.Provider value={{ user }}>
//       <Router>
//         <Suspense fallback={<p>Loading...</p>}>
//           <Switch>
//             <Route path={ROUTES.LOGIN} component={Login} />
//             <Route path={ROUTES.SIGN_UP} component={SignUp} />
//             <Route path={ROUTES.PROFILE} component={Profile} />
//             <ProtectedRoute user={user} path={ROUTES.DASHBOARD} exact>
//               <Dashboard />
//             </ProtectedRoute>
//             <Route component={NotFound} />
//           </Switch>
//         </Suspense>
//       </Router>
//     </UserContext.Provider>
//   );
// }
