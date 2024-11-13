"use strict"

async function getOS() {

    var userAgent = window.navigator.userAgent,
        platform = window.navigator.platform,
        macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
        windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
        iosPlatforms = ['iPhone', 'iPad', 'iPod'],
        os = null;
  
    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'pc';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'mobile';
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'pc';
    } else if (/Android/.test(userAgent)) {
      os = 'mobile';
    } else if (!os && /Linux/.test(platform)) {
      os = 'pc';
    }
    alert(os);
    let response = await fetch("https://localhost:3000",{
        method: 'POST',
        headers: {
            'Content-Type': 'text/plain'
        },
        body: os,
    });

    let stylesheet = await response.text();
    alert(stylesheet);
    document.querySelector('head').append(stylesheet);

    
  }
  
