-- COC 3 Quiz Questions and Choices - Wireless & Network Protocols

-- Question 1: SSID
INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES
('Your phone detects several Wi-Fi networks in a mall. You want to connect to the store''s official Wi-Fi. What identifier helps you choose the correct network?', 'Wireless Network Identification', 'easy');
INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'Your phone detects several Wi-Fi networks%'), 'MAC Address', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'Your phone detects several Wi-Fi networks%'), 'IP Address', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'Your phone detects several Wi-Fi networks%'), 'SSID', TRUE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'Your phone detects several Wi-Fi networks%'), 'BSSID', FALSE);

-- Question 2: WPAN
INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES
('You are sharing files between your smartwatch and smartphone without any cables. What type of wireless network are you using?', 'Wireless Network Types', 'easy');
INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You are sharing files between your smartwatch%'), 'WLAN', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You are sharing files between your smartwatch%'), 'WPAN', TRUE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You are sharing files between your smartwatch%'), 'WMAN', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You are sharing files between your smartwatch%'), 'WWAN', FALSE);

-- Question 3: Shared Resource Issue
INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES
('A company complains that their Wi-Fi is slowing down because too many employees are connected at the same time. What issue are they experiencing?', 'Wireless Network Problems', 'medium');
INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A company complains that their Wi-Fi%'), 'Signal Interference', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A company complains that their Wi-Fi%'), 'Shared Resource Issue', TRUE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A company complains that their Wi-Fi%'), 'Bandwidth Throttling', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A company complains that their Wi-Fi%'), 'Network Congestion', FALSE);

-- Question 4: HTTP
INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES
('You try to open a webpage but your browser shows an error because the protocol used to fetch web pages isn''t responding. What protocol is likely failing?', 'Network Protocols', 'easy');
INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You try to open a webpage%'), 'FTP', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You try to open a webpage%'), 'HTTP', TRUE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You try to open a webpage%'), 'SMTP', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You try to open a webpage%'), 'DNS', FALSE);

-- Question 5: CSMA/CD
INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES
('Your computer sends data over a wired connection and checks if the line is clear before sending to avoid collisions. What protocol is it using?', 'Network Protocols', 'medium');
INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'Your computer sends data over a wired%'), 'CSMA/CD', TRUE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'Your computer sends data over a wired%'), 'TCP/IP', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'Your computer sends data over a wired%'), 'Ethernet', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'Your computer sends data over a wired%'), 'UDP', FALSE);

-- Question 6: FTP
INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES
('You''re trying to download large files from your school''s server, but the protocol meant for file transfer isn''t functioning correctly. Which protocol is this?', 'Network Protocols', 'easy');
INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You''re trying to download large files%'), 'HTTP', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You''re trying to download large files%'), 'FTP', TRUE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You''re trying to download large files%'), 'SSH', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You''re trying to download large files%'), 'Telnet', FALSE);

-- Question 7: Absorption/Reflection
INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES
('You notice your Wi-Fi signal weakens significantly when you move behind a metal cabinet. Which wireless problem is causing this?', 'Wireless Network Problems', 'medium');
INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You notice your Wi-Fi signal weakens%'), 'Channel Overlap', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You notice your Wi-Fi signal weakens%'), 'Absorption/Reflection', TRUE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You notice your Wi-Fi signal weakens%'), 'Signal Fading', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You notice your Wi-Fi signal weakens%'), 'Interference', FALSE);

-- Question 8: Router Admin Page
INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES
('You are configuring your home router through a web interface using its IP address. What feature are you accessing?', 'Network Configuration', 'easy');
INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You are configuring your home router%'), 'Command Line Interface', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You are configuring your home router%'), 'Router Admin Page', TRUE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You are configuring your home router%'), 'Network Settings', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'You are configuring your home router%'), 'DHCP Server', FALSE);

-- Question 9: WMAN/WWAN
INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES
('A citywide wireless network allows people across multiple districts to stay connected. What type of wireless network is this?', 'Wireless Network Types', 'medium');
INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A citywide wireless network allows%'), 'WPAN', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A citywide wireless network allows%'), 'WLAN', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A citywide wireless network allows%'), 'WMAN/WWAN', TRUE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A citywide wireless network allows%'), 'VPN', FALSE);

-- Question 10: Hidden Node Problem
INSERT INTO coc3_quiz_questions (question_text, category, difficulty) VALUES
('A device cannot detect another device on the same network even though both are transmitting data, causing interference issues. What wireless problem is this?', 'Wireless Network Problems', 'hard');
INSERT INTO coc3_quiz_choices (question_id, choice_text, is_correct) VALUES
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A device cannot detect another device%'), 'Hidden Node Problem', TRUE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A device cannot detect another device%'), 'Exposed Node Problem', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A device cannot detect another device%'), 'Signal Attenuation', FALSE),
((SELECT id FROM coc3_quiz_questions WHERE question_text LIKE 'A device cannot detect another device%'), 'Multipath Fading', FALSE);
