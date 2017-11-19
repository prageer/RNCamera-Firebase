import React, { Component } from "react";
import PhotoList from "./PhotoList";
import DetailPhoto from "./DetailPhoto";
import { StackNavigator } from "react-navigation";

export default (DrawNav = StackNavigator({
  PhotoList: { screen: PhotoList },
  DetailPhoto: { screen: DetailPhoto }
}));
