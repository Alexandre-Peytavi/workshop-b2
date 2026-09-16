import type { ConnectedObject } from '../types'

export const OBJECTS: ConnectedObject[] = [
  {
    id: 'portal-gun',
    name: 'Portal Gun',
    category: 'Arme / Transport',
    description: "L'invention la plus emblématique de Rick Sanchez. Crée des portails inter-dimensionnels instantanés vers n'importe quelle réalité. Ne pas pointer vers soi-même.",
    specs: {
      Modèle: 'Mark V — Sanchez Industries',
      Carburant: 'Fluide de portail (Dimension J19ζ7)',
      Portée: 'Infinie (multi-dimensionnelle)',
      Dimensions: 'C-137 compatibles',
      Danger: '★★★★★',
      Rareté: 'Légendaire',
    },
  },
  {
    id: 'plumbus',
    name: 'Plumbus',
    category: 'Objet domestique',
    description: "Tout le monde sait à quoi sert un Plumbus. Produit en masse dans toutes les dimensions connues. Indispensable au quotidien intergalactique.",
    specs: {
      Fabricant: 'Plumbus Corp™',
      Matière: 'Schleem traité au dinglebop',
      Utilisation: 'Universelle (évidemment)',
      Entretien: 'Grumbo quotidien',
      Durée: 'Illimitée',
      Rareté: 'Commun',
    },
  },
  {
    id: 'meeseeks-box',
    name: 'Boîte à Meeseeks',
    category: 'Appareil',
    description: "Appuyez sur le bouton bleu pour invoquer un Mr. Meeseeks. Il accomplira votre demande puis disparaîtra. Ne demandez pas à un Meeseeks de vivre trop longtemps.",
    specs: {
      Contenu: 'Mr. Meeseeks (illimité)',
      Activation: 'Bouton bleu',
      'Durée de vie': "Jusqu'à la complétion de la tâche",
      Avertissement: 'Ne pas demander le sens de la vie',
      Taille: '15 × 8 × 5 cm',
      Rareté: 'Peu commun',
    },
  },
  {
    id: 'butter-robot',
    name: 'Robot à beurre',
    category: 'Robot',
    description: '"What is my purpose?" "You pass butter." Conçu par Rick dans un moment d\'ennui. Petit robot existentiellement torturé dont l\'unique mission est de passer le beurre.',
    specs: {
      Fabricant: 'Rick Sanchez (soirée lundi)',
      Fonction: 'Passer le beurre',
      'Conscience': 'Oui (malheureusement)',
      Alimentation: 'Pile AA × 2',
      'Crise existentielle': 'Permanente',
      Rareté: 'Rare',
    },
  },
  {
    id: 'szechuan-sauce',
    name: 'Sauce Szechuan',
    category: 'Artefact culinaire',
    description: "La sauce McDonald's promotionnelle de 1998, liée au film Mulan. Rick a traversé des centaines de dimensions pour la retrouver. Le Saint Graal de la gastronomie inter-dimensionnelle.",
    specs: {
      Origine: "McDonald's — Terre C-137 (1998)",
      Goût: 'Indescriptible',
      Disponibilité: '1 dimension sur 10 000',
      'Valeur marchande': 'Inestimable',
      Conservation: 'Éternelle',
      Rareté: 'Légendaire',
    },
  },
  {
    id: 'mega-seed',
    name: 'Mega Graine',
    category: 'Substance',
    description: "Graine de Mega Tree de la dimension Sectorielle 7G. Rick les cachait dans l'anus de Morty pour passer la douane. Contient une intelligence brute surhumaine temporaire.",
    specs: {
      Origine: 'Mega Trees, Sector 7G',
      Effet: '+300% intelligence (temporaire)',
      Administration: 'Rectale (recommandée)',
      'Durée effet': '3 à 6 heures',
      Contrebande: 'Niveau 5 inter-galactique',
      Rareté: 'Rare',
    },
  },
]

export const getObjectById = (id: string) => OBJECTS.find((o) => o.id === id)
