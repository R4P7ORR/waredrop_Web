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
...

## Adat szerkezet
![image](https://github.com/DonkoHunor/waredrop_web/assets/144147106/3ff15b39-c315-412b-83bc-30f5211f585a)
