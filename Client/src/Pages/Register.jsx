import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom'; 
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from '../Services/allAPI'; 
import './page.css';

function Register() {
  const [userInput, setUserInput] = useState({
    username: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleUserInput = (e) => {
    const { value, name } = e.target;
    let error = '';

    if (!value.trim()) {
      error = `*${name} is required`;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error
    }));

    setUserInput((prevInput) => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleRegister = async () => {
    const { username, password } = userInput;

    if (!username || !password) {
      toast.error("Please fill out the form completely");
    } else {
      try {
        const requestBody = {
          username,
          password
        };

        const result = await registerAPI(requestBody);

        if (result.status === 200) {
          toast.success("Registration successful");
          setUserInput({ username: "", password: "" });
          toast.success(result.message || "Successfully Registerd"); 
          navigate("/login");
        } else if (result.response.data.status===400) {
          toast.error(result.response.data.message || "Username already exists"); 
          setTimeout(() => {
            navigate('/login')
          }, 3000);
         
        } else {
          toast.error("Registration failed");
        }
      } catch (err) {
        console.error(err);
        toast.error("An error occurred during registration");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(userInput).forEach((key) => {
      if (!userInput[key].trim()) {
        newErrors[key] = `*${key} is required`;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      handleRegister();
    }
  };

  return (
    <>
      <div className="body flex justify-center items-center">
        <div className="w-1/2 border-1 p-2 rounded-lg font-mono">
          <p className="text-center underline font-bold">Register</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formGroupUsername">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={handleUserInput}
                value={userInput.username}
              />
              {errors.username && <div className="text-danger">{errors.username}</div>}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleUserInput}
                value={userInput.password}
              />
              {errors.password && <div className="text-danger">{errors.password}</div>}
            </Form.Group>
            <div className="flex justify-center">
              <Button className="bg-[#14b8a6] border-transparent hover:bg-[#22d3ee]" type="submit">
                Submit
              </Button> 
            </div>
            <a href='/login' className="underline">Login</a>
          </Form>
        </div>
      </div>
      <ToastContainer /> 
    </>
  );
}

export default Register;
