import { useState, useEffect, lazy, Suspense } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TableList } from './components/TableList';
import { GlossaryModal } from './components/GlossaryModal';
import { sapTables } from './data/sap-tables-data';
import { businessContextData } from './data/business-context';
import { Database, BookOpen, Github } from 'lucide-react';
import { Button } from './components/ui/button';

// Lazy load the TableDetails component for better performance
const TableDetails = lazy(() => import('./components/TableDetails').then(module => ({ default: module.TableDetails })));

export default function App() {
  const { tableName } = useParams<{ tableName?: string }>();
  const navigate = useNavigate();
  const selectedTableName = tableName || null;
  const [showMostImportantOnly, setShowMostImportantOnly] = useState(true);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  // Update document title, meta description, canonical URL, and structured data
  useEffect(() => {
    const baseUrl = 'https://mchoivillage88.github.io/sap_database_explorer';

    const updateMetaDescription = (content: string) => {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', content);
    };

    const updateCanonicalUrl = (url: string) => {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    };

    const updateStructuredData = (data: object) => {
      // Remove existing structured data
      const existingScript = document.querySelector('script[type="application/ld+json"]');
      if (existingScript) {
        existingScript.remove();
      }

      // Add new structured data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(data);
      document.head.appendChild(script);
    };

    if (selectedTableName) {
      const table = sapTables.find(t => t.name === selectedTableName);
      if (table) {
        const canonicalUrl = `${baseUrl}/${encodeURIComponent(table.name)}`;
        document.title = `${table.name} - ${table.description} | SAP S/4HANA Database Explorer`;

        // Create SEO-optimized description
        const fieldCount = table.fields?.length || 0;
        const relationshipCount = table.relationships?.length || 0;
        const description = `Explore SAP ${table.name} table (${table.description}). View ${fieldCount} fields, ${relationshipCount} relationships, ER diagram, sample data and common SQL queries for this SAP S/4HANA ${table.category} table.`;
        updateMetaDescription(description);
        updateCanonicalUrl(canonicalUrl);

        // Add structured data for table page with business context
        const businessContext = businessContextData[table.name];
        const structuredData: any = {
          "@context": "https://schema.org",
          "@type": "Dataset",
          "name": `SAP ${table.name} Table`,
          "description": description,
          "url": canonicalUrl,
          "keywords": `SAP, S/4HANA, ${table.name}, ${table.category}, database, table, ERP`,
          "about": {
            "@type": "Thing",
            "name": table.description
          },
          "isPartOf": {
            "@type": "WebSite",
            "name": "SAP S/4HANA Database Explorer",
            "url": baseUrl
          }
        };

        // Add business context if available
        if (businessContext) {
          structuredData.additionalType = businessContext.modules.map(m => m.name);
          structuredData.applicationCategory = "Enterprise Resource Planning";
          structuredData.applicationSubCategory = businessContext.modules.map(m => m.code).join(", ");
          structuredData.usageInfo = businessContext.whenToUse.join("; ");
        }

        updateStructuredData(structuredData);
      } else {
        document.title = 'SAP S/4HANA Database Explorer - Interactive Table Reference Guide';
        updateMetaDescription('Explore SAP S/4HANA database tables with interactive diagrams, field definitions, relationships, and sample queries. Comprehensive reference guide for SAP ERP developers and analysts.');
        updateCanonicalUrl(baseUrl);

        // Add structured data for home page
        updateStructuredData({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "SAP S/4HANA Database Explorer",
          "description": "Interactive guide to SAP S/4HANA database tables with ER diagrams and field definitions",
          "url": baseUrl,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${baseUrl}/{search_term_string}`,
            "query-input": "required name=search_term_string"
          }
        });
      }
    } else {
      document.title = 'SAP S/4HANA Database Explorer - Interactive Table Reference Guide';
      updateMetaDescription('Explore SAP S/4HANA database tables with interactive diagrams, field definitions, relationships, and sample queries. Comprehensive reference guide for SAP ERP developers and analysts.');
      updateCanonicalUrl(baseUrl);

      // Add structured data for home page
      updateStructuredData({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "SAP S/4HANA Database Explorer",
        "description": "Interactive guide to SAP S/4HANA database tables with ER diagrams and field definitions",
        "url": baseUrl,
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/{search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      });
    }
  }, [selectedTableName]);

  const setSelectedTableName = (tableName: string | null) => {
    if (tableName) {
      navigate(`/${encodeURIComponent(tableName)}`);
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
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsGlossaryOpen(true)}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white"
            >
              <BookOpen className="size-4 mr-2" />
              SAP Glossary
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20 hover:text-white"
              title="View source code on GitHub"
            >
              <a
                href="https://github.com/mchoivillage88/sap_database_explorer"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View source code on GitHub"
              >
                <Github className="size-5" />
              </a>
            </Button>
          </div>
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
            <Suspense fallback={
              <div className="h-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-500">Loading table details...</p>
                </div>
              </div>
            }>
              <TableDetails table={selectedTable} allTables={sapTables} onSelectTable={setSelectedTableName} />
            </Suspense>
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

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-3 px-4">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} SAP Database Explorer</span>
            <span className="text-gray-400">•</span>
            <a
              href="https://github.com/mchoivillage88/sap_database_explorer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700 hover:underline flex items-center gap-1"
            >
              <Github className="size-4" />
              View Source
            </a>
          </div>
          <div className="text-gray-500">
            Open Source • Contributions Welcome
          </div>
        </div>
      </footer>

      {/* Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}