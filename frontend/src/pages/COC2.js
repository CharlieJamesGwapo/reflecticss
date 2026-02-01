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
    {
      id: 1,
      term: 'Network Topology',
      definition: 'The physical or logical arrangement of nodes (computers, printers, etc.) in a network, including how they are connected and communicate with each other.',
      category: 'Network Topology',
      image: '/network.png',
      examples: ['Bus Topology', 'Star Topology', 'Ring Topology', 'Mesh Topology', 'Hybrid Topology']
    },
    {
      id: 2,
      term: 'Bus Topology',
      definition: 'A network topology where all devices are connected to a single central cable called the bus or backbone. Data travels along this cable and all devices receive it.',
      category: 'Network Topology',
      image: '/bus.png',
      examples: ['Early Ethernet networks', 'Simple office networks']
    },
    {
      id: 3,
      term: 'Star Topology',
      definition: 'A network topology where all devices are connected to a central hub or switch. Data passes through the central device to reach other devices.',
      category: 'Network Topology',
      image: '/star.png',
      examples: ['Modern Ethernet networks', 'Home networks', 'Office LANs']
    },
    {
      id: 4,
      term: 'Ring Topology',
      definition: 'A network topology where each device is connected to exactly two other devices, forming a single continuous pathway for signals through each node.',
      category: 'Network Topology',
      image: '/ring.png',
      examples: ['Token Ring networks', 'Fiber Distributed Data Interface (FDDI)']
    },
    {
      id: 5,
      term: 'Mesh Topology',
      definition: 'A network topology where devices are interconnected with many redundant interconnections between network nodes. In a fully connected mesh, each node is connected to every other node.',
      category: 'Network Topology',
      image: '/mesh.png',
      examples: ['Wireless networks', 'Internet backbone', 'Military networks']
    },
    {
      id: 6,
      term: 'Network Configuration',
      definition: 'The process of setting up a network\'s parameters, controls, and settings to ensure proper communication between devices and optimal network performance.',
      category: 'Network Configuration',
      image: '/config.png',
      examples: ['IP addressing', 'Subnet masking', 'DNS configuration', 'Gateway settings']
    },
    {
      id: 7,
      term: 'IP Address',
      definition: 'A unique numerical label assigned to each device connected to a computer network that uses the Internet Protocol for communication. Serves two main functions: host identification and location addressing.',
      category: 'Network Configuration',
      image: '/ip.png',
      examples: ['192.168.1.1 (IPv4)', '2001:0db8:85a3:0000:0000:8a2e:0370:7334 (IPv6)']
    },
    {
      id: 8,
      term: 'Subnet Mask',
      definition: 'A 32-bit number that masks an IP address and divides the IP address into network address and host address. Used to determine whether an IP address is on the local subnet or a remote network.',
      category: 'Network Configuration',
      image: '/subnet.png',
      examples: ['255.255.255.0', '255.255.0.0', '255.0.0.0']
    },
    {
      id: 9,
      term: 'Network Location Types',
      definition: 'Classification of network environments based on their security settings and accessibility, such as public, private, and domain networks.',
      category: 'Network Location Types',
      image: '/location.png',
      examples: ['Public Network', 'Private Network', 'Domain Network']
    },
    {
      id: 10,
      term: 'Public Network',
      definition: 'A network type with the highest level of security restrictions, typically used in public places like airports, coffee shops, and hotels where security cannot be guaranteed.',
      category: 'Network Location Types',
      image: '/public.png',
      examples: ['WiFi hotspots', 'Airport networks', 'Coffee shop networks']
    },
    {
      id: 11,
      term: 'Private Network',
      definition: 'A network type with moderate security settings, used for home or small office networks where you trust the other devices on the network.',
      category: 'Network Location Types',
      image: '/private.png',
      examples: ['Home networks', 'Small office networks', 'Trusted office environments']
    },
    {
      id: 12,
      term: 'Network Sharing',
      definition: 'The practice of allowing multiple users or devices to access and use network resources such as files, printers, internet connections, and other peripherals.',
      category: 'Network Sharing',
      image: '/sharing.png',
      examples: ['File sharing', 'Printer sharing', 'Internet connection sharing']
    },
    {
      id: 13,
      term: 'File Sharing',
      definition: 'The process of distributing or providing access to digitally stored information such as computer programs, multimedia files, documents, or electronic books.',
      category: 'Network Sharing',
      image: '/fileshare.png',
      examples: ['Network attached storage (NAS)', 'Windows file sharing', 'FTP servers']
    },
    {
      id: 14,
      term: 'Printer Sharing',
      definition: 'The ability for multiple computers on a network to use a single printer, reducing costs and improving efficiency in office environments.',
      category: 'Network Sharing',
      image: '/printer.png',
      examples: ['Network printers', 'Shared local printers', 'Print servers']
    },
    {
      id: 15,
      term: 'Network Security',
      definition: 'The practice of preventing and monitoring unauthorized access, misuse, modification, or denial of a computer network and network-accessible resources.',
      category: 'Network Security',
      image: '/security.png',
      examples: ['Firewalls', 'Encryption', 'Authentication', 'Access control']
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
      case 'Network Topology': return <Network className="w-5 h-5" />;
      case 'Network Configuration': return <Router className="w-5 h-5" />;
      case 'Network Location Types': return <Monitor className="w-5 h-5" />;
      case 'Network Sharing': return <FileText className="w-5 h-5" />;
      case 'Network Security': return <Shield className="w-5 h-5" />;
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
                    {term.image && (
                      <div className="mb-4">
                        <img 
                          src={term.image} 
                          alt={term.term}
                          className="w-full max-w-md mx-auto rounded-lg border border-white border-opacity-30"
                        />
                      </div>
                    )}
                    
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
