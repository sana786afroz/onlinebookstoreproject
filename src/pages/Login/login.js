import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../Login/login.module.css";
import { isLogIn } from "../../Recoil";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import Swal from "sweetalert2";
import { useSetRecoilState } from "recoil";
export default function Login() {
  const setIsLogin = useSetRecoilState(isLogIn);
  const nav = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [userData, setUserData] = useState([]);
  const [errorU, setErrorU] = useState("");
  const [errorP, setErrorP] = useState("");
  const [errorE, setErrorE] = useState("");
  useEffect(() => {
    if (localStorage.UserList) {
      setUserData(JSON.parse(localStorage.getItem("UserList")));
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
    setPassword(e.target.value);
    const regExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,20}$/;
    if (!regExp.test(password)) {
      setErrorP("Password Is Invalid");
    } else {
      setErrorP("");
    }
  }

  function handleClick() {
    let userDataFind = userData.find(
      (x) =>
        x.username === username && x.cpassword === password && x.email === email
    );
    if (userDataFind) {
      Swal.fire("You Are Successfully  Login !! ");
      setIsLogin(true);
      localStorage.setItem("currentUser", JSON.stringify(userDataFind));
      nav("home");
    } else if (username === "" || password === "" || email === "") {
      Swal.fire("Fill Input First");
    } else {
      Swal.fire("Do Register First");
      nav("/register");
    }
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

      <form style={{backgroundColor:"black"}}>
        <div className={style.parent}>
          <div className={style.form}>
            <div>
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

            <div>
              <p style={{ color: "black", fontSize: "1.2rem" }}>
                <i>
                  Dont have an account?{" "}
                  <Link style={{ color: "lightblue" }} to="/Register">
                    Register
                  </Link>
                </i>
              </p>

              <div>
                <button
                  className={style.btn}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick();
                  }}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
     
    </>
  );
}
