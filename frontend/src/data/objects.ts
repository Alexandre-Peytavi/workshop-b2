import type { ConnectedObject } from '../types'

export const OBJECTS: ConnectedObject[] = [
  {
    id: 'rick',
    name: 'Rick',
    category: 'Personnage / Scientifique',
    description: "Rick Sanchez, le scientifique le plus intelligent (et le plus alcoolique) de l'univers connu. Inventeur du portal gun, ennemi juré de la Fédération Galactique.",
    specs: {
      Statut: 'Rick C-137',
      QI: 'Incalculable',
      Boisson: 'Flasque toujours pleine',
      Spécialité: 'Science inter-dimensionnelle',
      Danger: '★★★★★',
      Rareté: 'Légendaire',
    },
  },
  {
    id: 'morty-concombre',
    name: 'Morty Comcombre',
    category: 'Créature / Clone',
    description: "Un Morty transformé en concombre par un rayon de mutation. Malgré son apparence, il garde une conscience et une anxiété toutes morty-esques.",
    specs: {
      Origine: 'Accident de laboratoire',
      Composition: '90% eau, 10% angoisse',
      Mobilité: 'Réduite',
      État: 'Toujours vivant (malheureusement)',
      Durée: 'Jusqu\'à pourrissement',
      Rareté: 'Peu commun',
    },
  },
  {
    id: 'morty',
    name: 'Morty',
    category: 'Personnage / Petit-fils',
    description: "Morty Smith, le petit-fils anxieux et malchanceux de Rick, traîné malgré lui dans des aventures inter-dimensionnelles chaotiques depuis toujours.",
    specs: {
      Âge: '14 ans',
      Statut: 'Morty C-137',
      'Niveau de stress': 'Permanent',
      Compétence: 'Survie (de justesse)',
      Danger: '★★☆☆☆',
      Rareté: 'Commun',
    },
  },
  {
    id: 'summer-smith',
    name: 'Summer Smith',
    category: 'Personnage / Petite-fille',
    description: "La sœur aînée de Morty, d'abord réticente aux aventures familiales avant de développer un goût prononcé pour l'action inter-dimensionnelle.",
    specs: {
      Âge: '17 ans',
      Statut: 'Petite-fille de Rick',
      Évolution: 'Combattante aguerrie',
      Spécialité: 'Sarcasme et survie',
      Danger: '★★★☆☆',
      Rareté: 'Rare',
    },
  },
  {
    id: 'vaisseau-rick-morty',
    name: 'Vaisseau de Rick et Morty',
    category: 'Véhicule / Transport',
    description: "Le vaisseau spatial personnel de Rick, capable de voyager entre les dimensions et les galaxies. Théâtre de nombreuses aventures (et fuites précipitées).",
    specs: {
      Fabricant: 'Rick Sanchez',
      Propulsion: 'Inter-dimensionnelle',
      Capacité: '2 passagers (+ invités occasionnels)',
      État: 'Cabossé mais fonctionnel',
      Vitesse: 'Supraluminique',
      Rareté: 'Légendaire',
    },
  },
]

export const getObjectById = (id: string) => OBJECTS.find((o) => o.id === id)