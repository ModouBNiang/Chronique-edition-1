export interface ArtworkPlate {
  id: string;
  catalogNumber: string;
  plateIndex: string;
  title: string;
  subtitle: string;
  artist: string;
  location: string;
  coordinates: string;
  year: string;
  medium: string;
  dimensions: string;
  optics: string;
  reverberation: string;
  imageUrl: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  description: string;
  curatorialNote: string;
  palette: string[];
  schematicType: 'monolith' | 'vault' | 'oculus' | 'cantilever' | 'colonnade';
}

export interface NarrativeIllustration {
  id: string;
  figureNumber: string;
  title: string;
  caption: string;
  location: string;
  coordinates: string;
  year: string;
  optics: string;
  imageUrl: string;
  parallaxSpeed: number; // e.g., -0.12, 0.18, -0.08
  aspect: string;
  schematicType: 'monolith' | 'vault' | 'oculus' | 'cantilever' | 'colonnade';
}

export interface MagazineEdition {
  id: string;
  editionNumber: string;
  code: string;
  season: string;
  publicationDate: string;
  readingTime: string;
  locationHeader: string;
  coordinates: string;
  themeTag: string;
  accentHex: string;
  hero: {
    kicker: string;
    titleLines: string[];
    italicWord: string;
    subtitle: string;
    leadQuote: string;
    author: string;
    authorRole: string;
    photographyCredit: string;
    heroImage: string;
    heroCaption: string;
    heroSpecs: {
      archiveRef: string;
      focalLength: string;
      filmStock: string;
      elevation: string;
    };
    schematicType: 'monolith' | 'vault' | 'oculus' | 'cantilever' | 'colonnade';
  };
  chapter1: {
    index: string;
    title: string;
    subtitle: string;
    epigraph: string;
    epigraphAuthor: string;
    dropCapParagraph: string;
    bodyColumns: string[];
    pullQuote: {
      text: string;
      attribution: string;
      context: string;
    };
    secondaryQuote: {
      text: string;
      metricLabel: string;
      metricValue: string;
    };
    marginNotes: {
      code: string;
      label: string;
      content: string;
    }[];
    illustrations: NarrativeIllustration[];
  };
  chapter2: {
    index: string;
    title: string;
    subtitle: string;
    intro: string;
    lightStudy: {
      title: string;
      location: string;
      dayState: {
        label: string;
        time: string;
        lux: string;
        kelvin: string;
        imageUrl: string;
        note: string;
      };
      duskState: {
        label: string;
        time: string;
        lux: string;
        kelvin: string;
        imageUrl: string;
        note: string;
      };
    };
    dialogue: {
      speaker: string;
      role: string;
      question: string;
      answer: string;
    }[];
  };
  artworksSection: {
    index: string;
    title: string;
    subtitle: string;
    curatorialStatement: string;
    items: ArtworkPlate[];
  };
  epilogue: {
    index: string;
    monumentalQuote: string;
    closingEssay: string;
    signature: string;
    signatureRole: string;
    colophon: {
      role: string;
      name: string;
      detail: string;
    }[];
  };
}

export const MAGAZINE_EDITIONS: MagazineEdition[] = [
  {
    id: 'edition-01',
    editionNumber: 'ÉDITION N° 01',
    code: 'CHR-2026-I // ARCH-SILENCE',
    season: 'AUTOMNE — HIVER 2026',
    publicationDate: '01 NOVEMBRE 2026',
    readingTime: '06 MIN',
    locationHeader: 'NAOSHIMA — ZÜRICH — PARIS',
    coordinates: '34°27′35″N 133°59′44″E',
    themeTag: 'DOSSIER SPÉCIAL // BRUTALISME POÉTIQUE & LUMIÈRE MINÉRALE',
    accentHex: '#c89d66',
    hero: {
      kicker: 'MONOGRAPHIE VISUELLE & DIRECTION ARTISTIQUE',
      titleLines: ["L'Architecture", 'du Silence', 'Minéral'],
      italicWord: 'du Silence',
      subtitle:
        "Enquête esthétique sur les sanctuaires de béton brut, la géométrie de l'ombre portée et la capacité du vide architectural à suspendre la perception du temps.",
      leadQuote:
        "« Construire, ce n'est pas ériger des murs contre le monde ; c'est découper un fragment d'obscurité pour que la lumière y devienne palpable. »",
      author: 'Sébastien Morel-Vane',
      authorRole: 'Rédacteur en Chef & Critique Spatial',
      photographyCredit: 'Atelier Kurokawa & Archives Fondation Tadao',
      heroImage:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85',
      heroCaption:
        'PLANCHE INAUGURALE 00 — Pavillon d’Observation de la Mer Intérieure, Naoshima. Voile de béton coffré au cèdre brûlé sous lumière rasante d’octobre.',
      heroSpecs: {
        archiveRef: 'ARCH-01 // NAOSHIMA-88',
        focalLength: 'HASSELBLAD 500C/M — 50MM F/4',
        filmStock: 'ILFORD DELTA 400 // TIRAGE BARYTÉ',
        elevation: '+42.8M NIVEAU MARITIME',
      },
      schematicType: 'monolith',
    },
    chapter1: {
      index: 'CHAPITRE I — 01 / 04',
      title: 'La Gravité Apprivoisée',
      subtitle: 'Lorsque la masse minérale devient un instrument optique.',
      epigraph:
        'Dans la pénombre d’une nef sans ornement, l’œil cesse de chercher le détail pour enfin habiter la proportion.',
      epigraphAuthor: 'CARNETS DE CHANTIER, KYOTO, 1998',
      dropCapParagraph:
        "Loin du tumulte des métropoles saturées de signes, une nouvelle génération d'architectes et de scénographes redécouvre la vertu radicale du dépouillement. Là où le XXe siècle voyait dans le béton brut une utopie industrielle ou sociale, le regard contemporain y débusque une peau sensible, poreuse aux moindres inflexions du ciel. Chaque banchage conserve la mémoire tactile du bois qui l'a contenu ; chaque joint creux trace une ligne d'horizon intérieure où le regard vient se reposer.",
      bodyColumns: [
        "Dans ces chambres d'écho minérales, la lumière n'est jamais admise par effraction. Elle est filtrée, canalisée, presque distillée par des failles zénithales d'une précision chirurgicale. Un rayon de quinze centimètres de largeur suffit à transfigurer une paroi de douze mètres de haut en un cadran solaire silencieux.",
        "L'expérience spatiale rejoint alors l'art cinématographique : le visiteur ne contemple pas un objet statique, il traverse une séquence de plans-séquences où son propre déplacement modifie la dramaturgie des ombres. Le silence n'y est plus une absence de bruit, mais une matière dense, presque acoustiquement mesurable.",
        "En refusant l'artifice décoratif, cette direction artistique de l'austérité volontaire restaure une intimité oubliée entre le corps humain et la géométrie élémentaire : le cercle de l'oculus, la verticale du pilier, l'horizontale de l'eau dormante."
      ],
      pullQuote: {
        text: "« La matière ne commence véritablement à exister que lorsque l'ombre lui accorde un contour et une lenteur. »",
        attribution: 'Kengo Takahashi',
        context: 'Entretiens sur la Matière Muette, Éditions Chronique, p. 42',
      },
      secondaryQuote: {
        text: 'Le vide n’est pas un manque : c’est la chambre de résonance nécessaire à toute émotion visuelle durable.',
        metricLabel: 'TEMPS DE RÉVERBÉRATION ACOUSTIQUE',
        metricValue: '4.8 SEC // 125 HZ',
      },
      marginNotes: [
        {
          code: 'NOTE 01 // MATÉRIAU',
          label: 'BÉTON DE POUZZOLANE & CENDRE VOLANTE',
          content:
            'Coulé d’un seul tenant sans reprise visible, le mélange absorbe 68% de la lumière incidente pour restituer un velours gris anthracite.',
        },
        {
          code: 'NOTE 02 // OPTIQUE',
          label: 'INCIDENCE SOLAIRE 23°44′',
          content:
            'Au solstice d’hiver, la fente sommitale aligne son faisceau exactement sur la rainure longitudinale du bassin de granit noir.',
        },
        {
          code: 'NOTE 03 // ARCHIVE',
          label: 'TYPOGRAPHIE DE L’ESPACE',
          content:
            'Les cotes gravées à même les seuils empruntent leurs proportions aux canons lapidaires de la Renaissance italienne.',
        },
      ],
      illustrations: [
        {
          id: 'fig-01',
          figureNumber: 'FIG. 01 — NEF LONGITUDINALE',
          title: 'Sanctuaire de la Coupe Oblique',
          caption:
            'Perspective axiale montrant la lame de lumière zénithale découpant le mur porteur nord. Cliché réalisé à 16h12 heure locale.',
          location: 'VALS, GRISONS (SUISSE)',
          coordinates: '46°37′00″N 9°10′51″E',
          year: '2025',
          optics: 'LEICA SL2-S // APO-SUMMICRON 35MM',
          imageUrl:
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=85',
          parallaxSpeed: -0.14,
          aspect: 'aspect-[4/5]',
          schematicType: 'vault',
        },
        {
          id: 'fig-02',
          figureNumber: 'FIG. 02 — PORTE D’OMBRE',
          title: 'Escalier Cénobitique n° 4',
          caption:
            'Succession de degrés en porte-à-faux sans contremarche, laissant filtrer la brume matinale depuis le jardin de mousse inférieur.',
          location: 'UJI, PRÉFECTURE DE KYOTO',
          coordinates: '34°53′21″N 135°48′01″E',
          year: '2026',
          optics: 'CHAMBRE LINHOF 4×5 // RODENSTOCK 90MM',
          imageUrl:
            'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1400&q=85',
          parallaxSpeed: 0.16,
          aspect: 'aspect-[16/11]',
          schematicType: 'cantilever',
        },
        {
          id: 'fig-03',
          figureNumber: 'FIG. 03 — ÉTUDE TACTILE',
          title: 'Empreinte de Coffrage au Cèdre Yakisugi',
          caption:
            'Macro-photographie de la paroi occidentale : le grain du bois carbonisé s’est imprimé en négatif dans le mortier frais.',
          location: 'ATELIER SETOUCHI, JAPON',
          coordinates: '34°24′11″N 134°02′19″E',
          year: '2026',
          optics: 'HASSELBLAD X2D 100C // XCD 120MM MACRO',
          imageUrl:
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=85',
          parallaxSpeed: -0.09,
          aspect: 'aspect-[3/4]',
          schematicType: 'oculus',
        },
      ],
    },
    chapter2: {
      index: 'CHAPITRE II — 02 / 04',
      title: 'Matière & Contre-Jour',
      subtitle: 'Étude comparative de la métamorphose lumineuse et dialogue avec les concepteurs.',
      intro:
        'Un même volume architectural contient plusieurs édifices distincts selon l’inclinaison du soleil. Manipulez le comparateur optique ci-dessous pour observer le basculement entre la clarté zénithale et le crépuscule minéral.',
      lightStudy: {
        title: 'ÉTUDE PHOTOMÉTRIQUE // PAVILLON DES BRUMES',
        location: 'STATION D’OBSERVATION BORÉALE, ÎLES LOFOTEN',
        dayState: {
          label: 'ÉTAT I — ZÉNITH BORÉAL',
          time: '13:15 UTC+1',
          lux: '14 200 LUX',
          kelvin: '5 600 K (LUMIÈRE DU JOUR)',
          imageUrl:
            'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
          note: 'Les arêtes vives du porte-à-faux découpent le ciel polaire ; le béton réfléchit une teinte craie chaude.',
        },
        duskState: {
          label: 'ÉTAT II — CRÉPUSCULE MINÉRAL',
          time: '19:48 UTC+1',
          lux: '180 LUX',
          kelvin: '3 100 K (AMBRE BASSE)',
          imageUrl:
            'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
          note: 'L’éclairage rasant dissimulé dans les gorges basses révèle la rugosité granulaire et dissout les limites du plafond.',
        },
      },
      dialogue: [
        {
          speaker: 'CLARA VANE (CHRONIQUE)',
          role: 'Directrice de la Photographie',
          question:
            'Pourquoi refuser systématiquement la couleur artificielle dans vos espaces d’exposition ?',
          answer:
            'Parce que la polychromie naturelle du ciel, lorsqu’elle se dépose sur une surface neutre de béton ou de basalte, offre déjà mille nuances d’ocre, de cobalt et de cendre entre l’aube et la nuit.',
        },
        {
          speaker: 'KENGO TAKAHASHI',
          role: 'Architecte DPLG, Studio Monolithe',
          question:
            'Comment concevez-vous le rythme de marche du visiteur à travers vos galeries ?',
          answer:
            'Nous travaillons comme des monteurs de cinéma. Une compression basse de plafond prépare toujours la dilatation soudaine d’une salle haute : le corps comprend la géométrie avant l’intellect.',
        },
      ],
    },
    artworksSection: {
      index: 'CHAPITRE III — 03 / 04',
      title: 'Corpus des Planches',
      subtitle: 'Sélection curatoriale de cinq œuvres architecturales et installations immersives.',
      curatorialStatement:
        'Défilez verticalement pour parcourir la galerie longitudinale. Cliquez sur une planche pour ouvrir la table lumineuse d’inspection technique.',
      items: [
        {
          id: 'artwork-01',
          catalogNumber: 'PLANCHE I / V',
          plateIndex: '01',
          title: 'Le Cénotaphe des Marées',
          subtitle: 'Architecture submersive & acoustique côtière',
          artist: 'Studio Kengo Takahashi & Associés',
          location: 'Île de Teshima, Mer Intérieure de Seto',
          coordinates: '34°29′14″N 134°05′12″E',
          year: '2026',
          medium: 'Béton marin bas-carbone, basalte poli & lame d’eau',
          dimensions: '42.0m × 18.5m × 11.2m',
          optics: 'Hasselblad H6D-100c — 24mm f/4.8',
          reverberation: '6.2 secondes à marée haute',
          imageUrl:
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'landscape',
          description:
            "Ancré à même le récif granitique, ce pavillon ouvert aux quatre vents laisse pénétrer le ressac lors des grandes marées d'équinoxe. L'eau devient alors le véritable plancher réfléchissant de l'édifice.",
          curatorialNote:
            "L'œuvre interroge la pérennité du geste constructif face à l'érosion saline : d'ici trente ans, la patine de sel et de lichen aura entièrement fusionné le mur et la falaise.",
          palette: ['#0c0d0e', '#2d3134', '#7a756c', '#c89d66', '#e8e4dc'],
          schematicType: 'monolith',
        },
        {
          id: 'artwork-02',
          catalogNumber: 'PLANCHE II / V',
          plateIndex: '02',
          title: 'Oculus Solstitiel n° 9',
          subtitle: 'Installation optique en chambre souterraine',
          artist: 'Hélène Vance & Collectif Aether',
          location: 'Carrières de Saint-Rémy, Provence',
          coordinates: '43°46′42″N 4°49′54″E',
          year: '2025',
          medium: 'Pierre calcaire taillée au fil diamanté & anneau de laiton patiné',
          dimensions: 'Ø 9.4m — Hauteur sous voûte 19.0m',
          optics: 'Leica M11 Monochrom — Summilux 28mm',
          reverberation: '5.4 secondes',
          imageUrl:
            'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'portrait',
          description:
            "Creusée à même le plafond d'une ancienne carrière romaine, cette ouverture circulaire transforme la voûte souterraine en camera obscura monumentale où le passage des nuages se projette au sol.",
          curatorialNote:
            "Aucun vitrage ne sépare le ciel de la chambre : la pluie tombe en rideau cylindrique parfait au centre d'un impluvium de pierre noire.",
          palette: ['#0f1012', '#3a352f', '#8c7355', '#c89d66', '#f4f1ea'],
          schematicType: 'oculus',
        },
        {
          id: 'artwork-03',
          catalogNumber: 'PLANCHE III / V',
          plateIndex: '03',
          title: 'Les Portiques de Brume',
          subtitle: 'Corridor péristyle et brumisation géothermique',
          artist: 'Soren Lindqvist Studio',
          location: 'Péninsule de Reykjanes, Islande',
          coordinates: '63°52′50″N 22°26′58″W',
          year: '2026',
          medium: 'Agrégat de lave noire, acier Corten & vapeur volcanique',
          dimensions: 'Longueur 84.0m × Largeur 4.2m',
          optics: 'Chambre Arca-Swiss — Schneider 72mm XL',
          reverberation: '2.9 secondes (champ ouvert)',
          imageUrl:
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'landscape',
          description:
            "Trente-deux portiques monolithiques s'alignent face aux champs de lave. Lorsque le vent du nord rabat la vapeur des sources chaudes voisines, la perspective se dissout en une peinture à l'encre mouvante.",
          curatorialNote:
            "La géométrie rigoureuse de la colonnade sert d'étalon visuel pour mesurer la densité changeante du brouillard arctique.",
          palette: ['#0c0d0e', '#1e2226', '#596169', '#a63a2b', '#dcd9d0'],
          schematicType: 'colonnade',
        },
        {
          id: 'artwork-04',
          catalogNumber: 'PLANCHE IV / V',
          plateIndex: '04',
          title: 'Cantilever du Vertige Calme',
          subtitle: 'Belvédère acoustique en haute altitude',
          artist: 'Atelier Rossi-Bauer',
          location: 'Col de la Furka, Alpes Uranaises',
          coordinates: '46°34′21″N 8°24′54″E',
          year: '2025',
          medium: 'Béton précontraint fibré & verre antireflet muséal',
          dimensions: 'Porte-à-faux 16.5m au-dessus du vide',
          optics: 'Phase One IQ4 150MP — Rodenstock 40mm',
          reverberation: '1.8 seconde (intérieur feutré)',
          imageUrl:
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'landscape',
          description:
            "Projeté dans le vide au-dessus du glacier du Rhône, ce prisme de béton brut offre à son extrémité une chambre de silence absolu d'où l'on observe la dérive lente des séracs.",
          curatorialNote:
            "Le contraste entre l'effort structurel colossal du porte-à-faux et la sérénité intérieure de la pièce produit une sensation d'apesanteur physique.",
          palette: ['#101214', '#2c3035', '#6e7378', '#c89d66', '#f4f1ea'],
          schematicType: 'cantilever',
        },
        {
          id: 'artwork-05',
          catalogNumber: 'PLANCHE V / V',
          plateIndex: '05',
          title: 'Bibliothèque des Ombres Longues',
          subtitle: 'Archive souterraine & puits de lumière zénithaux',
          artist: 'Clara Vane & Studio Miesien',
          location: 'Quartier de Marvila, Lisbonne',
          coordinates: '38°44′19″N 9°06′08″W',
          year: '2026',
          medium: 'Béton blanc de chaux, chêne fumé & albâtre translucide',
          dimensions: '28.0m × 28.0m × 14.0m',
          optics: 'Leica SL3 — Summicron 28mm f/2',
          reverberation: '3.1 secondes',
          imageUrl:
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'square',
          description:
            "Les rayonnages d'archives sont encastrés dans l'épaisseur même des murs porteurs. Au centre, une table monolithique de douze mètres reçoit la lumière filtrée par des feuillets d'albâtre de quatre millimètres.",
          curatorialNote:
            "Aucune lampe électrique n'est installée dans la salle principale : la consultation des manuscrits suit strictement la courbe naturelle du jour solaire.",
          palette: ['#121110', '#332d27', '#806d59', '#c89d66', '#f5f2eb'],
          schematicType: 'vault',
        },
      ],
    },
    epilogue: {
      index: 'CHAPITRE IV — 04 / 04 // ÉPILOGUE',
      monumentalQuote:
        "« L'espace n'est pas ce qui contient les choses, mais ce qui demeure intact lorsque tout le superflu s'est enfin effacé. »",
      closingEssay:
        "Au terme de cette première édition de CHRONIQUE, le constat s'impose : la direction artistique la plus radicale de notre décennie ne cherche plus à saturer la rétine, mais à lui offrir un sanctuaire. Qu'il s'agisse d'une paroi de béton coffré à Naoshima, d'une entaille calcaire en Provence ou d'une mise en page numérique, l'ambition demeure identique — sculpter le rythme, honorer la matière et laisser au regard le temps de respirer.",
      signature: 'Sébastien Morel-Vane',
      signatureRole: 'Directeur de la Publication — Paris / Kyoto',
      colophon: [
        {
          role: 'DIRECTION ARTISTIQUE & DESIGN UI',
          name: 'Studio Chronique — Unité Éditoriale Interactive',
          detail: 'Système de grille suisse 12 colonnes & typographie fluide',
        },
        {
          role: 'TYPOGRAPHIE',
          name: 'Cormorant Garamond, Playfair Display & Plus Jakarta Sans',
          detail: 'Métadonnées techniques composées en JetBrains Mono',
        },
        {
          role: 'PHOTOGRAPHIE & ARCHIVES',
          name: 'Atelier Kengo Takahashi, Clara Vane & Fonds Setouchi',
          detail: 'Tirages numériques calibrés sur profil colorimétrique Archive-D65',
        },
        {
          role: 'ARCHITECTURE LOGICIELLE',
          name: 'React 18, Lenis Smooth Scroll & GSAP ScrollTrigger',
          detail: 'Rendu 60fps et moteur de parallaxe inertiel',
        },
      ],
    },
  },
  {
    id: 'edition-02',
    editionNumber: 'ÉDITION N° 02',
    code: 'CHR-2026-II // ECHO-BRUMES',
    season: 'HIVER 2026 — PRINTEMPS 2027',
    publicationDate: '15 DÉCEMBRE 2026',
    readingTime: '07 MIN',
    locationHeader: 'REYKJAVÍK — HOKKAIDO — OSLO',
    coordinates: '64°08′48″N 21°56′45″W',
    themeTag: 'DOSSIER SPÉCIAL // CINÉMA LENT, HORIZONS BORÉAUX & ACOUSTIQUE DU FROID',
    accentHex: '#94a8b3',
    hero: {
      kicker: 'ESTHÉTIQUE DE LA DISPARITION & PAYSAGES SONORES',
      titleLines: ["L'Écho", 'des Brumes', 'Boréales'],
      italicWord: 'des Brumes',
      subtitle:
        "Traversée visuelle des territoires subarctiques où la frontière entre l'architecture, le givre et l'horizon maritime se dissout dans une monochromie hypnotique.",
      leadQuote:
        "« Dans le brouillard du nord, l'horizon disparaît pour obliger l'œil à écouter la texture même du silence blanc. »",
      author: 'Astrid Lindholm',
      authorRole: 'Curatrice Invitée & Essayiste Visuelle',
      photographyCredit: 'Soren Lindqvist & Archives Nordiques d’Oslo',
      heroImage:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=85',
      heroCaption:
        'PLANCHE INAUGURALE 00 — Station Acoustique du Fjord de Seyðisfjörður. Structure de basalte noir et verre dépoli émergeant de la brume maritime à l’aube.',
      heroSpecs: {
        archiveRef: 'ARCH-02 // BORÉAL-14',
        focalLength: 'LEICA SL2-S — APO 50MM F/2',
        filmStock: 'KODAK TRI-X 400 // DÉVELOPPEMENT AU PYROGALLOL',
        elevation: '+12.0M LITTORAL ARCTIQUE',
      },
      schematicType: 'colonnade',
    },
    chapter1: {
      index: 'CHAPITRE I — 01 / 04',
      title: 'Poétique de l’Effacement',
      subtitle: 'Quand le climat devient le véritable directeur artistique de l’espace.',
      epigraph:
        'La neige et la brume sont les plus grands scénographes du monde : en une nuit, elles gomment l’anecdote pour ne laisser que la ligne pure.',
      epigraphAuthor: 'NOTES D’EXPÉDITION, ARCHIPEL DU SVALBARD',
      dropCapParagraph:
        "Composer avec les hautes latitudes impose une humilité formelle immédiate. Ici, les édifices qui résistent le mieux au regard comme aux tempêtes ne cherchent jamais à rivaliser avec la démesure géologique du fjord. Ils adoptent la posture basse du lichen et la teinte sombre du basalte volcanique, devenant des chambres d'observation où le paysage entre par de longues meurtrières horizontales.",
      bodyColumns: [
        "Les cinéastes du « slow cinema » et les architectes nordiques partagent une même obsession : dilater la durée du plan jusqu'à ce que l'imperceptible devienne un événement majeur. Le passage d'un banc de brume devant une baie vitrée de neuf mètres agit comme un fondu enchaîné naturel.",
        "À l'intérieur de ces refuges acoustiques, le bois de pin thermo-traité et le feutre de laine brute absorbent les hautes fréquences du vent extérieur. Il ne subsiste qu'une vibration grave, presque tellurique, qui accompagne la lecture ou la contemplation.",
        "Cette esthétique de l'effacement nous enseigne que la puissance visuelle d'une image ne dépend pas de sa saturation, mais de la subtilité de ses valeurs intermédiaires entre le gris perle et le noir d'encre."
      ],
      pullQuote: {
        text: "« Le brouillard n'occulte pas le paysage : il le met en page en isolant chaque rocher comme un idéogramme sur du papier de riz. »",
        attribution: 'Soren Lindqvist',
        context: 'Monographie Boréale, Presses Académiques d’Oslo, p. 89',
      },
      secondaryQuote: {
        text: 'À cinq degrés sous zéro, la propagation du son sur l’eau calme atteint une clarté cristalline inégalée.',
        metricLabel: 'VISIBILITÉ ATMOSPHÉRIQUE MOYENNE',
        metricValue: '140 M // HYGROMÉTRIE 94%',
      },
      marginNotes: [
        {
          code: 'NOTE 01 // CLIMATOLOGIE',
          label: 'LUMIÈRE CRÉPUSCULAIRE CONTINUE',
          content:
            'Entre novembre et janvier, l’heure bleue dure près de cinq heures consécutives, supprimant toute ombre portée dure.',
        },
        {
          code: 'NOTE 02 // ACOUSTIQUE',
          label: 'ABSORPTION PAR LA NEIGE FRAÎCHE',
          content:
            'Un manteau neigeux de trente centimètres présente un coefficient d’absorption acoustique de 0.85, proche d’une chambre sourde.',
        },
        {
          code: 'NOTE 03 // MATÉRIAU',
          label: 'PIN BRÛLÉ & GOUDRON DE NORVÈGE',
          content:
            'Les bardages noirs traités à la résine de pin distillée se patinent d’un reflet argenté sous le gel salin.',
        },
      ],
      illustrations: [
        {
          id: 'fig-02-1',
          figureNumber: 'FIG. 01 — PAVILLON DE GLACE',
          title: 'Observatoire du Cercle Polaire',
          caption:
            'Volume en porte-à-faux au-dessus de la banquise côtière, photographié durant la transition entre l’aube et le crépuscule.',
          location: 'TROMSØ, NORVÈGE',
          coordinates: '69°38′57″N 18°57′19″E',
          year: '2026',
          optics: 'PHASE ONE XT // RODENSTOCK 32MM',
          imageUrl:
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=85',
          parallaxSpeed: -0.14,
          aspect: 'aspect-[4/5]',
          schematicType: 'cantilever',
        },
        {
          id: 'fig-02-2',
          figureNumber: 'FIG. 02 — CHAMBRE THERMALE',
          title: 'Bassin de Basalte Fumant',
          caption:
            'L’eau géothermique à 41°C rencontre l’air polaire, générant une colonne de vapeur qui redessine continuellement la cour intérieure.',
          location: 'MÝVATN, ISLANDE',
          coordinates: '65°36′14″N 16°59′46″W',
          year: '2026',
          optics: 'LEICA M11 // APO-SUMMICRON 35MM',
          imageUrl:
            'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1400&q=85',
          parallaxSpeed: 0.15,
          aspect: 'aspect-[16/11]',
          schematicType: 'monolith',
        },
        {
          id: 'fig-02-3',
          figureNumber: 'FIG. 03 — GÉOMÉTRIE DU GEL',
          title: 'Cristallisation sur Verre Cathédrale',
          caption:
            'Relevé macroscopique de la formation de givre dendritique sur le double vitrage structurel de la galerie nord.',
          location: 'ABISKO, LAPONIE SUÉDOISE',
          coordinates: '68°20′58″N 18°49′52″E',
          year: '2025',
          optics: 'HASSELBLAD X2D // 120MM MACRO',
          imageUrl:
            'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=85',
          parallaxSpeed: -0.1,
          aspect: 'aspect-[3/4]',
          schematicType: 'oculus',
        },
      ],
    },
    chapter2: {
      index: 'CHAPITRE II — 02 / 04',
      title: 'Spectre Polaire',
      subtitle: 'Comparaison optique entre la clarté blanche de midi et l’heure bleue magnétique.',
      intro:
        'Sous le cercle arctique, la température de couleur varie radicalement en quelques dizaines de minutes. Explorez la transformation chromatique de la station côtière.',
      lightStudy: {
        title: 'ÉTUDE CHROMATIQUE // REFUGE DE SKJERVØY',
        location: 'MER DE BARENTS, FINNMARK',
        dayState: {
          label: 'ÉTAT I — CLARTÉ D’ALBÉDO',
          time: '11:40 UTC+1',
          lux: '6 800 LUX',
          kelvin: '6 500 K (BLANC POLAIRE)',
          imageUrl:
            'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1600&q=85',
          note: 'La réverbération de la neige fraîche abolit la ligne de flottaison entre la montagne et la mer.',
        },
        duskState: {
          label: 'ÉTAT II — NUIT MAGNÉTIQUE',
          time: '15:10 UTC+1',
          lux: '45 LUX',
          kelvin: '8 200 K (INDIGO BORÉAL)',
          imageUrl:
            'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1600&q=85',
          note: 'La lueur chaude des foyers intérieurs perce la brume bleutée comme un phare minimaliste.',
        },
      },
      dialogue: [
        {
          speaker: 'ASTRID LINDHOLM',
          role: 'Curatrice Invitée',
          question:
            'Comment photographie-t-on un paysage où le blanc sur blanc menace de saturer le capteur ?',
          answer:
            'En sous-exposant volontairement d’un diaphragme et demi : on révèle alors les délicates veines de gris ardoise et de bleu cobalt cachées dans le brouillard.',
        },
        {
          speaker: 'SOREN LINDQVIST',
          role: 'Architecte & Photographe',
          question:
            'Quelle est la fonction première d’une fenêtre face à un horizon vide ?',
          answer:
            'Elle ne sert pas à voir loin, mais à cadrer le mouvement de l’air, de la neige et de la lumière comme une peinture vivante.',
        },
      ],
    },
    artworksSection: {
      index: 'CHAPITRE III — 03 / 04',
      title: 'Archives du Nord',
      subtitle: 'Cinq installations situées aux confins des mers boréales.',
      curatorialStatement:
        'Parcourez le corpus photographique de l’expédition hivernale.',
      items: [
        {
          id: 'ed2-art-01',
          catalogNumber: 'PLANCHE I / V',
          plateIndex: '01',
          title: 'Phare Horizontal de Vik',
          subtitle: 'Architecture littorale en basalte coulé',
          artist: 'Soren Lindqvist Studio',
          location: 'Plage de Reynisfjara, Islande',
          coordinates: '63°24′15″N 19°02′41″W',
          year: '2026',
          medium: 'Béton de sable volcanique noir & bronze marin',
          dimensions: '56.0m × 6.5m × 4.2m',
          optics: 'Hasselblad X2D — 38mm f/2.5',
          reverberation: '3.8 secondes',
          imageUrl:
            'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'landscape',
          description:
            'Au lieu de s’élever vers le ciel, ce phare s’allonge parallèlement à la houle atlantique, projetant un faisceau rasant qui souligne l’écume des vagues dans la nuit.',
          curatorialNote:
            'Une réinterprétation radicale de la signalétique maritime au service de la contemplation.',
          palette: ['#0c0d0e', '#1c242b', '#4f6270', '#c89d66', '#e6eaed'],
          schematicType: 'monolith',
        },
        {
          id: 'ed2-art-02',
          catalogNumber: 'PLANCHE II / V',
          plateIndex: '02',
          title: 'Chambre d’Écoute Glaciaire',
          subtitle: 'Pavillon acoustique sous le glacier Vatnajökull',
          artist: 'Collectif Borealis & Jonas K.',
          location: 'Skaftafell, Islande',
          coordinates: '64°00′57″N 16°58′22″W',
          year: '2025',
          medium: 'Acier poli miroir, mélèze de Sibérie & capteurs sismiques',
          dimensions: '12.0m × 12.0m × 8.5m',
          optics: 'Leica SL3 — 24mm f/1.4',
          reverberation: '4.1 secondes',
          imageUrl:
            'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'portrait',
          description:
            'Des hydrophones enfouis à trente mètres sous la glace transmettent en temps réel les craquements cristallins du glacier dans une chambre tapissée de feutre sombre.',
          curatorialNote:
            'L’architecture devient un stéthoscope posé sur la respiration lente de la Terre.',
          palette: ['#0b0e12', '#202b36', '#667b8c', '#94a8b3', '#f4f1ea'],
          schematicType: 'oculus',
        },
        {
          id: 'ed2-art-03',
          catalogNumber: 'PLANCHE III / V',
          plateIndex: '03',
          title: 'Monolithe de Kushiro',
          subtitle: 'Sanctuaire d’observation des grues du Japon',
          artist: 'Atelier Kengo Takahashi',
          location: 'Marais de Kushiro, Hokkaido',
          coordinates: '43°06′31″N 144°24′18″E',
          year: '2026',
          medium: 'Cèdre brûlé Yakisugi & béton lavé',
          dimensions: '31.0m × 9.0m × 6.0m',
          optics: 'Fujifilm GFX 100 II — 45mm',
          reverberation: '2.2 secondes',
          imageUrl:
            'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'landscape',
          description:
            'Dissimulé dans les roseaux givrés d’Hokkaido, ce long mur noir percé d’une unique fente horizontale permet d’observer la danse hivernale des oiseaux sans jamais trahir la présence humaine.',
          curatorialNote:
            'Une leçon d’effacement architectural inspirée de la peinture monochrome de l’époque Muromachi.',
          palette: ['#0c0d0e', '#262422', '#736c64', '#c89d66', '#f0ede6'],
          schematicType: 'colonnade',
        },
      ],
    },
    epilogue: {
      index: 'CHAPITRE IV — 04 / 04 // ÉPILOGUE',
      monumentalQuote:
        "« Lorsque le paysage s'efface dans le blanc, l'esprit retrouve enfin la netteté de ses propres contours. »",
      closingEssay:
        "Cette deuxième livraison de CHRONIQUE explore la fécondité esthétique du froid et de la brume. Loin d'être un désert sensoriel, le monde boréal offre aux créateurs contemporains un laboratoire de pureté optique inépuisable.",
      signature: 'Astrid Lindholm',
      signatureRole: 'Curatrice Invitée — Oslo / Reykjavík',
      colophon: [
        {
          role: 'DIRECTION ARTISTIQUE',
          name: 'Studio Chronique — Pôle Nordique',
          detail: 'Édition spéciale calibrée sur basses lumières',
        },
        {
          role: 'EXPÉDITION PHOTOGRAPHIQUE',
          name: 'Soren Lindqvist & Fonds Polaire',
          detail: 'Prises de vue réalisées entre 63°N et 70°N',
        },
        {
          role: 'TYPOGRAPHIE',
          name: 'Cormorant Garamond & JetBrains Mono',
          detail: 'Composition éditoriale haute précision',
        },
        {
          role: 'INGÉNIERIE CRÉATIVE',
          name: 'Lenis Inertial Engine + GSAP ScrollTrigger',
          detail: 'Expérience web primée sans latence',
        },
      ],
    },
  },
  {
    id: 'edition-03',
    editionNumber: 'ÉDITION N° 03',
    code: 'CHR-2027-I // MECANIQUE-CELESTE',
    season: 'PRINTEMPS 2027',
    publicationDate: '01 MARS 2027',
    readingTime: '05 MIN',
    locationHeader: 'BÂLE — ATACAMA — MILAN',
    coordinates: '23°01′22″S 67°45′11″W',
    themeTag: 'DOSSIER SPÉCIAL // SCULPTURE OPTIQUE, ART CINÉTIQUE & ARCHITECTURE ASTRONOMIQUE',
    accentHex: '#d48c56',
    hero: {
      kicker: 'GÉOMÉTRIE COSMIQUE & INSTRUMENTS DE PERCEPTION',
      titleLines: ['Mécanique', 'Céleste &', 'Prismes'],
      italicWord: 'Céleste &',
      subtitle:
        "Des observatoires du désert d'Atacama aux installations lumineuses contemporaines : comment l'art et l'architecture capturent la rotation des astres.",
      leadQuote:
        "« Tout édifice sacré est avant tout une machine optique réglée sur la course silencieuse des étoiles. »",
      author: 'Sébastien Morel-Vane',
      authorRole: 'Rédacteur en Chef',
      photographyCredit: 'Fondation Lumina & Observatoire Austral',
      heroImage:
        'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=2000&q=85',
      heroCaption:
        'PLANCHE INAUGURALE 00 — Méridienne Solaire de l’Altiplano. Cylindre de béton cuivré aligné sur le zénith équinoxial à 4 200 mètres d’altitude.',
      heroSpecs: {
        archiveRef: 'ARCH-03 // ATACAMA-09',
        focalLength: 'PHASE ONE IQ4 — 55MM F/2.8',
        filmStock: 'CAPTEUR TRICHROMIQUE CALIBRÉ',
        elevation: '+4 210M ALTIPLANO ANDIN',
      },
      schematicType: 'oculus',
    },
    chapter1: {
      index: 'CHAPITRE I — 01 / 04',
      title: 'L’Architecture comme Sextant',
      subtitle: 'De la coupole antique aux chambres photoniques contemporaines.',
      epigraph:
        'Mesurer la lumière, c’est déjà sculpter le temps qui nous traverse.',
      epigraphAuthor: 'MANIFESTE DU GROUPE LUMINA, MILAN, 2024',
      dropCapParagraph:
        "Avant d'être des abris climatiques, les premières architectures monumentales de l'humanité furent des instruments d'astronomie. Aujourd'hui, à la croisée de l'art minimaliste et de l'ingénierie optique, une constellation d'artistes érige au cœur des déserts des structures dont la seule fonction est de rendre visible la rotation terrestre par le déplacement millimétrique d'un rayon lumineux.",
      bodyColumns: [
        "Dans la sécheresse absolue du plateau d'Atacama, l'air dépourvu d'humidité restitue une lumière d'une netteté presque tranchante. Les ombres portées y possèdent la rigueur d'une gravure au burin sur une plaque de cuivre.",
        "En utilisant des alliages de laiton brossé, de verre dichroïque et de pisé compressé, ces installations cinétiques transforment le visiteur en observateur astronomique conscient de sa propre vitesse orbitale.",
        "La direction artistique contemporaine puise dans ces dispositifs une grammaire essentielle : celle du contraste pur, du rythme cyclique et de la précision géométrique."
      ],
      pullQuote: {
        text: "« Nous ne regardons jamais la lumière elle-même ; nous ne voyons que son impact sur l'obstacle qui ose l'interrompre. »",
        attribution: 'Elena Rostova',
        context: 'Sculpter les Photons, Biennale d’Architecture, p. 19',
      },
      secondaryQuote: {
        text: 'À chaque minute d’arc solaire correspond un déplacement de quatre millimètres sur le dallage de granit.',
        metricLabel: 'PRÉCISION D’ALIGNEMENT AZIMUTAL',
        metricValue: '0.002° // AXE POLAIRE',
      },
      marginNotes: [
        {
          code: 'NOTE 01 // ASTRONOMIE',
          label: 'MÉRIDIENNE SOLAIRE DE 40 MÈTRES',
          content:
            'L’ellipse lumineuse au sol change d’excentricité chaque jour de l’année, dessinant un calendrier de pierre.',
        },
        {
          code: 'NOTE 02 // MATÉRIAU',
          label: 'PISÉ D’OCRE & BRONZE PHOSPHOREUX',
          content:
            'Les terres extraites sur place confèrent aux parois une teinte rouge ferreuse identique au sol martien.',
        },
      ],
      illustrations: [
        {
          id: 'fig-03-1',
          figureNumber: 'FIG. 01 — CADRAN CAV souterrain',
          title: 'Chambre Équinoxiale d’Atacama',
          caption: 'Alignement solaire parfait au midi vrai sur la dalle de bronze gravée.',
          location: 'SAN PEDRO DE ATACAMA, CHILI',
          coordinates: '22°54′31″S 68°11′59″W',
          year: '2026',
          optics: 'LEICA SL2-S // 28MM SUMMICRON',
          imageUrl:
            'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1400&q=85',
          parallaxSpeed: -0.14,
          aspect: 'aspect-[4/5]',
          schematicType: 'oculus',
        },
        {
          id: 'fig-03-2',
          figureNumber: 'FIG. 02 — PRISME MÉRIDIEN',
          title: 'L’Escalier Zénithal',
          caption: 'Gradins monumentaux orientés vers le lever d’Aldébaran.',
          location: 'BÂLE, SUISSE',
          coordinates: '47°33′34″N 7°35′19″E',
          year: '2026',
          optics: 'HASSELBLAD 907X // 45MM',
          imageUrl:
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85',
          parallaxSpeed: 0.16,
          aspect: 'aspect-[16/11]',
          schematicType: 'vault',
        },
      ],
    },
    chapter2: {
      index: 'CHAPITRE II — 02 / 04',
      title: 'Éclipse & Zénith',
      subtitle: 'Bascule optique entre pleine réverbération désertique et chambre stellaire.',
      intro:
        'Observez le comportement réflectif des parois de pisé et de bronze entre le plein soleil zénithal et l’obscurité astronomique.',
      lightStudy: {
        title: 'ÉTUDE OPTIQUE // CYLINDRE SOLAIRE',
        location: 'PLATEAU DE CHAJNANTOR, CHILI',
        dayState: {
          label: 'ÉTAT I — ZÉNITH DÉSERTIQUE',
          time: '12:00 UTC-4',
          lux: '110 000 LUX',
          kelvin: '5 200 K (SOLEIL DIRECT)',
          imageUrl:
            'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85',
          note: 'Le contraste maximal découpe une ellipse d’or pur au centre de l’obscurité intérieure.',
        },
        duskState: {
          label: 'ÉTAT II — CHAMBRE STELLAIRE',
          time: '22:30 UTC-4',
          lux: '2 LUX',
          kelvin: '4 100 K (LUEUR ASTRALE)',
          imageUrl:
            'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
          note: 'L’oculus encadre le centre galactique sans aucune pollution lumineuse à trois cents kilomètres à la ronde.',
        },
      },
      dialogue: [
        {
          speaker: 'ELENA ROSTOVA',
          role: 'Artiste Optique & Architecte',
          question: 'Pourquoi installer vos œuvres à plus de quatre mille mètres d’altitude ?',
          answer:
            'Parce que là-haut, l’atmosphère est si fine que la lumière semble voyager dans le vide spatial avant de toucher la pierre.',
        },
      ],
    },
    artworksSection: {
      index: 'CHAPITRE III — 03 / 04',
      title: 'Planches Célestes',
      subtitle: 'Instruments architecturaux et sculptures de lumière.',
      curatorialStatement: 'Parcourez la sélection des dispositifs optiques monumentaux.',
      items: [
        {
          id: 'ed3-art-01',
          catalogNumber: 'PLANCHE I / III',
          plateIndex: '01',
          title: 'L’Astrolabe de Béton',
          subtitle: 'Coupole inversée & miroir d’eau',
          artist: 'Elena Rostova Studio',
          location: 'Désert d’Atacama, Chili',
          coordinates: '23°01′22″S 67°45′11″W',
          year: '2026',
          medium: 'Pisé compressé, bronze poli & eau déminéralisée',
          dimensions: 'Ø 24.0m × Profondeur 11.0m',
          optics: 'Phase One IQ4 — 28mm',
          reverberation: '4.9 secondes',
          imageUrl:
            'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'landscape',
          description:
            'Une hémisphère inversée creusée dans le sol désertique réfléchit la voûte étoilée sur un disque d’eau noire immobile.',
          curatorialNote:
            'Le visiteur marche sur une passerelle périphérique et contemple le ciel sous ses propres pieds.',
          palette: ['#0c0d0e', '#38251a', '#8c583a', '#d48c56', '#f4f1ea'],
          schematicType: 'oculus',
        },
        {
          id: 'ed3-art-02',
          catalogNumber: 'PLANCHE II / III',
          plateIndex: '02',
          title: 'Pendule de Lumière n° 4',
          subtitle: 'Installation cinétique monumentale',
          artist: 'Studio Chronique × Atelier Milan',
          location: 'Fondation Pirelli Hangar, Milan',
          coordinates: '45°31′18″N 9°13′08″E',
          year: '2026',
          medium: 'Lentilles de Fresnel, câble d’acier & laser collimaté',
          dimensions: 'Hauteur 26.0m',
          optics: 'Leica SL3 — 50mm f/1.4',
          reverberation: '7.1 secondes',
          imageUrl:
            'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'portrait',
          description:
            'Un pendule de Foucault optique trace sur un parterre de sable de quartz noir l’empreinte lumineuse de la rotation terrestre.',
          curatorialNote:
            'Une fusion hypnotique entre physique fondamentale et scénographie sacrée.',
          palette: ['#0c0d0e', '#1f1d1b', '#6e5a49', '#c89d66', '#f4f1ea'],
          schematicType: 'vault',
        },
        {
          id: 'ed3-art-03',
          catalogNumber: 'PLANCHE III / III',
          plateIndex: '03',
          title: 'Gnomon de Basalte',
          subtitle: 'Aiguille solaire monolithe',
          artist: 'Kengo Takahashi & Elena Rostova',
          location: 'Île de Lanzarote, Canaries',
          coordinates: '29°02′48″N 13°37′55″W',
          year: '2026',
          medium: 'Basalte volcanique taillé',
          dimensions: 'Hauteur 19.5m',
          optics: 'Hasselblad X2D — 55mm',
          reverberation: '1.4 seconde',
          imageUrl:
            'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85',
          aspectRatio: 'landscape',
          description:
            'Érigée au centre d’un cratère éteint, cette lame de basalte projette une ombre qui parcourt douze bornes horaires gravées dans la cendre volcanique.',
          curatorialNote:
            'Hommage contemporain aux architectures telluriques de César Manrique.',
          palette: ['#0c0d0e', '#292524', '#786b65', '#a63a2b', '#f4f1ea'],
          schematicType: 'monolith',
        },
      ],
    },
    epilogue: {
      index: 'CHAPITRE IV — 04 / 04 // ÉPILOGUE',
      monumentalQuote:
        "« Habiter la Terre, c'est habiter le pont d'un navire céleste dont l'architecture nous révèle le cap. »",
      closingEssay:
        "Cette troisième édition clôt notre premier cycle consacré aux relations entre matière brute, silence et lumière cosmique.",
      signature: 'Sébastien Morel-Vane',
      signatureRole: 'Directeur de la Publication',
      colophon: [
        {
          role: 'DIRECTION ARTISTIQUE',
          name: 'Studio Chronique',
          detail: 'Conception éditoriale & scrollytelling',
        },
        {
          role: 'PHOTOGRAPHIE',
          name: 'Fondation Lumina & Archives Andines',
          detail: 'Haute résolution optique',
        },
      ],
    },
  },
];
