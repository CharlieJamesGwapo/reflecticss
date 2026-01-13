import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BookOpen, ChevronDown, ChevronUp, ArrowLeft, Search, ChevronLeft, ChevronRight } from 'lucide-react';

function Reviewer() {
  const { coc } = useParams();
  const navigate = useNavigate();
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedTerms, setExpandedTerms] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [termsPerPage] = useState(10);

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  useEffect(() => {
    fetchTerms();
  }, [coc]);

  const fetchTerms = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/api/coc${coc === 'coc1' ? '1' : coc === 'coc2' ? '2' : '3'}/terms`);
      if (!response.ok) throw new Error('Failed to fetch terms');
      const data = await response.json();
      setTerms(data || []);
      
      // Extract unique categories
      const uniqueCategories = [...new Set((data || []).map(term => term.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error('Error fetching terms:', err);
      setError('Failed to load terms');
    } finally {
      setLoading(false);
    }
  };

  const toggleTerm = (termId) => {
    setExpandedTerms(prev => ({
      ...prev,
      [termId]: !prev[termId]
    }));
  };

  const filteredTerms = terms.filter(term => {
    const termName = term.term_name || term.term;
    const definition = term.definition || (term.definitions && term.definitions[0] && term.definitions[0].definition);
    
    const matchesSearch = (termName && termName.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (definition && definition.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = !selectedCategory || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const indexOfLastTerm = currentPage * termsPerPage;
  const indexOfFirstTerm = indexOfLastTerm - termsPerPage;
  const currentTerms = filteredTerms.slice(indexOfFirstTerm, indexOfLastTerm);
  const totalPages = Math.ceil(filteredTerms.length / termsPerPage);

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);

  const groupedTerms = currentTerms.reduce((acc, term) => {
    if (!acc[term.category]) {
      acc[term.category] = [];
    }
    acc[term.category].push(term);
    return acc;
  }, {});

  const cocTitle = coc === 'coc1' ? 'COC 1' : coc === 'coc2' ? 'COC 2' : 'COC 3';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-4 px-2 sm:px-3 md:px-4 lg:px-6">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-4 sm:mb-6">
          <button
            onClick={() => navigate('/reviewer-selection')}
            className="flex items-center gap-1 text-blue-600 hover:text-blue-800 mb-3 transition text-xs sm:text-sm"
          >
            <ArrowLeft size={16} />
            <span>Back</span>
          </button>
          
          <div className="flex items-start gap-2 mb-4">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <BookOpen className="text-white" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-base sm:text-xl md:text-2xl font-bold text-blue-900 break-words leading-tight">{cocTitle} - Review</h1>
              <p className="text-xs text-gray-600 mt-0.5">Study and review all terms</p>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-2.5 py-1.5 text-xs sm:text-sm border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 transition"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
            <div className="bg-blue-50 border-l-4 border-blue-600 p-2 sm:p-3 rounded text-center">
              <p className="text-xs text-gray-600">Total</p>
              <p className="text-sm sm:text-lg font-bold text-blue-900">{terms.length}</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-2 sm:p-3 rounded text-center">
              <p className="text-xs text-gray-600">Match</p>
              <p className="text-sm sm:text-lg font-bold text-blue-900">{filteredTerms.length}</p>
            </div>
            <div className="bg-blue-50 border-l-4 border-blue-600 p-2 sm:p-3 rounded text-center">
              <p className="text-xs text-gray-600">Page</p>
              <p className="text-sm sm:text-lg font-bold text-blue-900">{currentPage}/{totalPages || 1}</p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-4 border-blue-600"></div>
            <p className="mt-4 text-blue-600 font-semibold">Loading terms...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded mb-6">
            <p className="text-red-800 font-semibold">{error}</p>
          </div>
        )}

        {/* Terms Display */}
        {!loading && !error && (
          <div className="space-y-3 sm:space-y-4">
            {Object.entries(groupedTerms).length > 0 ? (
              Object.entries(groupedTerms).map(([category, categoryTerms]) => (
                <div key={category} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                  {/* Category Header */}
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-3 sm:px-4 py-2 sm:py-3">
                    <h2 className="text-sm sm:text-lg font-bold text-white break-words">{category}</h2>
                    <p className="text-blue-100 text-xs mt-0.5">{categoryTerms.length} terms</p>
                  </div>

                  {/* Terms List */}
                  <div className="divide-y divide-gray-100">
                    {categoryTerms.map((term) => (
                      <div key={term.id} className="p-2.5 sm:p-3 hover:bg-blue-50 transition">
                        <button
                          onClick={() => toggleTerm(term.id)}
                          className="w-full text-left flex items-start justify-between gap-2 group"
                        >
                          <div className="flex-1 min-w-0">
                            <h3 className="text-xs sm:text-sm md:text-base font-bold text-blue-900 group-hover:text-blue-700 transition break-words leading-snug">
                              {term.term_name || term.term}
                            </h3>
                            {term.abbreviation && (
                              <p className="text-xs text-gray-500 mt-0.5">({term.abbreviation})</p>
                            )}
                          </div>
                          <div className="flex-shrink-0 text-blue-600 mt-0.5">
                            {expandedTerms[term.id] ? (
                              <ChevronUp size={18} />
                            ) : (
                              <ChevronDown size={18} />
                            )}
                          </div>
                        </button>

                        {/* Definition - Expandable */}
                        {expandedTerms[term.id] && (
                          <div className="mt-2 pt-2 border-t border-blue-100 animate-fadeIn">
                            {term.definition ? (
                              <div className="mb-2">
                                <p className="text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base">
                                  {term.definition}
                                </p>
                              </div>
                            ) : term.definitions && term.definitions.map((def, index) => (
                              <div key={def.id} className="mb-2">
                                <p className={`text-gray-700 leading-relaxed text-xs sm:text-sm md:text-base ${def.is_correct ? 'font-semibold text-green-700' : ''}`}>
                                  {def.definition}
                                </p>
                              </div>
                            ))}
                            
                            {/* Image Display */}
                            {term.image_url && (
                              <div className="mt-2 flex justify-center">
                                <img 
                                  src={term.image_url} 
                                  alt={term.term_name || term.term}
                                  className="max-w-full h-auto max-h-64 sm:max-h-80 md:max-h-96 rounded-lg shadow-sm border border-blue-200 hover:shadow-md transition object-contain"
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 bg-white rounded-lg border border-gray-100">
                <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-600 text-xs sm:text-sm">No terms found</p>
              </div>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        {!loading && !error && filteredTerms.length > 0 && totalPages > 1 && (
          <div className="mt-4 sm:mt-6 flex flex-col items-center gap-2 sm:gap-3">
            {/* Page Info */}
            <div className="text-center px-2">
              <p className="text-gray-600 text-xs">
                {indexOfFirstTerm + 1}-{Math.min(indexOfLastTerm, filteredTerms.length)} of {filteredTerms.length}
              </p>
            </div>

            {/* Pagination Buttons */}
            <div className="flex items-center gap-1 sm:gap-2 flex-wrap justify-center">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-0.5 px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft size={16} />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Page Numbers */}
              <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap justify-center">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded text-xs font-semibold transition ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="flex items-center gap-0.5 px-2 sm:px-3 py-1.5 text-xs sm:text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Reviewer;
