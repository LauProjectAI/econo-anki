/**
 * VOCABULAIRE ET CONTENU PÉDAGOGIQUE
 * 
 * Ce fichier contient les 20 fiches de cours réparties en 4 modules,
 * ainsi que le dictionnaire de cartes de mémorisation associées.
 * La langue cible est déclarée ici pour permettre une extension future.
 */

// Langue cible de l'application
const TARGET_LANGUAGE = 'fr';

// Les 4 modules fondamentaux
const MODULES = [
  {
    id: 1,
    title: "Les Fondamentaux de l’Économie Réelle",
    subtitle: "Comprendre comment tournent les échanges et les prix au quotidien",
    color: "#3B82F6",
    badge: "Explorateur Éco"
  },
  {
    id: 2,
    title: "Monnaie, Banques et Inflation",
    subtitle: "Démystifier l'argent, le crédit et le pouvoir d'achat",
    color: "#10B981",
    badge: "Maître de la Monnaie"
  },
  {
    id: 3,
    title: "L’Entreprise et son Financement",
    subtitle: "Comprendre pourquoi la Bourse existe avant de parler de cours et de graphiques",
    color: "#F59E0B",
    badge: "Bâtisseur d'Entreprise"
  },
  {
    id: 4,
    title: "Les Marchés Boursiers et l’Investissement",
    subtitle: "Comprendre le fonctionnement concret de la bourse et adopter les bons réflexes",
    color: "#EC4899",
    badge: "Stratège Financier"
  }
];

// Les 20 fiches de cours complètes
const FICHES = [
  // --- MODULE 1 ---
  {
    id: 1,
    moduleId: 1,
    number: 1,
    title: "La rareté et les choix économiques",
    notionCle: "Besoins illimités vs ressources limitées, notion de coût d'opportunité (choisir, c'est renoncer).",
    summary: "L'économie naît d'une tension fondamentale : les êtres humains ont des besoins illimités (se nourrir, voyager, se divertir), mais les ressources disponibles (temps, argent, matières premières, énergie) sont limitées. Face à cette rareté, tout choix implique un arbitrage.",
    dailyExample: "Si tu as 20 € et que tu choisis d'acheter une place de cinéma au lieu d'un livre, le coût d'opportunité de ta soirée cinéma n'est pas seulement les 20 €, c'est aussi le plaisir et l'apprentissage que le livre t'aurait apportés.",
    takeaway: "Choisir, c'est toujours renoncer. Le coût d'opportunité mesure la valeur de la meilleure alternative à laquelle on a renoncé."
  },
  {
    id: 2,
    moduleId: 1,
    number: 2,
    title: "L’offre et la demande",
    notionCle: "Comment se fixe un prix d’équilibre sur un marché (avec l'exemple des sneakers ou des places de concert).",
    summary: "Sur un marché libre, les acheteurs (demande) cherchent à payer le moins cher possible, tandis que les vendeurs (offre) cherchent à vendre au prix le plus élevé. Le prix d'équilibre est le niveau de prix auquel la quantité offerte égale exactement la quantité demandée.",
    dailyExample: "Lors de la sortie d'une paire de sneakers en édition très limitée (offre très faible) convoitée par des milliers de personnes (demande explosive), le prix explose à la revente. Inversement, des invendus soldés à -50 % traduisent une offre excédentaire face à une demande faible.",
    takeaway: "Quand la demande dépasse l'offre, les prix grimpent. Quand l'offre dépasse la demande, les prix chutent."
  },
  {
    id: 3,
    moduleId: 1,
    number: 3,
    title: "Le PIB et la croissance",
    notionCle: "Qu'est-ce que la richesse d'un pays ? Comment on la mesure (PIB) et ses limites (environnement, bien-être).",
    summary: "Le Produit Intérieur Brut (PIB) mesure la valeur totale de tous les biens et services finaux produits dans un pays au cours d'une année. La croissance économique correspond à l'augmentation en pourcentage du PIB d'une année sur l'autre.",
    dailyExample: "Le PIB compte la fabrication de voitures ou les soins médicaux, mais il ignore le bénévolat ou le travail domestique. De plus, une marée noire fait monter le PIB car il faut payer des entreprises pour dépolluer, alors que le bien-être et la planète en souffrent !",
    takeaway: "Le PIB est un thermomètre de l'activité marchande, mais pas une mesure directe du bonheur collectif ni de la durabilité environnementale."
  },
  {
    id: 4,
    moduleId: 1,
    number: 4,
    title: "L’État et son rôle économique",
    notionCle: "Impôts, redistribution, services publics et régulation des défaillances de marché.",
    summary: "L'État n'est pas un simple spectateur : il remplit trois fonctions économiques majeures (formalité de Musgrave) : l'allocation (produire des biens publics comme les routes, l'école, la police), la redistribution (réduire les inégalités par les impôts et les allocations) et la stabilisation (lutter contre le chômage ou l'inflation).",
    dailyExample: "Sans l'État, une entreprise privée n'aurait aucun intérêt financier à éclairer gratuitement les rues la nuit ou à construire des digues maritimes, car personne ne peut être exclu d'en profiter (biens publics).",
    takeaway: "Les prélèvements obligatoires financent les biens communs et amortissent les crises sociales et économiques."
  },
  {
    id: 5,
    moduleId: 1,
    number: 5,
    title: "Le commerce international et la mondialisation",
    notionCle: "Importations, exportations, avantages comparatifs et chaînes de valeur mondiales.",
    summary: "Selon la théorie des avantages comparatifs de David Ricardo, chaque pays gagne à se spécialiser dans les productions où il est le plus efficace (ou le moins inefficace) et à échanger avec le reste du monde. Les produits d'aujourd'hui sont le fruit de chaînes de valeur mondiales.",
    dailyExample: "Un smartphone contemporain est conçu en Californie, équipé d'écrans sud-coréens, de métaux rares extraits en Afrique ou au Chili, de processeurs gravés à Taïwan et assemblé en Chine avant d'arriver dans ta poche.",
    takeaway: "Le commerce international augmente la diversité et fait baisser les coûts, mais accentue l'interdépendance stratégique entre les nations."
  },

  // --- MODULE 2 ---
  {
    id: 6,
    moduleId: 2,
    number: 6,
    title: "C’est quoi la monnaie ?",
    notionCle: "Les 3 fonctions de la monnaie (unité de compte, réserve de valeur, intermédiaire des échanges) et son évolution.",
    summary: "La monnaie est avant tout une convention sociale fondée sur la confiance. Elle remplit trois rôles : intermédiaire des échanges (évite le troc direct), unité de compte (permet de comparer la valeur d'une pomme et d'un vélo) et réserve de valeur (permet d'épargner pour consommer plus tard).",
    dailyExample: "Si tu devais payer ton boulanger avec des cours de maths particuliers, il faudrait qu'il ait précisément un enfant en difficulté de maths au moment exact où tu as faim (double coïncidence des besoins). La monnaie résout ce casse-tête.",
    takeaway: "La monnaie n'a de valeur que parce que tout le monde accepte d'y croire et de la recevoir en paiement."
  },
  {
    id: 7,
    moduleId: 2,
    number: 7,
    title: "L’inflation et le pouvoir d'achat",
    notionCle: "Pourquoi les prix montent, comment l’inflation érode la valeur de l'épargne qui dort sous le matelas.",
    summary: "L'inflation désigne la hausse générale et durable du niveau des prix. Quand elle augmente, avec la même somme d'argent, tu achètes moins de choses : ton pouvoir d'achat diminue. Si ton épargne ne rapporte rien, elle perd silencieusement sa valeur réelle avec le temps.",
    dailyExample: "Si l'inflation est de 5 % par an, un panier de courses de 100 € aujourd'hui coûtera 105 € l'an prochain. Si tu gardes un billet de 100 € dans un tiroir, il vaudra toujours 100 € facialement, mais n'achètera plus qu'une fraction de ton panier.",
    takeaway: "L'inflation est un voleur silencieux pour l'argent qui stagne sans être placé ou investi."
  },
  {
    id: 8,
    moduleId: 2,
    number: 8,
    title: "Comment les banques créent de l’argent ?",
    notionCle: "Le crédit bancaire, les taux d’intérêt et la réserve fractionnaire.",
    summary: "Contrairement à une idée reçue répandue, les banques commerciales ne prêtent pas uniquement l'argent déposé par d'autres clients. Quand une banque accorde un prêt immobilier ou étudiant, elle crédite le compte de l'emprunteur d'argent nouveau créé par simple jeu d'écritures : « les crédits font les dépôts ».",
    dailyExample: "Quand une famille emprunte 200 000 € pour acheter un appartement, la banque ne va pas chercher 200 000 pièces dans un coffre. Elle tape 200 000 € sur son logiciel : cette monnaie scripturale vient de naître, et elle sera détruite au fur et à mesure des remboursements.",
    takeaway: "La monnaie moderne est majoritairement scripturale (des lignes informatiques) créée par le crédit bancaire."
  },
  {
    id: 9,
    moduleId: 2,
    number: 9,
    title: "Les Banques Centrales et les taux directeurs",
    notionCle: "Le rôle de la BCE / Fed : piloter les taux directeurs pour freiner ou relancer l’économie.",
    summary: "La Banque Centrale (comme la BCE en zone euro ou la Fed aux États-Unis) est la « banque des banques ». Elle fixe les taux directeurs, c'est-à-dire le prix auquel les banques ordinaires viennent lui emprunter de l'argent. Elle ajuste ce taux pour maintenir l'inflation autour de 2 %.",
    dailyExample: "Si l'inflation s'emballe, la Banque Centrale augmente ses taux directeurs. Les crédits deviennent plus chers pour tout le monde, la consommation et l'investissement ralentissent, ce qui fait redescendre la pression sur les prix.",
    takeaway: "Les taux directeurs sont le robinet de l'économie : taux bas = crédit facile et relance ; taux hauts = crédit cher et coup de frein."
  },
  {
    id: 10,
    moduleId: 2,
    number: 10,
    title: "Les taux d’intérêt et le coût du temps",
    notionCle: "Emprunter vs prêter, et la magie des intérêts composés (la règle fondamentale de l’épargne).",
    summary: "Le taux d'intérêt est le prix du temps et du risque. Pour un emprunteur, c'est le coût du crédit. Pour un épargnant, c'est la rémunération de son renoncement à consommer tout de suite. Les intérêts composés désignent le mécanisme où les intérêts de chaque période s'ajoutent au capital initial et produisent eux-mêmes de nouveaux intérêts.",
    dailyExample: "Si tu places 1 000 € à 7 % par an, au bout d'un an tu as 1 070 €. La deuxième année, les 7 % s'appliquent sur 1 070 € (soit 74,90 € de gain). Au bout de 30 ans, sans rajouter un centime, tes 1 000 € deviennent 7 612 € !",
    takeaway: "Les intérêts composés font effet boule de neige avec le temps : commencer à investir tôt est un avantage gigantesque."
  },

  // --- MODULE 3 ---
  {
    id: 11,
    moduleId: 3,
    number: 11,
    title: "Anatomie d’une entreprise : Chiffre d'affaires vs Bénéfice",
    notionCle: "Revenus, charges, marge nette, résultat d’exploitation.",
    summary: "Le Chiffre d'Affaires (CA) est la somme totale encaissée par la vente de biens ou services. Mais vendre beaucoup ne signifie pas être riche ! Le Bénéfice (ou résultat net) est ce qu'il reste dans les caisses une fois payés tous les salaires, loyers, matières premières, impôts et intérêts d'emprunt.",
    dailyExample: "Une boutique qui vend pour 1 000 000 € de baskets mais dépense 1 050 000 € en publicité, loyers et achats fait une perte de 50 000 €. Une autre qui vend pour 200 000 € avec seulement 100 000 € de charges réalise 100 000 € de bénéfice net.",
    takeaway: "Le chiffre d'affaires flatte l'ego, mais seul le bénéfice nourrit l'entreprise et permet sa survie."
  },
  {
    id: 12,
    moduleId: 3,
    number: 12,
    title: "Comment se finance une entreprise ?",
    notionCle: "Autofinancement, dette bancaire, levée de fonds auprès d'investisseurs.",
    summary: "Pour acheter des machines, embaucher ou créer de nouveaux produits, une entreprise a trois options : utiliser ses bénéfices passés mis en réserve (autofinancement), emprunter auprès d'une banque (dette), ou ouvrir son capital à des associés/investisseurs en échange d'actions.",
    dailyExample: "Une start-up qui développe une nouvelle application n'a souvent aucun bénéfice au départ et les banques refusent de lui prêter. Elle fait alors appel à des Business Angels ou fonds de capital-risque en leur cédant des parts de l'entreprise.",
    takeaway: "Le choix du financement dépend du stade de l'entreprise : l'emprunt oblige à rembourser des intérêts fixes, l'ouverture du capital dilue la propriété."
  },
  {
    id: 13,
    moduleId: 3,
    number: 13,
    title: "Actions vs Obligations : les deux piliers",
    notionCle: "Être propriétaire d'une part de l'entreprise (action) vs être créancier / prêteur (obligation).",
    summary: "Une action est une fraction du capital d'une entreprise : en détenant une action, tu deviens copropriétaire, avec droit de vote et droit aux dividendes si l'entreprise gagne de l'argent. Une obligation est un titre de dette : tu prêtes de l'argent à une entreprise ou un État, qui s'engage à te rembourser avec un intérêt régulier (le coupon).",
    dailyExample: "Si l'entreprise fait faillite, l'obligataire (créancier) est remboursé en priorité avant l'actionnaire. En contrepartie, si l'entreprise devient le nouveau géant technologique mondial, l'actionnaire peut voir sa mise multipliée par dix, alors que l'obligataire ne touche que son coupon convenu.",
    takeaway: "Action = risque et potentiel illimité d'associé ; Obligation = sécurité relative et rendement prévisible de prêteur."
  },
  {
    id: 14,
    moduleId: 3,
    number: 14,
    title: "L'Introduction en Bourse (IPO)",
    notionCle: "Pourquoi une entreprise entre en bourse (lever des capitaux, notoriété) et marché primaire vs marché secondaire.",
    summary: "L'IPO (Initial Public Offering) est le moment où une entreprise privée propose pour la première fois ses actions au grand public sur un marché réglementé. C'est le marché primaire (le 'neuf', l'argent frais va directement à l'entreprise). Ensuite, les actions s'échangent entre investisseurs sur le marché secondaire (l''occasion').",
    dailyExample: "Quand Deezer ou Porsche s'introduisent en bourse, elles émettent de nouvelles actions achetées par des investisseurs. Porsche récupère cet argent pour financer ses moteurs électriques. Si le lendemain tu achètes une action Porsche à un autre particulier, Porsche ne touche rien.",
    takeaway: "Le marché primaire finance les projets de l'entreprise ; le marché secondaire assure la liquidité (revendre facilement ses titres)."
  },
  {
    id: 15,
    moduleId: 3,
    number: 15,
    title: "Les Dividendes et la création de valeur",
    notionCle: "Réinvestir les bénéfices pour croître vs verser un dividende aux actionnaires.",
    summary: "À la fin de l'année, l'assemblée générale des actionnaires décide du sort du bénéfice : soit le conserver dans l'entreprise sous forme de réserves pour financer la recherche et la croissance future, soit en distribuer une partie aux actionnaires sous forme de dividendes.",
    dailyExample: "De jeunes entreprises en hyper-croissance comme Tesla ou Amazon n'ont pas versé de dividendes pendant des décennies car chaque dollar gagné était réinvesti dans de nouvelles usines. À l'inverse, des géants matures comme TotalEnergies ou Coca-Cola versent de généreux dividendes réguliers.",
    takeaway: "Un dividende n'est pas un 'bonus magique' : le jour où il est détaché, le cours de l'action baisse d'autant car l'argent quitte la trésorerie de l'entreprise."
  },

  // --- MODULE 4 ---
  {
    id: 16,
    moduleId: 4,
    number: 16,
    title: "Comment fonctionne un carnet d’ordres ?",
    notionCle: "Acheteurs, vendeurs, ordre au marché vs ordre à cours limité, liquidité.",
    summary: "La bourse n'est pas un casino obscur mais une plateforme de rencontre informatisée. Le carnet d'ordres confronte en temps réel les propositions d'achat (bids) et de vente (asks). Un ordre 'au marché' s'exécute immédiatement au meilleur prix disponible, tandis qu'un ordre 'à cours limité' fixe un prix plafond à l'achat ou plancher à la vente.",
    dailyExample: "Si l'action LVMH est à 700 €, avec un ordre à cours limité à 680 €, ton achat ne se déclenchera que si un vendeur accepte de descendre à 680 €. Tu maîtrises ton prix, mais tu n'es pas certain d'être servi si le cours ne baisse jamais.",
    takeaway: "Le carnet d'ordres assure la transparence et la liquidité : plus il y a de participants actifs, plus les transactions se font sans à-coups."
  },
  {
    id: 17,
    moduleId: 4,
    number: 17,
    title: "Les indices boursiers (CAC 40, S&P 500, Nasdaq)",
    notionCle: "Ce qu'est un indice (le 'thermomètre' d'un marché ou d'un secteur économique).",
    summary: "Un indice boursier regroupe un panier d'actions représentatives d'une place financière ou d'un secteur économique pour donner la tendance globale. Le CAC 40 suit les 40 plus grandes capitalisations françaises, le S&P 500 les 500 plus grandes entreprises américaines, et le Nasdaq les valeurs technologiques.",
    dailyExample: "Quand le journal télévisé annonce 'La bourse de Paris a gagné 1,5 % aujourd'hui', cela ne signifie pas que toutes les entreprises françaises ont monté, mais que la moyenne pondérée des 40 géants du CAC 40 a progressé.",
    takeaway: "Un indice est une boussole qui résume la santé et la confiance des marchés financiers en un seul chiffre."
  },
  {
    id: 18,
    moduleId: 4,
    number: 18,
    title: "Les ETF (Fonds indiciels)",
    notionCle: "Pourquoi diversifier à bas coût en répliquant un panier d'entreprises plutôt qu'en achetant une seule action.",
    summary: "Un ETF (Exchange Traded Fund ou tracker) est un fonds coté en bourse dont l'objectif est de répliquer fidèlement la performance d'un indice (comme le S&P 500 ou le MSCI World). En achetant une seule part d'ETF, tu deviens instantanément investi dans des centaines d'entreprises mondiales avec des frais de gestion très faibles.",
    dailyExample: "Acheter individuellement les 500 actions du S&P 500 coûterait des milliers d'euros en commissions de courtage. Acheter une part d'ETF S&P 500 à 40 € te donne une fraction microscopique d'Apple, Microsoft, Amazon, Visa et 496 autres en un seul clic.",
    takeaway: "Les ETF permettent aux particuliers de diversifier leur portefeuille instantanément sans chercher l'aiguille dans la botte de foin."
  },
  {
    id: 19,
    moduleId: 4,
    number: 19,
    title: "Le couple Rendement / Risque et la diversification",
    notionCle: "« Pas de repas gratuit » : pas de haut rendement sans risque, et « ne pas mettre tous ses œufs dans le même panier ».",
    summary: "En finance, le rendement espéré est proportionnel au risque encouru. Les promesses de 'gains élevés garantis sans risque' sont toujours des arnaques. La diversification est la seule stratégie qui permet de réduire le risque global sans détruire le rendement espéré en combinant des actifs décorrélés.",
    dailyExample: "Si tu n'investis que dans une seule compagnie aérienne et qu'une épidémie cloue les avions au sol, tu perds tout. Si tu possèdes aussi des actions dans la santé, la technologie et l'énergie, les gains des uns compensent les pertes des autres.",
    takeaway: "La diversification est le seul repas gratuit en finance : elle élimine le risque spécifique à une entreprise sans amputer la rentabilité globale."
  },
  {
    id: 20,
    moduleId: 4,
    number: 20,
    title: "La psychologie de l'investisseur et les pièges à éviter",
    notionCle: "FOMO, panique lors des krachs, différence fondamentale entre spéculation court terme et investissement long terme.",
    summary: "Le pire ennemi de l'investisseur n'est pas le marché, c'est son propre cerveau. Deux émotions dominent la foule : la cupidité (FOMO : peur de rater le train quand tout monte) qui pousse à acheter au plus haut, et la panique qui pousse à revendre au plus bas lors des krachs. Réussir en bourse réclame de la patience, de la méthode et un horizon de long terme.",
    dailyExample: "Un jeune voit sur TikTok un influenceur prétendre qu'une crypto-monnaie obscure va faire x100 demain. Excité par l'appât du gain rapide, il achète au sommet. Le lendemain, la bulle éclate, il perd 90 % et jure dégoûté que 'la bourse est truquée'.",
    takeaway: "Le trading compulsif enrichit les plateformes de courtage. L'investissement passif et régulier sur le long terme enrichit l'investisseur discipliné."
  }
];

// CARTES DE RÉVISION POUR LE MOTEUR ANKI (SRS)
// Chaque carte possède sa nature grammaticale, son thème, des distracteurs cohérents, et des synonymes acceptés.
const FLASHCARDS = [
  // Module 1
  {
    id: "card_1_1",
    ficheId: 1,
    moduleId: 1,
    term: "Coût d'opportunité",
    grammarNature: "nom_masculin",
    question: "Quelle notion désigne la valeur de la meilleure option à laquelle on renonce lorsqu'on effectue un choix économique ?",
    definition: "La valeur de la meilleure alternative à laquelle on a renoncé en faisant un choix.",
    shortDefinition: "Valeur de la meilleure alternative sacrifiée lors d'un choix",
    example: "Le temps passé à réviser plutôt qu'à travailler pour un salaire d'appoint.",
    synonyms: ["cout d'opportunite", "cout d opportunite", "cout renonciation", "valeur du renoncement", "sacrifice alternatif"],
    distractors: ["Prix d'équilibre", "Prélèvement obligatoire", "Surplus du consommateur"]
  },
  {
    id: "card_1_2",
    ficheId: 1,
    moduleId: 1,
    term: "Rareté",
    grammarNature: "nom_feminin",
    question: "Quelle situation fondamentale caractérise la tension entre des besoins humains illimités et des ressources limitées ?",
    definition: "La condition économique où les ressources disponibles sont insuffisantes pour satisfaire tous les besoins.",
    shortDefinition: "Insuffisance des ressources disponibles face aux besoins illimités",
    example: "Le manque d'eau potable ou la disponibilité limitée des terres agricoles.",
    synonyms: ["rarete", "manque de ressources", "limitation des ressources", "penurie relative"],
    distractors: ["Productivité", "Liquidité", "Élasticité"]
  },
  {
    id: "card_2_1",
    ficheId: 2,
    moduleId: 1,
    term: "Prix d'équilibre",
    grammarNature: "nom_masculin",
    question: "Comment appelle-t-on le prix pour lequel la quantité de biens offerte par les vendeurs est égale à la quantité demandée par les acheteurs ?",
    definition: "Le niveau de prix où l'offre globale égale exactement la demande globale sur un marché.",
    shortDefinition: "Prix où la quantité offerte égale exactement la quantité demandée",
    example: "Le tarif d'une chambre d'hôtel ajusté jusqu'à ce que toutes les chambres soient réservées sans pénurie.",
    synonyms: ["prix d equilibre", "prix d'equilibre", "tarif d equilibre", "prix de marche"],
    distractors: ["Coût d'opportunité", "Chiffre d'affaires", "Bénéfice net"]
  },
  {
    id: "card_3_1",
    ficheId: 3,
    moduleId: 1,
    term: "Produit Intérieur Brut",
    grammarNature: "nom_masculin",
    question: "Quel agrégat statistique mesure la valeur totale des biens et services finaux produits dans un pays au cours d'une année ?",
    definition: "L'indicateur mesurant la somme des valeurs ajoutées créées par l'ensemble des activités économiques d'un pays.",
    shortDefinition: "Indicateur mesurant la valeur marchande totale des biens et services d'un pays",
    example: "La France a un PIB d'environ 2 800 milliards d'euros en valeur marchande.",
    synonyms: ["PIB", "produit interieur brut", "pib nominal", "pib reel"],
    distractors: ["Chiffre d'affaires", "Déficit budgétaire", "Excédent brut d'exploitation"]
  },
  {
    id: "card_4_1",
    ficheId: 4,
    moduleId: 1,
    term: "Prélèvements obligatoires",
    grammarNature: "nom_masculin_pluriel",
    question: "Quel ensemble regroupe les impôts, taxes et cotisations sociales versés sans contrepartie directe par les citoyens et entreprises ?",
    definition: "Les versements forcés effectués par les ménages et les entreprises aux administrations publiques.",
    shortDefinition: "Ensemble des impôts, taxes et cotisations sociales perçus par l'État",
    example: "L'impôt sur le revenu et les cotisations finançant la sécurité sociale.",
    synonyms: ["prelevements obligatoires", "impots et cotisations", "taxes et impots", "fiscalite globale"],
    distractors: ["Bénéfices industriels", "Frais de courtage", "Dividendes distribués"]
  },
  {
    id: "card_5_1",
    ficheId: 5,
    moduleId: 1,
    term: "Avantage comparatif",
    grammarNature: "nom_masculin",
    question: "Selon David Ricardo, quel principe explique qu'un pays gagne à se spécialiser dans la production où il est le plus efficace relativement aux autres ?",
    definition: "La capacité d'un pays à produire un bien à un coût d'opportunité inférieur à celui de ses partenaires.",
    shortDefinition: "Capacité d'un pays à produire un bien avec le plus faible coût relatif",
    example: "Le Portugal se spécialisant dans le vin et l'Angleterre dans les draps de laine.",
    synonyms: ["avantage comparatif", "principe ricardien", "theorie des avantages comparatifs", "specialisation relative"],
    distractors: ["Déficit commercial", "Carnet d'ordres", "Protectionnisme douanier"]
  },

  // Module 2
  {
    id: "card_6_1",
    ficheId: 6,
    moduleId: 2,
    term: "Monnaie fiduciaire",
    grammarNature: "nom_feminin",
    question: "Comment qualifie-t-on la monnaie matérielle composée des billets de banque et des pièces de monnaie, reposant sur la confiance légale ?",
    definition: "La forme physique de la monnaie (pièces et billets) dont la valeur faciale dépasse sa valeur matérielle intrinsèque.",
    shortDefinition: "Forme matérielle de la monnaie comprenant pièces et billets de banque",
    example: "Un billet de 50 euros en papier coton qui coûte quelques centimes à imprimer.",
    synonyms: ["monnaie fiduciaire", "billets et pieces", "especes", "cash"],
    distractors: ["Monnaie scripturale", "Obligation convertible", "Réserve fractionnaire"]
  },
  {
    id: "card_7_1",
    ficheId: 7,
    moduleId: 2,
    term: "Inflation",
    grammarNature: "nom_feminin",
    question: "Quel terme désigne la hausse générale, durable et auto-entretenue des prix des biens et des services, diminuant le pouvoir d'achat ?",
    definition: "La perte durable du pouvoir d'achat de la monnaie matérialisée par une montée générale des prix.",
    shortDefinition: "Hausse continue et généralisée du niveau moyen des prix",
    example: "Quand un panier de courses de 100 € passe à 106 € un an plus tard sans changement de contenu.",
    synonyms: ["inflation", "hausse des prix", "perte de pouvoir d achat", "cherté de la vie"],
    distractors: ["Déflation", "Rareté", "Volatilité"]
  },
  {
    id: "card_8_1",
    ficheId: 8,
    moduleId: 2,
    term: "Monnaie scripturale",
    grammarNature: "nom_feminin",
    question: "Quelle forme de monnaie, représentant plus de 90 % de la masse monétaire moderne, existe sous forme d'écritures sur des comptes bancaires ?",
    definition: "La monnaie immatérielle inscrite sur les comptes bancaires et transférée par carte, virement ou chèque.",
    shortDefinition: "Monnaie immatérielle inscrite au crédit des comptes bancaires",
    example: "Le solde visible sur ton application bancaire que tu transfères par paiement sans contact.",
    synonyms: ["monnaie scripturale", "monnaie bancaire", "argent ecriture", "depots a vue"],
    distractors: ["Monnaie fiduciaire", "Capitalisation boursière", "Action ordinaire"]
  },
  {
    id: "card_9_1",
    ficheId: 9,
    moduleId: 2,
    term: "Taux directeur",
    grammarNature: "nom_masculin",
    question: "Quel instrument financier fixé par la Banque Centrale détermine le taux d'intérêt auquel les banques commerciales se refinancent ?",
    definition: "Le taux d'intérêt de référence fixé par la Banque Centrale pour réguler l'offre de crédit et l'inflation.",
    shortDefinition: "Taux d'intérêt fixé par la Banque Centrale pour prêter aux banques",
    example: "La BCE relevant son taux principal à 4 % pour freiner la distribution de crédits et juguler l'inflation.",
    synonyms: ["taux directeur", "taux de refinancement", "taux central", "taux bce", "taux fed"],
    distractors: ["Taux d'usure", "Dividende unitaire", "Rendement obligataire"]
  },
  {
    id: "card_10_1",
    ficheId: 10,
    moduleId: 2,
    term: "Intérêts composés",
    grammarNature: "nom_masculin_pluriel",
    question: "Quel mécanisme financier désigne le calcul d'intérêts sur le capital initial majoré des intérêts accumulés lors des périodes précédentes ?",
    definition: "L'effet boule de neige où les intérêts d'une période s'ajoutent au capital pour générer de nouveaux intérêts.",
    shortDefinition: "Mécanisme où les intérêts passés s'ajoutent au capital et produisent eux-mêmes des gains",
    example: "Un placement de 1 000 € à 10 % qui rapporte 100 € la 1ère année, puis 110 € la 2ème année.",
    synonyms: ["interets composes", "effet boule de neige", "capitalisation des interets"],
    distractors: ["Frais de courtage", "Bons du Trésor", "Titres participatifs"]
  },

  // Module 3
  {
    id: "card_11_1",
    ficheId: 11,
    moduleId: 3,
    term: "Bénéfice net",
    grammarNature: "nom_masculin",
    question: "Quel indicateur comptable représente ce qu'il reste à une entreprise après déduction de toutes ses charges, impôts et intérêts de son chiffre d'affaires ?",
    definition: "Le résultat financier positif final d'une entreprise au terme d'un exercice comptable une fois tous les coûts payés.",
    shortDefinition: "Somme restante après déduction de l'ensemble des dépenses et impôts du chiffre d'affaires",
    example: "Une entreprise qui facture 1 million d'euros et supporte 850 000 € de dépenses réalise 150 000 € de bénéfice.",
    synonyms: ["benefice net", "resultat net", "profit net", "gain net"],
    distractors: ["Chiffre d'affaires", "Capital social", "Amortissement comptable"]
  },
  {
    id: "card_12_1",
    ficheId: 12,
    moduleId: 3,
    term: "Autofinancement",
    grammarNature: "nom_masculin",
    question: "Comment appelle-t-on le mode de financement par lequel une entreprise finance ses investissements avec ses propres bénéfices mis en réserve ?",
    definition: "La capacité d'une entreprise à financer son développement grâce à sa propre rentabilité et trésorerie interne.",
    shortDefinition: "Financement des investissements d'une entreprise par sa propre épargne interne",
    example: "Acheter un nouveau véhicule de livraison grâce aux bénéfices non distribués de l'année précédente.",
    synonyms: ["autofinancement", "fonds propres internes", "financement interne", "tresorerie propre"],
    distractors: ["Dette obligataire", "Crédit-bail", "Augmentation de capital"]
  },
  {
    id: "card_13_1",
    ficheId: 13,
    moduleId: 3,
    term: "Action",
    grammarNature: "nom_feminin",
    question: "Quel titre financier confère à son détenteur la propriété d'une fraction du capital d'une société et le droit de vote aux assemblées ?",
    definition: "Un titre de propriété représentatif d'une quote-part du capital social d'une entreprise.",
    shortDefinition: "Titre de propriété représentant une fraction du capital d'une entreprise",
    example: "Détenir 10 actions Hermès ou Microsoft dans son compte d'investissement.",
    synonyms: ["action", "titre de propriete", "part sociale", "action ordinaire"],
    distractors: ["Obligation", "Option d'achat", "Devise"]
  },
  {
    id: "card_13_2",
    ficheId: 13,
    moduleId: 3,
    term: "Obligation",
    grammarNature: "nom_feminin",
    question: "Quel titre de créance émis par une entreprise ou un État donne droit à un remboursement à terme augmenté d'un intérêt périodique appelé coupon ?",
    definition: "Un titre d'emprunt négociable reconnaissant une dette de l'émetteur envers le souscripteur.",
    shortDefinition: "Titre de dette reconnaissant un emprunt assorti d'un intérêt régulier",
    example: "Un Bon du Trésor français à 10 ans rapportant un intérêt fixe annuel de 3 %.",
    synonyms: ["obligation", "titre de dette", "titre obligataire", "bon du tresor", "creance"],
    distractors: ["Action", "Plus-value", "Capitalisation"]
  },
  {
    id: "card_14_1",
    ficheId: 14,
    moduleId: 3,
    term: "Marché primaire",
    grammarNature: "nom_masculin",
    question: "Sur quel compartiment de la bourse les entreprises émettent-elles pour la toute première fois de nouvelles actions pour lever des capitaux neufs ?",
    definition: "Le marché où s'échangent pour la première fois les titres neufs directement entre l'émetteur et les investisseurs.",
    shortDefinition: "Marché d'émission initiale de nouveaux titres où l'argent va directement à l'émetteur",
    example: "La journée de mise en vente des actions neuves d'une start-up lors de son introduction en bourse.",
    synonyms: ["marche primaire", "marche du neuf", "emission initiale", "compartiment d emission"],
    distractors: ["Marché secondaire", "Carnet d'ordres", "Marché gris"]
  },
  {
    id: "card_15_1",
    ficheId: 15,
    moduleId: 3,
    term: "Dividende",
    grammarNature: "nom_masculin",
    question: "Quelle somme d'argent prélevée sur le bénéfice net d'une entreprise est redistribuée périodiquement aux actionnaires à proportion de leurs parts ?",
    definition: "La part des bénéfices d'une entreprise décidée en assemblée générale et distribuée aux actionnaires.",
    shortDefinition: "Part du bénéfice net distribuée aux actionnaires au prorata de leurs actions",
    example: "Recevoir 2,50 € par action TotalEnergies détenue à la fin du trimestre.",
    synonyms: ["dividende", "distribution de benefice", "revenu d action", "coupon d action"],
    distractors: ["Plus-value", "Chiffre d'affaires", "Frais de garde"]
  },

  // Module 4
  {
    id: "card_16_1",
    ficheId: 16,
    moduleId: 4,
    term: "Carnet d'ordres",
    grammarNature: "nom_masculin",
    question: "Quel registre électronique centralise en temps réel toutes les intentions d'achat et de vente d'une action avec leurs quantités et leurs prix ?",
    definition: "L'outil informatisé regroupant les offres d'achat (bids) et de vente (asks) d'un titre financier.",
    shortDefinition: "Tableau listant les offres d'achat et de vente confrontées en bourse en temps réel",
    example: "Le listing affichant 500 actions demandées à 45,20 € face à 300 proposées à la vente à 45,30 €.",
    synonyms: ["carnet d ordres", "carnet d'ordres", "registre d ordres", "order book"],
    distractors: ["Indice boursier", "Fonds de garantie", "Bilan comptable"]
  },
  {
    id: "card_17_1",
    ficheId: 17,
    moduleId: 4,
    term: "Indice boursier",
    grammarNature: "nom_masculin",
    question: "Quel instrument statistique composé d'un échantillon d'actions représentatives (ex. CAC 40, S&P 500) mesure la performance globale d'un marché ?",
    definition: "La moyenne pondérée de la valeur d'un panier d'actions servant de baromètre à une place boursière.",
    shortDefinition: "Panier représentatif d'actions servant de thermomètre pour mesurer la tendance d'un marché",
    example: "Le S&P 500 qui regroupe les 500 plus grandes entreprises américaines cotées.",
    synonyms: ["indice boursier", "indice de marche", "index boursier", "barometre boursier"],
    distractors: ["Portefeuille d'arbitrage", "Rapport annuel", "Volatilité historique"]
  },
  {
    id: "card_18_1",
    ficheId: 18,
    moduleId: 4,
    term: "ETF (Tracker)",
    grammarNature: "nom_masculin",
    question: "Quel produit financier coté en bourse reproduit automatiquement et fidèlement les variations d'un indice de référence à faible coût ?",
    definition: "Un fonds de placement passif qui réplique la composition et la performance d'un indice boursier en temps réel.",
    shortDefinition: "Fonds indiciel coté répliquant la performance globale d'un indice de marché",
    example: "Un ETF MSCI World qui permet d'investir d'un coup dans 1 500 grandes entreprises de 23 pays développés.",
    synonyms: ["etf", "tracker", "fonds indiciel", "fonds indiciel cote", "exchange traded fund"],
    distractors: ["Obligation pourrie", "Contrat à terme", "Plan d'épargne logement"]
  },
  {
    id: "card_19_1",
    ficheId: 19,
    moduleId: 4,
    term: "Diversification",
    grammarNature: "nom_feminin",
    question: "Quelle stratégie consiste à répartir ses investissements entre différents actifs et secteurs pour réduire le risque global sans réduire le rendement ?",
    definition: "La règle de gestion consistant à panacher les placements financiers afin d'atténuer le risque spécifique.",
    shortDefinition: "Répartition des capitaux sur plusieurs actifs distincts pour limiter le risque global",
    example: "Acheter à la fois des actions de santé, de technologie, de l'or et des obligations souveraines.",
    synonyms: ["diversification", "repartition du risque", "dispersion des risques", "allocation diversifiee"],
    distractors: ["Spéculation", "Effet de levier", "Capitalisation"]
  },
  {
    id: "card_20_1",
    ficheId: 20,
    moduleId: 4,
    term: "FOMO (Peur de rater)",
    grammarNature: "nom_masculin",
    question: "Quel biais psychologique poussé par l'euphorie collective amène un individu à acheter précipitamment un actif en hausse par peur de rater un gain ?",
    definition: "Le sentiment d'anxiété ressenti à l'idée de passer à côté d'une opportunité financière lucrative suivie par les autres.",
    shortDefinition: "Peur irrationnelle de rater une opportunité qui pousse à acheter au plus haut par mimétisme",
    example: "Acheter une action au prix record absolu parce que tout le monde en parle sur les réseaux sociaux.",
    synonyms: ["fomo", "peur de rater le train", "peur de manquer", "euphorie mimétique", "effet moutonnier"],
    distractors: ["Régularité passive", "Analyse fondamentale", "Discipline budgétaire"]
  }
];

// Exportation des données pour l'usage dans les modules JavaScript
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TARGET_LANGUAGE, MODULES, FICHES, FLASHCARDS };
}
