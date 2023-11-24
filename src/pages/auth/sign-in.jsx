import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import api from "@/api";
import { apiUrl, firstToken } from "@/constants";
import DropdownList from "react-widgets/DropdownList";

export function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [hasList, setHasList] = useState(false);
  const [companyList, setCompanyList] = useState([]);
  const [companySelected, setCompanySelected] = useState({});
  const [locationList, setLocationList] = useState([]);
  const [locationSelected, setLocationSelected] = useState({});

  const submitLogin = (e) => {
    if (hasList) {
      LoginCompany();
    }
    else {
      Login();
    }
    e.preventDefault();
    if (remember) {
      localStorage.setItem(
        "userLogin",
        JSON.stringify({
          username: username,
          password: password,
          remember: remember,
        })
      );
    }

  }
  const Login = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.loginUsername, {
        LGGECODE: "v",
        PASSWORD: password,
        PHONNAME: "",
        SYSTCODE: 4,
        COMPCODE: "PMC",
        USERLGIN: username,
        TKENDEVC: "",
        APP_CODE: "AER"
      })
      .then((res) => {
        if (res.data.RETNDATA !== null) {
          localStorage.setItem("usertoken", res.data.RETNDATA.TOKEN);
          var returnData = res.data.RETNDATA;
          if (
            returnData.COMPLIST.length == 1 &&
            returnData.COMPLIST[0].LCTNLIST.length == 1
          ) {
            // 1 cty - 1 chi nhanh
            setCompanySelected(returnData.COMPLIST[0]);
            setLocationSelected(returnData.COMPLIST[0].LCTNLIST[0]);
            LoginCompany();
          } else {
            // 2 cty - 2 chi nhanh
            setCompanyList(returnData.COMPLIST);
            setCompanySelected(returnData.COMPLIST[0]);
            setLocationList(returnData.COMPLIST[0].LCTNLIST);
            setLocationSelected(returnData.COMPLIST[0].LCTNLIST[0]);
            setHasList(true);
          }

        } else {
          alert("Đăng nhập thất bại");
        }
      })
  }
  const LoginCompany = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.loginCompany, {
        COMPCODE: companySelected.COMPCODE,
        LCTNCODE: locationSelected.LCTNCODE,
      })
      .then((res) => {
        if (res.data.RETNDATA !== null) {
          var returnData = res.data.RETNDATA;
          localStorage.setItem("usertoken", res.data.RETNDATA.TOKEN);
          saveUserData(returnData.USERLGIN);
          saveCompany(returnData.COMPLIST[0]);
          getMenu();
        } else {
          alert("Đăng nhập thất bại");
        }
      })
  }

  const getMenu = () => {
    api(localStorage.getItem("usertoken"))
      .post(apiUrl.getMenu, {
        MENUCODE: "WER1001001",
        TREECODE: "",
        TREELVEL: 10,
        MENU_ALL: 0
      }
      )
      .then((res) => {
        localStorage.setItem('menuData', JSON.stringify(res.data.RETNDATA))
        window.location.href = "/";
      })
  }

  const saveUserData = (userLogin) => {
    localStorage.setItem("userData", JSON.stringify(userLogin));
    localStorage.setItem("appMenu", JSON.stringify(userLogin.APP_MENU));
  };

  const saveCompany = (company) => {
    localStorage.setItem("company", JSON.stringify(company));
  };
  useEffect(() => {
    api(firstToken)
      .post(apiUrl.getToken, {
        COMPCODE: "PMC",
        APP_CODE: "WER",
        SYSTCODE: 8,
      })
      .then((res) => {
        if (res.data.RETNDATA !== null) {
          localStorage.setItem("usertoken", res.data.RETNDATA.TOKEN);
        }
      });
    if (localStorage.getItem("userLogin") != null) {
      const userLogin = JSON.parse(localStorage.getItem("userLogin"));
      if (userLogin.remember) {
        setUsername(userLogin.username);
        setPassword(userLogin.password);
        setRemember(true);
      }
    }
  }, []);

  useEffect(() => {
    if (
      companySelected &&
      companySelected.LCTNLIST &&
      companySelected.LCTNLIST.length > 0
    ) {
      setLocationList(companySelected.LCTNLIST);
      setLocationSelected(companySelected.LCTNLIST[0]);
    }
  }, [companySelected]);


  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          {hasList ? (
            <CardBody className="flex flex-col gap-4">
              <DropdownList
                data={companyList}
                value={companySelected}
                textField="COMPNAME"
                onChange={(value) => {
                  setCompanySelected(value);
                }}
              />
              <DropdownList
                data={locationList}
                value={locationSelected}
                textField="LCTNNAME"
                onChange={(value) => {
                  setLocationSelected(value);
                }}
              />
            </CardBody>
          ) : (
            <CardBody className="flex flex-col gap-4">
              <Input type="email" label="Username" size="lg" value={username || ""} onChange={(e) => setUsername(e.target.value)} />
              <Input type="password" label="Password" size="lg" value={password || ""} onChange={(e) => setPassword(e.target.value)} />
              <div className="-ml-2.5">
                <Checkbox label="Remember Me" value={remember || false} onChange={(e) => setRemember(e.target.checked)} />
              </div>

            </CardBody>
          )
          }


          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth onClick={submitLogin}>
              Sign In
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              Don't have an account?
              <Link to="/auth/sign-up">
                <Typography
                  as="span"
                  variant="small"
                  color="blue"
                  className="ml-1 font-bold"
                >
                  Sign up
                </Typography>
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </div >
    </>
  );
}

export default SignIn;
