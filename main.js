const {BrowserWindow, app} = require('electron');
const client 			   = require('discord-rich-presence')('452959496038383648');
const widevine             = require('electron-widevinecdm');
const moment               = require('moment')
require('moment-duration-format');
const crypto               = require('crypto');

widevine.load(app);

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
        },
    }
    checkIfNotEng = `(function() {
        let [type, id] = window.location.pathname.split('/').slice(1);
        if (type == 'es' || type == 'es-es') {
            let notice = document.createElement('div'),
            close_btn = document.createElement('span');
            notice.className = 'error-notice';
            notice.setAttribute('style', 'position: fixed; top: 0px; background: #ef5858; border-bottom: 3px solid #e61616; border-radius: 3px; z-index: 101; color: white; width: 99%; line-height: 2em; text-align: center; margin: 0.5%;');
            close_btn.className = 'close-btn';
            close_btn.innerHTML = '&times;';
            close_btn.setAttribute('style', 'float: right; margin-right: 0.5%; font-size: 20px;');
            notice.innerHTML = 'Debes estar en la versión de inglés de Crunchyroll para que el Rich Presence funcione.';
            notice.appendChild(close_btn);
            document.body.appendChild(notice);
            notice.onclick = () => document.body.removeChild(notice);
            setTimeout(() => document.body.removeChild(notice), 15E3);
        }
        if (type == 'pt-br' || type == 'pt-pt') {
            let notice = document.createElement('div'),
            close_btn = document.createElement('span');
            notice.className = 'error-notice';
            notice.setAttribute('style', 'position: fixed; top: 0px; background: #ef5858; border-bottom: 3px solid #e61616; border-radius: 3px; z-index: 101; color: white; width: 99%; line-height: 2em; text-align: center; margin: 0.5%;');
            close_btn.className = 'close-btn';
            close_btn.innerHTML = '&times;';
            close_btn.setAttribute('style', 'float: right; margin-right: 0.5%; font-size: 20px;');
            notice.innerHTML = 'Você deve estar na página em inglês do Crunchyroll para que a Rich Presence funcione.';
            notice.appendChild(close_btn);
            document.body.appendChild(notice);
            notice.onclick = () => document.body.removeChild(notice);
            setTimeout(() => document.body.removeChild(notice), 15E3);
        }
        if (type == 'it') {
            let notice = document.createElement('div'),
            close_btn = document.createElement('span');
            notice.className = 'error-notice';
            notice.setAttribute('style', 'position: fixed; top: 0px; background: #ef5858; border-bottom: 3px solid #e61616; border-radius: 3px; z-index: 101; color: white; width: 99%; line-height: 2em; text-align: center; margin: 0.5%;');
            close_btn.className = 'close-btn';
            close_btn.innerHTML = '&times;';
            close_btn.setAttribute('style', 'float: right; margin-right: 0.5%; font-size: 20px;');
            notice.innerHTML = 'È necessario essere nella pagina inglese Crunchyroll per operazione di la Rich Presence.';
            notice.appendChild(close_btn);
            document.body.appendChild(notice);
            notice.onclick = () => document.body.removeChild(notice);
            setTimeout(() => document.body.removeChild(notice), 15E3);
        }
        if (type == 'fr') {
            let notice = document.createElement('div'),
            close_btn = document.createElement('span');
            notice.className = 'error-notice';
            notice.setAttribute('style', 'position: fixed; top: 0px; background: #ef5858; border-bottom: 3px solid #e61616; border-radius: 3px; z-index: 101; color: white; width: 99%; line-height: 2em; text-align: center; margin: 0.5%;');
            close_btn.className = 'close-btn';
            close_btn.innerHTML = '&times;';
            close_btn.setAttribute('style', 'float: right; margin-right: 0.5%; font-size: 20px;');
            notice.innerHTML = 'Vous devez être sur la page English Crunchyroll pour que Rich Presence fonctionne.';
            notice.appendChild(close_btn);
            document.body.appendChild(notice);
            notice.onclick = () => document.body.removeChild(notice);
            setTimeout(() => document.body.removeChild(notice), 15E3);
        }
        if (type == 'en-gb' || type == 'de' || type == 'ar' || type == 'ru' ) {
            let notice = document.createElement('div'),
            close_btn = document.createElement('span');
            notice.className = 'error-notice';
            notice.setAttribute('style', 'position: fixed; top: 0px; background: #ef5858; border-bottom: 3px solid #e61616; border-radius: 3px; z-index: 101; color: white; width: 99%; line-height: 2em; text-align: center; margin: 0.5%;');
            close_btn.className = 'close-btn';
            close_btn.innerHTML = '&times;';
            close_btn.setAttribute('style', 'float: right; margin-right: 0.5%; font-size: 50px;');
            notice.innerHTML = 'The language must be English (US) on Crunchyroll for the Rich Presence to work.';
            notice.appendChild(close_btn);
            document.body.appendChild(notice);
            notice.onclick = () => document.body.removeChild(notice);
            setTimeout(() => document.body.removeChild(notice), 15E3);
        }
        else return;
    })()`,
    getInfos = `(function() {
        let [type, id] = window.location.pathname.split('/').slice(1);
        if (!type && !id) {
            return {
                name  : 'Browsing',
                title : 'In the Catalogs',
            }
        }
        if (type == 'comics_read') {
            let text_manga = document.querySelector('a.text-link')
            return {
                name  : 'Reading a Manga',
                title : text_manga.querySelector('span') ? text_manga.querySelector('span').innerHTML : name.innerHTML,
            }
        }
        if (type == 'videos' || type == 'comics' || type == 'home') {
            return {
                name  : 'Browsing',
                title : 'In the Catalogs',
            }
        }
        else {
            let text_episodio = document.querySelector('#showmedia_about_media').getElementsByTagName('h4'),
                text_serie = document.querySelector('a.text-link'),
                text_name_episodio = document.querySelector('#showmedia_about_name').getElementsByTagName('h4'),
                text_video = document.querySelector('div.chrome-time-display');
                text_paused = document.querySelector("button[class='chrome-button chrome-play-button'] > svg");
            return {
                name             : text_serie.querySelector('span') ? text_serie.querySelector('span').innerHTML : name.innerHTML,
                title            : text_episodio.length ? text_episodio[1].innerHTML : undefined,
                videoCurrent     : text_video.querySelector('span.chrome-time-current') ? text_video.querySelector('span.chrome-time-current').innerHTML : name.innerHTML,
                videoDuration    : text_video.querySelector('span.chrome-time-duration') ? text_video.querySelector('span.chrome-time-duration').innerHTML : name.innerHTML,
                videoPaused      : text_paused.querySelector("path[d='M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z']"),
            }
        }
    })()`;

async function checkCrunchy() {

    let infos = await mainWindow.webContents.executeJavaScript(getInfos);

    if (infos) {
        let {name, title, videoCurrent, videoDuration, videoPaused} = infos,
            video = title && videoPaused
                ? `${title} (Paused)`
                : title,
            curr = parseInt(new Date().getTime().toString().slice(0, 10));
        let endTime = null;

        if (videoDuration && videoCurrent) {
            if (!videoPaused) {
                smallImageKey = "play_cr3";

                const milliseconds = (m, s) => (m*60000+s*1000);
                var now = moment();
                var current = videoCurrent; 
                var currentParts = current.split(':');
                var duration = videoDuration;
                var durationParts = duration.split(':');
                var result1 = milliseconds(currentParts[0], currentParts[1]);
                var result2 = milliseconds(durationParts[0], durationParts[1]);
    
                var final = result2 - result1;
    
                var time_wformat = moment.duration(final, 'milliseconds').format("mm:ss.SSS");
                console.log('ms: ' + final);
                console.log('w/format: ' + time_wformat);
    
                endTime = Date.now() + final;
            } else { smallImageKey = "paused_cr3" };
        };

        client.updatePresence({
            state: video,
            details: name,
            largeImageKey: 'null_v2',
            largeImageText: 'Crunchyroll',
            smallImageKey,
            instance: false,
            endTimestamp: endTime,
        });
}};

client.on('connected', () => {
    checkCrunchy();

    setInterval(() => {
        checkCrunchy()
    }, 15E3);
});

app.disableHardwareAcceleration(); // <= Deshabilitar hardware aceleration (gpu) para más de una pantalla (como en mi caso)

app.on('ready', () => {
    mainWindow = new BrowserWindow(WindowSettings);
    BrowserWindow.addDevToolsExtension(require('path').join(__dirname, 'extensions', 'crunchyhtml5', '0.14.2_0')); // <= Este es la extensión y su path, no cambiarlo.
    mainWindow.maximize();
    mainWindow.loadURL("https://www.crunchyroll.com/videos/anime");
    mainWindow.webContents.executeJavaScript(checkIfNotEng);
});

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});

