import * as React from "react";
import {
  HomeOutlined,
  NotificationImportantOutlined,
  MessageOutlined,
  LocalMovies,
  Movie,
  NetworkCheckOutlined
} from "@material-ui/icons/";

export const getNavMenu = () => [
  {
    title: "MENU.HOME",
    icon: <HomeOutlined />,
    link: "/home"
  },
  {
    title: "MENU.CONFIRM",
    icon: <MessageOutlined />,
    link: "/home/confirm"
  },
  {
    title: "MENU.ALERT",
    icon: <NotificationImportantOutlined />,
    link: "/home/alert"
  },
  {
    title: "MENU.API",
    icon: <NetworkCheckOutlined />,
    link: "/home/api"
  },
  {
    title: "MENU.OMDb",
    icon: <LocalMovies />,
    link: "/home/omdb"
  },
  {
    title: "MENU.OMDb.REDUXFORM",
    icon: <Movie />,
    link: "/home/omdbreduxform"
  },
];
