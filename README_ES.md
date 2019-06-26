[Read in English](https://github.com/ElBuenAnvita/Crunchyroll-Rich-Presence/blob/master/README.md)

# Crunchyroll-Rich-Presence 
Un intento de una aplicación de Crunchyroll con Discord Rich Presence.
Deberías leer todo este documento (En serio...)

# ¡Eso es demasiado! ¡Sólo quiero usarlo!
Contamos con [releases](https://github.com/ElBuenAnvita/Crunchyroll-Rich-Presence/releases), puedes descargar un setup para windows. El setup fue probado y funcionando en x64.
No tenemos una licencia para nuestro instalador/exe, no somos la NASA, así que os puede saltar como un virus :P

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
Me basé en [discord-netflix](https://github.com/nirewen/discord-netflix) para hacer un intento de la aplicación.

# Limitaciones o errores
Si Discord no está abierto, o el cliente RPC no se puede conectar a Discord, el Rich Presence no funcionará.<br>
Inclusive si Discord no está abierto, puedes seguir usando la aplicación como Crunchyroll.<br>
En caso de que tengas Discord abierto y no muestre el Rich Presence, por favor, cóloca las dos aplicaciones con los mismos permisos (Con permisos de Administrador o no.)

El Timestamp o RP no funcionará en caso de que te encuentres observando un video de duración mayor o igual a 1:00:00 (una hora o más). En las siguientes versiones trataremos de corregir dicha limitación. Lo sentimos.

Se hizo un fix temporal al error en la versión 1.2 (No publicada), donde sólo la página servía para la versión inglés. Ahora pueden usarlo en cualquier idioma, aún así, sigue siendo recomendable que lo uses en Inglés por los posibles bugs. ¿Hay un bug, [repórtalo!]

# Planeado
Por el momento la aplicación sólo cuenta con su característica de mostrar "En los catálogos" y la serie o manga con el número del episodio (no aplica para mangas) que te encuentras observando.<br>

## Se tiene planeado hacer para la(s) próxima(s) versión(es) (¡Es mi lista de "Por hacer"!):
- ✅ Mostrar el Timestamp de tiempo transcurrido en el vídeo. (A medias, pero hecho en la versión 1.2)
- ✅ Mostrar nombre del episodio (¡Hecho en la versión 1.2! wiii).
- ❎ Rich Presence traducido de acuerdo con el idioma con el que esté la página de Crunchyroll (Actualmente es Inglés).<br>
- ✅ Mejorar el diseño del logo del RP. (¡Hecho en la versión 1.2! wiii)<br>
- ❎ Agregar un diseño exclusivo en el RP para aquellos usuarios con suscripción Premium dentro de Crunchyroll.<br>
- ❎ Colocar FlashPlayer para lectura de comics/mangas.<br>

¿Ideas? ¡Escríbenos a nuestro [discord](discord.gg/JRvV4mX) [SOPORTE SÓLO EN ESPAÑOL, INGLES]!

# Así se verá
**Versión 1.0**
![Watching](http://anvi.cf/editores/anvita/crunchyroll-rp/Crunchyroll-RP_1.png)
↑ Versión pequeña

![Watching](http://anvi.cf/editores/anvita/crunchyroll-rp/Crunchyroll-RP_2.png)
↑ Cuando estás viendo un capítulo de una serie, aparecerá esto.

~

**Versión 1.3**
![Browsing](http://anvi.cf/editores/anvita/crunchyroll-rp/Crunchyroll-RP-beta_Browsing_EN.png)
↑ Cuando estás en los catálogos, aparecerá esto.

![Watching](http://anvi.cf/editores/anvita/crunchyroll-rp/Crunchyroll-RP-beta_Watching_ES.png)
↑ Cuando estés viendo un video, y este esté pausado, aparecerá esto.

![Watching](http://anvi.cf/editores/anvita/crunchyroll-rp/Crunchyroll-RP-beta_Watching2_ES.png)
↑ Cuando estés viendo un video, y este esté rodando, aparecerá con el Timestamp.

# Colaboradores
<!-- ALL-CONTRIBUTORS-LIST:START - No cambies esto, carbón. -->
<!-- prettier-ignore -->
| [<img src="https://cdn.discordapp.com/avatars/331641970910953473/8997fa2877eda75adf1a64b6fbfefb46.png" width="100px;"/><br /><sub><b>ElBuenAnvita</b></sub>](http://anvi.cf/developers/anvita "ElBuenAnvita#7699")<br />[💻](https://github.com/ElBuenAnvita/Crunchyroll-Rich-Presence/commits?author=ElBuenAnvita "Código") [🎨](#diseño-ElBuenAnvita "Diseño") | [<img src="https://cdn.discordapp.com/avatars/226997678117093376/6b254e0b6e89dd40e0adc485d8bef156.png" width="100px;"/><br /><sub><b>_OcZi</b></sub>](https://github.com/_OcZi "Hermoso#0000")<br />[💻](https://github.com/ElBuenAnvita/Crunchyroll-Rich-Presence/commits?author=_OcZi "Código") |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

# Contribución / Ayuda
Puedes sugerir características para la aplicación o comentar/reportar errores (bugs) en la aplicación.

# Información
Esta aplicación/código/software no está avalado ni vinculado con Crunchyroll, ELLATION, AT&T, ni OTTER MEDIA.