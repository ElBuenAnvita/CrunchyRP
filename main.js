const {BrowserWindow, app} = require('electron');
const client 			   = require('discord-rich-presence')('452959496038383648');
const widevine             = require('electron-widevinecdm');
const moment               = require('moment');
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
                text_name_episodio = document.querySelector('#showmedia_about_name').getElementsByTagName('h4')
            return {
                name             : text_serie.querySelector('span') ? text_serie.querySelector('span').innerHTML : name.innerHTML,
                title            : text_episodio.length ? text_episodio[1].innerHTML : undefined,
            }
        }
    })()`;

async function checkCrunchy() {

    let infos = await mainWindow.webContents.executeJavaScript(getInfos);

    if (infos) { // if !infos don't change presence then.
    let {name, title} = infos;

    client.updatePresence({
        state: title,
        details: name,
        largeImageKey: 'null',
        instance: false,
    });
}};

client.on('connected', () => {
    checkCrunchy();

    setInterval(() => {
        checkCrunchy()
    }, 15E3);
});

app.disableHardwareAcceleration()

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
