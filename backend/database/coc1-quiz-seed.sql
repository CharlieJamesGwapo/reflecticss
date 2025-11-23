-- COC 1 Quiz Questions and Choices

-- Question 1
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A company needs a system that coordinates all hardware and software while allowing employees to run applications efficiently. Which software handles this?', 'Operating System Basics', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A company needs a system%'), 'Word Processor', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A company needs a system%'), 'Operating System', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A company needs a system%'), 'Spreadsheet', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A company needs a system%'), 'Antivirus', FALSE);

-- Question 2
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('Emma works on her personal laptop at home to create documents and presentations without connecting to other computers. Which type of OS is suitable?', 'Operating System Basics', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Emma works on her personal%'), 'Desktop Operating System', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Emma works on her personal%'), 'Network OS', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Emma works on her personal%'), 'Web Application', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Emma works on her personal%'), 'Shareware', FALSE);

-- Question 3
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('In a corporate office, employees need access to shared files, printers, and software, while restricting unauthorized access. Which OS type handles this?', 'Operating System Basics', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'In a corporate office%'), 'Desktop OS', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'In a corporate office%'), 'Network Operating System', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'In a corporate office%'), 'Freeware', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'In a corporate office%'), 'Web Application', FALSE);

-- Question 4
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('Alex wants an OS that is easy to navigate, supports many programs, and allows him to manage files efficiently. Which OS fits?', 'Operating System Basics', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Alex wants an OS%'), 'Linux', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Alex wants an OS%'), 'MacOS', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Alex wants an OS%'), 'Microsoft Windows', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Alex wants an OS%'), 'DOS', FALSE);

-- Question 5
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A server handles hundreds of requests per minute and requires a system that can be customized and managed efficiently. Which OS is most suitable?', 'Operating System Basics', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A server handles hundreds%'), 'Linux', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A server handles hundreds%'), 'Windows', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A server handles hundreds%'), 'MacOS', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A server handles hundreds%'), 'Freeware', FALSE);

-- Question 6
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('Sophie uses a computer that must integrate smoothly with other proprietary devices, maintain strong security, and provide smooth performance. Which OS is this?', 'Operating System Basics', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Sophie uses a computer%'), 'Linux', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Sophie uses a computer%'), 'Windows', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Sophie uses a computer%'), 'MacOS', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Sophie uses a computer%'), 'Open-source', FALSE);

-- Question 7
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A programmer types commands directly into the system instead of using icons or menus. Which interface is being used?', 'Operating System Basics', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A programmer types commands%'), 'GUI', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A programmer types commands%'), 'CLI', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A programmer types commands%'), 'Network OS', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A programmer types commands%'), 'CAD', FALSE);

-- Question 8
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A student interacts with software using menus, icons, and windows rather than memorizing commands. Which interface allows this?', 'Operating System Basics', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A student interacts with software%'), 'CLI', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A student interacts with software%'), 'GUI', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A student interacts with software%'), 'Spreadsheet', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A student interacts with software%'), 'Terminal', FALSE);

-- Question 9
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('Multiple students log in and work independently on the same system without affecting each other. What OS feature is this?', 'Operating System Basics', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Multiple students log in%'), 'Multithreading', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Multiple students log in%'), 'Multiuser', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Multiple students log in%'), 'Multiprocessing', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Multiple students log in%'), 'Multitasking', FALSE);

-- Question 10
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('While editing a video, a designer also opens a spreadsheet and a word processor on the same computer. Which OS capability allows both programs to run simultaneously?', 'Operating System Basics', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'While editing a video%'), 'Multiuser', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'While editing a video%'), 'Multitasking', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'While editing a video%'), 'Multiprocessing', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'While editing a video%'), 'Multithreading', FALSE);

-- Question 11
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A high-performance server has multiple CPUs that divide processing tasks to improve speed. Which feature is this?', 'Operating System Basics', 'hard');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A high-performance server%'), 'Multithreading', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A high-performance server%'), 'Multitasking', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A high-performance server%'), 'Multiprocessing', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A high-performance server%'), 'Multiuser', FALSE);

-- Question 12
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A program splits a large task into smaller threads that run at the same time to improve efficiency. Which OS feature allows this?', 'Operating System Basics', 'hard');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A program splits a large%'), 'Multithreading', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A program splits a large%'), 'Multiprocessing', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A program splits a large%'), 'Multitasking', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A program splits a large%'), 'CLI', FALSE);

-- Question 13
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('Maria works in an office where she has to write multiple reports, letters, and memos every day. She needs software that allows her to create, edit, and format documents efficiently. Which application should she use?', 'Computer Software and Language', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Maria works in an office%'), 'Spreadsheet', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Maria works in an office%'), 'Word Processing Software', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Maria works in an office%'), 'CAD', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Maria works in an office%'), 'Presentation', FALSE);

-- Question 14
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('Alex is preparing a school magazine. He wants to place images and text together perfectly, adjust fonts and colors, and make sure the layout looks professional before printing. Which software should he use?', 'Computer Software and Language', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Alex is preparing a school%'), 'Word Processing', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Alex is preparing a school%'), 'Spreadsheet', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Alex is preparing a school%'), 'Desktop Publishing Software', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Alex is preparing a school%'), 'Music Software', FALSE);

-- Question 15
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A hospital wants to manage patient records, sort data, generate charts for doctors, and search through thousands of entries quickly. Which software should handle these tasks?', 'Computer Software and Language', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A hospital wants to manage%'), 'Word Processing', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A hospital wants to manage%'), 'Presentation', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A hospital wants to manage%'), 'Data Handling Software', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A hospital wants to manage%'), 'CAD', FALSE);

-- Question 16
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('John is running a small business and needs to calculate expenses, track profits, and produce financial models using formulas. Which software is most suitable?', 'Computer Software and Language', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'John is running a small%'), 'Word Processing', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'John is running a small%'), 'Spreadsheet Software', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'John is running a small%'), 'CAD', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'John is running a small%'), 'Presentation', FALSE);

-- Question 17
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('An architect wants to design a building, create 3D models, and ensure accurate measurements digitally. Which software will help him do this?', 'Computer Software and Language', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'An architect wants to%'), 'Word Processing', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'An architect wants to%'), 'Spreadsheet', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'An architect wants to%'), 'Computer-Aided Design (CAD)', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'An architect wants to%'), 'Music Software', FALSE);

-- Question 18
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A teacher is creating an interactive lesson plan with slides that include text, images, and videos. Which software should she use?', 'Computer Software and Language', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A teacher is creating%'), 'Data Handling', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A teacher is creating%'), 'Word Processing', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A teacher is creating%'), 'Presentation Software', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A teacher is creating%'), 'Desktop Publishing', FALSE);

-- Question 19
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A music producer wants to record, mix, and edit tracks digitally for a new album. Which software provides these capabilities?', 'Computer Software and Language', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A music producer wants%'), 'Presentation', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A music producer wants%'), 'Music Software', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A music producer wants%'), 'CAD', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A music producer wants%'), 'Spreadsheet', FALSE);

-- Question 20
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A company wants to buy several software programs together so employees can handle office tasks like writing, spreadsheets, and presentations more efficiently. Which type of software should they get?', 'Computer Software and Language', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A company wants to buy%'), 'Custom Software', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A company wants to buy%'), 'Freeware', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A company wants to buy%'), 'Packaged Software', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A company wants to buy%'), 'Web Application', FALSE);

-- Question 21
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A small business hires a developer to create a program that prints invoices, tracks sales, and manages inventory specifically tailored to their workflow. Which software is this?', 'Computer Software and Language', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A small business hires%'), 'Packaged Software', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A small business hires%'), 'Custom Software', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A small business hires%'), 'Open-source Software', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A small business hires%'), 'Shareware', FALSE);

-- Question 22
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('Students want to play educational games and submit homework directly through their web browsers without installing anything on their devices. Which software type fits this scenario?', 'Computer Software and Language', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Students want to play%'), 'Desktop Software', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Students want to play%'), 'Packaged Software', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Students want to play%'), 'Web Application', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Students want to play%'), 'Freeware', FALSE);

-- Question 23
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A team of developers creates a program whose source code is publicly available. Anyone can study it, modify it, and contribute to improving it collaboratively. Which software is this?', 'Computer Software and Language', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A team of developers creates%'), 'Shareware', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A team of developers creates%'), 'Freeware', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A team of developers creates%'), 'Open-source Software', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A team of developers creates%'), 'Public Domain', FALSE);

-- Question 24
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A software company offers a program for free so users can try it, share it with friends, but if they want all features, they must purchase the full version. Which type of software is this?', 'Computer Software and Language', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A software company offers%'), 'Freeware', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A software company offers%'), 'Shareware', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A software company offers%'), 'Custom Software', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A software company offers%'), 'Open-source', FALSE);

-- Question 25
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A popular drawing app is completely free to download and use, but users cannot modify, resell, or distribute it. Which software does this describe?', 'Computer Software and Language', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A popular drawing app%'), 'Shareware', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A popular drawing app%'), 'Freeware', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A popular drawing app%'), 'Custom Software', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A popular drawing app%'), 'Open-source', FALSE);

-- Question 26
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A program has no copyright, trademark, or patent. Anyone can use, modify, or sell it without asking for permission. Which software type is this?', 'Computer Software and Language', 'hard');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A program has no copyright%'), 'Freeware', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A program has no copyright%'), 'Shareware', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A program has no copyright%'), 'Open-source', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A program has no copyright%'), 'Public Domain Software', TRUE);

-- Question 27
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A software developer wants to create a program that automates a set of tasks for a computer to perform. She needs a language to write instructions the computer can understand. What is this concept called?', 'Computer Software and Language', 'easy');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A software developer wants%'), 'Low-level Languages', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A software developer wants%'), 'High-level Languages', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A software developer wants%'), 'Programming Languages', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A software developer wants%'), 'Debug', FALSE);

-- Question 28
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('A programmer is creating a program that interacts directly with the computer hardware to make it run as fast as possible, even though writing the program is more complex. Which type of programming language is she using?', 'Computer Software and Language', 'hard');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A programmer is creating a program that interacts%'), 'High-level Languages', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A programmer is creating a program that interacts%'), 'Low-level Languages', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A programmer is creating a program that interacts%'), 'Programming Languages', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'A programmer is creating a program that interacts%'), 'Debug', FALSE);

-- Question 29
INSERT INTO coc1_quiz_questions (question_text, category, difficulty) VALUES
('Another programmer wants a language that is easy to read, write, and debug, and can be used on different types of computers with minimal changes. Which type of language fits this scenario?', 'Computer Software and Language', 'medium');
INSERT INTO coc1_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Another programmer wants%'), 'Low-level Languages', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Another programmer wants%'), 'High-level Languages', TRUE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Another programmer wants%'), 'Debug', FALSE),
((SELECT id FROM coc1_quiz_questions WHERE question_text LIKE 'Another programmer wants%'), 'Machine Code', FALSE);
