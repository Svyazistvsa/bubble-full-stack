"use strict"

async function getOS() {

            let loc = window.location.pathname,
                userAgent = window.navigator.userAgent,
                platform = window.navigator.platform,
                macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
                windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
                iosPlatforms = ['iPhone', 'iPad', 'iPod'],
                os = null,
                location;

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

            switch(loc){
                case "/":
                    location = '';
                    break;
                default:
                    location = loc;    
            }
            
            let response = await fetch("https://localhost:3000"+location, {
                method: 'POST',
                headers: {                  
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ os: os }), 
            });  
                if (response.ok) {
                    
                const newDocument = await response.text();
                document.open();
                document.write(newDocument);
                document.close();
                
            } else {
                console.error('Ошибка при отправке запроса:', response.status);
            }

        }
        window.onload = getOS;