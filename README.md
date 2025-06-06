# GreenThumb_backend

Backend za INFSUS projekt GreenThumb

## Opis

Ovaj projekt je backend aplikacija za GreenThumb, sustav za praćenje i upravljanje rastom biljaka. Omogućuje CRUD operacije nad biljkama i dnevnicima rasta putem REST API-ja.

## Pokretanje servera

1. Instalirajte potrebne pakete:
   ```
   npm install
   ```
2. Pokrenite server:
   ```
   npx nodemon index.js
   ```

Server će biti dostupan na `http://localhost:3000` (ili port koji ste postavili).

## Pokretanje testova

Za pokretanje svih testova koristite:

```
npm test
```

ili

```
npx jest
```

Testovi se nalaze u direktoriju `test` i automatski će biti pokrenuti pomoću Jest-a.

## Korištenje Postman kolekcije

Za testiranje API-ja možete koristiti priloženu Postman kolekciju:

1. Otvorite Postman.
2. Uvezite kolekciju (`GreenThumb_backend.postman_collection.json`).
3. Prilagodite basUrl unutar varijabla u kolekciji ako je potrebno (npr. `http://localhost:3000`).
4. Izvršavajte zahtjeve za testiranje svih dostupnih ruta (GET, POST, PUT, DELETE) za biljke i dnevnike rasta.
