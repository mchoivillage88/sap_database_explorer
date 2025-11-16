import { Database, Key, Link, Layers, BookOpen, Users, GitBranch, Lightbulb, Code } from 'lucide-react';
import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { SAPTable } from '../types/sap-tables';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { getSizeInfo } from '../utils/size-utils';
import { sampleRecords } from '../data/sample-records-data';
import { getFieldFormatExample } from '../utils/field-formats';
import { businessContextData } from '../data/business-context';
import { commonQueries } from '../data/common-queries';

// Lazy load ERDiagram component for better performance
const ERDiagram = lazy(() => import('./ERDiagram').then(module => ({ default: module.ERDiagram })));

interface TableDetailsProps {
  table: SAPTable;
  allTables: SAPTable[];
  onSelectTable: (tableName: string) => void;
}

export function TableDetails({ table, allTables, onSelectTable }: TableDetailsProps) {
  const [showMostImportantFieldsOnly, setShowMostImportantFieldsOnly] = useState(true);
  const [groupFieldsByType, setGroupFieldsByType] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Scroll to top whenever the table changes
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [table.name]);
  
  const relatedTables = allTables.filter((t) =>
    table.relationships.some((rel) => rel.targetTable === t.name)
  );

  // Filter fields based on tier
  const filteredFields = showMostImportantFieldsOnly
    ? table.fields.filter(field => field.tier === 1 || !field.tier)
    : table.fields;

  // Group fields by type
  const groupedFields = {
    primaryKeys: filteredFields.filter(f => f.isPrimaryKey),
    foreignKeys: filteredFields.filter(f => f.isForeignKey && !f.isPrimaryKey),
    indexes: filteredFields.filter(f => f.isCompositeIndex && !f.isPrimaryKey && !f.isForeignKey),
    other: filteredFields.filter(f => !f.isPrimaryKey && !f.isForeignKey && !f.isCompositeIndex)
  };

  const getFieldIcon = (field: typeof table.fields[0]) => {
    if (field.isPrimaryKey) {
      return <Key className="size-4 text-amber-600" />;
    }
    if (field.isForeignKey) {
      return <Link className="size-4 text-purple-600" />;
    }
    if (field.isCompositeIndex) {
      return <Layers className="size-4 text-blue-600" />;
    }
    return <Database className="size-4 text-gray-400" />;
  };

  const getFieldRowClass = (field: typeof table.fields[0]) => {
    if (field.isPrimaryKey) {
      return 'bg-amber-50 border-l-4 border-l-amber-500';
    }
    if (field.isForeignKey) {
      return 'bg-purple-50 border-l-4 border-l-purple-500';
    }
    if (field.isCompositeIndex) {
      return 'bg-blue-50 border-l-4 border-l-blue-500';
    }
    return 'bg-white hover:bg-gray-50';
  };

  return (
    <div className="h-full overflow-y-auto bg-white" ref={scrollContainerRef}>
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 p-6 shadow-sm z-10">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-blue-600">{table.name}</h1>
            <p className="text-gray-600 mt-2">{table.description}</p>
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <Badge variant="secondary">{table.category}</Badge>
              {table.typicalRecordCount && (
                <>
                  <Badge 
                    className={`${getSizeInfo(table.typicalRecordCount).color} text-white hover:${getSizeInfo(table.typicalRecordCount).color}`}
                  >
                    {getSizeInfo(table.typicalRecordCount).label}
                  </Badge>
                  <Badge variant="outline" className="text-gray-600">
                    {table.typicalRecordCount} records
                  </Badge>
                </>
              )}
            </div>
            {table.detailedDescription && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-900 leading-relaxed">
                  {table.detailedDescription}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Fields and Sample Records Section with Tabs */}
        <div className="bg-white rounded-lg border border-gray-200">
          <Tabs defaultValue="fields" className="w-full">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-center justify-between">
                <TabsList>
                  <TabsTrigger value="fields">Table Fields</TabsTrigger>
                  <TabsTrigger value="samples">Sample Records</TabsTrigger>
                  <TabsTrigger value="context">Business Context</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="most-important-fields"
                      checked={showMostImportantFieldsOnly}
                      onCheckedChange={setShowMostImportantFieldsOnly}
                    />
                    <label 
                      htmlFor="most-important-fields" 
                      className="text-sm text-gray-700 cursor-pointer select-none"
                    >
                      Show most important fields only
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="group-fields"
                      checked={groupFieldsByType}
                      onCheckedChange={setGroupFieldsByType}
                    />
                    <label 
                      htmlFor="group-fields" 
                      className="text-sm text-gray-700 cursor-pointer select-none"
                    >
                      Group by field type
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <TabsContent value="fields" className="m-0" forceMount>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left p-3 text-sm text-gray-600">Type</th>
                      <th className="text-left p-3 text-sm text-gray-600">Field Name</th>
                      <th className="text-left p-3 text-sm text-gray-600">Description</th>
                      <th className="text-left p-3 text-sm text-gray-600">Data Type</th>
                      <th className="text-left p-3 text-sm text-gray-600">Length</th>
                      <th className="text-left p-3 text-sm text-gray-600">Properties</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupFieldsByType ? (
                      <>
                        {/* Primary Keys Section */}
                        {groupedFields.primaryKeys.length > 0 && (
                          <>
                            <tr className="bg-amber-100">
                              <td colSpan={6} className="p-2 px-3">
                                <div className="flex items-center gap-2">
                                  <Key className="size-4 text-amber-700" />
                                  <span className="text-sm text-amber-900">Primary Keys ({groupedFields.primaryKeys.length})</span>
                                </div>
                              </td>
                            </tr>
                            {groupedFields.primaryKeys.map((field, index) => (
                              <tr
                                key={`pk-${field.name}-${index}`}
                                className={`${getFieldRowClass(field)} transition-colors`}
                              >
                                <td className="p-3">
                                  <div className="flex items-center justify-center">
                                    {getFieldIcon(field)}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                    {field.name}
                                  </code>
                                </td>
                                <td className="p-3 text-gray-700">{field.description}</td>
                                <td className="p-3">
                                  <span className="text-sm text-gray-600">{field.type}</span>
                                </td>
                                <td className="p-3 text-gray-600">{field.length || '-'}</td>
                                <td className="p-3">
                                  <div className="flex flex-wrap gap-1">
                                    {field.isPrimaryKey && (
                                      <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                        Primary Key
                                      </Badge>
                                    )}
                                    {field.isForeignKey && (
                                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                                        FK → {field.foreignKeyTable}
                                      </Badge>
                                    )}
                                    {field.isCompositeIndex && !field.isPrimaryKey && (
                                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                        Composite Index
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}

                        {/* Foreign Keys Section */}
                        {groupedFields.foreignKeys.length > 0 && (
                          <>
                            <tr className="bg-purple-100">
                              <td colSpan={6} className="p-2 px-3">
                                <div className="flex items-center gap-2">
                                  <Link className="size-4 text-purple-700" />
                                  <span className="text-sm text-purple-900">Foreign Keys ({groupedFields.foreignKeys.length})</span>
                                </div>
                              </td>
                            </tr>
                            {groupedFields.foreignKeys.map((field, index) => (
                              <tr
                                key={`fk-${field.name}-${index}`}
                                className={`${getFieldRowClass(field)} transition-colors`}
                              >
                                <td className="p-3">
                                  <div className="flex items-center justify-center">
                                    {getFieldIcon(field)}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                    {field.name}
                                  </code>
                                </td>
                                <td className="p-3 text-gray-700">{field.description}</td>
                                <td className="p-3">
                                  <span className="text-sm text-gray-600">{field.type}</span>
                                </td>
                                <td className="p-3 text-gray-600">{field.length || '-'}</td>
                                <td className="p-3">
                                  <div className="flex flex-wrap gap-1">
                                    {field.isForeignKey && (
                                      <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                                        FK → {field.foreignKeyTable}
                                      </Badge>
                                    )}
                                    {field.isCompositeIndex && !field.isPrimaryKey && (
                                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                        Composite Index
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}

                        {/* Composite Indexes Section */}
                        {groupedFields.indexes.length > 0 && (
                          <>
                            <tr className="bg-blue-100">
                              <td colSpan={6} className="p-2 px-3">
                                <div className="flex items-center gap-2">
                                  <Layers className="size-4 text-blue-700" />
                                  <span className="text-sm text-blue-900">Composite Indexes ({groupedFields.indexes.length})</span>
                                </div>
                              </td>
                            </tr>
                            {groupedFields.indexes.map((field, index) => (
                              <tr
                                key={`idx-${field.name}-${index}`}
                                className={`${getFieldRowClass(field)} transition-colors`}
                              >
                                <td className="p-3">
                                  <div className="flex items-center justify-center">
                                    {getFieldIcon(field)}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                    {field.name}
                                  </code>
                                </td>
                                <td className="p-3 text-gray-700">{field.description}</td>
                                <td className="p-3">
                                  <span className="text-sm text-gray-600">{field.type}</span>
                                </td>
                                <td className="p-3 text-gray-600">{field.length || '-'}</td>
                                <td className="p-3">
                                  <div className="flex flex-wrap gap-1">
                                    {field.isCompositeIndex && (
                                      <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                        Composite Index
                                      </Badge>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}

                        {/* Other Fields Section */}
                        {groupedFields.other.length > 0 && (
                          <>
                            <tr className="bg-gray-100">
                              <td colSpan={6} className="p-2 px-3">
                                <div className="flex items-center gap-2">
                                  <Database className="size-4 text-gray-700" />
                                  <span className="text-sm text-gray-900">Other Fields ({groupedFields.other.length})</span>
                                </div>
                              </td>
                            </tr>
                            {groupedFields.other.map((field, index) => (
                              <tr
                                key={`other-${field.name}-${index}`}
                                className={`${getFieldRowClass(field)} transition-colors`}
                              >
                                <td className="p-3">
                                  <div className="flex items-center justify-center">
                                    {getFieldIcon(field)}
                                  </div>
                                </td>
                                <td className="p-3">
                                  <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                    {field.name}
                                  </code>
                                </td>
                                <td className="p-3 text-gray-700">{field.description}</td>
                                <td className="p-3">
                                  <span className="text-sm text-gray-600">{field.type}</span>
                                </td>
                                <td className="p-3 text-gray-600">{field.length || '-'}</td>
                                <td className="p-3">
                                  <div className="flex flex-wrap gap-1">
                                    {/* Other fields typically don't have special badges */}
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </>
                        )}
                      </>
                    ) : (
                      /* Ungrouped display */
                      filteredFields.map((field, index) => (
                        <tr
                          key={`${field.name}-${index}`}
                          className={`${getFieldRowClass(field)} transition-colors`}
                        >
                          <td className="p-3">
                            <div className="flex items-center justify-center">
                              {getFieldIcon(field)}
                            </div>
                          </td>
                          <td className="p-3">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {field.name}
                            </code>
                          </td>
                          <td className="p-3 text-gray-700">{field.description}</td>
                          <td className="p-3">
                            <span className="text-sm text-gray-600">{field.type}</span>
                          </td>
                          <td className="p-3 text-gray-600">{field.length || '-'}</td>
                          <td className="p-3">
                            <div className="flex flex-wrap gap-1">
                              {field.isPrimaryKey && (
                                <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                  Primary Key
                                </Badge>
                              )}
                              {field.isForeignKey && (
                                <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                                  FK → {field.foreignKeyTable}
                                </Badge>
                              )}
                              {field.isCompositeIndex && !field.isPrimaryKey && (
                                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                  Composite Index
                                </Badge>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Legend */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">Legend:</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2">
                    <Key className="size-4 text-amber-600" />
                    <span className="text-sm text-gray-700">Primary Key (most important)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link className="size-4 text-purple-600" />
                    <span className="text-sm text-gray-700">Foreign Key (references other table)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Layers className="size-4 text-blue-600" />
                    <span className="text-sm text-gray-700">Composite Index (performance optimization)</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="samples" className="m-0" forceMount>
              {sampleRecords[table.name] && sampleRecords[table.name].length > 0 ? (
                <>
                  <div className="overflow-x-auto">
                    <TooltipProvider>
                      <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                          <tr>
                            {filteredFields.map((field) => (
                              <th key={field.name} className="text-left p-3 text-sm text-gray-600 whitespace-nowrap align-top">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <div className="flex flex-col gap-1 cursor-help">
                                      <div className="flex items-center gap-2">
                                        {getFieldIcon(field)}
                                        <code className="text-xs">{field.name}</code>
                                      </div>
                                      <div className="text-xs font-normal text-gray-400 max-w-[200px] whitespace-normal leading-tight">
                                        {field.description}
                                      </div>
                                    </div>
                                  </TooltipTrigger>
                                  <TooltipContent className="max-w-xs">
                                    <div className="space-y-2">
                                      <div>
                                        <p className="font-semibold text-sm">{field.name}</p>
                                        <p className="text-xs text-gray-300 mt-1">{field.description}</p>
                                      </div>
                                      <div className="pt-2 border-t border-gray-700">
                                        <div className="grid grid-cols-2 gap-2 text-xs">
                                          <div>
                                            <span className="text-gray-400">Type:</span>
                                            <span className="ml-1 text-white">{field.type}</span>
                                          </div>
                                          <div>
                                            <span className="text-gray-400">Length:</span>
                                            <span className="ml-1 text-white">{field.length || 'N/A'}</span>
                                          </div>
                                        </div>
                                        {getFieldFormatExample(field.name, field.type) && (
                                          <div className="mt-2 p-2 bg-blue-900 rounded border border-blue-700">
                                            <p className="text-xs text-blue-200">
                                              <span className="font-semibold">Format: </span>
                                              {getFieldFormatExample(field.name, field.type)}
                                            </p>
                                          </div>
                                        )}
                                      </div>
                                      {(field.isPrimaryKey || field.isForeignKey || field.isCompositeIndex) && (
                                        <div className="pt-2 border-t border-gray-700">
                                          <p className="text-xs text-gray-400 mb-1">Properties:</p>
                                          <div className="flex flex-wrap gap-1">
                                            {field.isPrimaryKey && (
                                              <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100 text-xs">
                                                Primary Key
                                              </Badge>
                                            )}
                                            {field.isForeignKey && (
                                              <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 text-xs">
                                                FK → {field.foreignKeyTable}
                                              </Badge>
                                            )}
                                            {field.isCompositeIndex && (
                                              <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 text-xs">
                                                Composite Index
                                              </Badge>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sampleRecords[table.name]?.map((record, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                              {filteredFields.map((field) => (
                                <td key={field.name} className="p-3 text-sm text-gray-700 whitespace-nowrap">
                                  <code className="text-xs">{record[field.name] || '-'}</code>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </TooltipProvider>
                  </div>
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      Showing {sampleRecords[table.name].length} sample record(s) with {filteredFields.length} field(s).
                      {showMostImportantFieldsOnly && ' (Displaying most important fields only - uncheck the filter to see all fields)'}
                    </p>
                  </div>
                </>
              ) : (
                <div className="p-8 text-center">
                  <Database className="size-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No sample records available for this table.</p>
                  <p className="text-sm text-gray-500 mt-1">Sample data is provided for educational purposes only.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="context" className="m-0" forceMount>
              {businessContextData[table.name] ? (
                <div className="p-6 space-y-6">
                  {/* SAP Modules */}
                  <div>
                    <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                      <Users className="size-5 text-blue-600" />
                      SAP Modules
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {businessContextData[table.name].modules.map((module, idx) => (
                        <Badge key={idx} className={`${module.color} hover:${module.color}`}>
                          {module.code} - {module.name}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Business Processes */}
                  <div>
                    <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                      <GitBranch className="size-5 text-purple-600" />
                      Business Processes
                    </h3>
                    <ul className="space-y-2">
                      {businessContextData[table.name].processes.map((process, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-purple-600 mt-0.5">•</span>
                          {process}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Real-World Scenarios */}
                  <div>
                    <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                      <Lightbulb className="size-5 text-amber-600" />
                      Real-World Scenarios
                    </h3>
                    <div className="space-y-3">
                      {businessContextData[table.name].scenarios.map((scenario, idx) => (
                        <div key={idx} className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                          <p className="text-sm text-amber-900 mb-1">{scenario.title}</p>
                          <p className="text-xs text-amber-800">{scenario.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* When to Use */}
                  <div>
                    <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                      <BookOpen className="size-5 text-green-600" />
                      When to Use This Table
                    </h3>
                    <ul className="space-y-2">
                      {businessContextData[table.name].whenToUse.map((use, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <span className="text-green-600 mt-0.5">✓</span>
                          {use}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Common Queries */}
                  {commonQueries[table.name] && commonQueries[table.name].length > 0 && (
                    <div>
                      <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                        <Code className="size-5 text-indigo-600" />
                        Common SQL Queries
                      </h3>
                      <div className="space-y-4">
                        {commonQueries[table.name].map((query, idx) => (
                          <div key={idx} className="bg-gray-900 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <p className="text-sm text-white">{query.title}</p>
                                <p className="text-xs text-gray-400 mt-1">{query.description}</p>
                              </div>
                              <Badge className={`${
                                query.category === 'Basic' ? 'bg-green-100 text-green-800' :
                                query.category === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              } hover:bg-opacity-100 shrink-0 ml-2`}>
                                {query.category}
                              </Badge>
                            </div>
                            <pre className="text-xs text-gray-300 overflow-x-auto mt-3 p-3 bg-gray-800 rounded border border-gray-700">
                              <code>{query.sql}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-8 text-center">
                  <Database className="size-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-600">No business context available for this table.</p>
                  <p className="text-sm text-gray-500 mt-1">Business context is provided for educational purposes only.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Relationships Section */}
        {table.relationships.length > 0 && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <h2 className="flex items-center gap-2">
                <Link className="size-5" />
                Related Tables
              </h2>
            </div>
            <div className="p-4">
              <div className="space-y-3">
                {table.relationships.map((rel, index) => (
                  <div
                    key={`${rel.targetTable}-${index}`}
                    className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <div className="mt-1">
                      {rel.type === 'one-to-one' && (
                        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                          1:1
                        </Badge>
                      )}
                      {rel.type === 'one-to-many' && (
                        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          1:N
                        </Badge>
                      )}
                      {rel.type === 'many-to-many' && (
                        <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">
                          N:M
                        </Badge>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onSelectTable(table.name)}
                          className="text-sm bg-white px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 hover:border-blue-300 transition-colors"
                        >
                          <code>{table.name}</code>
                        </button>
                        <span className="text-gray-400">→</span>
                        <button
                          onClick={() => onSelectTable(rel.targetTable)}
                          className="text-sm bg-white px-2 py-1 rounded border border-gray-200 hover:bg-gray-50 hover:border-blue-300 transition-colors"
                        >
                          <code>{rel.targetTable}</code>
                        </button>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{rel.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        via foreign key: <code className="bg-white px-1 py-0.5 rounded">{rel.foreignKey}</code>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ERD Diagram */}
        <Suspense fallback={
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-8">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mr-3"></div>
              <span className="text-gray-500">Loading diagram...</span>
            </div>
          </div>
        }>
          <ERDiagram table={table} relatedTables={relatedTables} allTables={allTables} onSelectTable={onSelectTable} />
        </Suspense>

        {/* Additional Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-blue-900 mb-2">About This Table</h3>
          <p className="text-sm text-blue-800">
            This table contains {table.fields.length} fields, with{' '}
            {table.fields.filter((f) => f.isPrimaryKey).length} primary key field(s),{' '}
            {table.fields.filter((f) => f.isForeignKey).length} foreign key field(s), and{' '}
            {table.relationships.length} relationship(s) to other tables.
          </p>
        </div>
      </div>
    </div>
  );
}