Jérémie Boulay - Jeudi 20 Novembre 2014

# Synopsis :

Réalisation d'une application générant du son en fonction de ce qu'écrit l'utilisateur.

**Une lettre = Un son**

Lorsqu'une lettre est tapée, elle sort du sol et s'échappe dans l'air provocant une ongulation du sol et un son.


# Librairies possibles :

- **Paper.js** pour la gestion de la courbe et des lettres (utilisé avec Canvas).
- **Audiolet.js** pour la génération du son. **abandonnée. utilisation de l'API audio simplement.**


# Etapes :

- Reconnaitre et afficher les lettres correspondantes **(écouteur)**.
- Faire l'animation des lettres **(class letter.js)**.
- Associer un son à une lettre. **(class sound.js)**
- Faire réagir la courbe en fonction du positionnement de la lettre créée. **(class spring.js)**
- Crée une représentation en fond du son joué. (Bonus)


# Nouvelles idées :

- Les lettres apparaissent assez proche les unes des autres.
- A force d'écrire, les lettres avances.
- Un espace fait apparaitre la prochaine lettre plus loin.
- Au bout de la ligne, on revient tout à gauche.
- Le son est créée en fonction du code de la lettre, de sa position et de sa taille. **seulement en fonction de sa taille**
- Les lettres ont des tailles différentes..
- Plus la lettre est grosse, plus l'onde est impactée.


# Classes construites

- **letter.js** pour gérer la lettre. Sa taille, couleur, position, sa durée de vie et son comportement.
- **sound.js** pour gérer le son, les modifications que je souhaite apporter dessus ect... 
- **spring.js** pour gérer le comportement du sol (les ondulations).

