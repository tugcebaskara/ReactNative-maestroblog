import { NativeModules, Platform } from "react-native";
import { Delete, Get, Post, Storage } from "../tools/Tools";

export default class AdressServices {
  async getBlogList(request) {
    return Get(
      `https://www.lenasoftware.com/api/v1/en/maestro/1?page=${request}&count=10`
    );
  }
}
