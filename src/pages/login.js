import { useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import { useState, useEffect, useContext } from "react";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = () => {};

  useEffect(() => {
    document.title = "Login - Instagram ";
  }, []);

  return <p>Hi Thoufic On Login</p>;
}
