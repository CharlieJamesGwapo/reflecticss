-- COC2 Complete Database Setup
-- This file contains all COC2 questions for both Part 2 (Network Topology) and Week 8-10 Terms for Reviewer

-- Drop existing tables if they exist (for clean setup)
DROP TABLE IF EXISTS coc2_quiz_choices CASCADE;
DROP TABLE IF EXISTS coc2_quiz_questions CASCADE;

-- Create questions table
CREATE TABLE coc2_quiz_questions (
    id SERIAL PRIMARY KEY,
    question_text TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    difficulty VARCHAR(50) DEFAULT 'Easy',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create choices table
CREATE TABLE coc2_quiz_choices (
    id SERIAL PRIMARY KEY,
    question_id INTEGER REFERENCES coc2_quiz_questions(id) ON DELETE CASCADE,
    choice_text TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert Network Topology Questions (Part 2)
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('Your teacher asks the class to redesign the computer lab, focusing on how devices are arranged and connected. What concept are you being asked to work on?', 'Network Topology', 'Easy'),
('In a small shop, all computers are connected to a single main cable. When the cable is damaged, the whole network stops working. What topology is this?', 'Network Topology', 'Easy'),
('A company uses a network where each device passes the message to the next one in a circular path. What topology is being used?', 'Network Topology', 'Easy'),
('A school network uses a central switch to connect all computers. If the switch fails, all computers lose connection. What topology is this?', 'Network Topology', 'Easy'),
('In a military base, each device is connected to many other devices to ensure communication continues even if one path fails. What topology is this?', 'Network Topology', 'Easy'),
('A network starts with a main server, then branches out into smaller connected groups of computers. What topology is this?', 'Network Topology', 'Easy'),
('A university uses both star and ring topologies in different buildings, combining them together. What topology is this called?', 'Network Topology', 'Easy');

-- Get the inserted question IDs for Network Topology (IDs 1-7)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 1
(1, 'Network Security', false),
(1, 'Network Topology', true),
(1, 'Printer Sharing', false),
(1, 'IP Address', false),
-- Question 2
(2, 'Mesh', false),
(2, 'Bus', true),
(2, 'Star', false),
(2, 'Hybrid', false),
-- Question 3
(3, 'Ring', true),
(3, 'Star', false),
(3, 'Tree', false),
(3, 'Bus', false),
-- Question 4
(4, 'Mesh', false),
(4, 'Star', true),
(4, 'Hybrid', false),
(4, 'Tree', false),
-- Question 5
(5, 'Mesh', true),
(5, 'Ring', false),
(5, 'Bus', false),
(5, 'LAN', false),
-- Question 6
(6, 'Star', false),
(6, 'Tree', true),
(6, 'Bus', false),
(6, 'Hybrid', false),
-- Question 7
(7, 'Mesh', false),
(7, 'Hybrid', true),
(7, 'Bus', false),
(7, 'Tree', false);

-- Insert Network Configuration Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('A computer shop with 12 PCs shares internet and files within the shop. What type of network is this?', 'Network Configuration', 'Easy'),
('A company connects offices located in Manila, Cebu, and Davao through a single network. What type of network is used?', 'Network Configuration', 'Easy'),
('Your phone can''t connect to Wi-Fi because it has no assigned number that identifies it in the network. What is missing?', 'Network Configuration', 'Easy'),
('A home router automatically assigns IP addresses to all phones and laptops that connect. What feature is doing this?', 'Network Configuration', 'Easy'),
('A school blocks a specific student''s device from connecting to Wi-Fi by using its unique hardware identifier. What identifier was used?', 'Network Configuration', 'Easy'),
('Your teacher asks you to identify the type of internet addressing that looks like "192.168.1.1." What is this?', 'Network Configuration', 'Easy'),
('A network admin divides a large network into smaller sections so devices stay organized and secure. What tool does he use?', 'Network Configuration', 'Easy');

-- Get the inserted question IDs for Network Configuration (IDs 8-14)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 8
(8, 'WAN', false),
(8, 'LAN', true),
(8, 'Public Network', false),
(8, 'Domain', false),
-- Question 9
(9, 'LAN', false),
(9, 'WAN', true),
(9, 'Tree', false),
(9, 'Mesh', false),
-- Question 10
(10, 'MAC Address', false),
(10, 'DHCP', false),
(10, 'IP Address', true),
(10, 'Firewall', false),
-- Question 11
(11, 'Firewall', false),
(11, 'DHCP Server', true),
(11, 'Proxy', false),
(11, 'IPv4', false),
-- Question 12
(12, 'IP Address', false),
(12, 'MAC Address', true),
(12, 'Subnet Mask', false),
(12, 'Domain Name', false),
-- Question 13
(13, 'IPv4', true),
(13, 'IPv6', false),
(13, 'DHCP', false),
(13, 'WAN', false),
-- Question 14
(14, 'IP Address', false),
(14, 'Subnet Mask', true),
(14, 'MAC Address', false),
(14, 'Firewall', false);

-- Insert Network Location Types Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('In your house, all phones and smart TVs are connected through one Wi-Fi. What type of network is this?', 'Network Location Types', 'Easy'),
('A company connects computers to access shared printers, files, and employee data inside the office. What network is this?', 'Network Location Types', 'Easy'),
('You connect to free Wi-Fi at a coffee shop. This type of network is called:', 'Network Location Types', 'Easy'),
('A school has a server that controls the login access of all students and teachers. What type of network is this?', 'Network Location Types', 'Easy');

-- Get the inserted question IDs for Network Location Types (IDs 15-18)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 15
(15, 'Work Network', false),
(15, 'Public Network', false),
(15, 'Home Network', true),
(15, 'Domain Network', false),
-- Question 16
(16, 'Home Network', false),
(16, 'Work Network', true),
(16, 'Domain Network', false),
(16, 'WAN', false),
-- Question 17
(17, 'Domain', false),
(17, 'LAN', false),
(17, 'Public Network', true),
(17, 'Tree', false),
-- Question 18
(18, 'Public', false),
(18, 'Home', false),
(18, 'Domain', true),
(18, 'LAN', false);

-- Insert Network Sharing Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('Three classmates work on a project using the same folder accessible over the school network. What is this called?', 'Network Sharing', 'Easy'),
('In an office, all employees can print from the same printer over the network. What is this?', 'Network Sharing', 'Easy');

-- Get the inserted question IDs for Network Sharing (IDs 19-20)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 19
(19, 'Printer Sharing', false),
(19, 'File Sharing', true),
(19, 'Domain Network', false),
(19, 'WAN', false),
-- Question 20
(20, 'LAN', false),
(20, 'Printer Sharing', true),
(20, 'Proxy', false),
(20, 'Firewall', false);

-- Insert Network Security Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('A business installs tools to protect its network from hackers. What is this called?', 'Network Security', 'Easy'),
('A downloaded file started damaging system files and spreading on its own to other computers. What is this?', 'Network Security', 'Easy'),
('Your router blocks suspicious incoming traffic to protect your data. What is this feature?', 'Network Security', 'Easy'),
('Your company uses a firewall that decides which applications should be allowed to send or receive traffic. What type is this?', 'Network Security', 'Easy'),
('A system checks app traffic and blocks certain apps from connecting to the internet. What firewall is used?', 'Network Security', 'Easy'),
('Your school uses a firewall that hides the internal devices by acting as a middleman between the user and the internet. What firewall is this?', 'Network Security', 'Easy'),
('Your laptop blocks all unknown connections that try to enter the system. What is being used?', 'Network Security', 'Easy'),
('A computer is allowed to connect to websites except social media, which is blocked. What rule controls this?', 'Network Security', 'Easy'),
('Two computers in a company exchange encrypted data to stay protected from unauthorized access. What rule is used?', 'Network Security', 'Easy');

-- Get the inserted question IDs for Network Security (IDs 21-29)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 21
(21, 'IP Addressing', false),
(21, 'Network Security', true),
(21, 'File Sharing', false),
(21, 'Public Network', false),
-- Question 22
(22, 'Firewall', false),
(22, 'Virus', true),
(22, 'Proxy', false),
(22, 'Subnet', false),
-- Question 23
(23, 'Subnet Mask', false),
(23, 'Virus Protection', false),
(23, 'Firewall', true),
(23, 'Mesh Topology', false),
-- Question 24
(24, 'Proxy Firewall', false),
(24, 'Application Layer Firewall', true),
(24, 'Inbound Rule', false),
(24, 'WAN Security', false),
-- Question 25
(25, 'Application Firewall', true),
(25, 'Mesh Firewall', false),
(25, 'Proxy Firewall', false),
(25, 'Outbound Rule', false),
-- Question 26
(26, 'Outbound', false),
(26, 'Proxy Firewall', true),
(26, 'Application Layer', false),
(26, 'Virus Filter', false),
-- Question 27
(27, 'Outbound Rules', false),
(27, 'Inbound Rules', true),
(27, 'MAC Filtering', false),
(27, 'DHCP', false),
-- Question 28
(28, 'Inbound', false),
(28, 'Outbound', true),
(28, 'Subnet', false),
(28, 'Printer Sharing', false),
-- Question 29
(29, 'Firewall Rules', false),
(29, 'Connection Security Rules', true),
(29, 'WAN Rules', false),
(29, 'Proxy Controls', false);

-- Insert Network Devices Questions (Week 8-10)
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('You''re setting up internet access for a small office using a DSL connection through phone lines. What device do you need to convert digital signals from computers into analog signals for transmission and vice versa?', 'Network Devices', 'Easy'),
('Your new laptop has a USB-C port, but office projector only accepts HDMI. What device would you use to connect them and ensure compatibility?', 'Network Devices', 'Easy'),
('A company wants to connect multiple devices (wired and wireless) to internet while ensuring secure data routing and preventing unauthorized access. What network device should they install to manage traffic and provide features like NAT and firewalls?', 'Network Devices', 'Easy'),
('In a busy office LAN with many computers, data is slowing down because it''s being broadcast to all devices unnecessarily. What device can you add to learn MAC addresses and deliver frames only to intended recipients for better efficiency?', 'Network Devices', 'Easy'),
('You''re building a simple, low-cost network for a small group of computers in a classroom, and budget is tight. What basic device would you use to connect them, even if it broadcasts data to all ports without filtering?', 'Network Devices', 'Easy'),
('Your Ethernet cable run is 150 meters long, and signal is weakening, causing data loss. What device can you install to amplify and regenerate signal without changing data?', 'Network Devices', 'Easy'),
('A large office network is experiencing congestion because all devices are on one segment. What device can you use to divide it into smaller segments and filter traffic between them using the same protocol?', 'Network Devices', 'Easy'),
('Your company''s internal network uses TCP/IP, but you need to connect it to a partner''s network that uses a different protocol. What device acts as the entry/exit point and handles protocol conversion?', 'Network Devices', 'Easy'),
('You''re expanding Wi-Fi coverage in a large café with dead zones. What wireless device would you install to broadcast signals and allow more devices to connect to the wired network?', 'Network Devices', 'Easy'),
('A team needs a centralized way to store, share, and access files across multiple devices with redundancy. What dedicated network device, often using RAID, would you recommend?', 'Network Devices', 'Easy'),
('Your desktop computer lacks built-in Wi-Fi, and you need to connect it to a wireless network. What hardware component would you install inside the PC to enable this?', 'Network Devices', 'Easy');

-- Get the inserted question IDs for Network Devices (IDs 30-40)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 30
(30, 'Router', false),
(30, 'Switch', false),
(30, 'Modem', true),
(30, 'Hub', false),
-- Question 31
(31, 'Router', false),
(31, 'Adapter', true),
(31, 'Switch', false),
(31, 'Repeater', false),
-- Question 32
(32, 'Hub', false),
(32, 'Switch', false),
(32, 'Router', true),
(32, 'Bridge', false),
-- Question 33
(33, 'Hub', false),
(33, 'Router', false),
(33, 'Switch', true),
(33, 'Repeater', false),
-- Question 34
(34, 'Switch', false),
(34, 'Router', false),
(34, 'Hub', true),
(34, 'Bridge', false),
-- Question 35
(35, 'Switch', false),
(35, 'Router', false),
(35, 'Repeater', true),
(35, 'Bridge', false),
-- Question 36
(36, 'Router', false),
(36, 'Switch', false),
(36, 'Bridge', true),
(36, 'Gateway', false),
-- Question 37
(37, 'Bridge', false),
(37, 'Router', false),
(37, 'Gateway', true),
(37, 'Access Point', false),
-- Question 38
(38, 'Router', false),
(38, 'Modem', false),
(38, 'Access Point (AP)', true),
(38, 'NAS', false),
-- Question 39
(39, 'Access Point', false),
(39, 'Router', false),
(39, 'NAS', true),
(39, 'Wireless LAN Adapter', false),
-- Question 40
(40, 'Modem', false),
(40, 'Router', false),
(40, 'Wireless LAN Adapter / Wi-Fi PCI Card', true),
(40, 'NAS', false);

-- Insert Client Devices Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('You''re a student who needs to work on assignments while traveling between classes and accessing the internet on the go. What portable device with an integrated screen, keyboard, and battery would be ideal?', 'Client Devices', 'Easy'),
('A graphic designer requires a powerful, upgradeable computer for intensive tasks like video editing, but it doesn''t need to be mobile. What non-portable device with a separate tower, monitor, and peripherals would suit this?', 'Client Devices', 'Easy'),
('Your office needs to produce physical copies of reports and photos. What hardware device can connect via USB, network, or wireless to output these documents?', 'Client Devices', 'Easy'),
('In a local area network, multiple users need to access shared files from a specialized server appliance with redundant drives. What is this file-level storage device called, often arranged in RAID?', 'Client Devices', 'Easy');

-- Get the inserted question IDs for Client Devices (IDs 41-44)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 41
(41, 'Desktop', false),
(41, 'Printer', false),
(41, 'Laptop', true),
(41, 'Network Storage', false),
-- Question 42
(42, 'Laptop', false),
(42, 'Printer', false),
(42, 'Desktop', true),
(42, 'Network Storage', false),
-- Question 43
(43, 'Laptop', false),
(43, 'Desktop', false),
(43, 'Printer', true),
(43, 'Network Storage', false),
-- Question 44
(44, 'Laptop', false),
(44, 'Desktop', false),
(44, 'Printer', false),
(44, 'Network Storage', true);

-- Insert IP Addressing Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('Each device on your company''s network needs a unique identifier for communication. What numerical label serves both to identify the device and specify its location in the network?', 'IP Addressing', 'Easy'),
('Within a local network, you need to pinpoint a specific computer among others. What part of an IP address uniquely identifies that device on its subnet?', 'IP Addressing', 'Easy'),
('To route data across different networks, you must know where a device belongs. What part of an IP address indicates the network segment for inter-network communication?', 'IP Addressing', 'Easy');

-- Get the inserted question IDs for IP Addressing (IDs 45-47)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 45
(45, 'Host Identification', false),
(45, 'Location Addressing', false),
(45, 'IP Address', true),
(45, 'MAC Address', false),
-- Question 46
(46, 'Location Addressing', false),
(46, 'IP Address', false),
(46, 'Host Identification', true),
(46, 'Network Mask', false),
-- Question 47
(47, 'Host Identification', false),
(47, 'IP Address', false),
(47, 'Location Addressing', true),
(47, 'Subnet Mask', false);

-- Insert Tools & Testing Devices Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('While diagnosing a faulty Ethernet cable, you need to check for voltage, resistance, and continuity issues. What versatile tool would you use for these electrical measurements?', 'Tools & Testing Devices', 'Easy'),
('You''re installing a new circuit board in a server and want to avoid damaging it with static electricity. What safety device grounds your body to prevent ESD?', 'Tools & Testing Devices', 'Easy'),
('You''re terminating network wires into a patch panel for a structured cabling system. What handheld tool inserts and secures wires while trimming excess?', 'Tools & Testing Devices', 'Easy'),
('Before deploying a new batch of network cables, you suspect wiring faults like shorts or miswiring. What diagnostic device checks continuity, order, and signal quality?', 'Tools & Testing Devices', 'Easy'),
('You''re attaching RJ45 connectors to UTP cables for Ethernet connections. What tool presses metal pins into wires to ensure a secure fit?', 'Tools & Testing Devices', 'Easy'),
('During cable stripping and installation, flying debris or wire snaps could injure your eyes. What safety equipment should you wear to protect them?', 'Tools & Testing Devices', 'Easy');

-- Get the inserted question IDs for Tools & Testing Devices (IDs 48-53)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 48
(48, 'Punch Down Tool', false),
(48, 'Cable Tester', false),
(48, 'Multimeter', true),
(48, 'Crimping Tool', false),
-- Question 49
(49, 'Eye Protection', false),
(49, 'Multimeter', false),
(49, 'Antistatic Wrist Strap', true),
(49, 'Cable Tester', false),
-- Question 50
(50, 'Crimping Tool', false),
(50, 'Cable Tester', false),
(50, 'Punch Down Tool', true),
(50, 'Multimeter', false),
-- Question 51
(51, 'Multimeter', false),
(51, 'Punch Down Tool', false),
(51, 'Cable Tester', true),
(51, 'Crimping Tool', false),
-- Question 52
(52, 'Punch Down Tool', false),
(52, 'Cable Tester', false),
(52, 'Crimping Tool', true),
(52, 'Multimeter', false),
-- Question 53
(53, 'Antistatic Wrist Strap', false),
(53, 'Multimeter', false),
(53, 'Eye Protection', true),
(53, 'Cable Tester', false);

-- Insert Network Cable Types Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('You need a common, cost-effective cable for an office Ethernet LAN that reduces interference. What type of cable, made of twisted copper pairs, would you choose?', 'Network Cable Types', 'Easy'),
('For a standard home network setup, you want a cable that''s easy to install and handles basic Ethernet speeds. What unshielded twisted pair variant is widely used?', 'Network Cable Types', 'Easy'),
('In an industrial environment with high electromagnetic interference, you need a cable that''s more protected. What shielded version of twisted pair would be suitable?', 'Network Cable Types', 'Easy'),
('You''re working on an older network system requiring cable for data transmission over moderate distances. What type of cable with a central conductor and shielding is appropriate?', 'Network Cable Types', 'Easy'),
('For a short-run Ethernet setup in a retro computing project, you need a flexible coaxial cable. What thinner variant supports up to 185 meters?', 'Network Cable Types', 'Easy'),
('You''re installing cable for a backbone in a large building, needing durability over 500 meters. What thicker coaxial type is better for longer distances?', 'Network Cable Types', 'Easy'),
('Your data center requires high-speed, interference-free transmission over long distances. What cable uses light pulses through glass fibers?', 'Network Cable Types', 'Easy'),
('For a long-haul internet connection spanning kilometers, you need fiber with minimal signal loss. What type with a small core is ideal?', 'Network Cable Types', 'Easy'),
('In a campus network for shorter distances, you want fiber that allows multiple light paths. What wider-core variant would you use?', 'Network Cable Types', 'Easy');

-- Get the inserted question IDs for Network Cable Types (IDs 54-62)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 54
(54, 'Coaxial Cable', false),
(54, 'Fiber Optic Cable', false),
(54, 'Twisted Pair', true),
(54, 'Single Mode Fiber', false),
-- Question 55
(55, 'STP', false),
(55, 'Coaxial Cable', false),
(55, 'UTP', true),
(55, 'Fiber Optic', false),
-- Question 56
(56, 'UTP', false),
(56, 'Coaxial Cable', false),
(56, 'STP', true),
(56, 'Fiber Optic', false),
-- Question 57
(57, 'Twisted Pair', false),
(57, 'Fiber Optic Cable', false),
(57, 'Coaxial Cable', true),
(57, 'Single Mode Fiber', false),
-- Question 58
(58, 'Thicknet', false),
(58, 'Fiber Optic', false),
(58, 'Thinnet (10Base2)', true),
(58, 'Multimode Fiber', false),
-- Question 59
(59, 'Thinnet', false),
(59, 'Fiber Optic', false),
(59, 'Thicknet (10Base5)', true),
(59, 'Single Mode Fiber', false),
-- Question 60
(60, 'Twisted Pair', false),
(60, 'Coaxial Cable', false),
(60, 'Fiber Optic Cable', true),
(60, 'STP', false),
-- Question 61
(61, 'Multimode Fiber', false),
(61, 'Coaxial Cable', false),
(61, 'Single Mode Fiber', true),
(61, 'UTP', false),
-- Question 62
(62, 'Single Mode Fiber', false),
(62, 'Coaxial Cable', false),
(62, 'Multimode Fiber', true),
(62, 'STP', false);

-- Insert Cable Connectors Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('You''re connecting an Ethernet cable to a router port. What 8-pin connector locks in and follows EIA/TIA wiring standards?', 'Cable Connectors', 'Easy'),
('For an older coaxial cable setup in a CCTV system, you need a secure connector. What twist-lock type is commonly used?', 'Cable Connectors', 'Easy'),
('Your device has a USB port, but you need to connect it to an Ethernet cable. What device converts between incompatible interfaces?', 'Cable Connectors', 'Easy');

-- Get the inserted question IDs for Cable Connectors (IDs 63-65)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 63
(63, 'BNC Connector', false),
(63, 'Adapter', false),
(63, 'RJ45 Connector', true),
(63, 'Fiber Optic Connector', false),
-- Question 64
(64, 'RJ45 Connector', false),
(64, 'Adapter', false),
(64, 'BNC Connector', true),
(64, 'USB Connector', false),
-- Question 65
(65, 'RJ45 Connector', false),
(65, 'BNC Connector', false),
(65, 'Adapter', true),
(65, 'Router', false);

-- Insert UTP Color Coding Standards Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('You''re wiring a crossover cable and need a specific color order for pairs. What standard arranges them as White Green/Green/White Orange/Blue/White Blue/Orange/White Brown/Brown?', 'UTP Color Coding Standards', 'Easy'),
('For a straight-through Ethernet cable, you''re following the most common wiring scheme. What standard uses White Orange/Orange/White Green/Blue/White Blue/Green/White Brown/Brown?', 'UTP Color Coding Standards', 'Easy');

-- Get the inserted question IDs for UTP Color Coding Standards (IDs 66-67)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 66
(66, 'EIA/TIA 568B', false),
(66, 'RJ45 Standard', false),
(66, 'EIA/TIA 568A', true),
(66, 'BNC Standard', false),
-- Question 67
(67, 'EIA/TIA 568A', false),
(67, 'RJ45 Standard', false),
(67, 'EIA/TIA 568B', true),
(67, 'Coaxial Standard', false);

-- Insert Cable Raceways Questions
INSERT INTO coc2_quiz_questions (question_text, category, difficulty) VALUES
('In an office renovation, you need to hide and protect network cables along walls without damaging them. What protective channel would you install?', 'Cable Raceways', 'Easy'),
('Inside a server room, multiple cables are tangled and at risk. What plastic or metal ducts can route and organize them neatly?', 'Cable Raceways', 'Easy'),
('You''re extending a raceway around a corner in a building. What accessories like elbows and joints would connect sections securely?', 'Cable Raceways', 'Easy'),
('At the end of a cable run, you need to install network jacks. What boxes attached to raceway hold outlets and connectors?', 'Cable Raceways', 'Easy');

-- Get the inserted question IDs for Cable Raceways (IDs 68-71)
INSERT INTO coc2_quiz_choices (question_id, choice_text, is_correct) VALUES
-- Question 68
(68, 'Wiring Ducts', false),
(68, 'Raceway Fittings', false),
(68, 'Raceway', true),
(68, 'Mounting Boxes', false),
-- Question 69
(69, 'Raceway', false),
(69, 'Raceway Fittings', false),
(69, 'Wiring Ducts', true),
(69, 'Mounting Boxes', false),
-- Question 70
(70, 'Raceway', false),
(70, 'Wiring Ducts', false),
(70, 'Raceway Fittings', true),
(70, 'Mounting Boxes', false),
-- Question 71
(71, 'Raceway', false),
(71, 'Wiring Ducts', false),
(71, 'Raceway Fittings', false),
(71, 'Raceway Mounting Boxes', true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_coc2_quiz_questions_category ON coc2_quiz_questions(category);
CREATE INDEX IF NOT EXISTS idx_coc2_quiz_choices_question_id ON coc2_quiz_choices(question_id);

-- Verify insertion
SELECT 
    q.category,
    COUNT(*) as question_count,
    STRING_AGG(q.question_text, '' | '' ORDER BY q.id) as sample_questions
FROM coc2_quiz_questions q
GROUP BY q.category
ORDER BY q.category;
