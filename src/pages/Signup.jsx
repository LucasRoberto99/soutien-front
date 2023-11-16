import { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  //gestion d'erreur :
  const [errorMessage, setErrorMessage] = useState("");

  //version 1
  // const handleEmailChange = (event) => {
  //   const value = event.target.value;
  //   setEmail(value);
  // };

  // const handleUsernameChange = (event) => {
  //   const value = event.target.value;
  //   setUsername(value);
  // };

  // const handlePasswordChange = (event) => {
  //   const value = event.target.value;
  //   setPassword(value);
  // };

  // const handleDescriptionChange = (event) => {
  //   const value = event.target.value;
  //   setDescription(value);
  // };

  //version 2
  // le deuxieme argument précise quel setState je dois faire
  const handleInputChange = (event, input) => {
    setErrorMessage("");
    if (input === "username") {
      setUsername(event.target.value);
    } else if (input === "email") {
      setEmail(event.target.value);
    } else if (input === "description") {
      setDescription(event.target.value);
    } else if (input === "password") {
      setPassword(event.target.value);
    }
  };

  // submit
  const handleSubmit = async (event) => {
    // preventDefault sinon tout se rafraichi avant
    event.preventDefault();
    try {
      // console.log("1");
      const response = await axios.post("http://localhost:3000/user/signup", {
        email: email,
        password: password,
        description: description,
        username: username,
      });
      // console.log("2");
      console.log(response.data);
    } catch (error) {
      // console.log(error.response.data.error);
      // if (error.response.data.error === "This email is already used") {
      //   setErrorMessage(3);
      // } else if (error.response.data.error === "This username is already used") {
      //   setErrorMessage(4);
      // }
      setErrorMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <div>Singup</div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          type="text"
          name="email"
          value={email}
          onChange={(event) => {
            // je transmet event a ma fonction handleInput !
            handleInputChange(event, "email");
          }}
        />
        <input
          placeholder="Username"
          type="text"
          name="username"
          value={username}
          onChange={(event) => {
            handleInputChange(event, "username");
          }}
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={(event) => {
            handleInputChange(event, "password");
          }}
        />
        <input
          placeholder="Description"
          type="text"
          name="description"
          value={description}
          onChange={(event) => {
            handleInputChange(event, "description");
          }}
        />
        <button>Create</button>
      </form>
      <div>{errorMessage}</div>
    </div>
  );
};

export default Signup;
