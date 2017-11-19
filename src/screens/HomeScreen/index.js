import React, { Component } from "react";
import Photos from "../Photos/";
import { DrawerNavigator } from "react-navigation";

const HomeScreenRouter = DrawerNavigator(
  {
    Photos: { screen: Photos }
  }
);

export default HomeScreenRouter;