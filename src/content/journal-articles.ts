export type JournalCategory =
  | "Orientation"
  | "Formations"
  | "Universités"
  | "Dossier"
  | "Études en France"
  | "Logement"
  | "Vie en France";

export type JournalSection = {
  heading: string;
  paragraphs: string[];
  items: string[];
};

export type JournalFaq = { q: string; a: string };

export type JournalArticle = {
  id: string;
  slug: string;
  category: JournalCategory;
  title: string;
  keyword: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  sections: JournalSection[];
  faq: JournalFaq[];
  cta: string;
  image: string;
  featured?: "main" | "side";
  badge?: string;
  related: string[];
};

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    "id": "domaines",
    "slug": "choisir-sa-formation",
    "category": "Orientation",
    "image": "/marketing/assets/img-005.webp",
    "featured": "main",
    "badge": "Orientation · À la une",
    "related": [
      "shortlist-universites",
      "universite-publique-ou-ecole-privee",
      "projet-etudes"
    ],
    "title": "Comment choisir sa formation quand plusieurs domaines vous intéressent ?",
    "keyword": "choisir sa formation en France",
    "metaTitle": "Comment choisir sa formation en France ? Méthode complète | EEF",
    "metaDescription": "Vous hésitez entre plusieurs domaines ou plusieurs formations ? Découvrez une méthode concrète pour choisir une formation en France cohérente avec votre profil, vos intérêts et votre projet professionnel.",
    "intro": [
      "Choisir une formation est souvent présenté comme une décision simple : identifier un domaine, sélectionner un diplôme puis envoyer sa candidature. En pratique, beaucoup d’étudiants internationaux hésitent entre plusieurs disciplines, plusieurs niveaux d’études ou plusieurs projets professionnels. Cette hésitation n’est pas un problème en soi. Elle devient surtout problématique lorsqu’elle conduit à multiplier des candidatures sans fil conducteur ou à choisir une formation uniquement parce que son intitulé semble attractif.",
      "Pour construire un projet d’études en France solide, il faut passer d’une logique de préférence à une logique de cohérence. Une bonne formation est celle qui correspond à votre niveau actuel, approfondit des compétences précises, vous ouvre des débouchés réalistes et peut être expliquée clairement dans votre dossier de candidature. La méthode ci-dessous permet de structurer ce choix étape par étape."
    ],
    "sections": [
      {
        "heading": "Commencer par votre profil, pas par le classement des écoles",
        "paragraphs": [
          "Avant de comparer les universités françaises, les écoles privées ou les différents masters, commencez par analyser votre propre parcours. Listez les matières dans lesquelles vous êtes à l’aise, les projets académiques que vous avez appréciés, vos expériences professionnelles éventuelles et les compétences que vous souhaitez développer. Cette première étape permet d’éviter de choisir un cursus uniquement pour sa réputation ou parce qu’il est populaire auprès d’autres étudiants.",
          "Demandez-vous également quel niveau de spécialisation vous recherchez. Un étudiant en licence qui hésite entre finance, économie et data n’a pas nécessairement besoin de choisir immédiatement un métier précis. En revanche, il doit être capable d’identifier ce qu’il souhaite approfondir : analyse financière, économétrie, programmation, politique économique, gestion d’entreprise, marketing, droit ou autre domaine. Ce sont ces compétences qui doivent guider la recherche de formation."
        ],
        "items": []
      },
      {
        "heading": "Distinguer le domaine, la spécialisation et le métier",
        "paragraphs": [
          "Une erreur fréquente consiste à confondre un domaine d’études avec un métier. Étudier la finance, par exemple, peut conduire vers la banque, l’audit, la gestion d’actifs, le conseil, la trésorerie, la finance d’entreprise ou encore la recherche quantitative. De la même manière, un cursus en informatique peut mener au développement logiciel, à la cybersécurité, à la data science ou à l’intelligence artificielle.",
          "Lorsque plusieurs domaines vous intéressent, comparez-les selon trois axes : ce que vous allez réellement étudier, les compétences que vous allez acquérir et les débouchés accessibles après le diplôme. Cette approche transforme un choix abstrait en comparaison concrète."
        ],
        "items": []
      },
      {
        "heading": "Lire le programme détaillé de chaque formation",
        "paragraphs": [
          "Le nom d’une formation n’est jamais suffisant. Deux masters intitulés « Finance » peuvent avoir des contenus radicalement différents. L’un peut être orienté marchés financiers et produits dérivés, l’autre finance d’entreprise, tandis qu’un troisième insiste sur la gestion des risques ou les méthodes quantitatives. Pour choisir une formation en France, consultez toujours le programme semestre par semestre lorsque cette information est disponible.",
          "Regardez les unités d’enseignement obligatoires, les options, les projets, les stages, les possibilités d’alternance, la langue d’enseignement et les prérequis. Repérez les matières qui répondent directement à vos objectifs. Lorsque vous préparez ensuite votre lettre de motivation ou votre projet d’études, ces éléments précis vous permettront d’expliquer pourquoi la formation correspond réellement à votre parcours."
        ],
        "items": []
      },
      {
        "heading": "Construire une matrice de comparaison",
        "paragraphs": [
          "Pour éviter de choisir au feeling, créez un tableau simple avec les formations en lignes et vos critères en colonnes. Vous pouvez inclure : adéquation avec votre parcours, intérêt du programme, niveau académique demandé, reconnaissance du diplôme, ville, coût des études, coût de la vie, possibilités de stage, alternance, débouchés et langue d’enseignement. L’objectif n’est pas d’attribuer une note parfaite à chaque établissement, mais de visualiser les compromis.",
          "Une formation très réputée mais complètement éloignée de votre parcours peut être moins pertinente qu’un programme légèrement moins connu mais parfaitement aligné avec vos acquis. À l’inverse, une formation très cohérente académiquement peut être difficile à financer si elle implique des frais de scolarité et un coût de vie trop élevés. Le choix final doit donc tenir compte de l’ensemble du projet étudiant."
        ],
        "items": []
      },
      {
        "heading": "Vérifier la cohérence avec votre parcours antérieur",
        "paragraphs": [
          "Les établissements cherchent généralement à comprendre la progression logique d’un candidat. Une continuité directe n’est pas obligatoire : il est possible de se réorienter. Mais plus le changement est important, plus il doit être expliqué. Un étudiant en biologie qui candidate à un master de data science devra, par exemple, montrer les compétences quantitatives déjà acquises et expliquer pourquoi la data constitue une évolution logique de son projet.",
          "La cohérence ne signifie donc pas rester enfermé dans la même spécialité. Elle signifie être capable de raconter la transition : ce que vous avez appris, ce qui vous manque aujourd’hui, pourquoi cette formation apporte la prochaine étape et comment elle se rattache à votre projet professionnel."
        ],
        "items": []
      },
      {
        "heading": "Penser au projet professionnel sans chercher une réponse définitive",
        "paragraphs": [
          "Beaucoup d’étudiants pensent qu’ils doivent annoncer un métier extrêmement précis. Ce n’est pas toujours nécessaire. Un projet professionnel crédible peut rester ouvert, à condition d’être structuré. Vous pouvez viser un secteur, une fonction ou un type de poste, puis expliquer comment la formation vous permettra d’affiner cette orientation.",
          "Il est généralement plus convaincant de dire que vous souhaitez développer une expertise en analyse de données appliquée à la finance afin d’évoluer vers des fonctions quantitatives que d’annoncer un poste très précis sans lien démontré avec votre parcours. La précision doit servir la cohérence, pas créer une promesse artificielle."
        ],
        "items": []
      },
      {
        "heading": "Éviter la candidature dispersée",
        "paragraphs": [
          "Une liste de candidatures mélangeant architecture, marketing, finance, droit et informatique sera difficile à justifier si aucun fil conducteur ne relie ces choix. Même lorsqu’une plateforme permet de sélectionner plusieurs formations, il reste important de conserver une logique globale. Cela facilite non seulement la compréhension de votre projet par les établissements, mais aussi la préparation d’un éventuel entretien.",
          "Si deux domaines vous intéressent réellement, cherchez les passerelles entre eux. Des programmes hybrides existent dans de nombreux secteurs : finance et data, droit et économie, ingénierie et management, marketing et analytics, santé et technologies numériques. Une formation interdisciplinaire peut parfois résoudre une hésitation mieux qu’un choix radical entre deux univers."
        ],
        "items": []
      },
      {
        "heading": "Questions à vous poser avant de valider votre choix",
        "paragraphs": [],
        "items": [
          "Est-ce que je comprends précisément ce que je vais étudier pendant cette formation ?",
          "Puis-je expliquer pourquoi cette formation est la suite logique de mon parcours ?",
          "Les prérequis correspondent-ils réellement à mon niveau ?",
          "Les débouchés correspondent-ils à ce que je souhaite explorer professionnellement ?",
          "Le coût total des études et de la vie est-il compatible avec mon budget ?",
          "Puis-je expliquer pourquoi j’ai choisi cet établissement plutôt qu’un autre ?"
        ]
      }
    ],
    "faq": [
      {
        "q": "Peut-on candidater dans plusieurs domaines différents ?",
        "a": "Oui, mais il faut éviter une dispersion difficile à expliquer. Si vos candidatures couvrent plusieurs domaines, identifiez le fil conducteur entre eux et adaptez chaque motivation au programme visé."
      },
      {
        "q": "Faut-il choisir la formation la mieux classée ?",
        "a": "Un classement peut être un indicateur parmi d’autres, mais il ne remplace pas l’analyse du programme, de la reconnaissance du diplôme, des débouchés, des prérequis et de votre propre profil."
      },
      {
        "q": "Que faire si je ne connais pas encore mon métier futur ?",
        "a": "Vous pouvez construire un projet autour de compétences et d’un secteur plutôt qu’autour d’un intitulé de poste définitif. L’essentiel est de montrer que votre choix d’études répond à une logique claire."
      }
    ],
    "cta": "Comparez vos options avec un conseiller EEF et construisez une shortlist de formations cohérente avec votre parcours, votre budget et votre projet."
  },
  {
    "id": "publique-privee",
    "slug": "universite-publique-ou-ecole-privee",
    "category": "Formations",
    "image": "/marketing/assets/img-006.PNG",
    "featured": "side",
    "related": [
      "choisir-sa-formation",
      "shortlist-universites",
      "projet-etudes"
    ],
    "title": "Université publique ou école privée : quelles différences regarder ?",
    "keyword": "université publique ou école privée en France",
    "metaTitle": "Université publique ou école privée en France : que choisir ? | EEF",
    "metaDescription": "Université publique ou école privée en France : comparez coûts, diplômes, reconnaissance, pédagogie, admission, alternance et débouchés avant de choisir votre établissement.",
    "intro": [
      "Pour un étudiant international, choisir entre une université publique et une école privée en France peut être difficile. Les différences ne se résument pas au prix. Elles concernent aussi le type de diplôme, la pédagogie, le mode d’admission, l’accompagnement, les liens avec les entreprises et parfois la reconnaissance académique du programme.",
      "Il n’existe pas de réponse universelle. Une université publique peut être parfaitement adaptée à un étudiant recherchant une formation académique solide et un coût maîtrisé, tandis qu’une école privée peut convenir à un étudiant qui privilégie des promotions plus encadrées, une forte professionnalisation ou un programme spécialisé. L’enjeu est de comparer les établissements sur des critères vérifiables."
    ],
    "sections": [
      {
        "heading": "Comprendre la différence de statut",
        "paragraphs": [
          "Les universités publiques françaises appartiennent au système public d’enseignement supérieur. Elles proposent notamment des licences, masters et doctorats. Les établissements privés regroupent des réalités très différentes : écoles de commerce, écoles d’ingénieurs, instituts spécialisés, écoles de design, écoles du numérique ou établissements proposant leurs propres titres.",
          "Le mot « privé » ne garantit donc ni un niveau académique supérieur ni inférieur. De la même manière, le mot « public » ne signifie pas que toutes les formations ont le même niveau de sélectivité. Il faut analyser l’établissement et surtout le diplôme ou le titre précis auquel vous candidatez."
        ],
        "items": []
      },
      {
        "heading": "Comparer les frais de scolarité et le coût global",
        "paragraphs": [
          "Le coût constitue souvent la différence la plus visible. Certaines écoles privées facturent plusieurs milliers d’euros par année académique, parfois davantage pour des programmes très spécialisés. Dans le public, les droits d’inscription sont généralement plus encadrés, même si la situation peut varier selon le diplôme, le statut de l’étudiant, les exonérations éventuelles et les politiques de l’établissement.",
          "Ne comparez jamais uniquement les frais de scolarité. Calculez le budget global : logement, transport, alimentation, assurance, matériel, frais administratifs et coût de la vie dans la ville choisie. Une formation moins chère située dans une ville très coûteuse peut finalement représenter un budget annuel proche d’une autre option."
        ],
        "items": []
      },
      {
        "heading": "Vérifier la reconnaissance du diplôme",
        "paragraphs": [
          "C’est l’un des points les plus importants, surtout dans le privé. Avant de payer des frais de dossier ou de scolarité, identifiez précisément la nature du diplôme ou du titre délivré. Ne vous contentez pas d’un terme commercial comme « Bachelor » ou « MBA ». Cherchez les informations officielles sur le niveau de qualification, la reconnaissance et, lorsque cela s’applique, les accréditations ou enregistrements correspondants.",
          "Pour un étudiant international, cette vérification est essentielle si vous souhaitez poursuivre ensuite vos études, faire reconnaître votre parcours dans un autre pays ou présenter votre diplôme à un employeur. Un intitulé attractif ne remplace jamais la vérification institutionnelle."
        ],
        "items": []
      },
      {
        "heading": "Comparer la pédagogie",
        "paragraphs": [
          "Les universités publiques proposent souvent une approche plus académique et peuvent accueillir des promotions importantes, notamment en licence. Les étudiants doivent parfois être plus autonomes dans leur organisation. Les écoles privées mettent souvent en avant un encadrement plus rapproché, des projets, des cas pratiques et une proximité avec les entreprises. Mais ces tendances ne sont pas absolues.",
          "Pour comparer correctement, regardez le nombre d’heures de cours, la proportion de travaux dirigés, les projets collectifs, les interventions de professionnels, la place du stage, de l’alternance ou du mémoire, ainsi que les outils mis à disposition. Un programme détaillé vous donnera beaucoup plus d’informations que la simple catégorie public/privé."
        ],
        "items": []
      },
      {
        "heading": "Admission et sélectivité",
        "paragraphs": [
          "Une université publique peut sélectionner sur dossier, prérequis académiques et capacité d’accueil. Certaines formations très demandées sont particulièrement compétitives. Les écoles privées peuvent avoir leurs propres procédures : dossier, entretien, tests, concours ou admission parallèle.",
          "Ne supposez pas qu’une école privée est automatiquement plus facile d’accès parce qu’elle est payante. À l’inverse, ne supposez pas non plus qu’une université publique est systématiquement plus sélective. Analysez les critères précis de la formation ciblée et vérifiez votre adéquation avec les prérequis."
        ],
        "items": []
      },
      {
        "heading": "Stages, alternance et insertion professionnelle",
        "paragraphs": [
          "Pour certains étudiants, la priorité est l’employabilité. Dans ce cas, analysez la place des expériences professionnelles dans le cursus. Combien de mois de stage sont prévus ? L’alternance est-elle possible ? Quels types d’entreprises recrutent les diplômés ? Existe-t-il un service carrière actif ? Des événements de recrutement sont-ils organisés ?",
          "Évitez toutefois de vous contenter de statistiques marketing isolées. Lorsque des données d’insertion sont publiées, regardez leur méthodologie, l’année concernée et la population mesurée. Le meilleur indicateur reste la combinaison entre qualité du programme, expériences professionnelles, compétences acquises et réseau accessible."
        ],
        "items": []
      },
      {
        "heading": "Vie étudiante et accompagnement international",
        "paragraphs": [
          "Pour un étudiant qui arrive en France, l’accompagnement administratif peut avoir une vraie valeur. Renseignez-vous sur l’accueil des étudiants internationaux, l’aide au logement, les associations, les services linguistiques et l’accompagnement dans les démarches. Les grandes universités disposent parfois de services internationaux très structurés, tandis que certaines écoles privées proposent un suivi plus personnalisé."
        ],
        "items": []
      },
      {
        "heading": "Tableau mental de décision",
        "paragraphs": [],
        "items": [
          "Nature et reconnaissance du diplôme",
          "Contenu détaillé du programme",
          "Frais de scolarité et coût de vie",
          "Sélectivité et prérequis",
          "Stage ou alternance",
          "Encadrement pédagogique",
          "Réseau d’entreprises",
          "Ville et logement",
          "Possibilités de poursuite d’études"
        ]
      }
    ],
    "faq": [
      {
        "q": "Une école privée est-elle forcément meilleure pour trouver un emploi ?",
        "a": "Non. L’insertion dépend du secteur, du programme, des stages, des compétences et de la réputation réelle de la formation. Certaines universités publiques disposent d’excellents réseaux professionnels et de masters très reconnus."
      },
      {
        "q": "Comment savoir si une école privée est sérieuse ?",
        "a": "Vérifiez l’existence juridique de l’établissement, la nature exacte du diplôme ou titre, les reconnaissances officielles pertinentes, le contenu des cours, les conditions de remboursement et les informations contractuelles avant tout paiement important."
      }
    ],
    "cta": "Avant de candidater, faites vérifier la cohérence académique, le niveau du diplôme et le budget réel de vos options avec EEF."
  },
  {
    "id": "shortlist",
    "slug": "shortlist-universites",
    "category": "Universités",
    "image": "/marketing/assets/img-006.PNG",
    "featured": "side",
    "related": [
      "projet-etudes",
      "erreurs-candidature",
      "procedure-etudes-en-france"
    ],
    "title": "Construire une shortlist d’universités : la méthode",
    "keyword": "shortlist universités France",
    "metaTitle": "Comment construire une shortlist d’universités en France ? | EEF",
    "metaDescription": "Méthode étape par étape pour construire une shortlist d’universités en France : critères, niveaux d’ambition, budget, prérequis, cohérence du projet et stratégie de candidature.",
    "intro": [
      "Construire une shortlist d’universités est l’une des étapes les plus stratégiques d’un projet d’études en France. Une bonne liste de candidatures ne cherche pas à maximiser le nombre d’établissements. Elle cherche à maximiser la pertinence : chaque formation sélectionnée doit avoir une raison d’être dans votre projet.",
      "Cette méthode est particulièrement importante pour les étudiants internationaux, car les candidatures demandent du temps, des documents, parfois des frais et souvent une adaptation du projet de motivation. Une shortlist bien construite permet de concentrer vos efforts sur les programmes où votre profil a du sens."
    ],
    "sections": [
      {
        "heading": "Définir vos critères non négociables",
        "paragraphs": [
          "Commencez par séparer les critères essentiels des critères secondaires. Vos critères essentiels peuvent être : domaine d’études, niveau de diplôme, langue d’enseignement, budget maximal, ville ou région, possibilité d’alternance, reconnaissance du diplôme ou présence d’une spécialisation précise. Les critères secondaires peuvent inclure la taille de la ville, la vie associative, la proximité géographique ou certains équipements du campus.",
          "Cette distinction évite de perdre du temps sur des formations attractives mais incompatibles avec votre situation. Si votre budget annuel est limité, par exemple, il est inutile de construire toute votre stratégie autour de programmes dont les frais excèdent largement vos possibilités de financement."
        ],
        "items": []
      },
      {
        "heading": "Créer une liste large avant de filtrer",
        "paragraphs": [
          "Commencez par identifier un ensemble assez large de programmes qui correspondent à votre domaine. À cette étape, ne cherchez pas encore à décider. Collectez les informations principales : nom de l’établissement, ville, diplôme, spécialisation, prérequis, langue, calendrier, coût et modalités de candidature.",
          "Ensuite, éliminez progressivement les formations qui ne répondent pas à vos critères essentiels. Cette méthode est plus efficace que de choisir trois universités au hasard puis d’essayer de construire votre projet autour d’elles."
        ],
        "items": []
      },
      {
        "heading": "Lire les prérequis comme un recruteur académique",
        "paragraphs": [
          "Pour chaque programme, comparez votre profil avec les prérequis. Regardez le diplôme demandé, les matières nécessaires, le niveau en mathématiques ou en langues, les expériences attendues et les éventuels tests. Lorsque les prérequis sont formulés de manière générale, analysez le contenu du programme pour comprendre le niveau réel attendu.",
          "Un programme très quantitatif peut être difficile à intégrer sans base solide en statistiques ou en mathématiques, même si la page d’admission ne donne pas de seuil précis. À l’inverse, une expérience professionnelle pertinente peut renforcer une candidature lorsque le programme valorise les profils appliqués."
        ],
        "items": []
      },
      {
        "heading": "Répartir les candidatures par niveau de sélectivité",
        "paragraphs": [
          "Une stratégie équilibrée peut inclure des formations ambitieuses, des formations très cohérentes avec votre profil et des options plus sécurisantes. Cette logique ne doit pas être interprétée comme une garantie d’admission. La sélection dépend de nombreux facteurs, notamment le volume de candidatures et la qualité du dossier cette année-là.",
          "L’objectif est simplement d’éviter deux extrêmes : candidater uniquement à des programmes extrêmement compétitifs ou, à l’inverse, choisir uniquement des programmes faciles d’accès sans rapport avec vos ambitions."
        ],
        "items": []
      },
      {
        "heading": "Intégrer le coût de la ville dans la shortlist",
        "paragraphs": [
          "Paris n’a pas le même coût de vie que toutes les autres villes françaises. Le logement peut représenter la principale dépense du budget étudiant. Lorsque vous comparez deux formations, ajoutez une estimation réaliste du loyer, des transports et des dépenses courantes. Une formation légèrement plus chère dans une ville accessible peut parfois être plus facile à financer qu’un programme peu coûteux dans une zone où le logement est rare et cher."
        ],
        "items": []
      },
      {
        "heading": "Vérifier la logique globale de la liste",
        "paragraphs": [
          "Une shortlist cohérente doit raconter une histoire. Si vous candidatez à six masters, un lecteur devrait pouvoir comprendre le thème commun qui relie ces choix. Les programmes peuvent différer par leur approche, mais ils doivent rester compatibles avec votre projet d’études.",
          "Cette cohérence vous aidera ensuite pour les lettres de motivation, les entretiens et la procédure Études en France lorsqu’elle s’applique à votre situation."
        ],
        "items": []
      },
      {
        "heading": "Adapter la motivation à chaque établissement",
        "paragraphs": [
          "La shortlist ne sert pas seulement à choisir où candidater ; elle doit aussi faciliter la personnalisation. Pour chaque formation, notez trois éléments précis qui expliquent votre intérêt : une matière, une spécialisation, un laboratoire, un partenariat, une méthode pédagogique, un débouché ou une possibilité de stage. Ces éléments deviendront ensuite la base d’une lettre de motivation crédible."
        ],
        "items": []
      },
      {
        "heading": "Exemple de tableau de shortlist",
        "paragraphs": [],
        "items": [
          "Établissement: Programme — Ville — Adéquation profil — Budget — Pré-requis — Priorité",
          "Université A: Master économie — Lyon — Forte — Moyen — OK — Haute",
          "Université B: Master data — Paris — Moyenne — Élevé — À vérifier — Moyenne",
          "École C: MSc finance — Lille — Forte — Élevé — OK — Haute"
        ]
      }
    ],
    "faq": [
      {
        "q": "Combien d’universités faut-il sélectionner ?",
        "a": "Il n’existe pas de nombre idéal universel. Le bon nombre dépend des procédures applicables, de votre temps, de votre budget et de la cohérence de vos options. La qualité de la sélection compte davantage que le volume."
      },
      {
        "q": "Dois-je candidater uniquement dans les grandes villes ?",
        "a": "Non. De nombreuses villes universitaires offrent des programmes solides, parfois avec un coût de vie plus accessible. Le choix de la ville doit être relié au programme et à votre budget."
      }
    ],
    "cta": "Construisez votre shortlist avec EEF afin de comparer les programmes, les critères d’admission et la cohérence de votre stratégie de candidature."
  },
  {
    "id": "projet",
    "slug": "projet-etudes",
    "category": "Dossier",
    "image": "/marketing/assets/img-004.webp",
    "related": [
      "erreurs-candidature",
      "procedure-etudes-en-france"
    ],
    "title": "Comment structurer un projet d’études cohérent ?",
    "keyword": "projet d’études cohérent",
    "metaTitle": "Comment structurer un projet d’études cohérent ? Guide complet | EEF",
    "metaDescription": "Apprenez à structurer un projet d’études cohérent pour une candidature en France : parcours, choix de formation, compétences, motivation, projet professionnel et erreurs à éviter.",
    "intro": [
      "Le projet d’études est le fil conducteur de votre candidature. Il permet à un établissement, et selon votre situation à d’autres interlocuteurs du parcours administratif, de comprendre pourquoi vous souhaitez poursuivre cette formation, pourquoi maintenant et comment ce choix s’inscrit dans votre trajectoire.",
      "Un projet cohérent n’est pas nécessairement linéaire. Vous pouvez changer de domaine, reprendre vos études ou viser une spécialisation nouvelle. Ce qui compte est votre capacité à expliquer cette évolution avec des faits concrets et une logique compréhensible."
    ],
    "sections": [
      {
        "heading": "Présenter votre point de départ",
        "paragraphs": [
          "Commencez par les éléments de votre parcours qui ont un lien direct avec votre candidature : diplôme actuel, spécialité, projets importants, stages, expériences professionnelles ou compétences techniques. Évitez de raconter toute votre biographie. Sélectionnez ce qui aide le lecteur à comprendre comment votre intérêt pour le domaine s’est construit."
        ],
        "items": []
      },
      {
        "heading": "Identifier le besoin de progression",
        "paragraphs": [
          "Une candidature devient plus convaincante lorsque vous expliquez ce qui vous manque aujourd’hui. Peut-être souhaitez-vous approfondir une discipline, passer d’une approche généraliste à une spécialisation, acquérir des compétences quantitatives ou ajouter une dimension internationale à votre parcours. Ce manque crée le lien logique avec la formation recherchée."
        ],
        "items": []
      },
      {
        "heading": "Expliquer pourquoi cette formation",
        "paragraphs": [
          "Évitez les phrases génériques telles que « votre établissement est prestigieux » ou « la France offre une excellente éducation ». Appuyez votre motivation sur des éléments précis du programme : modules, spécialisation, projets, stage, pédagogie, laboratoire, orientation recherche ou partenariats professionnels.",
          "L’objectif est de montrer que vous avez compris ce que vous allez étudier. Une motivation spécifique est beaucoup plus crédible qu’un texte pouvant être envoyé sans modification à dix établissements différents."
        ],
        "items": []
      },
      {
        "heading": "Relier la formation au projet professionnel",
        "paragraphs": [
          "Votre projet professionnel ne doit pas nécessairement être figé, mais il doit fournir une direction. Indiquez le secteur, la fonction ou le type de problématiques qui vous intéressent. Puis expliquez quelles compétences de la formation vous aideront à progresser vers cet objectif.",
          "Par exemple, au lieu d’écrire seulement « je souhaite travailler dans la finance », vous pouvez préciser que vous souhaitez développer des compétences en analyse financière et gestion des risques afin d’évoluer vers des fonctions de marché ou de gestion d’actifs. La formulation reste ouverte tout en étant structurée."
        ],
        "items": []
      },
      {
        "heading": "Gérer une réorientation",
        "paragraphs": [
          "Une réorientation n’est pas automatiquement négative. Elle devient problématique lorsqu’elle n’est pas expliquée. Montrez les compétences transférables de votre parcours précédent et le raisonnement qui vous conduit vers le nouveau domaine. Si vous avez suivi des cours, certifications, projets personnels ou expériences permettant de combler l’écart, mentionnez-les."
        ],
        "items": []
      },
      {
        "heading": "Garder une cohérence entre tous les documents",
        "paragraphs": [
          "Le CV, la lettre de motivation, le formulaire de candidature, le projet d’études et les réponses en entretien doivent raconter la même histoire. Les dates, objectifs et informations essentielles ne doivent pas se contredire. Une petite incohérence peut parfois créer davantage de questions que la faiblesse initiale qu’elle cherchait à masquer."
        ],
        "items": []
      },
      {
        "heading": "Structure simple en cinq blocs",
        "paragraphs": [],
        "items": [
          "Votre parcours actuel et vos acquis",
          "Le déclic ou le besoin qui motive la poursuite d’études",
          "Pourquoi cette formation et cet établissement",
          "Les compétences que vous souhaitez développer",
          "Votre objectif professionnel et la logique d’ensemble"
        ]
      },
      {
        "heading": "Exemple de logique narrative",
        "paragraphs": [
          "« Mon parcours en économie m’a permis d’acquérir une base solide en analyse macroéconomique. Lors d’un projet universitaire consacré aux prévisions d’inflation, j’ai découvert l’importance des méthodes quantitatives et de la programmation. Je souhaite désormais approfondir l’économétrie et la data appliquée à l’économie. Le master X m’intéresse notamment pour ses enseignements en séries temporelles et en machine learning. À terme, je souhaite évoluer vers des fonctions d’analyse économique quantitative. »",
          "Cet exemple fonctionne parce que chaque phrase prépare la suivante : parcours, expérience, besoin de spécialisation, choix de formation, objectif."
        ],
        "items": []
      }
    ],
    "faq": [
      {
        "q": "Quelle longueur pour un projet d’études ?",
        "a": "Respectez toujours la limite demandée par la plateforme ou l’établissement. Lorsqu’aucune limite n’est précisée, privilégiez un texte dense et lisible plutôt qu’un long récit répétitif."
      },
      {
        "q": "Peut-on changer de projet professionnel après l’admission ?",
        "a": "Oui. Un projet présenté dans une candidature décrit votre logique et vos objectifs au moment de la demande. Les études servent aussi à préciser une orientation. L’important est que le projet présenté soit sincère et cohérent."
      }
    ],
    "cta": "Faites relire la logique de votre projet d’études par EEF avant d’envoyer vos candidatures."
  },
  {
    "id": "erreurs",
    "slug": "erreurs-candidature",
    "category": "Dossier",
    "image": "/marketing/assets/img-003.webp",
    "related": [
      "projet-etudes",
      "procedure-etudes-en-france",
      "choisir-sa-formation"
    ],
    "title": "Les erreurs qui rendent une candidature difficile à comprendre",
    "keyword": "erreurs candidature université France",
    "metaTitle": "Candidature en France : les erreurs à éviter absolument | EEF",
    "metaDescription": "Découvrez les erreurs qui rendent un dossier de candidature difficile à comprendre : incohérences, motivation générique, pièces mal préparées, réorientation non expliquée et choix dispersés.",
    "intro": [
      "Un refus de candidature ne signifie pas toujours qu’un candidat manque de niveau. Certains dossiers deviennent simplement difficiles à lire ou à comprendre. Lorsque les informations sont dispersées, contradictoires ou trop générales, le lecteur doit lui-même reconstruire la logique du projet. Dans un processus de sélection avec de nombreux candidats, cette confusion peut fortement affaiblir un dossier."
    ],
    "sections": [
      {
        "heading": "Une motivation trop générale",
        "paragraphs": [
          "« Je souhaite étudier en France pour la qualité de son système éducatif » est une phrase extrêmement fréquente. Elle n’explique ni votre choix de programme ni votre objectif. Utilisez plutôt des arguments spécifiques : matières, compétences recherchées, spécialisation, projet académique ou débouchés."
        ],
        "items": []
      },
      {
        "heading": "Copier la même lettre partout",
        "paragraphs": [
          "Réutiliser une structure peut être efficace, mais envoyer exactement la même lettre à toutes les formations produit souvent un texte vague. Chaque établissement doit pouvoir comprendre pourquoi son programme apparaît dans votre shortlist."
        ],
        "items": []
      },
      {
        "heading": "Multiplier les domaines sans fil conducteur",
        "paragraphs": [
          "Des candidatures en droit, informatique, marketing et biologie peuvent sembler incohérentes si aucune explication ne les relie. Si vous avez plusieurs centres d’intérêt, recherchez une logique transversale ou réduisez le périmètre de vos choix."
        ],
        "items": []
      },
      {
        "heading": "Ignorer les prérequis",
        "paragraphs": [
          "Une candidature ambitieuse est légitime, mais elle doit rester réaliste. Si un master exige une base importante en mathématiques, en programmation ou dans une discipline spécifique, vérifiez que votre dossier peut démontrer ces acquis. Sinon, identifiez des formations permettant une progression intermédiaire."
        ],
        "items": []
      },
      {
        "heading": "Laisser une réorientation sans explication",
        "paragraphs": [
          "Changer de domaine n’est pas une faute. L’absence d’explication est le vrai problème. Présentez les raisons du changement, les compétences transférables et les actions déjà entreprises pour préparer cette nouvelle orientation."
        ],
        "items": []
      },
      {
        "heading": "Fournir des documents incohérents",
        "paragraphs": [
          "Vérifiez les dates d’études et d’emploi, les intitulés de diplômes, les noms d’établissements et les informations personnelles. Le CV, le formulaire et les justificatifs doivent être compatibles. Les erreurs de dates ou les périodes inexpliquées peuvent créer des doutes inutiles."
        ],
        "items": []
      },
      {
        "heading": "Envoyer des documents difficiles à lire",
        "paragraphs": [
          "Scans incomplets, documents flous, fichiers mal nommés ou pièces non traduites lorsque cela est demandé compliquent la lecture du dossier. Préparez des fichiers propres, lisibles et classés. Suivez exactement les exigences de format de chaque plateforme."
        ],
        "items": []
      },
      {
        "heading": "Exagérer son projet",
        "paragraphs": [
          "Un projet trop spectaculaire mais peu crédible peut desservir une candidature. Il vaut mieux présenter un objectif réaliste, cohérent avec votre parcours, qu’une ambition très précise sans expérience ni justification. La crédibilité vient de la progression logique."
        ],
        "items": []
      },
      {
        "heading": "Négliger la langue",
        "paragraphs": [
          "Un texte contenant de nombreuses fautes peut rendre la lecture difficile. Relisez votre candidature, vérifiez la syntaxe et évitez les traductions littérales maladroites. Si le programme demande un niveau de langue particulier, préparez aussi les justificatifs correspondants."
        ],
        "items": []
      },
      {
        "heading": "Attendre le dernier moment",
        "paragraphs": [
          "Les candidatures demandent souvent plusieurs pièces : relevés de notes, diplômes, traductions, attestations, recommandations, tests de langue ou justificatifs administratifs. Commencer tôt réduit le risque d’envoyer un dossier incomplet ou précipité."
        ],
        "items": []
      },
      {
        "heading": "Checklist avant envoi",
        "paragraphs": [],
        "items": [
          "Toutes les informations personnelles sont exactes",
          "Les dates du CV correspondent aux justificatifs",
          "La formation est compatible avec vos prérequis",
          "La motivation mentionne des éléments spécifiques du programme",
          "Votre projet professionnel est compréhensible",
          "Les documents sont lisibles et correctement nommés",
          "Les traductions demandées sont jointes",
          "Les délais officiels ont été vérifiés"
        ]
      }
    ],
    "faq": [
      {
        "q": "Une faute dans un dossier entraîne-t-elle automatiquement un refus ?",
        "a": "Non. Tout dépend de la nature de l’erreur. Une coquille n’a pas le même impact qu’une information contradictoire sur un diplôme ou qu’un document essentiel manquant."
      },
      {
        "q": "Faut-il expliquer une année sans études ?",
        "a": "Lorsque la période est significative, une explication simple peut être utile : emploi, préparation d’un concours, projet personnel, obligations familiales ou autre situation pertinente. L’objectif est d’éviter une zone d’ombre inutile."
      }
    ],
    "cta": "Utilisez une revue de dossier EEF avant soumission afin d’identifier les incohérences, les formulations faibles et les pièces manquantes."
  },
  {
    "id": "checklist",
    "slug": "preparer-son-depart",
    "category": "Vie en France",
    "image": "/marketing/assets/img-007.webp",
    "related": [
      "logement-etudiant",
      "procedure-etudes-en-france"
    ],
    "title": "Préparer son départ en France : la checklist",
    "keyword": "préparer départ en France étudiant",
    "metaTitle": "Préparer son départ en France : checklist étudiant international | EEF",
    "metaDescription": "Documents, logement, budget, transport, santé et démarches : la checklist complète pour préparer son départ et ses premiers jours d’études en France.",
    "intro": [
      "L’admission est une étape importante, mais elle ne représente pas la fin des démarches. Entre la confirmation de votre place et votre installation en France, plusieurs éléments doivent être coordonnés : documents administratifs, logement, budget, transport, santé, téléphone, banque et inscription dans l’établissement.",
      "Une bonne préparation permet surtout d’éviter les problèmes qui coûtent du temps et de l’argent dans les premiers jours. Cette checklist distingue ce qui doit être préparé avant le départ, ce qui doit être conservé avec vous pendant le voyage et ce qui peut être finalisé après l’arrivée."
    ],
    "sections": [
      {
        "heading": "Vérifier les documents de voyage et d’études",
        "paragraphs": [
          "Assurez-vous que votre passeport est valide et que votre situation de visa ou de titre de séjour correspond à votre projet. Conservez votre lettre d’admission, les justificatifs nécessaires à votre voyage et les documents demandés par votre établissement. Les règles varient selon la nationalité et la situation individuelle : vérifiez toujours les procédures officielles applicables à votre cas."
        ],
        "items": []
      },
      {
        "heading": "Préparer plusieurs copies numériques",
        "paragraphs": [
          "Scannez votre passeport, admission, diplômes, relevés de notes, attestations, justificatifs de logement et autres documents importants. Conservez une copie sur un espace sécurisé accessible depuis votre téléphone et votre ordinateur. Gardez aussi les originaux importants dans votre bagage cabine plutôt que dans une valise enregistrée."
        ],
        "items": []
      },
      {
        "heading": "Sécuriser un logement pour les premières semaines",
        "paragraphs": [
          "Idéalement, arrivez avec une solution de logement confirmée. Si vous n’avez pas encore trouvé de location longue durée, prévoyez une résidence temporaire, un hôtel, une auberge ou une solution familiale fiable pour les premiers jours. Évitez de transférer des sommes importantes à un propriétaire non vérifié."
        ],
        "items": []
      },
      {
        "heading": "Préparer le budget d’installation",
        "paragraphs": [
          "Le premier mois coûte généralement plus cher que les suivants. Il peut inclure premier loyer, dépôt de garantie, assurance habitation, transport, frais de dossier, équipement de base et achats alimentaires. Prévoyez une marge de sécurité au-delà de votre budget mensuel habituel."
        ],
        "items": []
      },
      {
        "heading": "Comprendre les transports de votre ville",
        "paragraphs": [
          "Avant le départ, vérifiez comment rejoindre votre logement depuis l’aéroport ou la gare, puis comment vous rendre à l’université. Consultez les abonnements étudiants disponibles dans votre ville et les justificatifs nécessaires. Cette petite préparation évite les dépenses inutiles en taxi lors des premiers jours."
        ],
        "items": []
      },
      {
        "heading": "Préparer la santé et les assurances",
        "paragraphs": [
          "Renseignez-vous sur les démarches de couverture santé correspondant à votre situation et sur les éventuelles assurances obligatoires ou recommandées. Si vous suivez un traitement, préparez suffisamment de médicaments pour la période de transition ainsi que l’ordonnance correspondante lorsque cela est pertinent."
        ],
        "items": []
      },
      {
        "heading": "Téléphone, internet et banque",
        "paragraphs": [
          "Un numéro français peut être utile pour les démarches de logement, de livraison et d’administration. Comparez les offres mobiles et vérifiez si votre téléphone est compatible. Pour la banque, renseignez-vous sur les documents nécessaires à l’ouverture d’un compte et sur les solutions alternatives disponibles pendant les premiers jours."
        ],
        "items": []
      },
      {
        "heading": "Préparer l’inscription administrative",
        "paragraphs": [
          "L’admission pédagogique ne signifie pas toujours que toutes les formalités sont terminées. Vérifiez les instructions de votre établissement concernant l’inscription, les justificatifs à présenter, le paiement éventuel de frais et les dates de rentrée."
        ],
        "items": []
      },
      {
        "heading": "Préparer les sept premiers jours",
        "paragraphs": [],
        "items": [
          "Jour 1 : installation et vérification du logement",
          "Jour 2 : transport et repérage du campus",
          "Jour 3 : téléphone et démarches numériques",
          "Jour 4 : inscription ou rendez-vous administratif",
          "Jour 5 : banque, assurance et documents complémentaires",
          "Week-end : courses, organisation et découverte du quartier"
        ]
      },
      {
        "heading": "Checklist avant l’aéroport",
        "paragraphs": [],
        "items": [
          "Passeport",
          "Visa ou document de séjour applicable",
          "Admission",
          "Adresse du logement",
          "Billets de transport",
          "Moyen de paiement disponible",
          "Copies numériques",
          "Contacts d’urgence",
          "Ordonnances et médicaments nécessaires",
          "Chargeurs et adaptateurs utiles"
        ]
      }
    ],
    "faq": [
      {
        "q": "Combien d’argent prévoir pour le premier mois ?",
        "a": "Cela dépend fortement de la ville et du logement. Le premier mois doit inclure une marge supérieure au budget mensuel habituel en raison du dépôt de garantie et des frais d’installation."
      },
      {
        "q": "Faut-il ouvrir un compte bancaire avant d’arriver ?",
        "a": "Ce n’est pas toujours possible ni nécessaire. Préparez surtout un moyen de paiement fonctionnel pour les premiers jours et renseignez-vous sur les documents demandés par les banques ou services financiers que vous envisagez."
      }
    ],
    "cta": "Téléchargez la checklist EEF ou préparez votre arrivée avec un conseiller afin de ne pas oublier les démarches essentielles."
  },
  {
    "id": "logement",
    "slug": "logement-etudiant",
    "category": "Logement",
    "image": "/marketing/assets/img-007.webp",
    "related": [
      "preparer-son-depart",
      "procedure-etudes-en-france"
    ],
    "title": "Trouver un logement étudiant : quels documents préparer ?",
    "keyword": "documents logement étudiant France",
    "metaTitle": "Logement étudiant en France : quels documents préparer ? | EEF",
    "metaDescription": "Découvrez les documents généralement demandés pour louer un logement étudiant en France, préparer un dossier locatif, présenter un garant et éviter les arnaques.",
    "intro": [
      "Trouver un logement est souvent l’une des principales difficultés d’une installation étudiante en France, en particulier dans les grandes villes et pendant les périodes de rentrée. Les propriétaires reçoivent parfois de nombreux dossiers en quelques heures. Préparer vos documents à l’avance peut donc faire une vraie différence.",
      "Les pièces exactes dépendent du type de logement, du propriétaire, de la résidence et de votre situation. L’objectif de ce guide est de vous aider à préparer un dossier clair tout en protégeant vos données personnelles."
    ],
    "sections": [
      {
        "heading": "Les documents d’identité",
        "paragraphs": [
          "Un justificatif d’identité fait généralement partie du dossier. Pour un étudiant international, le passeport est souvent le document principal. Selon la situation et l’étape de votre installation, d’autres justificatifs de séjour peuvent être demandés. Ne transmettez que les pièces nécessaires et vérifiez toujours le destinataire avant l’envoi."
        ],
        "items": []
      },
      {
        "heading": "Le justificatif d’études",
        "paragraphs": [
          "Préparez votre lettre d’admission, certificat de scolarité ou document équivalent. Ce justificatif permet de montrer votre statut étudiant et la ville dans laquelle vous allez étudier."
        ],
        "items": []
      },
      {
        "heading": "Les justificatifs de ressources",
        "paragraphs": [
          "Le bailleur peut chercher à vérifier votre capacité à payer le loyer. Les justificatifs possibles dépendent de votre situation : revenus personnels, bourse, prise en charge familiale, épargne ou garant. Organisez ces documents clairement et évitez d’envoyer plus d’informations que nécessaire."
        ],
        "items": []
      },
      {
        "heading": "Le garant",
        "paragraphs": [
          "De nombreux propriétaires demandent un garant, c’est-à-dire une personne ou un dispositif qui apporte une garantie en cas d’impayé. Les documents du garant peuvent inclure une identité, un justificatif de domicile et des preuves de ressources. Les exigences varient selon les bailleurs.",
          "Si vous n’avez pas de garant familial compatible avec les exigences du propriétaire, renseignez-vous sur les dispositifs de garantie accessibles à votre situation. Visale peut, dans certains cas et sous conditions d’éligibilité, constituer une solution. Vérifiez toujours les conditions directement sur les sources officielles."
        ],
        "items": []
      },
      {
        "heading": "Préparer un dossier numérique professionnel",
        "paragraphs": [
          "Regroupez les pièces dans un dossier organisé. Utilisez des noms de fichiers simples : Passeport_Nom.pdf, Admission_Université.pdf, Garant_Justificatif.pdf. Si vous utilisez un seul PDF, ajoutez une page de couverture et classez les pièces dans un ordre logique."
        ],
        "items": []
      },
      {
        "heading": "Protéger ses documents contre les arnaques",
        "paragraphs": [
          "La recherche de logement attire malheureusement des annonces frauduleuses. Méfiez-vous d’un prix anormalement bas, d’un propriétaire refusant toute visite ou vérification, d’une pression pour payer immédiatement ou d’un transfert vers un moyen de paiement difficilement traçable.",
          "Lorsque vous envoyez des documents sensibles, utilisez si possible un marquage indiquant l’usage du document, par exemple « dossier location – uniquement pour candidature logement ». Ne transmettez jamais de mots de passe, codes bancaires ou informations sans rapport avec la location."
        ],
        "items": []
      },
      {
        "heading": "Résidence étudiante ou location privée",
        "paragraphs": [
          "Les résidences étudiantes peuvent demander une liste standardisée de pièces et fonctionner avec une plateforme dédiée. Les propriétaires privés ont parfois leurs propres exigences. Dans les deux cas, lisez les conditions avant de payer des frais ou de signer un engagement."
        ],
        "items": []
      },
      {
        "heading": "Quand commencer la recherche ?",
        "paragraphs": [
          "Commencez dès que votre projet et votre calendrier sont suffisamment confirmés. La disponibilité varie fortement selon la ville et la période. Dans les marchés tendus, anticiper permet de comparer davantage d’options et de réduire la pression au moment de signer."
        ],
        "items": []
      },
      {
        "heading": "Checklist du dossier locatif",
        "paragraphs": [],
        "items": [
          "Pièce d’identité",
          "Admission ou certificat de scolarité",
          "Justificatifs de ressources",
          "Documents du garant si nécessaire",
          "Justificatif de garantie lorsque applicable",
          "Coordonnées de contact",
          "Copies propres et lisibles",
          "Dossier numérique sécurisé"
        ]
      }
    ],
    "faq": [
      {
        "q": "Peut-on louer sans garant français ?",
        "a": "Cela dépend du bailleur et de votre situation. Certains acceptent d’autres formes de garanties. Des dispositifs dédiés peuvent aussi exister pour les étudiants éligibles."
      },
      {
        "q": "Faut-il payer avant de visiter ?",
        "a": "Soyez très prudent face à toute demande de paiement important avant vérification du logement et du bailleur. Les méthodes des fraudeurs évoluent ; vérifiez l’annonce, l’identité du contact et les documents contractuels avant tout engagement."
      }
    ],
    "cta": "Préparez votre dossier locatif avec EEF avant de contacter les propriétaires afin de gagner du temps et réduire les risques d’erreur."
  },
  {
    "id": "eef-procedure",
    "slug": "procedure-etudes-en-france",
    "category": "Études en France",
    "image": "/marketing/assets/img-005.webp",
    "related": [
      "projet-etudes",
      "logement-etudiant",
      "preparer-son-depart"
    ],
    "title": "Comprendre la procédure Études en France",
    "keyword": "procédure Études en France",
    "metaTitle": "Procédure Études en France : étapes, dossier et calendrier | EEF",
    "metaDescription": "Comprenez la procédure Études en France : création du dossier, candidatures, justificatifs, entretien éventuel, admission et articulation avec la demande de visa.",
    "intro": [
      "La procédure Études en France est une étape centrale pour de nombreux étudiants internationaux qui souhaitent poursuivre leurs études dans un établissement français. Pourtant, elle est souvent confondue avec la candidature universitaire elle-même ou avec la demande de visa. Comprendre le rôle de chaque étape permet d’éviter de nombreuses erreurs.",
      "Le fonctionnement exact dépend notamment de votre pays de résidence, de votre nationalité, du type de formation, de l’établissement choisi et de votre situation individuelle. Les règles et calendriers peuvent évoluer. Ce guide présente donc la logique générale de la procédure et doit être complété par la vérification des informations officielles applicables à votre cas."
    ],
    "sections": [
      {
        "heading": "À quoi sert la procédure Études en France ?",
        "paragraphs": [
          "La plateforme Études en France permet, selon les situations, de constituer un dossier académique, de transmettre des informations et justificatifs, de sélectionner certaines formations et de suivre différentes étapes du projet d’études. Elle s’inscrit dans un parcours plus large qui peut également inclure des candidatures directes auprès d’établissements et une procédure consulaire."
        ],
        "items": []
      },
      {
        "heading": "Vérifier si vous êtes concerné",
        "paragraphs": [
          "Avant toute démarche, vérifiez si votre pays et votre situation relèvent de la procédure Études en France. Ne partez pas du principe que la procédure est identique pour tous les étudiants internationaux. Les consignes officielles du pays de résidence restent la référence."
        ],
        "items": []
      },
      {
        "heading": "Créer et compléter le dossier",
        "paragraphs": [
          "Le dossier peut demander des informations personnelles, le parcours académique, les diplômes, relevés de notes, expériences, compétences linguistiques et projet d’études. Préparez des documents lisibles et vérifiez que les informations saisies correspondent exactement aux justificatifs."
        ],
        "items": []
      },
      {
        "heading": "Sélectionner les formations lorsque la procédure le prévoit",
        "paragraphs": [
          "Certaines candidatures peuvent être gérées dans l’environnement Études en France, tandis que d’autres établissements ou formations disposent de leurs propres procédures. Il est donc essentiel de vérifier pour chaque programme où et comment la candidature doit être déposée.",
          "Une erreur fréquente consiste à penser qu’une candidature sur une plateforme remplace automatiquement toutes les autres démarches. Pour chaque formation de votre shortlist, identifiez le canal de candidature, la date limite, les documents et les éventuels frais."
        ],
        "items": []
      },
      {
        "heading": "Rédiger les motivations",
        "paragraphs": [
          "Lorsque des textes de motivation sont demandés, évitez les formulations générales. Expliquez votre parcours, votre choix de formation et votre projet professionnel. Conservez une cohérence entre les différentes formations sélectionnées afin que l’ensemble de votre dossier raconte une trajectoire compréhensible."
        ],
        "items": []
      },
      {
        "heading": "L’entretien éventuel",
        "paragraphs": [
          "Selon le pays et la situation, un entretien peut faire partie de la procédure. Préparez-vous à expliquer votre parcours, votre choix de formation, vos motivations, votre compréhension du programme, votre projet professionnel et la manière dont vous avez préparé votre séjour.",
          "L’objectif n’est pas de réciter une réponse apprise mot pour mot. Vous devez surtout être capable d’expliquer votre projet avec naturel et précision. Relisez votre dossier avant l’entretien afin d’éviter les contradictions."
        ],
        "items": []
      },
      {
        "heading": "Après l’admission",
        "paragraphs": [
          "Une admission ne signifie pas nécessairement que toutes les démarches administratives sont terminées. Selon votre situation, vous devrez ensuite suivre les étapes indiquées pour la préparation du séjour et, lorsque nécessaire, pour la demande de visa étudiant. Respectez l’ordre des démarches et les instructions officielles."
        ],
        "items": []
      },
      {
        "heading": "Études en France et visa : deux démarches à distinguer",
        "paragraphs": [
          "La procédure académique ou préconsulaire et la décision relative au visa ne doivent pas être confondues. Les autorités consulaires appliquent leurs propres critères et demandent leurs propres justificatifs. Une admission universitaire est essentielle, mais elle ne constitue pas à elle seule une garantie de visa."
        ],
        "items": []
      },
      {
        "heading": "Les erreurs fréquentes",
        "paragraphs": [],
        "items": [
          "Commencer le dossier trop tard",
          "Choisir des formations incohérentes",
          "Envoyer des documents illisibles",
          "Saisir des dates différentes de celles des justificatifs",
          "Utiliser des motivations génériques",
          "Confondre candidature, procédure Études en France et demande de visa",
          "Ne pas vérifier les consignes spécifiques au pays"
        ]
      },
      {
        "heading": "Construire un calendrier personnel",
        "paragraphs": [
          "Créez un tableau avec les dates limites de chaque formation, les étapes du dossier, les rendez-vous éventuels et les documents encore manquants. Ajoutez une marge de sécurité avant chaque date. Les problèmes administratifs surviennent souvent lorsqu’un document doit être obtenu ou traduit au dernier moment."
        ],
        "items": []
      }
    ],
    "faq": [
      {
        "q": "Études en France est-il la même chose que Campus France ?",
        "a": "Études en France désigne notamment la plateforme et la procédure utilisée dans de nombreux contextes liés au parcours des étudiants internationaux. Campus France est l’organisme public français chargé de la promotion de l’enseignement supérieur français et de l’accompagnement de la mobilité internationale. Les modalités précises dépendent du pays et de la situation."
      },
      {
        "q": "Une admission garantit-elle le visa ?",
        "a": "Non. L’admission et la procédure de visa sont distinctes. La décision de visa appartient aux autorités compétentes et dépend du dossier présenté selon les règles applicables."
      },
      {
        "q": "Peut-on modifier son dossier après soumission ?",
        "a": "Les possibilités de modification dépendent de l’étape et de la plateforme. Vérifiez les fonctions disponibles et contactez l’interlocuteur officiel lorsque vous constatez une erreur importante."
      }
    ],
    "cta": "Faites vérifier votre calendrier, vos documents et la cohérence de votre dossier EEF avant de finaliser les étapes importantes."
  }
];

export function getJournalArticle(slug: string) {
  return JOURNAL_ARTICLES.find((article) => article.slug === slug);
}
