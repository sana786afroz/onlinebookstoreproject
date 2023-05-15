import React, { useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import style from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";
export default function Register() {
  const tohome = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [cpassword, setCpasswored] = useState("");
  const [userList, setUserList] = useState([]);
  const [errorU, setErrorU] = useState("");
  const [errorP, setErrorP] = useState("");
  const [errorE, setErrorE] = useState("");

  useEffect(() => {
    if (localStorage.getItem("UserList")) {
      let data = JSON.parse(localStorage.getItem("UserList"));
      setUserList(data);
    }
  }, []);
  function handleChangeU(e) {
    setUserName(e.target.value);
    const reg = /^[A-Za-z][A-Za-z0-9_]{3,29}$/;
    if (!reg.test(username)) {
      setErrorU("Username Not Valid");
    } else {
      setErrorU("");
    }
  }
  function handleChangeE(e) {
    setEmail(e.target.value);
    let regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*(\.\w{2,3})+$/;
    if (!regEx.test(email)) {
      setErrorE("Email Is Invalid");
    } else {
      setErrorE("");
    }
  }
  function handleChangeP(e) {
    setCpasswored(e.target.value);
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}$/;
    if (!regExp.test(cpassword)) {
      setErrorP("Password Is Invalid");
    } else {
      setErrorP("");
    }
  }

  function handleClick() {
    const userData = {
      id: Math.floor(Math.random() * 1000),
      username: username,
      email: email,
      cpassword: cpassword
    };
    setUserList(userList.push(userData));
    localStorage.setItem("UserList", JSON.stringify(userList));
    tohome("/");
  }
  const particlesInit = async (engine) => {
    console.log(engine);
    // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
};

const particlesLoaded = async (container) => {
    await console.log(container);
};

  return (
    <>
    <Particles
    id="tsparticles"
    init={particlesInit}
    loaded={particlesLoaded}
    options={{
      background: {
          color: {
              value: "#5DADE2 ",
          },
      },
      fpsLimit: 120,
      interactivity: {
          events: {
              onClick: {
                  enable: true,
                  mode: "push",
              },
              onHover: {
                  enable: true,
                  mode: "repulse",
              },
              resize: true,
          },
          modes: {
              push: {
                  quantity: 4,
              },
              repulse: {
                  distance: 200,
                  duration: 0.4,
              },
          },
      },
      particles: {
          color: {
              value: "#ffffff",
          },
          links: {
              color: "",
              distance: 150,
              enable: true,
              // opacity: 0.5,
              width: 1,
          },
          collisions: {
              enable: true,
          },
          move: {
              direction: "none",
              enable: true,
              outModes: {
                  default: "bounce",
              },
              random: false,
              // speed: 6,
              straight: false,
          },
          number: {
              density: {
                  enable: true,
                  area: 800,
              },
              value: 80,
          },
          opacity: {
              // value: 0.5,
          },
          shape: {
              type: "star",
          },
          size: {
              value: { min: 3 },
          },
      },
      detectRetina: true,

  }}
   />
    <div style={{backgroundColor:"black"}} className={style.parent}>
      <div  className={style.form}>
        <div >
          <input
            onChange={handleChangeU}
            placeholder="username"
            className={style.input}
          />
          <br />
          <span style={{ color: "black" }}>{errorU}</span>
        </div>
        <div>
          <input
            onChange={handleChangeE}
            placeholder="email"
            className={style.input}
          />
          <br />
          <span style={{ color: "black" }}>{errorE}</span>
        </div>
        <div>
          <input
            type="password"
            onChange={handleChangeP}
            placeholder="password"
            className={style.input}
          />
          <br />
          <span style={{ color: "black" }}>{errorP}</span>
        </div>

        <h3 style={{ color: "black" }}>
          <i>
            Already register..!{" "}
            <Link style={{ color: "lightblue" }} to="/">
              Login
            </Link>
          </i>
        </h3>

        <button className={style.btn} onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
    </>
  );
}
