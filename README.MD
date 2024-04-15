# Puzzly-ionic-app

## Preparation de l'environement

### installation des packages (Juste pour la première fois)

```
npm i
```

### Changement des valeurs de l'adresse du backend 

dans **src > environements > environement.ts**

```ts
export const environment = {
  production: false,
  apiURI: "http://10.188.41.188:8080"
};
```

dans **src > environements > environement.prod.ts**

```ts
export const environment = {
  production: true,
  apiURI: "http://10.188.41.188:8080"
};
```

## Build des assets

```
ionic build --prod
```

## Creation du projet Android (Juste pour la première fois)

```
ionic cap add android
```

## Build pour android

```
ionic cap copy android
```

## Build des assets d'android (logo)

```
npx @capacitor/assets generate --android
```

## Ouverture dans android studio

```
ionic cap open android
```

## Ajout de la permission de l'utilisation du micro

Dans **AndroidManifest.xml** du projet **app**

```xml
<?xml version="1.0" encoding="utf-8" ?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">

  <application>
    <!-- Data -->
  </application>

  <!-- Permissions -->

  <uses-permission android:name="android.permission.INTERNET" />

  <!-- Ajout de cette permission -->
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
</manifest>
```

## Exécution

Exécution depuis android studio

## Licence

Ce projet est livré sous licence GPL3, voir [LICENCE](./LICENCE)