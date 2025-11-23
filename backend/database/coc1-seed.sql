-- COC 1 (Continuation) - Terms Data

-- Operating System Basics Terms
INSERT INTO coc1_terms (category, term_name, definition, example) VALUES
('Operating System Basics', 'Operating System (OS)', 'The software that manages a computer''s hardware and software resources, provides a user interface, and allows you to run applications and control the overall operation of the computer.', 'Windows, Linux, macOS'),
('Operating System Basics', 'Desktop Operating System', 'A type of operating system designed for personal computers and laptops, featuring a user-friendly interface and tools that let users run applications, manage files, and interact directly with the computer.', 'Windows 11, macOS Ventura'),
('Operating System Basics', 'Network Operating System (NOS)', 'A type of operating system designed to manage and coordinate multiple computers connected in a network, providing shared resources, security, and communication between devices.', 'Windows Server, Linux Server'),
('Operating System Basics', 'Microsoft Windows', 'An operating system known for its user-friendly interface, wide software compatibility, and strong support, allowing users to easily run programs and manage files.', 'Windows 10, Windows 11'),
('Operating System Basics', 'Linux', 'An open-source operating system known for its stability and flexibility, allowing users to run applications, manage files, and customize the system.', 'Ubuntu, Fedora, CentOS'),
('Operating System Basics', 'MacOS', 'An operating system developed by Apple, known for its sleek interface, strong security, and seamless integration with other Apple devices.', 'macOS Ventura, macOS Sonoma'),
('Operating System Basics', 'Command-line Interface (CLI)', 'A system where users type commands to control the computer and run programs.', 'Terminal, Command Prompt'),
('Operating System Basics', 'Graphical User Interface (GUI)', 'A system where users interact with the computer using visual elements like icons and menus to run programs and manage tasks.', 'Windows Desktop, macOS Finder'),
('Operating System Basics', 'Multiuser', 'Refers to a system that allows multiple users to access and use the computer''s resources simultaneously.', 'Server systems, Network computers'),
('Operating System Basics', 'Multitasking', 'Refers to an operating system''s ability to run multiple tasks or programs at the same time.', 'Running browser, editor, and music player simultaneously'),
('Operating System Basics', 'Multiprocessing', 'Refers to a system using two or more processors to execute programs simultaneously.', 'Dual-core, Quad-core processors'),
('Operating System Basics', 'Multithreading', 'Refers to a program''s ability to execute multiple threads (smaller units of a process) at the same time for better efficiency.', 'Web server handling multiple requests');

-- Computer Software and Language Terms
INSERT INTO coc1_terms (category, term_name, definition, example) VALUES
('Computer Software and Language', 'Computer Software', 'A set of programs that tells a computer how to perform tasks. It includes system software, which runs the computer, and application software, which helps users complete specific tasks.', 'Operating systems, applications'),
('Computer Software and Language', 'System Software', 'A type of computer program that manages and controls the computer hardware, allowing the system and application software to run.', 'Operating System, Device Drivers'),
('Computer Software and Language', 'Application Software', 'A program that helps users perform specific tasks on a computer such as writing a letter. It is designed for practical use by end users rather than for running the computer itself.', 'Microsoft Word, Photoshop'),
('Computer Software and Language', 'Word Processing', 'An application software that allows users to create, edit, format, and print text documents. It is used for writing letters, reports, and other written materials.', 'Microsoft Word, Google Docs'),
('Computer Software and Language', 'Desktop Publishing', 'An application software that enables users to design and produce professional-looking publications. It allows combining text and images with precise layout control.', 'Adobe InDesign, Canva'),
('Computer Software and Language', 'Data Handling', 'An application software that manages, organizes, and analyzes data stored in databases. It is used for creating, editing, sorting, and searching records, and displaying information in charts or tables.', 'Microsoft Access, MySQL'),
('Computer Software and Language', 'Spreadsheet Modelling', 'An application software that allows users to perform calculations, create financial models, or run simulations using rows, columns, and formulas. It is used for producing invoices, cost plans, and other data-driven models.', 'Microsoft Excel, Google Sheets'),
('Computer Software and Language', 'Graphics Package', 'An application software that enables users to create, edit, and manipulate images and drawings. It is used for digital painting, photo editing, and graphic design.', 'Adobe Photoshop, GIMP'),
('Computer Software and Language', 'Computer-Aided Design (CAD)', 'An application software that helps users design products, floor plans, or 3D models accurately. It is used for engineering, architecture, and technical drawing.', 'AutoCAD, SketchUp'),
('Computer Software and Language', 'Presentation Software', 'An application software that allows users to create multimedia presentations using text, images, video, and sound. It is used for lectures, demonstrations, and business presentations.', 'Microsoft PowerPoint, Google Slides'),
('Computer Software and Language', 'Music Software', 'An application software that allows users to compose, record, edit, and play musical performances. It is used for creating digital music and audio production.', 'Ableton Live, FL Studio'),
('Computer Software and Language', 'Packaged Software', 'A form of application software that includes multiple programs bundled together, used to perform similar tasks efficiently and often more cost-effectively than buying programs individually.', 'Microsoft Office Suite'),
('Computer Software and Language', 'Custom Software', 'A form of application software designed specifically for an individual or organization to perform tasks tailored to their unique needs.', 'Banking systems, Hospital management software'),
('Computer Software and Language', 'Web Application', 'A form of application software that runs through an internet browser, allowing user interaction and access to features without needing local installation.', 'Gmail, Google Drive, Trello'),
('Computer Software and Language', 'Open-source Software', 'A form of application software whose source code is publicly available, allowing anyone to study, modify, and distribute it, promoting collaboration and transparency.', 'Linux, Firefox, Apache'),
('Computer Software and Language', 'Shareware Software', 'A form of application software initially provided for free, allowing users to try and share the program before purchasing the full version.', 'WinRAR, Adobe Reader'),
('Computer Software and Language', 'Freeware Software', 'A form of application software that is available at no cost to the user, though usually with restrictions on modification, redistribution, or reverse engineering.', 'VLC Media Player, 7-Zip'),
('Computer Software and Language', 'Public Domain Software', 'A form of application software that has no ownership restrictions, allowing anyone to freely use, modify, distribute, or sell it.', 'Some old software, Public domain images'),
('Computer Software and Language', 'Programming Languages', 'Languages that are used to write instructions that tell a computer how to perform tasks, forming the foundation for all software development.', 'Python, Java, JavaScript'),
('Computer Software and Language', 'Low-level Languages', 'A type of programming language that interacts closely with the computer''s hardware, used to create programs that run efficiently and quickly.', 'Assembly, Machine Code'),
('Computer Software and Language', 'High-level Languages', 'A type of programming language designed to be easy for humans to read, write, and debug, used to create programs that can run on different computers.', 'Python, Java, C++');

-- COC 1 Reviewers
INSERT INTO coc1_reviewers (reviewer_name, category, description) VALUES
('Dr. Sarah Johnson', 'Operating System Basics', 'Expert in OS architecture and design'),
('Prof. Michael Chen', 'Computer Software and Language', 'Specialist in software development and programming'),
('Dr. Emily Williams', 'Operating System Basics', 'Authority on system administration'),
('Prof. David Martinez', 'Computer Software and Language', 'Expert in application development');
