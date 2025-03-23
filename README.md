# Test Technique Angular 19 - Niveau Senior

## 🎯 Objectif

Ce test technique est conçu pour évaluer les compétences des développeurs Angular ayant environ 5 ans d'expérience. Il met l'accent sur la résolution de bugs courants, l'optimisation des performances et les bonnes pratiques de développement avec les dernières fonctionnalités d'Angular 19.

## ⚙️ Prérequis

- Node.js 18+ et npm installés
- Connaissance approfondie d'Angular (v15+)
- Expérience avec RxJS et les Signals
- Compréhension des Web Workers
- Maîtrise des concepts de performance web

## 🚀 Installation et Démarrage

```bash
# Installation des dépendances
npm install

# Démarrage du serveur de développement
ng serve
```

L'application sera accessible sur `http://localhost:4200`

## 📝 Exercices

### 1. Correction des Bugs Visuels (15 minutes)

#### Modal et Z-index

- **Problème** : Le modal apparaît derrière d'autres éléments
- **Objectifs** :
  - Corriger la hiérarchie des z-index
  - Ajouter une animation fluide à l'ouverture/fermeture
  - Assurer que l'overlay couvre toute la page
  - Implémenter une fermeture au clic sur l'overlay

#### Points d'attention

- Structure HTML sémantique
- Gestion des z-index
- Animations CSS performantes
- Accessibilité (focus, keyboard events)

### 2. Optimisation RxJS et Gestion d'État (15 minutes)

#### Memory Leaks et Cache

- **Problème** : Fuites mémoire dans le service de données
- **Objectifs** :
  - Corriger l'implémentation du shareReplay
  - Gérer correctement les souscriptions
  - Optimiser la mise en cache des données
  - Implémenter les Signals de manière efficace

#### Points d'attention

- Gestion du cycle de vie des composants
- Utilisation correcte de takeUntil/destroy$
- Implémentation des Signals
- Pattern de mise en cache

### 3. Optimisation des Performances (15 minutes)

#### Calculs Intensifs

- **Problème** : Composant qui bloque le thread principal
- **Objectifs** :
  - Implémenter un Web Worker
  - Optimiser les calculs lourds
  - Gérer l'état de chargement
  - Assurer une UI responsive

#### Points d'attention

- Implémentation correcte des Web Workers
- Gestion des états de chargement
- Optimisation des performances
- Fallback pour les environnements sans Web Workers

## 🔍 Critères d'Évaluation

### Code Quality (40%)

- Architecture et organisation du code
- Utilisation des design patterns
- Typage TypeScript
- Respect des principes SOLID

### Performance (30%)

- Optimisation des calculs
- Gestion de la mémoire
- Temps de réponse UI
- Utilisation appropriée des Web Workers

### Best Practices (30%)

- Utilisation des dernières fonctionnalités Angular
- Gestion des effets de bord
- Tests et error handling
- Documentation du code

## 📋 Instructions de Soumission

1. Créez une branche pour vos modifications
2. Commitez vos changements avec des messages clairs
3. Documentez vos choix techniques
4. Ajoutez des tests si possible
5. Soumettez un PR avec vos modifications

## 💡 Conseils

- Utilisez les dernières fonctionnalités d'Angular 19
- Pensez à l'expérience utilisateur
- Documentez vos choix techniques
- Gérez les cas d'erreur
- Optimisez les performances
- Suivez les bonnes pratiques Angular

## 🚫 Contraintes

- Pas de bibliothèques externes supplémentaires
- Utilisation obligatoire des Standalone Components
- Respect de la structure existante
- Tests unitaires pour les nouvelles fonctionnalités

## 📚 Resources Utiles

- [Angular Documentation](https://angular.dev)
- [RxJS Documentation](https://rxjs.dev)
- [Web Workers API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
- [Angular Performance Guide](https://angular.dev/guide/performance)

Bonne chance ! 🚀
