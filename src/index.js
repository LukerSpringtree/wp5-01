import React from "react";
import ReactDOM from "react-dom";
import cryptoJs from "crypto-js";

import ico from "./assets/logo.ico";
import jpg from "./assets/logo.jpg";
import png from "./assets/logo.png";
import txt from "./assets/logo.txt";

console.log(cryptoJs.MD5("jianglin").toString());
/* 
  1. 不加module的配置居然也不会报错 
  2. 加了才会正确显示, 但是是新的  module配置
*/
console.log("ico", ico);
console.log("jpg", jpg);
console.log("png", png);
console.log("txt", txt);

ReactDOM.render(<h1>12221</h1>, root);

if (module.hot) {
  module.hot.accept();
}
