// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
var os = require("os");
var ifaces = os.networkInterfaces();

window.addEventListener("DOMContentLoaded", () => {
  // const replaceText = (selector, text) => {
  //   const element = document.getElementById(selector);
  //   if (element) element.innerText = text;
  // };

  // for (const type of ["chrome", "node", "electron"]) {
  //   replaceText(`${type}-version`, process.versions[type]);
  // }

  Object.keys(ifaces).forEach(function(ifname) {
    var alias = 0;

    ifaces[ifname].forEach(function(iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }

      if (alias >= 1) {
        // this single interface has multiple ipv4 addresses
        console.log(ifname + ":" + alias, iface.address);
      } else {
        // this interface has only one ipv4 adress
        console.log(iface.address);
        const spanip = document.getElementById("ip");
        spanip.textContent = iface.address;

        var miCodigoQR = new QRCode(qrcode);

        miCodigoQR.makeCode(iface.address);

        var base64 = $("#qrcode img").attr("src");
      }
      ++alias;
    });
  });
});
