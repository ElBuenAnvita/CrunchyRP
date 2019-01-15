# Crunchyroll-Rich-Presence 
Un intento de una aplicación de Crunchyroll con Discord Rich Presence.

# ¡Eso es demasiado! ¡Sólo quiero usarlo!
Contamos con [releases](https://github.com/ElBuenAnvita/Crunchyroll-Rich-Presence/releases), puedes descargar un setup para windows. El setup fue probado y funcionando en x64.

# Building yourself

## A ver, prepará el entorno
Necesitarás [Node.js](http://nodejs.org/en/download) instalado y añadido al PATH, así que sólo descarga el installer y asegúrate de seleccionar "agregar a PATH". La versión debe ser 7.0.0 >

## Corriendo
Debes instalar las dependencias. Así que, sólo pon `npm install` en la carpeta de repo.<br>
Una vez hecho, corre `npm start` para iniciar la aplicación.

## Build
La app también tiene un metodo de build, usado para distribución. Se generará un installer NSIS para la aplicación, y una versión packaged de ello.<br>
Para construir la app para distribuir, corre `npm run dist`.

# Información adicional
Me basé en [netflix-discord](https://github.com/nirewen/discord-netflix) para hacer un intento de la aplicación.

# Errores
Si Discord no está abierto, o el cliente RPC no se puede conectar a Discord, el Rich Presence no funcionará.<br>
Inclusive si Discord no está abierto, puedes seguir usando la aplicación como Crunchyroll.<br>
En caso de que tengas Discord abierto y no muestre el Rich Presence, por favor, cóloca las dos aplicaciones con los mismos permisos (Con permisos de Administrador o no.)

# Planeado
Por el momento la aplicación sólo cuenta con su característica de mostrar "En los catálogos" y la serie o manga con el número del episodio (no aplica para mangas) que te encuentras observando.<br>

## Se tiene planeado hacer para la(s) próxima(s) versión(es) (¡Es mi lista de To-Do!):
- Timestamp (sí, ese que dice "quedan 03:59") para el Rich Presence de acuerdo con el restante del vídeo.<br>
- Rich Presence traducido de acuerdo con el idioma con el que esté la página de Crunchyroll (Actualmente es Inglés).<br>
- Mejorar el diseño del logo del RP.<br>
- Agregar un "smallKey" para aquellos usuarios con suscripción Premium dentro de Crunchyroll.<br>
- Usar la extensión de la Chrome Web Store [Crunchyroll HTML5](https://chrome.google.com/webstore/detail/crunchyroll-html5/ihegfgnkffeibpmnajnoiemkcmlbmhmi). Aunque ya Crunchyroll cuente con un reproductor HTML5 nativo, con la extensión se podrá mejorar el rendimiento de carga.

# Colaboradores
<!-- ALL-CONTRIBUTORS-LIST:START - No cambies esto, carbón. -->
<!-- prettier-ignore -->
| [<img src="https://cdn.discordapp.com/avatars/331641970910953473/8997fa2877eda75adf1a64b6fbfefb46.png" width="100px;"/><br /><sub><b>ElBuenAnvita</b></sub>](http://anvi.cf/developers/anvita "ElBuenAnvita#7699")<br />[💻](https://github.com/ElBuenAnvita/discord-netflix/commits?author=ElBuenAnvita "Código") [🎨](#diseño-ElBuenAnvita "Diseño") | [<img src="https://cdn.discordapp.com/avatars/226997678117093376/833355baf529fff2ce99889f497c5549.png" width="100px;"/><br /><sub><b>Ruy</b></sub>](#no-enlace "Privado#0000")<br />[💻](#codigo-Ruy "Código") |
| :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

# Contribución / Ayuda
Puedes sugerir características para la aplicación o comentar/reportar errores (bugs) en la aplicación.