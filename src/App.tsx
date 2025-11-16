import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { TableList } from './components/TableList';
import { TableDetails } from './components/TableDetails';
import { GlossaryModal } from './components/GlossaryModal';
import { sapTables } from './data/sap-tables-data';
import { Database, BookOpen } from 'lucide-react';
import { Button } from './components/ui/button';

export default function App() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const selectedTableName = searchParams.get('table');
  const [showMostImportantOnly, setShowMostImportantOnly] = useState(true);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const setSelectedTableName = (tableName: string | null) => {
    if (tableName) {
      navigate(`/?table=${encodeURIComponent(tableName)}`);
    } else {
      navigate('/');
    }
  };

  // Filter tables based on tier
  const filteredTables = showMostImportantOnly 
    ? sapTables.filter(table => table.tier === 1 || !table.tier)
    : sapTables;

  const selectedTable = sapTables.find((table) => table.name === selectedTableName);

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="size-8" />
            <div>
              <h1 className="text-white">SAP S/4HANA Database Explorer</h1>
              <p className="text-sm text-blue-100 mt-1">
                Interactive guide to key SAP ERP database tables and their relationships
              </p>
            </div>
          </div>
          <Button
            onClick={() => setIsGlossaryOpen(true)}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
          >
            <BookOpen className="size-4 mr-2" />
            SAP Glossary
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Table List */}
        <div className="w-[368px] flex-shrink-0">
          <TableList
            tables={filteredTables}
            selectedTable={selectedTableName}
            onSelectTable={setSelectedTableName}
            showMostImportantOnly={showMostImportantOnly}
            onToggleMostImportant={setShowMostImportantOnly}
          />
        </div>

        {/* Right Panel - Table Details */}
        <div className="flex-1 overflow-hidden">
          {selectedTable ? (
            <TableDetails table={selectedTable} allTables={sapTables} onSelectTable={setSelectedTableName} />
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-50">
              <div className="text-center max-w-md px-4">
                <Database className="size-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-gray-600 mb-2">
                  Select a Table to Get Started
                </h2>
                <p className="text-gray-500">
                  Choose a table from the list on the left to view its structure, fields,
                  relationships, and entity relationship diagram.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}