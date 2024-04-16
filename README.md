# Waredrop raktérkezelő
## Használati feltételek
- Node telepítése
- PostgreSQL adatbázis létrehozása

## Backend futtatása
1. Navigáljunk a projekt mappájába és nyissuk meg a WareDrop_Backend/waredrop_backend mappát
2. Itt hozzunk létre egy `.env` fájlt
3. A `.nev` fájlba hozzunk létre egy `DATABASE_URL` nevű változót az adatbáziunk eléréséhez használt **connection string**-jét értékül adva
4. A `.env` fájlban hozzzunk létre egy `JWT_SECRET` nevű változót, aminek érékül adjuk a webtoken generálásához használ **secret stringet**
5. A `.env` fájl létrehozása után nyissunk meg egy parancssort és adjuk ki a következő parancsokat:
```
  npm install
  npx primsa db push
  npx prisma generate
```
6. Mindezek után indítsuk el a programot a `npm run start` paranccsal (ha watch mode-ban szeretnénk elindítani, akkor a `npm run start:dev` parancsal futtassuk)

## Frontend futtatás
1. Navigáljunk a projekt mappájába és nyissuk meg a WareDrop_Frontend/waredrop_frontend mappába
2. Adjuk ki a `npm install` parancsot
3. Majd a futtatáshoz a `npm start` parancsot, ezutánk meg fog nyílni a weboldal az alapértelmezett bőngészőben

## Mobil alakalmazás futtatása
1. Telefonra telepíteni kell az Expo Go alkalmazást.
2. Navigáljunk a projekt mappájában és nyissuk meg a WareDrop-M mappát.
3. Itt a BaseUrl.tsx-be írjuk át a baseUrl változót a saját ip-címünkre, a portszám marad.
4. Majd a mappában kiadjuk a következő parancsokat:
5.```
6. npm i
7. npx expo start
8. ```
9. A parancs kiadása után a terminálba megjelenik egy QR kód is.
10. Az applikációban van egy olyan opció hogy Scan QR code ezzel olvassuk le a terminálban megjelent QR kódot.
12. Fontos hogy ugyanazon a hálozaton legyen a mobileszközünk és a számítógépünk.
13. Az első betöltés elég hosszú ideig fog eltartani de utána már jelentősen lerövidül.
14. Az első szkennelés után az applikációban létrejön egy recently open-ed fül alatt az app, ott addig mindig újra tudjuk renderelni amíg ugyanazon a hálozaton vagyunk.

## Adat szerkezet
![image](https://github.com/DonkoHunor/waredrop_web/assets/144147106/3ff15b39-c315-412b-83bc-30f5211f585a)
