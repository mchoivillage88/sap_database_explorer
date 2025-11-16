import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useState, useMemo } from 'react';
import { sapGlossary, GlossaryTerm } from '../data/sap-glossary';
import { Search, BookOpen } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GlossaryModal({ isOpen, onClose }: GlossaryModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'General', 'Technical', 'Module', 'Field Type', 'Process'];

  const categoryColors: Record<string, string> = {
    'General': 'bg-blue-100 text-blue-800',
    'Technical': 'bg-purple-100 text-purple-800',
    'Module': 'bg-green-100 text-green-800',
    'Field Type': 'bg-orange-100 text-orange-800',
    'Process': 'bg-pink-100 text-pink-800',
  };

  const filteredTerms = useMemo(() => {
    return sapGlossary.filter(term => {
      const matchesSearch = searchTerm === '' || 
        term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
        term.definition.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || term.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] sm:max-w-4xl max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="size-5" />
            SAP Terminology Glossary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search terms or definitions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Results */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {filteredTerms.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <BookOpen className="size-12 mx-auto mb-3 text-gray-300" />
                <p>No terms found matching your search.</p>
              </div>
            ) : (
              filteredTerms.map((term, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-gray-900">{term.term}</h3>
                    <Badge className={`${categoryColors[term.category]} hover:${categoryColors[term.category]} shrink-0`}>
                      {term.category}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">{term.definition}</p>
                  
                  {term.example && (
                    <div className="mt-2 p-2 bg-blue-50 rounded border border-blue-200">
                      <p className="text-xs text-blue-900">
                        <span className="font-semibold">Example: </span>
                        {term.example}
                      </p>
                    </div>
                  )}
                  
                  {term.relatedTerms && term.relatedTerms.length > 0 && (
                    <div className="mt-2 flex items-center gap-2 flex-wrap">
                      <span className="text-xs text-gray-500">Related:</span>
                      {term.relatedTerms.map((relatedTerm, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="text-xs"
                        >
                          {relatedTerm}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              Showing {filteredTerms.length} of {sapGlossary.length} terms
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}