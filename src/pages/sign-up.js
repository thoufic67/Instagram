// import { useHistory, Link } from "react-router-dom";
// import FirebaseContext from "../context/firebase";
// import { useState, useEffect, useContext } from "react";
// import * as ROUTES from "../constants/routes";
// import { doesUsernameExist } from "../services/firebase";

// export default function SignUp() {
//   const history = useHistory();
//   const { firebase } = useContext(FirebaseContext);

//   const [username, setUsername] = useState("");
//   const [fullName, setFullName] = useState("");
//   const [emailAddress, setEmailAddress] = useState("");
//   const [password, setPassword] = useState("");

//   const [error, setError] = useState("");
//   const isInvalid =
//     password === "" ||
//     emailAddress === "" ||
//     fullName === "" ||
//     username === "";

//   const handleSignUp = async (event) => {
//     event.preventDefault();

//     const usernameExists = await doesUsernameExist(username);

//     if (!usernameExists.length) {
//       try {
//         const createdUserResult = await firebase
//           .auth()
//           .createUserWithEmailAndPassword(emailAddress, password);

//         //authentication

//         await createdUserResult.user.updateProfile({
//           displayName: username,
//         });

//         //firebase user collection
//         await firebase.firestore().collection("users").add({
//           userId: createdUserResult.user.userId,
//           username: username.toLocaleLowerCase(),
//           fullName,
//           emailAddress: emailAddress.toLowerCase(),
//           following: [],
//           dateCreated: Date.now(),
//         });

//         await history.push(ROUTES.DASHBOARD);
//         console.log("Signed up Successfully");
//       } catch (error) {
//         console.log("error occured", error);
//         // setFullName("");
//         setEmailAddress("");
//         // setUsername("");
//         // setPassword("");
//         setError(error);
//       }
//     } else {
//       setError("That username is already taken, please try another.");
//       setUsername("");
//     }
//     //   try {
//     //   } catch (error) {}
//   };

//   useEffect(() => {
//     document.title = "Signup - Instagram ";
//   }, []);

//   return (
//     <div className="container flex mx-auto max-w-screen-md items-center h-screen">
//       <div className="flex w-3/5">
//         <img
//           src="/images/iphone-with-profile.jpg"
//           alt="IPhone with profile"
//           //   className="max-w-full"
//         />
//       </div>
//       <div className="flex flex-col w-2/5">
//         <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
//           <h1 className="flex justify-center w-full">
//             <img
//               src="/images/logo.png"
//               alt="Instagram"
//               className="mt-2 w-6/12 mb-4"
//             />
//           </h1>
//           {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

//           <form onSubmit={handleSignUp} method="POST">
//             <input
//               aria-label="Phone number, username or email"
//               type="text"
//               placeholder="Phone number, username or email"
//               value={emailAddress}
//               className="text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2"
//               onChange={({ target }) => setEmailAddress(target.value)}
//             />
//             <input
//               aria-label="Full Name"
//               type="text"
//               placeholder="Full Name"
//               value={fullName}
//               className="text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2"
//               onChange={({ target }) => setFullName(target.value)}
//             />
//             <input
//               aria-label="Username"
//               type="text"
//               placeholder="Username"
//               value={username}
//               className="text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2"
//               onChange={({ target }) => setUsername(target.value)}
//             />
//             <input
//               aria-label="Enter your password"
//               type="password"
//               placeholder="Password"
//               value={password}
//               className="text-sm text-gray-base w-full py-5 px-4 h-2 border border-gray-primary rounded mb-2"
//               onChange={({ target }) => setPassword(target.value)}
//             />
//             <button
//               disabled={isInvalid}
//               type="submit"
//               className={`bg-blue-medium text-white w-full rounded h-8 font-bold
//             ${isInvalid && "opacity-50"}`}
//             >
//               Sign Up
//             </button>
//           </form>
//         </div>
//         <div className="flex justify-center items-center flex-col w-full bg-white p-4 mt-4 border border-gray-primary rounded">
//           <p className="text-sm">
//             Have an account ? {""}
//             <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
//               Log in{" "}
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as ROUTES from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";
import Footer from "../components/footer";

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExist(username);
    if (!usernameExists.length) {
      try {
        const createdUserResult = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        // authentication
        // -> emailAddress & password & username (displayName)
        await createdUserResult.user.updateProfile({
          displayName: username,
        });

        // firebase user collection (create a document)
        await firebase
          .firestore()
          .collection("users")
          .add({
            userId: createdUserResult.user.uid,
            username: username.toLowerCase(),
            fullName,
            emailAddress: emailAddress.toLowerCase(),
            following: ["2"],
            followers: [],
            dateCreated: Date.now(),
          });

        history.push(ROUTES.DASHBOARD);
      } catch (error) {
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      }
    } else {
      setUsername("");
      setError("That username is already taken, please try another.");
    }
  };

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  return (
    <div className="container flex mx-auto justify-center max-w-screen-md items-center h-screen transition delay-150 duration-300 ease-in-out">
      <div className="flex w-3/5 invisible absolute sm:visible sm:relative">
        <img
          src="/images/iphone-with-profile.jpg"
          alt="iPhone with Instagram app"
        />
      </div>
      <div className="flex flex-col w-3/4 sm:w-2/5">
        <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/logo.png"
              alt="Instagram"
              className="mt-2 w-6/12 mb-4"
            />
          </h1>

          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            />
            <input
              aria-label="Enter your full name"
              type="text"
              placeholder="Full name"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setFullName(target.value)}
              value={fullName}
            />
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email address"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setEmailAddress(target.value)}
              value={emailAddress}
            />
            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            />
            <button
              disabled={isInvalid}
              type="submit"
              className={`bg-blue-medium text-white w-full rounded h-8 font-bold
            ${isInvalid && "opacity-50"}`}
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
          <p className="text-sm">
            Have an account?{` `}
            <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
      <div className="fixed bottom-10 w-screen">
        <Footer />
      </div>
    </div>
  );
}
