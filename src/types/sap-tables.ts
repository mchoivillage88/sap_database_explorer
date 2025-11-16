export type FieldType = 'CHAR' | 'NUMC' | 'DATS' | 'CURR' | 'QUAN' | 'DEC' | 'INT' | 'CLNT';

export type RelationType = 'one-to-one' | 'one-to-many' | 'many-to-one' | 'many-to-many';

export interface Field {
  name: string;
  description: string;
  type: FieldType;
  length?: number;
  isPrimaryKey?: boolean;
  isForeignKey?: boolean;
  foreignKeyTable?: string;
  isCompositeIndex?: boolean;
  tier?: 1 | 2; // 1 = Most important fields, 2 = Additional important fields
}

export interface Relationship {
  targetTable: string;
  type: RelationType;
  description: string;
  foreignKey: string;
}

export interface SAPTable {
  name: string;
  description: string;
  detailedDescription?: string; // Longer paragraph explaining the table's purpose
  category: string;
  fields: Field[];
  relationships: Relationship[];
  tier?: 1 | 2; // 1 = Most important, 2 = Important but specialized
  typicalRecordCount?: string; // e.g., "100K-2M" for typical large SAP systems
}