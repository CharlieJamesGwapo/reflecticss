-- COC 3 Terms - Wireless & Network Protocols

-- Wireless Network Identification Terms
INSERT INTO coc3_terms (category, term_name, definition, abbreviation, example) VALUES
('Wireless Network Identification', 'SSID', 'Service Set Identifier - the name of a wireless network that helps users identify and connect to the correct network.', 'Service Set Identifier', 'When you look at available Wi-Fi networks on your phone, "HomeWiFi_Network" is an SSID.'),
('Wireless Network Identification', 'BSSID', 'Basic Service Set Identifier - the MAC address of the wireless access point.', 'Basic Service Set Identifier', 'The router''s MAC address serves as the BSSID.'),
('Wireless Network Identification', 'MAC Address', 'Media Access Control address - a unique identifier assigned to network interfaces.', 'Media Access Control', '00:1A:2B:3C:4D:5E is an example MAC address.');

-- Wireless Network Types Terms
INSERT INTO coc3_terms (category, term_name, definition, abbreviation, example) VALUES
('Wireless Network Types', 'WPAN', 'Wireless Personal Area Network - short-range wireless network for personal devices.', 'Wireless Personal Area Network', 'Bluetooth connection between phone and smartwatch.'),
('Wireless Network Types', 'WLAN', 'Wireless Local Area Network - wireless network covering a limited area like home or office.', 'Wireless Local Area Network', 'Home Wi-Fi network covering your house.'),
('Wireless Network Types', 'WMAN', 'Wireless Metropolitan Area Network - wireless network covering a city or metropolitan area.', 'Wireless Metropolitan Area Network', 'City-wide Wi-Fi coverage across districts.'),
('Wireless Network Types', 'WWAN', 'Wireless Wide Area Network - wireless network covering large geographical areas.', 'Wireless Wide Area Network', 'Cellular network coverage across countries.');

-- Network Protocols Terms
INSERT INTO coc3_terms (category, term_name, definition, abbreviation, example) VALUES
('Network Protocols', 'HTTP', 'Hypertext Transfer Protocol - protocol for transferring web pages on the internet.', 'Hypertext Transfer Protocol', 'https://www.example.com uses HTTP/HTTPS.'),
('Network Protocols', 'FTP', 'File Transfer Protocol - protocol for transferring files between client and server.', 'File Transfer Protocol', 'Downloading files from an FTP server.'),
('Network Protocols', 'CSMA/CD', 'Carrier Sense Multiple Access with Collision Detection - protocol where devices check if the medium is free before transmitting.', 'Carrier Sense Multiple Access with Collision Detection', 'Ethernet networks use CSMA/CD to prevent data collisions.'),
('Network Protocols', 'TCP/IP', 'Transmission Control Protocol/Internet Protocol - suite of communication protocols for the internet.', 'Transmission Control Protocol/Internet Protocol', 'All internet communication relies on TCP/IP.'),
('Network Protocols', 'DNS', 'Domain Name System - system that translates domain names to IP addresses.', 'Domain Name System', 'DNS converts www.google.com to 172.217.14.228.');

-- Wireless Network Problems Terms
INSERT INTO coc3_terms (category, term_name, definition, abbreviation, example) VALUES
('Wireless Network Problems', 'Shared Resource Issue', 'Performance degradation when too many devices share the same wireless medium.', NULL, 'Wi-Fi slowing down when many employees are connected.'),
('Wireless Network Problems', 'Absorption', 'Signal weakening when wireless signals pass through materials that absorb radio waves.', NULL, 'Metal cabinets blocking Wi-Fi signals.'),
('Wireless Network Problems', 'Reflection', 'Signal bouncing off surfaces causing interference and signal distortion.', NULL, 'Wi-Fi signals reflecting off walls and furniture.'),
('Wireless Network Problems', 'Hidden Node Problem', 'When wireless devices cannot detect each other, causing simultaneous transmissions and collisions.', NULL, 'Two devices transmitting at same time because they can''t sense each other.'),
('Wireless Network Problems', 'Signal Interference', 'Disruption of wireless signals by other devices or networks operating on same frequency.', NULL, 'Microwave oven interfering with Wi-Fi signal.'),
('Wireless Network Problems', 'Channel Overlap', 'Performance issues when multiple Wi-Fi networks use overlapping frequency channels.', NULL, 'Neighbors'' Wi-Fi networks causing interference.');

-- Network Configuration Terms
INSERT INTO coc3_terms (category, term_name, definition, abbreviation, example) VALUES
('Network Configuration', 'Router Admin Page', 'Web interface for configuring router settings and network parameters.', NULL, 'Accessing 192.168.1.1 to configure home router.'),
('Network Configuration', 'DHCP', 'Dynamic Host Configuration Protocol - automatically assigns IP addresses to devices on a network.', 'Dynamic Host Configuration Protocol', 'Router assigning IP 192.168.1.100 to your laptop.'),
('Network Configuration', 'NAT', 'Network Address Translation - method of remapping one IP address space to another.', 'Network Address Translation', 'Multiple devices sharing one public IP address.'),
('Network Configuration', 'Firewall', 'Security system that monitors and controls incoming and outgoing network traffic.', NULL, 'Router blocking unauthorized access attempts.');
