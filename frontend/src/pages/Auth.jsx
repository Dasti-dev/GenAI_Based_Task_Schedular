import { useState } from "react";

import {
  loginUser,
  signupUser
} from "../services/api";

function Auth({ setIsAuthenticated }) {

  const [isLogin, setIsLogin] = useState(true);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    name: "",

    email: "",

    password: ""
  });

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      let response;

      if (isLogin) {

        response = await loginUser({

          email: formData.email,

          password: formData.password
        });

      } else {

        response = await signupUser(formData);
      }

      const token =
        response.data.token;

      localStorage.setItem(
        "token",
        token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data)
      );

      setIsAuthenticated(true);

    } catch (err) {

      alert(
        err?.response?.data?.message ||
        "Authentication failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="
      min-h-screen
      bg-zinc-950
      flex
      items-center
      justify-center
      p-6
    ">

      <div className="
        w-full
        max-w-md
        bg-zinc-900
        border border-zinc-800
        rounded-3xl
        p-8
        shadow-2xl
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-2
          text-white
        ">
          TaskAI
        </h1>

        <p className="
          text-zinc-400
          mb-8
        ">
          AI-powered intelligent scheduler
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {!isLogin && (

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="
                w-full
                bg-zinc-950
                border border-zinc-800
                rounded-xl
                p-4
                outline-none
              "
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="
              w-full
              bg-zinc-950
              border border-zinc-800
              rounded-xl
              p-4
              outline-none
            "
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="
              w-full
              bg-zinc-950
              border border-zinc-800
              rounded-xl
              p-4
              outline-none
            "
          />

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              bg-blue-500
              hover:bg-blue-600
              transition-all
              rounded-xl
              p-4
              font-medium
            "
          >

            {loading
              ? "Please wait..."
              : isLogin
                ? "Login"
                : "Create Account"}
          </button>

        </form>

        <button
          onClick={() =>
            setIsLogin(!isLogin)
          }
          className="
            mt-6
            text-sm
            text-blue-400
          "
        >

          {isLogin
            ? "Create new account"
            : "Already have account?"}
        </button>

      </div>

    </div>
  );
}

export default Auth;