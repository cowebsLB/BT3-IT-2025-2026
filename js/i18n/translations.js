// Translation files for BT3 IT Course Website
// English (en) and French (fr) translations

export const translations = {
    en: {
        // Navigation
        nav: {
            home: 'Home',
            subjects: 'Subjects',
            gallery: 'Gallery',
            resources: 'Student Resources',
            chat: 'Chat'
        },
        
        // Common
        common: {
            loading: 'Loading...',
            comingSoon: 'Coming Soon',
            viewDetails: 'View Details',
            close: 'Close',
            download: 'Download',
            search: 'Search',
            clear: 'Clear',
            noResults: 'No results found',
            found: 'Found',
            subject: 'subject',
            subjects: 'subjects',
            selectFiles: 'Select Files',
            upload: 'Upload',
            cancel: 'Cancel'
        },
        
        // Home page
        home: {
            title: 'Welcome, Students!',
            subtitle: 'Start Your IT Journey',
            description: 'Dive into the BT3 IT Study Course, designed with students in mind. Explore modern IT knowledge, hands-on projects, and real-world skills with ETSTC.',
            descriptionHtml: 'Dive into the <span class="font-bold text-blue-600">BT3 IT Study Course</span>, designed with students in mind. Explore modern IT knowledge, hands-on projects, and real-world skills with ETSTC.',
            description2: 'Connect with peers, join study groups, and make the most of our student portal for extra tips and learning materials. Begin your learning journey with a supportive community and dedicated educators who care about your growth.',
            exploreSubjects: 'Explore Subjects',
            exploreGallery: 'View Gallery',
            scrollToExplore: 'Scroll to explore',
            heroImageAlt: 'Students studying IT together'
        },
        
        // Student Spotlights
        spotlights: {
            title: 'Student Spotlights',
            subtitle: 'Hear from students who are thriving in our program',
            student1: {
                name: 'Sara K.',
                quote: '"The collaborative projects and support from teachers helped me learn programming and make new friends. The resources page was a lifesaver before exams!"'
            },
            student2: {
                name: 'Mahmoud E.',
                quote: '"I loved the interactive lessons and how we could share code snippets. The student community makes everything more enjoyable."'
            },
            student3: {
                name: 'Leila T.',
                quote: '"ETSTC\'s events and workshops helped me build confidence and discover my interests in IT. Highly recommended for all students!"'
            },
            studentAlt: 'Student'
        },
        
        // Quick Links
        quickLinks: {
            title: 'Quick Links for Students',
            subtitle: 'Everything you need, right at your fingertips',
            learningResources: '<i class="fas fa-book mr-2"></i>Learning Resources',
            contactTeacher: '<i class="fas fa-envelope mr-2"></i>Contact Your Teacher',
            studentCommunity: '<i class="fas fa-comments mr-2"></i>Student Community'
        },
        
        // Footer is defined earlier in the file
        
        // Subjects page
        subjects: {
            title: 'All Subjects',
            description: 'Browse all available subjects and course materials',
            searchPlaceholder: 'Search for subjects...',
            noSubjectsFound: 'No subjects found matching your search.',
            courseMaterials: 'Course Materials',
            courseMaterialsComingSoon: 'Course Materials Coming Soon',
            courseMaterialsDescription: 'Course materials, lectures, and study resources will be available here. Your instructor will add content as the course progresses.',
            note: 'Note:',
            noteText: 'Course materials are organized in the docs/ folder. Files will be accessible once uploaded by your instructor.',
            contentComingSoon: 'Content Coming Soon',
            subjectNotFound: 'Subject Not Found',
            subjectNotFoundDescription: 'The subject you\'re looking for doesn\'t exist or has been removed.',
            backToSubjects: 'Back to All Subjects'
        },
        
        // Gallery page
        gallery: {
            title: 'Photo Gallery',
            description: 'Photos from classes, workshops, and student projects',
            comingSoon: 'Gallery Coming Soon',
            comingSoonDescription: 'We\'re working on adding photos from classes, workshops, and student projects.'
        },
        
        // Resources page
        resources: {
            title: 'Student Resources',
            description: 'Study materials, links, and helpful resources',
            preview: 'Preview',
            softwareTools: 'Software & Tools',
            studyGuides: 'Study Guides',
            usefulLinks: 'Useful Links',
            downloadGuide: 'Download Study Guide',
            downloadSoftware: 'Software Download Links',
            studyMaterials: 'Study Materials',
            courseNotes: 'Course Notes',
            courseNotesDesc: 'Comprehensive notes from all subjects',
            textbooks: 'Textbooks & References',
            textbooksDesc: 'Recommended reading materials',
            practiceExercises: 'Practice Exercises',
            practiceExercisesDesc: 'Hands-on exercises and assignments',
            examPreparation: 'Exam Preparation',
            examPreparationDesc: 'Practice tests and study guides',
            downloads: 'Downloads',
            softwareToolsTitle: 'Software Tools',
            softwareToolsDesc: 'Required development tools and IDEs',
            sampleProjects: 'Sample Projects',
            sampleProjectsDesc: 'Starter templates and code samples',
            cheatSheets: 'Cheat Sheets',
            cheatSheetsDesc: 'Quick reference guides',
            previewHint: '💡 Click the preview button before downloading to view document contents.',
            studyTools: 'Study Tools',
            courseSchedule: 'Course Schedule',
            courseScheduleDesc: 'Class times and important dates',
            studentCommunity: 'Student Community (Telegram)',
            studentCommunityDesc: 'Join our study group and connect with peers',
            contactTeacher: 'Contact Your Teacher',
            contactTeacherDesc: 'Get help and ask questions via email',
            browseSubjects: 'Browse All Subjects',
            browseSubjectsDesc: 'Access materials for all course subjects',
            needMoreHelp: 'Need More Help?',
            needMoreHelpDesc: 'If you need additional resources or have questions about the course materials, don\'t hesitate to reach out:',
            emailTeacher: 'Email Teacher',
            joinCommunity: 'Join Community',
            backToHome: 'Back to Home',
            github: 'GitHub',
            githubDesc: 'Code repository and version control',
            stackOverflow: 'Stack Overflow',
            stackOverflowDesc: 'Programming Q&A community',
            w3schools: 'W3Schools',
            w3schoolsDesc: 'Web development tutorials',
            pythonDocs: 'Python Documentation',
            pythonDocsDesc: 'Official Python language reference',
            uploadFiles: 'Upload Files',
            uploadFilesDesc: 'Upload your documents, images, or study materials to share with your classmates.',
            dragDrop: 'Drag and drop files here',
            orClickToBrowse: 'or click to browse',
            supportedFormats: 'Supported: PDF, DOC, DOCX, JPG, PNG, GIF, ZIP, TXT (Max 10MB per file)',
            uploadedFiles: 'Your Uploaded Files',
            uploading: 'Uploading...',
            uploadSuccess: 'Uploaded successfully!',
            uploadError: 'Upload failed. Please try again.',
            fileTooLarge: 'File is too large (max 10MB)',
            removeFile: 'Remove',
            noFilesUploaded: 'No files uploaded yet'
        },
        
        // Chat page
        chat: {
            title: 'Student Chat',
            description: 'Connect with classmates and instructors',
            comingSoon: 'Chat Coming Soon',
            comingSoonDescription: 'A real-time chat feature will be available here. Students can discuss topics, ask questions, and collaborate with peers.',
            supabaseNote: 'This feature will be integrated with Supabase for real-time messaging.',
            liveChat: 'Live Chat',
            loading: 'Loading messages...',
            send: 'Send',
            typeMessage: 'Type your message...',
            yourName: 'Your name (optional)'
        },
        
        // Subject descriptions
        subjectDescriptions: {
            assemblage: 'Learn computer assembly, hardware components, and system configuration. Master the fundamentals of building and maintaining computer systems.',
            math: 'Essential mathematics for IT professionals. Cover topics including algebra, discrete mathematics, and computational problem-solving.',
            methodology: 'Software development methodologies, project management, and best practices in IT project execution and team collaboration.',
            operatingSystems: 'Deep dive into operating systems. Learn about process management, memory management, file systems, and system architecture.',
            networks: 'Network fundamentals, protocols, routing, switching, and network security. Build practical networking skills for modern IT infrastructure.',
            coding: 'C programming fundamentals only. Learn C syntax, control flow, functions, pointers, arrays, and structured problem solving.',
            access: 'Microsoft Access database management. Design and create databases, build forms, queries, and reports for data management.',
            arabic: 'Arabic language studies for IT professionals. Communication skills and technical terminology in Arabic.',
            french: 'French language studies for IT professionals. Technical communication and professional language skills in French.',
            law: 'IT law and legal frameworks. Understanding digital rights, privacy laws, cybersecurity regulations, and legal aspects of technology.',
            sociology: 'Sociology in the context of technology. Explore how technology impacts society, social behavior, and digital communities.'
        },
        
        // Footer
        footer: {
            copyright: '©',
            year: '2024',
            rights: 'BT3 IT Course, ETSTC. All rights reserved.',
            poweredBy: 'Powered by ETSTC'
        },
        
        // Accessibility
        accessibility: {
            toggleMenu: 'Toggle menu',
            closePreview: 'Close preview',
            changeLanguage: 'Change language',
            toggleTheme: 'Toggle theme'
        }
    },
    
    fr: {
        // Navigation
        nav: {
            home: 'Accueil',
            subjects: 'Matières',
            gallery: 'Galerie',
            resources: 'Ressources Étudiantes',
            chat: 'Chat'
        },
        
        // Common
        common: {
            loading: 'Chargement...',
            comingSoon: 'Bientôt disponible',
            viewDetails: 'Voir les détails',
            close: 'Fermer',
            download: 'Télécharger',
            search: 'Rechercher',
            clear: 'Effacer',
            noResults: 'Aucun résultat trouvé',
            found: 'Trouvé',
            subject: 'matière',
            subjects: 'matières',
            selectFiles: 'Sélectionner des Fichiers',
            upload: 'Téléverser',
            cancel: 'Annuler'
        },
        
        // Home page
        home: {
            title: 'Bienvenue, Étudiants!',
            subtitle: 'Commencez Votre Voyage IT',
            description: 'Plongez dans le Cours d\'Étude IT BT3, conçu avec les étudiants à l\'esprit. Explorez les connaissances IT modernes, les projets pratiques et les compétences du monde réel avec l\'ETSTC.',
            descriptionHtml: 'Plongez dans le <span class="font-bold text-blue-600">Cours d\'Étude IT BT3</span>, conçu avec les étudiants à l\'esprit. Explorez les connaissances IT modernes, les projets pratiques et les compétences du monde réel avec l\'ETSTC.',
            description2: 'Connectez-vous avec vos pairs, rejoignez des groupes d\'étude et profitez au maximum de notre portail étudiant pour des conseils et du matériel d\'apprentissage supplémentaires. Commencez votre parcours d\'apprentissage avec une communauté solidaire et des éducateurs dévoués qui se soucient de votre croissance.',
            exploreSubjects: 'Explorer les Matières',
            exploreGallery: 'Voir la Galerie',
            scrollToExplore: 'Défiler pour explorer',
            heroImageAlt: 'Étudiants étudiant l\'IT ensemble'
        },
        
        // Student Spotlights
        spotlights: {
            title: 'Témoignages d\'Étudiants',
            subtitle: 'Découvrez ce que disent les étudiants qui réussissent dans notre programme',
            student1: {
                name: 'Sara K.',
                quote: '"Les projets collaboratifs et le soutien des enseignants m\'ont aidée à apprendre la programmation et à me faire de nouveaux amis. La page des ressources a été un sauveur avant les examens!"'
            },
            student2: {
                name: 'Mahmoud E.',
                quote: '"J\'ai adoré les cours interactifs et la façon dont nous pouvions partager des extraits de code. La communauté étudiante rend tout plus agréable."'
            },
            student3: {
                name: 'Leila T.',
                quote: '"Les événements et ateliers de l\'ETSTC m\'ont aidée à prendre confiance et à découvrir mes intérêts en IT. Fortement recommandé pour tous les étudiants!"'
            },
            studentAlt: 'Étudiant'
        },
        
        // Quick Links
        quickLinks: {
            title: 'Liens Rapides pour les Étudiants',
            subtitle: 'Tout ce dont vous avez besoin, au bout de vos doigts',
            learningResources: '<i class="fas fa-book mr-2"></i>Ressources d\'Apprentissage',
            contactTeacher: '<i class="fas fa-envelope mr-2"></i>Contacter Votre Enseignant',
            studentCommunity: '<i class="fas fa-comments mr-2"></i>Communauté Étudiante'
        },
        
        // Subjects page
        subjects: {
            title: 'Toutes les Matières',
            description: 'Parcourez toutes les matières et matériaux de cours disponibles',
            searchPlaceholder: 'Rechercher des matières et matériaux...',
            noSubjectsFound: 'Aucune matière trouvée correspondant à votre recherche.',
            courseMaterials: 'Matériaux de Cours',
            courseMaterialsComingSoon: 'Matériaux de Cours Bientôt Disponibles',
            courseMaterialsDescription: 'Les matériaux de cours, conférences et ressources d\'étude seront disponibles ici. Votre instructeur ajoutera du contenu au fur et à mesure du cours.',
            contentComingSoon: 'Contenu Bientôt Disponible',
            subjectNotFound: 'Matière Non Trouvée',
            subjectNotFoundDescription: 'La matière que vous recherchez n\'existe pas ou a été supprimée.',
            backToSubjects: 'Retour à Toutes les Matières'
        },
        
        // Gallery page
        gallery: {
            title: 'Galerie Photo',
            description: 'Photos de classes, ateliers et projets étudiants',
            comingSoon: 'Galerie Bientôt Disponible',
            comingSoonDescription: 'Nous travaillons à l\'ajout de photos des classes, ateliers et projets étudiants.'
        },
        
        // Resources page
        resources: {
            title: 'Ressources Étudiantes',
            description: 'Matériaux d\'étude, liens et ressources utiles',
            preview: 'Aperçu',
            softwareTools: 'Logiciels et Outils',
            studyGuides: 'Guides d\'Étude',
            usefulLinks: 'Liens Utiles',
            downloadGuide: 'Télécharger le Guide d\'Étude',
            downloadSoftware: 'Liens de Téléchargement de Logiciels',
            studyMaterials: 'Matériaux d\'Étude',
            courseNotes: 'Notes de Cours',
            courseNotesDesc: 'Notes complètes de toutes les matières',
            textbooks: 'Manuels et Références',
            textbooksDesc: 'Matériaux de lecture recommandés',
            practiceExercises: 'Exercices Pratiques',
            practiceExercisesDesc: 'Exercices pratiques et devoirs',
            examPreparation: 'Préparation aux Examens',
            examPreparationDesc: 'Tests pratiques et guides d\'étude',
            downloads: 'Téléchargements',
            softwareToolsTitle: 'Outils Logiciels',
            softwareToolsDesc: 'Outils de développement et IDEs requis',
            sampleProjects: 'Projets d\'Exemple',
            sampleProjectsDesc: 'Modèles de départ et exemples de code',
            cheatSheets: 'Aides-Mémoire',
            cheatSheetsDesc: 'Guides de référence rapide',
            previewHint: '💡 Cliquez sur le bouton d\'aperçu avant de télécharger pour voir le contenu du document.',
            studyTools: 'Outils d\'Étude',
            courseSchedule: 'Horaire des Cours',
            courseScheduleDesc: 'Heures de cours et dates importantes',
            studentCommunity: 'Communauté Étudiante (Telegram)',
            studentCommunityDesc: 'Rejoignez notre groupe d\'étude et connectez-vous avec vos pairs',
            contactTeacher: 'Contacter Votre Enseignant',
            contactTeacherDesc: 'Obtenez de l\'aide et posez des questions par e-mail',
            browseSubjects: 'Parcourir Toutes les Matières',
            browseSubjectsDesc: 'Accéder aux matériaux pour tous les cours',
            needMoreHelp: 'Besoin de Plus d\'Aide?',
            needMoreHelpDesc: 'Si vous avez besoin de ressources supplémentaires ou avez des questions sur les matériaux du cours, n\'hésitez pas à nous contacter:',
            emailTeacher: 'Envoyer un E-mail',
            joinCommunity: 'Rejoindre la Communauté',
            backToHome: 'Retour à l\'Accueil',
            github: 'GitHub',
            githubDesc: 'Dépôt de code et contrôle de version',
            stackOverflow: 'Stack Overflow',
            stackOverflowDesc: 'Communauté Q&A de programmation',
            w3schools: 'W3Schools',
            w3schoolsDesc: 'Tutoriels de développement web',
            pythonDocs: 'Documentation Python',
            pythonDocsDesc: 'Référence officielle du langage Python',
            uploadFiles: 'Téléverser des Fichiers',
            uploadFilesDesc: 'Téléversez vos documents, images ou matériaux d\'étude pour les partager avec vos camarades de classe.',
            dragDrop: 'Glissez-déposez les fichiers ici',
            orClickToBrowse: 'ou cliquez pour parcourir',
            supportedFormats: 'Formats supportés: PDF, DOC, DOCX, JPG, PNG, GIF, ZIP, TXT (Max 10MB par fichier)',
            uploadedFiles: 'Vos Fichiers Téléversés',
            uploading: 'Téléversement...',
            uploadSuccess: 'Téléversé avec succès!',
            uploadError: 'Échec du téléversement. Veuillez réessayer.',
            fileTooLarge: 'Le fichier est trop volumineux (max 10MB)',
            removeFile: 'Supprimer',
            noFilesUploaded: 'Aucun fichier téléversé pour le moment'
        },
        
        // Chat page
        chat: {
            title: 'Chat Étudiant',
            description: 'Connectez-vous avec vos camarades et instructeurs',
            comingSoon: 'Chat Bientôt Disponible',
            comingSoonDescription: 'Une fonctionnalité de chat en temps réel sera disponible ici. Les étudiants peuvent discuter de sujets, poser des questions et collaborer avec leurs pairs.',
            supabaseNote: 'Cette fonctionnalité sera intégrée avec Supabase pour la messagerie en temps réel.',
            liveChat: 'Chat en Direct',
            loading: 'Chargement des messages...',
            send: 'Envoyer',
            typeMessage: 'Tapez votre message...',
            yourName: 'Votre nom (optionnel)'
        },
        
        // Subject descriptions
        subjectDescriptions: {
            assemblage: 'Apprenez l\'assemblage d\'ordinateurs, les composants matériels et la configuration système. Maîtrisez les fondamentaux de la construction et de la maintenance des systèmes informatiques.',
            math: 'Mathématiques essentielles pour les professionnels de l\'informatique. Couvre des sujets incluant l\'algèbre, les mathématiques discrètes et la résolution de problèmes computationnels.',
            methodology: 'Méthodologies de développement logiciel, gestion de projet et meilleures pratiques dans l\'exécution de projets IT et la collaboration d\'équipe.',
            operatingSystems: 'Plongée approfondie dans les systèmes d\'exploitation. Apprenez la gestion des processus, la gestion de la mémoire, les systèmes de fichiers et l\'architecture système.',
            networks: 'Fondamentaux du réseau, protocoles, routage, commutation et sécurité réseau. Développez des compétences pratiques en réseau pour l\'infrastructure IT moderne.',
            coding: 'Fondamentaux du langage C uniquement. Apprenez la syntaxe C, le contrôle de flux, les fonctions, les pointeurs, les tableaux et la résolution structurée de problèmes.',
            access: 'Gestion de base de données Microsoft Access. Concevez et créez des bases de données, créez des formulaires, des requêtes et des rapports pour la gestion des données.',
            arabic: 'Études de langue arabe pour les professionnels de l\'informatique. Compétences en communication et terminologie technique en arabe.',
            french: 'Études de langue française pour les professionnels de l\'informatique. Communication technique et compétences linguistiques professionnelles en français.',
            law: 'Droit IT et cadres juridiques. Comprendre les droits numériques, les lois sur la vie privée, les réglementations en cybersécurité et les aspects juridiques de la technologie.',
            sociology: 'Sociologie dans le contexte de la technologie. Explorez comment la technologie impacte la société, le comportement social et les communautés numériques.'
        },
        
        // Footer
        footer: {
            copyright: '©',
            year: '2024',
            rights: 'Cours IT BT3, ETSTC. Tous droits réservés.',
            poweredBy: 'Propulsé par ETSTC'
        },
        
        // Accessibility
        accessibility: {
            toggleMenu: 'Basculer le menu',
            closePreview: 'Fermer l\'aperçu',
            changeLanguage: 'Changer de langue',
            toggleTheme: 'Basculer le thème'
        }
    }
};

