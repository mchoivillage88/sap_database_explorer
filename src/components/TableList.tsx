import { useState } from 'react';
import { Search, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { SAPTable } from '../types/sap-tables';
import { Badge } from './ui/badge';
import { getSizeInfo } from '../utils/size-utils';

interface TableListProps {
  tables: SAPTable[];
  selectedTable: string | null;
  onSelectTable: (tableName: string) => void;
  showMostImportantOnly: boolean;
  onToggleMostImportant: (checked: boolean) => void;
}

export function TableList({ tables, selectedTable, onSelectTable, showMostImportantOnly, onToggleMostImportant }: TableListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(tables.map(t => t.category))
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
  };

  const filteredTables = tables.filter(
    (table) =>
      table.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      table.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedTables = filteredTables.reduce((acc, table) => {
    if (!acc[table.category]) {
      acc[table.category] = [];
    }
    acc[table.category].push(table);
    return acc;
  }, {} as Record<string, SAPTable[]>);

  return (
    <div className="h-full flex flex-col bg-gray-50 border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-white">
        <h2 className="mb-3">SAP S/4HANA Tables</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-4" />
          <Input
            type="text"
            placeholder="Search tables..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        {/* Filter Checkbox */}
        <div className="mt-3 flex items-center gap-2">
          <Checkbox
            id="most-important"
            checked={showMostImportantOnly}
            onCheckedChange={onToggleMostImportant}
          />
          <label 
            htmlFor="most-important" 
            className="text-sm text-gray-700 cursor-pointer select-none"
          >
            Show most important tables only
          </label>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {Object.entries(groupedTables).map(([category, categoryTables]) => {
          const isExpanded = expandedCategories.has(category);
          
          return (
            <div key={category} className="mb-4">
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-2 py-1 hover:bg-gray-100 rounded transition-colors group"
              >
                <h3 className="text-xs text-gray-500 uppercase tracking-wider">
                  {category}
                </h3>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-400">
                    {categoryTables.length}
                  </span>
                  {isExpanded ? (
                    <ChevronDown className="size-4 text-gray-400 group-hover:text-gray-600" />
                  ) : (
                    <ChevronRight className="size-4 text-gray-400 group-hover:text-gray-600" />
                  )}
                </div>
              </button>
              
              {isExpanded && (
                <div className="space-y-1 mt-2">
                  {categoryTables.map((table) => {
                    const sizeInfo = table.typicalRecordCount ? getSizeInfo(table.typicalRecordCount) : null;
                    
                    return (
                      <button
                        key={table.name}
                        onClick={() => onSelectTable(table.name)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedTable === table.name
                            ? 'bg-blue-600 text-white shadow-sm'
                            : 'bg-white hover:bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <div className={selectedTable === table.name ? '' : 'text-blue-600'}>
                              {table.name}
                            </div>
                            <div className={`text-sm mt-1 ${
                              selectedTable === table.name ? 'text-blue-50' : 'text-gray-500'
                            }`}>
                              {table.description}
                            </div>
                            {table.typicalRecordCount && sizeInfo && (
                              <div className="flex items-center gap-1.5 mt-1.5">
                                <Badge 
                                  className={`${sizeInfo.color} text-white hover:${sizeInfo.color} text-xs px-1.5 py-0 h-5`}
                                >
                                  {sizeInfo.label}
                                </Badge>
                                <div className={`text-xs ${
                                  selectedTable === table.name ? 'text-blue-200' : 'text-gray-400'
                                }`}>
                                  {table.typicalRecordCount} records
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-1 text-xs flex-shrink-0">
                            {table.relationships.length > 0 && (
                              <span className={`px-2 py-0.5 rounded ${
                                selectedTable === table.name
                                  ? 'bg-blue-500 text-white'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {table.relationships.length} rels
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {filteredTables.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            No tables found matching "{searchTerm}"
          </div>
        )}
      </div>
    </div>
  );
}