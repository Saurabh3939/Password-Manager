import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const TestManager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getpasswords = async () => {
    let req = await fetch("http://localhost:3000");
    let passwords = await req.json();
    console.log(passwords);
    setPasswordArray(passwords);
  };

  useEffect(() => {
    getpasswords();
  }, []);

  const copyText = (text) => {
    toast.success(`🦄 Copied : ${text}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passwordRef.current.type = "text";
    console.log(ref.current.src);
    if (ref.current.src.includes("hidden.png")) {
      ref.current.src = "eye.png";
      passwordRef.current.type = "password";
    } else {
      ref.current.src = "hidden.png";
      passwordRef.current.type = "text";
    }
  };
  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      //If Any Such Id Exists In The DB , Delete It
      await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: form.id }),
      });

      setPasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      await fetch("http://localhost:3000/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      // );
      // console.log([...passwordArray, form]);
      setForm({ site: "", username: "", password: "" });
      toast("🦄 Password Saved !", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error : Password Not Saved");
    }
  };

  const deletePassword = async (id) => {
    console.log("Deleting Password With id", id);
    let c = confirm("Do You Really Want To Delete This Password");
    if (c) {
      setPasswordArray(passwordArray.filter((item) => item.id !== id));
      let res = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      // localStorage.setItem(
      //   "passwords",
      //   JSON.stringify(passwordArray.filter((item) => item.id !== id))
      // );
      toast("🦄 Password Deleted!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };
  const editPassword = (id) => {
    console.log("Editing Password With id", id);
    setForm({ ...passwordArray.filter((i) => i.id === id)[0], id: id });
    setPasswordArray(passwordArray.filter((i) => i.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {/* <div className='absolute left-0 right-0 top-0 -z-10 m-auto  `h-77.5` `w-77.5` rounded-full bg-green-400 opacity-20 blur-[100px]'></div> */}
      <div className='p-3 md:my-container'>
        <h1 className='text-4xl font-bold text-center'>
          <span className='text-green-500'>&lt; Password</span>
          <span className='text-green-500'> Manager /&gt; </span>
        </h1>
        <p className='text-green-900 text-lg text-center'>
          Your Own Password Manager
        </p>
        <div className='text-black flex flex-col p-4 gap-8 items-center max-w-4xl mx-auto w-full'>
          <input
            className='bg-white rounded-full border border-green-500 w-full p-4 py-1'
            type='text'
            value={form.site}
            onChange={handleChange}
            placeholder='Enter Website URL'
            name='site'
            id='site'
          />
          <div className='flex flex-col md:flex-row  w-full gap-8'>
            <input
              className='bg-white rounded-full border border-green-500 w-full p-4 py-1'
              type='text'
              value={form.username}
              onChange={handleChange}
              placeholder='Enter Username'
              name='username'
              id='username'
            />
            <div className=' relative'>
              <input
                ref={passwordRef}
                className='bg-white rounded-full border border-green-500 w-full p-4 py-1'
                type='password'
                value={form.password}
                onChange={handleChange}
                placeholder='Enter Password'
                name='password'
                id='password'
              />
              <span
                className='absolute right-1 top-1 cursor-pointer'
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className='p-1'
                  width={26}
                  src='/eye.png'
                  alt='eye'
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className='flex  bg-green-500 border-2 border-green-900 gap-2 w-fit justify-center items-center hover:border hover:bg-green-300 rounded-full px-8 py-2'
          >
            <lord-icon
              src='https://cdn.lordicon.com/vjgknpfx.json'
              trigger='hover'
              colors='primary:#121331,secondary:#000000'
            ></lord-icon>
            Save Password
          </button>
        </div>
        <div className='passwords max-w-4xl mx-auto '>
          <h2 className='font-bold text-2xl py-4 t'>Your Passwrds</h2>
          {passwordArray.length === 0 && <div>No Passwords To Show</div>}
          {passwordArray.length != 0 && (
            <div className='overflow-x-auto w-full'>
              <table className='table-auto w-full overflow-hidden rounded-md mb-10'>
                <thead className='bg-green-800 text-white'>
                  <tr>
                    <th className='py-2'>Site</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    <th className='py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-green-100'>
                  {passwordArray.map((item, index) => {
                    return (
                      <tr key={item.id}>
                        <td className=' py-2  border border-white text-center'>
                          <div className='flex items-center justify-center'>
                            <a href={item.site} target='_blank'>
                              {item.site}
                            </a>
                            <div
                              className='lordIconCopy size-7 cursor-pointer'
                              onClick={() => {
                                copyText(item.site);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src='https://cdn.lordicon.com/tsrgicte.json'
                                trigger='hover'
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className='py-2 border border-white text-center'>
                          <div className='flex items-center justify-center'>
                            <span>{item.username}</span>
                            <div
                              className='lordIconCopy size-7  cursor-pointer'
                              onClick={() => {
                                copyText(item.username);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src='https://cdn.lordicon.com/tsrgicte.json'
                                trigger='hover'
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className='flex items-center justify-center py-2 border border-white text-center'>
                          <div className='flex items-center justify-center'>
                            <span>{"*".repeat(item.password.length)}</span>
                            <div
                              className='lordIconCopy size-7  cursor-pointer'
                              onClick={() => {
                                copyText(item.password);
                              }}
                            >
                              <lord-icon
                                style={{
                                  width: "25px",
                                  height: "25px",
                                  paddingTop: "3px",
                                  paddingLeft: "3px",
                                }}
                                src='https://cdn.lordicon.com/tsrgicte.json'
                                trigger='hover'
                              ></lord-icon>
                            </div>
                          </div>
                        </td>
                        <td className=' justify-center py-2 border border-white text-center'>
                          <span
                            className='cursor-pointer mx-1'
                            onClick={() => {
                              editPassword(item.id);
                            }}
                          >
                            <lord-icon
                              src='https://cdn.lordicon.com/exymduqj.json'
                              trigger='hover'
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                          <span
                            className='cursor-pointer mx-1'
                            onClick={() => {
                              deletePassword(item.id);
                            }}
                          >
                            <lord-icon
                              src='https://cdn.lordicon.com/jzinekkv.json'
                              trigger='hover'
                              style={{ width: "25px", height: "25px" }}
                            ></lord-icon>
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TestManager;
