import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { Sidebar } from 'flowbite-react';
import { HiInbox } from 'react-icons/hi';

const url = "/dashboard";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  const menuData = JSON.parse(localStorage.getItem("menuData"));

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
          }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
          {/* <img src={brandImg} alt="" /> */}
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      {menuData !== "" && (
        <div className="m-4">
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.ItemGroup>
              {menuData.map((item) => (
                <Sidebar.Collapse label={item.PRCSNAME}>
                  {item.SUB_MENU.map((sub1) => (
                    sub1.SUB_MENU !== null ? (
                      <Sidebar.Collapse className="ml-1" label={sub1.PRCSNAME}>
                        {sub1.SUB_MENU.map((sub2) => (
                          sub2.SUB_MENU !== null ? (
                            <Sidebar.Collapse className="ml-3" label={sub2.PRCSNAME}>
                              {sub2.SUB_MENU.map((sub3) => (
                                <Sidebar.Item href={url + sub3.PRCSPARA.REF_LINK} > {sub3.PRCSNAME}</Sidebar.Item>
                              ))}
                            </Sidebar.Collapse>
                          ) : (
                            <Sidebar.Item href={url + sub2.PRCSPARA.REF_LINK} > {sub2.PRCSNAME}</Sidebar.Item>
                          )
                        ))}
                      </Sidebar.Collapse>
                    ) : (
                      <Sidebar.Item href={url + sub1.PRCSPARA.REF_LINK} > {sub1.PRCSNAME}</Sidebar.Item>
                    )
                  ))}
                </Sidebar.Collapse>
              ))}
            </Sidebar.ItemGroup>
          </Sidebar>
        </div>
      )
      }

    </aside >
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
