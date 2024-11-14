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
            try {
                let response = await fetch("https://localhost:3000", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ os: os }), 
                });

                if (!response.ok) {
                    throw new Error(`Ошибка HTTP! статус: ${response.status}`);
                }

                let stylesheet = await response.text();
                let link = document.createElement('link');
                link.rel = 'stylesheet';
                link.type = 'text/css';
                link.href = stylesheet; 
                document.head.appendChild(link);
            } catch (error) {
                console.error('Ошибка при получении данных', error);
            }
        }

        window.onload = getOS;