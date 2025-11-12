# hello-world

A new repository
Hello World. I'm new on GitHub. I'm here to know more about the method to start my first real project.

## Tester la visualisation du système solaire

1. Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé (version 16 ou plus récente recommandée).
2. Depuis la racine du projet, installez le serveur statique `serve` s'il n'est pas déjà disponible :
   ```bash
   npx serve@14
   ```
3. Lancez le serveur local :
   ```bash
   npx serve@14 .
   ```
4. Ouvrez votre navigateur (Safari sur iPhone, Chrome, Firefox, etc.) et rendez-vous sur l'URL affichée par la commande (par défaut http://localhost:3000).
5. Interagissez avec la page `index.html` :
   - Utilisez la pipette de couleur pour modifier le fond.
   - Activez/désactivez l'affichage des orbites à l'aide de la case à cocher.
   - Naviguez dans la scène 3D en glissant pour pivoter la caméra, en pinçant ou en utilisant la molette pour zoomer.

### Alternative sans Node.js

Si vous ne disposez pas de Node.js, vous pouvez démarrer un serveur HTTP simple avec Python 3 :

```bash
python3 -m http.server 8000
```

Puis ouvrez `http://localhost:8000` dans votre navigateur.

> **Remarque :** ouvrir directement le fichier `index.html` depuis le disque peut empêcher le chargement des textures distantes à cause des restrictions de sécurité des navigateurs. Utilisez un serveur local comme indiqué ci-dessus pour éviter ce problème.
