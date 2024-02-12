import React, { useContext, useState } from 'react';
import AuthContext from '../../context/context';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { loginUser } = useContext(AuthContext);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginUser(username, password);
  };
  return (
    <>
      <div className="bg-gray-100 flex flex-row-reverse justify-center items-center h-screen">
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src="https://placehold.co/800x/667fff/ffffff.png?text=Your+Image&font=Montserrat"
            alt="Placeholder Image"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">ورود</h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-600">
                یوزرنیم
              </label>
              <input
                type="text"
                id="username"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                پسورد
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
              />
            </div>
            {/* <div className="mb-6 text-blue-500">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div> */}
            <button
              type="submit"
              className="bg-meta-5  hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              ورود
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
