import React, { useState, useEffect } from 'react';
import { BookOpen, ChevronDown, ChevronUp, ArrowLeft, Search, Network, Shield, FileText, Monitor, Router, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function COC2() {
  const navigate = useNavigate();
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedTerms, setExpandedTerms] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [termsPerPage] = useState(10);

  const sampleTerms = React.useMemo(() => [
    // NETWORK DEVICES CATEGORY
    {
      id: 1,
      term: 'Modem',
      definition: 'A device that establishes and maintains the connection between your local network and the Internet Service Provider (ISP). It converts digital signals from your computer into analog signals that travel through phone lines or cable lines, and converts incoming analog signals back into digital form.',
      category: 'Network Devices',
      examples: ['Cable modem', 'DSL modem', 'Fiber optic modem', 'Dial-up modem']
    },
    {
      id: 2,
      term: 'Adapter',
      definition: 'Is a device that converts attributes of one device or system to those of an otherwise incompatible device or system.',
      category: 'Network Devices',
      examples: ['USB to Ethernet adapter', 'Wireless adapter', 'Powerline adapter', 'Bluetooth adapter']
    },
    {
      id: 3,
      term: 'Router',
      definition: 'A network device that forwards data packets across different networks. It determines the best path for data to travel and provides important security features such as Network Address Translation (NAT) and firewalls. It can connect multiple devices either through wired Ethernet or wireless Wi-Fi.',
      category: 'Network Devices',
      examples: ['Wireless router', 'Wired router', 'Core router', 'Edge router']
    },
    {
      id: 4,
      term: 'Switch',
      definition: 'A central connecting device in a LAN that receives data frames and delivers them only to the correct destination device. Unlike hubs, switches learn the MAC address of each connected device, making the network faster and more efficient.',
      category: 'Network Devices',
      examples: ['Unmanaged switch', 'Managed switch', 'Layer 2 switch', 'Layer 3 switch']
    },
    {
      id: 5,
      term: 'Hub',
      definition: 'A basic networking device that acts as a central connector for multiple computers. It broadcasts data to all ports, regardless of the intended recipient. Because it cannot filter data, it is slower and less secure than a switch.',
      category: 'Network Devices',
      examples: ['Active hub', 'Passive hub', 'Intelligent hub', 'Ethernet hub']
    },
    {
      id: 6,
      term: 'Repeater',
      definition: 'A signal-regenerating device that boosts, amplifies, or reconstructs weak or damaged signals as they travel through cables. It allows data to reach longer distances without losing quality.',
      category: 'Network Devices',
      examples: ['Ethernet repeater', 'Wireless repeater', 'Fiber optic repeater', 'Signal booster']
    },
    {
      id: 7,
      term: 'Bridge',
      definition: 'A device that connects and filters traffic between two LAN segments using the same protocol (such as Ethernet). It reduces network congestion by dividing a large network into smaller sections.',
      category: 'Network Devices',
      examples: ['Transparent bridge', 'Source routing bridge', 'Translation bridge', 'Wireless bridge']
    },
    {
      id: 8,
      term: 'Gateway',
      definition: 'A network point that enables communication between two networks with different protocols, architectures, or systems. It acts as the entry and exit point of the network and is responsible for protocol conversion.',
      category: 'Network Devices',
      examples: ['Network gateway', 'Default gateway', 'VoIP gateway', 'Cloud gateway']
    },
    {
      id: 9,
      term: 'Access Point (AP)',
      definition: 'A wireless networking device that allows Wi-Fi devices to connect to a wired network. It broadcasts radio signals and expands wireless coverage, often used in large spaces such as schools, cafés, and offices.',
      category: 'Network Devices',
      examples: ['Standalone AP', 'Controller-managed AP', 'Mesh AP', 'Outdoor AP']
    },
    {
      id: 10,
      term: 'Network-Attached Storage (NAS)',
      definition: 'A dedicated file storage device connected to a network that allows multiple users and devices to store, share, and access files. NAS often uses multiple hard drives arranged in RAID for redundancy and performance.',
      category: 'Network Devices',
      examples: ['Home NAS', 'Enterprise NAS', 'Cloud NAS', 'Hybrid NAS']
    },
    {
      id: 11,
      term: 'Wireless LAN Adapter / Wi-Fi PCI Card',
      definition: 'A hardware component installed in a computer to enable wireless connectivity to an access point or router. It receives and transmits Wi-Fi signals so the device can join a wireless network.',
      category: 'Network Devices',
      examples: ['USB Wi-Fi adapter', 'PCI Express Wi-Fi card', 'Mini PCIe Wi-Fi card', 'M.2 Wi-Fi card']
    },

    // CLIENT DEVICES CATEGORY
    {
      id: 12,
      term: 'Laptop',
      definition: 'A portable personal computer with an integrated screen, keyboard, touchpad, battery, and internal components in a foldable, compact design. It allows mobile work, study, and Internet access.',
      category: 'Client Devices',
      examples: ['Ultrabook', 'Gaming laptop', 'Business laptop', 'Convertible laptop']
    },
    {
      id: 13,
      term: 'Desktop',
      definition: 'A non-portable computer designed to sit on a desk. It often includes a separate CPU tower, monitor, keyboard, and mouse, and offers more power, upgradeability, and durability.',
      category: 'Client Devices',
      examples: ['Tower desktop', 'All-in-one desktop', 'Mini PC', 'Workstation']
    },
    {
      id: 14,
      term: 'Printer',
      definition: 'A hardware device that produces a physical, printed copy of digital documents, photos, and graphics. It can be connected via USB, wired network, or wireless connection.',
      category: 'Client Devices',
      examples: ['Inkjet printer', 'Laser printer', 'Multifunction printer', 'Photo printer']
    },
    {
      id: 15,
      term: 'Network Storage (NAS)',
      definition: 'A dedicated network appliance for file-level data storage and sharing in LANs, typically using RAID for redundancy.',
      category: 'Client Devices',
      examples: ['Home NAS server', 'Enterprise NAS array', 'Cloud-connected NAS', 'Backup NAS']
    },
    {
      id: 16,
      term: 'IP Address',
      definition: 'A unique numerical label assigned to each device in a network. It performs two major roles: identifying the device (host identification) and specifying its exact location within the network (location addressing).',
      category: 'Client Devices',
      examples: ['IPv4 address', 'IPv6 address', 'Static IP', 'Dynamic IP']
    },
    {
      id: 17,
      term: 'Host Identification',
      definition: 'The part of an IP address that specifically identifies a device within its local network.',
      category: 'Client Devices',
      examples: ['Host portion of IPv4', 'Interface identifier in IPv6', 'Device ID', 'Node address']
    },
    {
      id: 18,
      term: 'Location Addressing',
      definition: 'The part of an IP address that indicates the network where the device belongs, making communication possible across different networks.',
      category: 'Client Devices',
      examples: ['Network portion of IPv4', 'Network prefix in IPv6', 'Subnet address', 'Network ID']
    },

    // TOOLS & TESTING DEVICES CATEGORY
    {
      id: 19,
      term: 'Multimeter',
      definition: 'A versatile measuring tool used to test voltage, current, resistance, and continuity in electrical systems. Essential for diagnosing cable faults and checking the functionality of electronic components.',
      category: 'Tools & Testing Devices',
      examples: ['Digital multimeter', 'Analog multimeter', 'Clamp meter', 'Auto-ranging multimeter']
    },
    {
      id: 20,
      term: 'Antistatic Wrist Strap',
      definition: 'A safety device that prevents the buildup of static electricity on a technician\'s body when working with sensitive electronic components. It ensures that static discharge does not damage circuit boards.',
      category: 'Tools & Testing Devices',
      examples: ['Grounding wrist strap', 'ESD wrist strap', 'Antistatic band', 'Static discharge bracelet']
    },
    {
      id: 21,
      term: 'Punch Down Tool',
      definition: 'A handheld tool used to insert and secure network wires into patch panels, keystone jacks, and modular boxes. It pushes the wire into metal slots and trims excess wiring automatically.',
      category: 'Tools & Testing Devices',
      examples: ['Impact punch down tool', 'Non-impact punch down tool', '110 punch tool', '66 punch tool']
    },
    {
      id: 22,
      term: 'Cable Tester',
      definition: 'A diagnostic device that checks a network cable\'s continuity, wiring order, and signal quality. It ensures proper connectivity and detects faults like open wires, shorts, and miswiring.',
      category: 'Tools & Testing Devices',
      examples: ['Network cable tester', 'Ethernet cable tester', 'Fiber optic tester', 'TDR cable tester']
    },
    {
      id: 23,
      term: 'Crimping Tool',
      definition: 'A tool used to attach RJ45 connectors onto UTP cables. It firmly presses metal pins into the wires to create a secure electrical connection.',
      category: 'Tools & Testing Devices',
      examples: ['RJ45 crimper', 'Ethernet crimper', 'Modular plug crimper', 'RJ11 crimper']
    },
    {
      id: 24,
      term: 'Eye Protection',
      definition: 'Safety equipment used to protect the eyes from debris, dust, or accidental wire snaps during cable cutting, stripping, or installation.',
      category: 'Tools & Testing Devices',
      examples: ['Safety goggles', 'Protective glasses', 'Safety glasses', 'Face shield']
    },

    // NETWORK CABLES, CONNECTORS AND RACEWAYS CATEGORY
    {
      id: 25,
      term: 'Twisted Pair UTP (Unshielded Twisted Pair)',
      definition: 'A widely used network cable made of four pairs of twisted copper wires. It reduces electromagnetic interference through twisting and is commonly used in Ethernet LANs.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['Cat5e UTP', 'Cat6 UTP', 'Cat6a UTP', 'Cat7 UTP']
    },
    {
      id: 26,
      term: 'STP (Shielded Twisted Pair)',
      definition: 'Similar to UTP but with an added foil or braided shielding around the wires. It protects the cable from external interference, making it suitable for industrial environments.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['Cat5e STP', 'Cat6 STP', 'Cat6a STP', 'Cat7 STP']
    },
    {
      id: 27,
      term: 'Coaxial Cable - Thinnet (10Base2)',
      definition: 'A thinner, flexible coaxial cable used in early Ethernet networks. It supports up to 185 meters of cable length.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['RG-58 coaxial', 'Thin Ethernet', '10Base2 cable', 'Thinnet cable']
    },
    {
      id: 28,
      term: 'Coaxial Cable - Thicknet (10Base5)',
      definition: 'A thicker, more durable coaxial cable used for longer distances up to 500 meters. It is harder to bend and install.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['RG-8 coaxial', 'Thick Ethernet', '10Base5 cable', 'Thicknet cable']
    },
    {
      id: 29,
      term: 'Fiber Optic Cable',
      definition: 'A high-speed transmission cable made of glass fibers that carries data as pulses of light. It is immune to electrical interference and ideal for long-distance communication.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['Single-mode fiber', 'Multimode fiber', 'Plastic fiber', 'Armored fiber']
    },
    {
      id: 30,
      term: 'Single Mode Fiber',
      definition: 'A fiber optic cable with a small glass core that allows data to travel over extremely long distances at high speed.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['OS1 fiber', 'OS2 fiber', '9/125 micron fiber', 'Long-haul fiber']
    },
    {
      id: 31,
      term: 'Multimode Fiber',
      definition: 'A fiber cable with a wider core that allows multiple light paths, suitable for shorter distances.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['OM1 fiber', 'OM2 fiber', 'OM3 fiber', 'OM4 fiber']
    },
    {
      id: 32,
      term: 'RJ45 Connector',
      definition: 'An 8-pin connector used for Ethernet cables. It locks firmly into a network port and follows standard pin arrangements under the EIA/TIA 568A or 568B wiring schemes.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['8P8C connector', 'Ethernet plug', 'Modular connector', 'RJ45 jack']
    },
    {
      id: 33,
      term: 'BNC Connector',
      definition: 'A type of connector used for coaxial cables. It uses a twist-lock mechanism and is commonly found in older Ethernet systems and CCTV setups.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['BNC plug', 'BNC jack', 'BNC terminator', 'BNC T-connector']
    },
    {
      id: 34,
      term: 'EIA/TIA 568A',
      definition: 'A wiring standard that arranges UTP wires in the following order: White Green / Green / White Orange / Blue / White Blue / Orange / White Brown / Brown.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['568A patch cable', 'T568A wiring', '568A standard', 'T568A pinout']
    },
    {
      id: 35,
      term: 'EIA/TIA 568B',
      definition: 'A wiring standard commonly used in straight-through cables. The order is: White Orange / Orange / White Green / Blue / White Blue / Green / White Brown / Brown.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['568B patch cable', 'T568B wiring', '568B standard', 'T568B pinout']
    },
    {
      id: 36,
      term: 'Raceway',
      definition: 'A protective channel that hides and organizes network cables along walls or ceilings, keeping them tidy and safe from damage.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['Plastic raceway', 'Metal raceway', 'Surface raceway', 'Cable raceway']
    },
    {
      id: 37,
      term: 'Wiring Ducts',
      definition: 'Plastic or metal ducts used to route multiple wires neatly, often used inside server rooms or cable management systems.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['Cable duct', 'Wire duct', 'Slotted duct', 'Solid duct']
    },
    {
      id: 38,
      term: 'Raceway Fittings',
      definition: 'Accessories like elbows, joints, and covers that connect and secure different sections of the raceway.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['Raceway elbow', 'Raceway tee', 'Raceway coupling', 'Raceway end cap']
    },
    {
      id: 39,
      term: 'Raceway Mounting Boxes',
      definition: 'Boxes attached to raceways where network jacks, outlets, or connectors are installed.',
      category: 'Network Cables, Connectors and Raceways',
      examples: ['Raceway box', 'Mounting box', 'Junction box', 'Outlet box']
    },

    // NETWORK TOPOLOGY CATEGORY
    {
      id: 40,
      term: 'Network Topology',
      definition: 'Arrangement of network elements and their connections.',
      category: 'Network Topology',
      examples: ['Physical topology', 'Logical topology', 'Hybrid topology', 'Network architecture']
    },
    {
      id: 41,
      term: 'Bus Topology',
      definition: 'A network setup where all devices connect to a central cable or line.',
      category: 'Network Topology',
      examples: ['Linear bus', 'Distributed bus', '10Base2 Ethernet', 'Thinnet network']
    },
    {
      id: 42,
      term: 'Ring Topology',
      definition: 'A network topology where each node connects to exactly two other nodes, forming a continuous ring for data transmission.',
      category: 'Network Topology',
      examples: ['Token ring', 'FDDI', 'SONET ring', 'Dual ring']
    },
    {
      id: 43,
      term: 'Star Topology',
      definition: 'A network topology where each device connects to a central hub or switch.',
      category: 'Network Topology',
      examples: ['Ethernet star', 'Switched network', 'Hub-based network', 'Extended star']
    },
    {
      id: 44,
      term: 'Mesh Topology',
      definition: 'A network topology where devices connect directly and non-hierarchically to many other nodes, allowing multiple routes for data transmission.',
      category: 'Network Topology',
      examples: ['Full mesh', 'Partial mesh', 'Wireless mesh', 'Internet backbone']
    },
    {
      id: 45,
      term: 'Tree Topology',
      definition: 'A network topology where devices are connected like branches of a tree, with one main device at the top.',
      category: 'Network Topology',
      examples: ['Hierarchical tree', 'Extended star tree', 'Rooted tree', 'Spanning tree']
    },
    {
      id: 46,
      term: 'Hybrid Topology',
      definition: 'A network that combines two or more different network topologies, like bus, star, or ring topologies.',
      category: 'Network Topology',
      examples: ['Star-bus hybrid', 'Star-ring hybrid', 'Mesh-star hybrid', 'Tree-mesh hybrid']
    },

    // NETWORK CONFIGURATION AND LOCATION CATEGORY
    {
      id: 47,
      term: 'Local Area Network (LAN)',
      definition: 'Connects devices in a limited area, like a home, office or school.',
      category: 'Network Configuration and Location',
      examples: ['Home LAN', 'Office LAN', 'School network', 'Campus network']
    },
    {
      id: 48,
      term: 'Wide Area Network (WAN)',
      definition: 'Connects networks across large geographic areas such as cities, countries, or even the world.',
      category: 'Network Configuration and Location',
      examples: ['Internet', 'Corporate WAN', 'MPLS network', 'Leased line WAN']
    },
    {
      id: 49,
      term: 'IP Address',
      definition: 'Unique numerical label for devices in a network.',
      category: 'Network Configuration and Location',
      examples: ['IPv4 address', 'IPv6 address', 'Public IP', 'Private IP']
    },
    {
      id: 50,
      term: 'DHCP Server',
      definition: 'Automates IP Address assignment and related network configuration.',
      category: 'Network Configuration and Location',
      examples: ['Windows DHCP Server', 'Linux DHCP', 'Router DHCP', 'Cloud DHCP']
    },
    {
      id: 51,
      term: 'MAC Address',
      definition: 'Unique identifier for a network interface.',
      category: 'Network Configuration and Location',
      examples: ['Physical address', 'Hardware address', 'Burned-in address', 'NIC address']
    },
    {
      id: 52,
      term: 'IPv4',
      definition: 'The 4th version of the Internet Protocol using 32-bit addresses.',
      category: 'Network Configuration and Location',
      examples: ['192.168.1.1', '10.0.0.1', '172.16.0.1', '8.8.8.8']
    },
    {
      id: 53,
      term: 'Subnet Mask',
      definition: 'A number that defines the range of IP addresses within a subnet, determining the network size.',
      category: 'Network Configuration and Location',
      examples: ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.128']
    },
    {
      id: 54,
      term: 'Home Network',
      definition: 'A network connecting devices within a household, typically for internet access and file sharing.',
      category: 'Network Configuration and Location',
      examples: ['WiFi home network', 'Ethernet home network', 'Smart home network', 'Mixed home network']
    },
    {
      id: 55,
      term: 'Work Network',
      definition: 'A network used in a business or organizational setting to connect computers and other devices.',
      category: 'Network Configuration and Location',
      examples: ['Corporate network', 'Office LAN', 'Business network', 'Enterprise network']
    },
    {
      id: 56,
      term: 'Public Network',
      definition: 'A network available for use by the general public, such as Wi-Fi hotspots in cafes or airports.',
      category: 'Network Configuration and Location',
      examples: ['Airport WiFi', 'Coffee shop network', 'Hotel WiFi', 'Public hotspot']
    },
    {
      id: 57,
      term: 'Domain Network',
      definition: 'A network where access is controlled by a central server, often used in business environments.',
      category: 'Network Configuration and Location',
      examples: ['Active Directory domain', 'Windows domain', 'Corporate domain', 'Managed network']
    },

    // NETWORK SHARING AND SECURITY CATEGORY
    {
      id: 58,
      term: 'File Sharing',
      definition: 'The practice of distributing or providing access to digital files over a network or the internet.',
      category: 'Network Sharing and Security',
      examples: ['Network file sharing', 'Cloud file sharing', 'P2P file sharing', 'FTP file sharing']
    },
    {
      id: 59,
      term: 'Printer Sharing',
      definition: 'Making a printer available for use by multiple computers on a network.',
      category: 'Network Sharing and Security',
      examples: ['Network printer', 'Shared local printer', 'Print server', 'Wireless printer sharing']
    },
    {
      id: 60,
      term: 'Network Security',
      definition: 'Measures taken to protect a network and its data from unauthorized access, misuse, or cyber threats.',
      category: 'Network Sharing and Security',
      examples: ['Firewall protection', 'Network encryption', 'Access control', 'Network monitoring']
    },
    {
      id: 61,
      term: 'Viruses',
      definition: 'A program that can copy itself and infect a computer without the user\'s consent, often with malicious intent.',
      category: 'Network Sharing and Security',
      examples: ['File virus', 'Boot virus', 'Macro virus', 'Network virus']
    },
    {
      id: 62,
      term: 'Firewall',
      definition: 'Security device that protects data and resources from an outside threat.',
      category: 'Network Sharing and Security',
      examples: ['Hardware firewall', 'Software firewall', 'Network firewall', 'Cloud firewall']
    },
    {
      id: 63,
      term: 'Application Layer Firewalls',
      definition: 'Controls app traffic based on policies.',
      category: 'Network Sharing and Security',
      examples: ['Web application firewall', 'Proxy firewall', 'Next-gen firewall', 'Layer 7 firewall']
    },
    {
      id: 64,
      term: 'Application Firewalls',
      definition: 'Manages app traffic, blocking or allowing based on rules.',
      category: 'Network Sharing and Security',
      examples: ['Application gateway', 'Proxy server', 'Application filter', 'Layer 7 filter']
    },
    {
      id: 65,
      term: 'Proxy Firewalls',
      definition: 'Intermediary that filters traffic, hiding internal network.',
      category: 'Network Sharing and Security',
      examples: ['Forward proxy', 'Reverse proxy', 'Transparent proxy', 'Web proxy']
    },
    {
      id: 66,
      term: 'Inbound Rules',
      definition: 'Rules for traffic entering the network.',
      category: 'Network Sharing and Security',
      examples: ['Allow inbound HTTP', 'Block inbound telnet', 'Allow inbound SSH', 'Block inbound FTP']
    },
    {
      id: 67,
      term: 'Outbound Rules',
      definition: 'Rules for traffic leaving the network.',
      category: 'Network Sharing and Security',
      examples: ['Allow outbound HTTPS', 'Block outbound P2P', 'Allow outbound DNS', 'Block outbound SMTP']
    },
    {
      id: 68,
      term: 'Connection Security Rules',
      definition: 'Rules that are used to secure the traffic between two computers.',
      category: 'Network Sharing and Security',
      examples: ['IPsec rules', 'VPN rules', 'Tunnel rules', 'Authentication rules']
    }
  ], []);

  useEffect(() => {
    // Load sample data
    setLoading(true);
    setTimeout(() => {
      setTerms(sampleTerms);
      const uniqueCategories = [...new Set(sampleTerms.map(term => term.category))];
      setCategories(uniqueCategories);
      setLoading(false);
    }, 500);
  }, [sampleTerms]);

  const toggleTerm = (termId) => {
    setExpandedTerms(prev => ({
      ...prev,
      [termId]: !prev[termId]
    }));
  };

  const filteredTerms = terms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         term.definition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastTerm = currentPage * termsPerPage;
  const indexOfFirstTerm = indexOfLastTerm - termsPerPage;
  const currentTerms = filteredTerms.slice(indexOfFirstTerm, indexOfLastTerm);
  const totalPages = Math.ceil(filteredTerms.length / termsPerPage);

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'Network Devices': return <Router className="w-5 h-5" />;
      case 'Client Devices': return <Monitor className="w-5 h-5" />;
      case 'Tools & Testing Devices': return <Shield className="w-5 h-5" />;
      case 'Network Cables, Connectors and Raceways': return <Network className="w-5 h-5" />;
      case 'Network Topology': return <Network className="w-5 h-5" />;
      case 'Network Configuration and Location': return <Router className="w-5 h-5" />;
      case 'Network Sharing and Security': return <Shield className="w-5 h-5" />;
      default: return <Network className="w-5 h-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-white mx-auto mb-4"></div>
          <p className="text-white text-xl font-semibold">Loading COC2 Reviewer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/reviewer-selection')}
            className="flex items-center text-white hover:text-blue-200 mb-6 transition"
          >
            <ArrowLeft size={24} />
            <span className="ml-2">Back to Reviewer Selection</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">COC 2 Reviewer</h1>
            <p className="text-xl text-blue-100">Advanced Computer Architecture & Networks</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-6 mb-8 border border-white border-opacity-20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
                <input
                  type="text"
                  placeholder="Search terms or definitions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="md:w-64">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              >
                <option value="" className="text-gray-800">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category} className="text-gray-800">
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Terms List */}
        <div className="space-y-4">
          {currentTerms.map(term => (
            <div key={term.id} className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-20 overflow-hidden">
              <button
                onClick={() => toggleTerm(term.id)}
                className="w-full px-6 py-4 text-left hover:bg-white hover:bg-opacity-5 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 bg-opacity-30 rounded-lg">
                      {getCategoryIcon(term.category)}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{term.term}</h3>
                      <p className="text-blue-200 text-sm">{term.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-500 bg-opacity-30 px-3 py-1 rounded-full text-xs text-blue-200">
                      {term.examples.length} examples
                    </span>
                    {expandedTerms[term.id] ? (
                      <ChevronUp className="text-white" size={20} />
                    ) : (
                      <ChevronDown className="text-white" size={20} />
                    )}
                  </div>
                </div>
              </button>
              
              {expandedTerms[term.id] && (
                <div className="px-6 pb-6 border-t border-white border-opacity-20">
                  <div className="pt-4">
                    <div className="mb-4">
                      <h4 className="text-lg font-semibold text-white mb-2">Definition:</h4>
                      <p className="text-blue-100 leading-relaxed">{term.definition}</p>
                    </div>
                    
                    {term.examples && term.examples.length > 0 && (
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-2">Examples:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {term.examples.map((example, index) => (
                            <div key={index} className="flex items-center gap-2 text-blue-100">
                              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                              <span>{example}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={20} />
            </button>
            
            <span className="text-white">
              Page {currentPage} of {totalPages}
            </span>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white hover:bg-opacity-30 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        )}

        {currentTerms.length === 0 && (
          <div className="text-center py-20">
            <BookOpen size={48} className="mx-auto text-white mb-4 opacity-50" />
            <p className="text-white text-lg">No terms found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default COC2;
