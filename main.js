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
    },
    getInfos = `(function() {
        let [type, id] = window.location.pathname.split('/').slice(1, 2);
        let esli = window.location.pathname.split('/').slice(2);
        let eslo = window.location.pathname.split('/').slice(3);
        let path = window.location.pathname;
        
        if (!eslo) {
            return {
                name  : 'Browsing',
                title : 'In the Catalogs',
                tipo  : type,
                ide   : esli,
            }
        } else
        if (path.includes('comics_read')) {
            let text_manga = document.querySelector('a.text-link')
            return {
                name  : 'Reading a Manga',
                title : text_manga.querySelector('span') ? text_manga.querySelector('span').innerHTML : name.innerHTML,
                tipo  : type,
                ide   : esli,
            }
        } else
        if (path.includes('videos')||path.includes('comics')||path.includes('home')||path.includes('anime-news')) { // Para ser generosos, sí podrán ver noticias, y lo manda como si estuviese en catálogos.
            return {
                name  : 'Browsing',
                title : 'In the Catalogs',
                tipo  : type,
                ide   : esli,
            }
        }
        // if (path.includes('es')||path.includes('es-es')||path.includes('en-gb')||path.includes('pt-br')||path.includes('pt-pt')||path.includes('fr'))
        else {
            let text_episodio = document.querySelector('#showmedia_about_media').getElementsByTagName('h4'),
                text_serie = document.querySelector('a.text-link'),
                text_name_episodio = document.querySelector('#showmedia_about_info'),
                text_video = document.querySelector('div.chrome-time-display');
                text_paused = document.querySelector("button[class='chrome-button chrome-play-button'] > svg");
            return {
                name             : text_serie.querySelector('span') ? text_serie.querySelector('span').innerHTML : name.innerHTML,
                title            : text_episodio.length ? text_episodio[1].innerHTML : undefined,
                nombre_ep        : text_name_episodio.querySelector('h4#showmedia_about_name') ? text_name_episodio.querySelector('h4#showmedia_about_name').innerHTML : name.innerHTML,
                videoCurrent     : text_video.querySelector('span.chrome-time-current') ? text_video.querySelector('span.chrome-time-current').innerHTML : name.innerHTML,
                videoDuration    : text_video.querySelector('span.chrome-time-duration') ? text_video.querySelector('span.chrome-time-duration').innerHTML : name.innerHTML,
                videoPaused      : text_paused.querySelector("path[d='M 12,26 18.5,22 18.5,14 12,10 z M 18.5,22 25,18 25,18 18.5,14 z']"),
                tipo             : type,
                ide              : esli,
            }
        }
    })()`,
    paginasNoPermitidas = `let pagina = window.location.href;
    if(!pagina.startsWith("https://www.crunchyroll.com")) { // Devolver al catalogo si el usuario se va de crunchy. Así evitamos errores en el RPC.
        /* Tener en cuenta que: 
        El usuario NO podrá usar los acortadores de got.cr o bit.ly 
        porque... bueno, no puedo permitir que salga de CR.
        (En verda sí, pero no sé como hacer la excepción) 
        Ayúdame @Ruy ;u; */
        window.location.replace("https://www.crunchyroll.com/videos/anime");
    }
    if(pagina == "https://www.crunchyroll.com/forum") { // Devolver al catalogo si el usuario entra al foro
        window.location.replace("https://www.crunchyroll.com/videos/anime");
    }
    if(pagina.startsWith("https://www.crunchyroll.com/forumcategory")) { // Devolver al catalogo si el usuario entra a una categoria del foro
        window.location.replace("https://www.crunchyroll.com/videos/anime");
    }
    if(pagina.startsWith("https://www.crunchyroll.com/forumtopic")) { // Devolver al catalogo si el usuario entra a una discusión
        window.location.replace("https://www.crunchyroll.com/videos/anime");
    }
    if(pagina.includes("premium_comparison")) { // Si el usuario intenta comprar/comparar precios Premium, debe hacerlo en página externa-a-anvi.
        window.location.replace("https://www.crunchyroll.com/videos/anime")
        let notice = document.createElement('div'),
        close_btn = document.createElement('span');
        notice.className = 'error-notice';
        notice.setAttribute('style', 'position: fixed; top: 0px; background: #ef5858; border-bottom: 3px solid #e61616; border-radius: 3px; z-index: 101; color: white; width: 99%; line-height: 2em; text-align: center; margin: 0.5%;');
        close_btn.className = 'close-btn';
        close_btn.innerHTML = '&times;';
        close_btn.setAttribute('style', 'float: right; margin-right: 0.5%; font-size: 20px;');
        notice.innerHTML = "You can\'t upgrade your account using this app. Click this message to close it.";
        notice.appendChild(close_btn);
        document.body.appendChild(notice);
        notice.onclick = () => document.body.removeChild(notice);
        setTimeout(() => document.body.removeChild(notice), 15E3);
    }`; // No anda, paginasNoPermitidas no anda :c :suicide:

async function checkCrunchy() {

    let infos = await mainWindow.webContents.executeJavaScript(getInfos);

    if (infos) {
        let {name, title, nombre_ep, videoCurrent, videoDuration, videoPaused, tipo, ide} = infos,
            video = title && nombre_ep
                ? `${title} - ${nombre_ep}`
                : title,
            curr = parseInt(new Date().getTime().toString().slice(0, 10));
        let endTime = null;
        
        /*
        console.log("name actual: " + name);
        console.log("titulo actual: " + title);
        console.log("ide actual: " + ide);
        console.log("tipo actual: " + tipo)
        */

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
                /* console.log('ms: ' + final);
                console.log('w/format: ' + time_wformat);
                console.log('El episodio se llama: ' + nombre_ep) */
    
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
        checkCrunchy();
        // console.log(`state: ${video}`); // No andará debido a que las variables solo estan en la funcion de arriba.
        // console.log(`details: ${name}`); // Error vars
        // console.log(`pruebassssssss`);
    }, 15E3);
});

app.disableHardwareAcceleration(); // <= Deshabilitar hardware aceleration (gpu) para más de una pantalla (como en mi caso)

app.on('ready', () => {
    mainWindow = new BrowserWindow(WindowSettings);
    BrowserWindow.addDevToolsExtension(require('path').join(__dirname, 'extensions', 'crunchyhtml5', '0.14.3_0')); // <= Este es la extensión y su path, no cambiarlo.
    mainWindow.maximize();
    mainWindow.loadURL("https://www.crunchyroll.com/videos/anime");
    mainWindow.webContents.executeJavaScript(paginasNoPermitidas); // No anda, de alguna manera, desperdicié el tiempo
});

app.on('window-all-closed', app.quit);
app.on('before-quit', () => {
    mainWindow.removeAllListeners('close');
    mainWindow.close();
});

