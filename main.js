const {BrowserWindow, app} = require('electron');
const client               = require('discord-rich-presence')('452959496038383648');
// const widevine             = require('electron-widevinecdm');
// const moment               = require('moment')
// require('moment-duration-format');
// const crypto               = require('crypto');
// const rpc                  = new Client({transport: 'ipc'});

// widevine.load(app); // WideVine innecesario

let appID = '452959496038383648',
    mainWindow,
    smallImageKey,
	smallImageText,
    start, end,
    WindowSettings = {
        backgroundColor: '#FFF',
        useContentSize: false,
        autoHideMenuBar: true,
        resizable: true,
        center: true,
        frame: true,
        alwaysOnTop: false,
        title: 'Crunchyroll',
        icon: __dirname + '/icon.ico',
        webPreferences: {
            nodeIntegration: false,
            plugins: true,
            webSecurity: false, // <- Deshabilita las politicas de cross-origin para acceder a Crunchyroll vilos-frame
        },
    },
    getInfos = `(function() {
        let [type, id] = window.location.pathname.split('/').slice(1, 2);
        let path = window.location.pathname;
        
        if (!type) {
            return {
                name  : 'Browsing',
                title : 'In the Catalogs',
            }
        } else
        if (path.includes('comics_read')) {
            let text_manga = document.querySelector('a.text-link')
            return {
                name  : 'Reading a Manga',
                title : text_manga.querySelector('span') ? text_manga.querySelector('span').innerHTML : name.innerHTML,
            }
        } else
        if (path.includes('videos')||path.includes('comics')||path.includes('home')||path.includes('anime-news')) { // Para ser generosos, sí podrán ver noticias, y lo manda como si estuviese en catálogos.
            return {
                name  : 'Browsing',
                title : 'In the Catalogs',
            }
        }
        else {
            let text_episodio = document.querySelector('#showmedia_about_media').getElementsByTagName('h4'),
                text_serie = document.querySelector('a.text-link'),
                text_name_episodio = document.querySelector('#showmedia_about_info'),
                FrameVilos = document.querySelector("iframe#vilos-player"),
                video = FrameVilos.contentDocument.querySelector("video");
            return {
                name             : text_serie.querySelector('span') ? text_serie.querySelector('span').innerHTML : name.innerHTML,
                nombre_ep        : text_name_episodio.querySelector('h4#showmedia_about_name') ? text_name_episodio.querySelector('h4#showmedia_about_name').innerHTML : name.innerHTML,
                title            : text_episodio.length ? text_episodio[1].innerHTML : undefined,
                hayFrame         : FrameVilos,
                vidCurrent       : video.currentTime,
                vidDuration      : video.duration,
                vidPaused        : video.paused,

            }
        }
    })()`;

async function checkCrunchy() {

    let infos = await mainWindow.webContents.executeJavaScript(getInfos);

    if (infos) {
        let {name, title, nombre_ep, hayFrame, vidCurrent, vidDuration, vidPaused} = infos,
            video = title && nombre_ep
                ? `${title} - ${nombre_ep}`
                : title,
            curr = parseInt(new Date().getTime().toString().slice(0, 10));
        let endTime = null;
        
        if(vidDuration && vidCurrent) {
            if(!vidPaused) {
                smallImageKey = "play_cr3";
                smallImageText = "Watching"

                const SegAMil = (s) => (s*1000);

                var MilVidDuration = SegAMil(vidDuration); // Pasar a milisegundos
                var MilVidCurrentTime = SegAMil(vidCurrent);

                var finalTime = MilVidDuration - MilVidCurrentTime; // Restar la duración y el donde va

                endTime = Date.now() + finalTime; // Sumar la fecha de ahora y los milisegundos de más

                console.log('el tiempo final es: ' + finalTime);
            } else {
                smallImageKey = "paused_cr3";
                smallImageText = "Watching - Paused";
            }
        }

        client.updatePresence({
            details: name,
            state: video,
            smallImageKey,
            smallImageText,
            largeImageKey: 'null_v2',
			largeImageText: 'Crunchyroll',
            instance: false,
            endTimestamp: endTime,
        });
}};

client.on('connected', () => {
    checkCrunchy();

    setInterval(() => {
        checkCrunchy();
    }, 15E3);
});

app.disableHardwareAcceleration(); // <= Deshabilitar hardware aceleration (gpu) para más de una pantalla (como en mi caso)
app.allowRendererProcessReuse = true; // Lo active porque lo pedia el logger


app.on('ready', () => {
    mainWindow = new BrowserWindow(WindowSettings);
    mainWindow.maximize();
    mainWindow.loadURL("https://www.crunchyroll.com/videos/anime");
});

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});

