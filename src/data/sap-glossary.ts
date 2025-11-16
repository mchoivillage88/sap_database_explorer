// SAP terminology glossary for newcomers
export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'General' | 'Technical' | 'Module' | 'Field Type' | 'Process';
  relatedTerms?: string[];
  example?: string;
}

export const sapGlossary: GlossaryTerm[] = [
  // General SAP Terms
  {
    term: 'SAP ERP',
    definition: 'Enterprise Resource Planning software that integrates all business processes including finance, manufacturing, sales, and human resources into a single system.',
    category: 'General',
    example: 'SAP ERP helps companies manage their entire business from a unified platform.',
  },
  {
    term: 'Client (MANDT)',
    definition: 'A self-contained unit in SAP with separate master data and its own set of tables. Clients allow multiple independent business entities to exist in one SAP system.',
    category: 'General',
    relatedTerms: ['MANDT'],
    example: 'Client 100 might be production, while Client 200 is for testing.',
  },
  {
    term: 'Company Code (BUKRS)',
    definition: 'The smallest organizational unit for which a complete self-contained set of accounts can be drawn up for external reporting purposes. Represents a legal entity.',
    category: 'General',
    relatedTerms: ['BUKRS', 'T001'],
    example: 'Company Code 1000 might represent "ACME Corp USA".',
  },
  {
    term: 'Plant (WERKS)',
    definition: 'An organizational unit that divides an enterprise from the perspective of production, procurement, and materials planning. Can represent a manufacturing facility, warehouse, or distribution center.',
    category: 'General',
    relatedTerms: ['WERKS', 'T001W'],
    example: 'Plant 1000 = "New York Manufacturing", Plant 2000 = "California Warehouse".',
  },
  {
    term: 'Storage Location (LGORT)',
    definition: 'An organizational unit that differentiates between different stocks of material within a plant. Used to organize warehouse areas.',
    category: 'General',
    relatedTerms: ['LGORT', 'T001L'],
    example: 'LGORT 0001 = "Raw Materials", LGORT FG01 = "Finished Goods".',
  },

  // Module-Specific Terms
  {
    term: 'MM (Materials Management)',
    definition: 'SAP module that handles procurement, inventory management, and material master data. Covers the entire procure-to-pay process.',
    category: 'Module',
    relatedTerms: ['MARA', 'MARC', 'EKKO', 'EKPO'],
    example: 'MM module manages everything from purchase orders to goods receipt.',
  },
  {
    term: 'SD (Sales & Distribution)',
    definition: 'SAP module that manages the entire order-to-cash process including sales orders, deliveries, and billing.',
    category: 'Module',
    relatedTerms: ['VBAK', 'VBAP', 'LIKP', 'VBRK'],
    example: 'SD module handles customer orders from creation through invoice.',
  },
  {
    term: 'FI (Financial Accounting)',
    definition: 'SAP module that handles external accounting, including general ledger, accounts payable, and accounts receivable for legal financial reporting.',
    category: 'Module',
    relatedTerms: ['BKPF', 'BSEG', 'T001'],
    example: 'FI module manages all financial transactions and produces financial statements.',
  },
  {
    term: 'CO (Controlling)',
    definition: 'SAP module for internal cost accounting, including cost centers, profit centers, and internal orders for management reporting.',
    category: 'Module',
    relatedTerms: ['KOSTL', 'PRCTR', 'AUFNR'],
    example: 'CO module helps analyze profitability by product, customer, or business unit.',
  },
  {
    term: 'PP (Production Planning)',
    definition: 'SAP module that manages manufacturing processes, production orders, and capacity planning.',
    category: 'Module',
    relatedTerms: ['AFKO', 'MARC'],
    example: 'PP module schedules production orders and tracks manufacturing progress.',
  },

  // Master Data Terms
  {
    term: 'Material Master (MARA)',
    definition: 'Central repository of material information used across all SAP modules. Contains basic data like material type, base unit of measure, and material group.',
    category: 'General',
    relatedTerms: ['MATNR', 'MAKT', 'MARC'],
    example: 'Material 100001 might be "Industrial Water Pump - Model XYZ".',
  },
  {
    term: 'Material Number (MATNR)',
    definition: 'Unique identifier for a material in SAP. Typically 18 characters, often zero-padded (e.g., 000000000000100001).',
    category: 'Technical',
    relatedTerms: ['MARA', 'MAKT'],
    example: 'MATNR 000000000000100001 identifies a specific product.',
  },
  {
    term: 'Material Type (MTART)',
    definition: 'Classification of materials that controls which screens appear and which field values are mandatory during material master creation.',
    category: 'Technical',
    relatedTerms: ['MARA'],
    example: 'FERT = Finished Product, ROH = Raw Material, HALB = Semi-Finished.',
  },
  {
    term: 'Customer Master (KNA1)',
    definition: 'Central repository for customer data including name, address, and communication details.',
    category: 'General',
    relatedTerms: ['KUNNR', 'KNVV'],
    example: 'Customer master contains all information about "ACME Corporation".',
  },
  {
    term: 'Customer Number (KUNNR)',
    definition: 'Unique identifier for a customer in SAP. Typically 10 characters, zero-padded.',
    category: 'Technical',
    relatedTerms: ['KNA1', 'VBAK'],
    example: 'KUNNR 0000100001 identifies customer "ACME Corporation".',
  },
  {
    term: 'Vendor Master (LFA1)',
    definition: 'Central repository for vendor/supplier data including name, address, and payment information.',
    category: 'General',
    relatedTerms: ['LIFNR', 'EKKO'],
    example: 'Vendor master contains all information about supplier "ABC Supplies Ltd".',
  },
  {
    term: 'Vendor Number (LIFNR)',
    definition: 'Unique identifier for a vendor in SAP. Typically 10 characters, zero-padded.',
    category: 'Technical',
    relatedTerms: ['LFA1', 'EKKO'],
    example: 'LIFNR 0000100001 identifies vendor "ABC Supplies Ltd".',
  },

  // Transaction Documents
  {
    term: 'Sales Order (VBAK/VBAP)',
    definition: 'A customer request to deliver products or services. VBAK contains header data, VBAP contains line items.',
    category: 'General',
    relatedTerms: ['VBELN', 'SD'],
    example: 'Sales Order 12345 for customer ACME with 3 line items.',
  },
  {
    term: 'Sales Document Number (VBELN)',
    definition: 'Unique identifier for sales documents (orders, deliveries, invoices). Typically 10 characters.',
    category: 'Technical',
    relatedTerms: ['VBAK', 'VBAP', 'LIKP', 'VBRK'],
    example: 'VBELN 0000012345 identifies a sales order.',
  },
  {
    term: 'Purchase Order (EKKO/EKPO)',
    definition: 'A formal request to a vendor to supply materials or services. EKKO contains header, EKPO contains line items.',
    category: 'General',
    relatedTerms: ['EBELN', 'MM'],
    example: 'Purchase Order 4500012345 to vendor for raw materials.',
  },
  {
    term: 'Purchase Order Number (EBELN)',
    definition: 'Unique identifier for purchase orders. Typically 10 characters.',
    category: 'Technical',
    relatedTerms: ['EKKO', 'EKPO'],
    example: 'EBELN 4500012345 identifies a purchase order.',
  },
  {
    term: 'Material Document (MSEG)',
    definition: 'Records all goods movements (receipts, issues, transfers) in inventory. Each movement creates line items in MSEG.',
    category: 'General',
    relatedTerms: ['MBLNR', 'BWART'],
    example: 'Material Document 5000012345 records receipt of 100 units.',
  },
  {
    term: 'Material Document Number (MBLNR)',
    definition: 'Unique identifier for material documents. Typically 10 characters.',
    category: 'Technical',
    relatedTerms: ['MSEG'],
    example: 'MBLNR 5000012345 identifies a goods receipt.',
  },
  {
    term: 'Movement Type (BWART)',
    definition: 'Defines the type of goods movement (e.g., 101=Goods Receipt, 261=Goods Issue, 311=Transfer).',
    category: 'Technical',
    relatedTerms: ['MSEG'],
    example: 'BWART 101 = Goods Receipt for Purchase Order.',
  },
  {
    term: 'Accounting Document (BKPF/BSEG)',
    definition: 'Financial posting in SAP. BKPF contains header data, BSEG contains individual line items.',
    category: 'General',
    relatedTerms: ['BELNR', 'FI'],
    example: 'Accounting Document 1900000001 records an invoice payment.',
  },
  {
    term: 'Accounting Document Number (BELNR)',
    definition: 'Unique identifier for financial accounting documents. Typically 10 characters.',
    category: 'Technical',
    relatedTerms: ['BKPF', 'BSEG'],
    example: 'BELNR 1900000001 identifies a financial posting.',
  },
  {
    term: 'Fiscal Year (GJAHR)',
    definition: 'The year for which financial data is recorded. Used as part of the key for accounting documents.',
    category: 'Technical',
    relatedTerms: ['BKPF', 'BSEG'],
    example: 'GJAHR 2023 represents fiscal year 2023.',
  },

  // Field Types & Data
  {
    term: 'Primary Key',
    definition: 'Field(s) that uniquely identify each record in a table. No two records can have the same primary key value.',
    category: 'Technical',
    example: 'In MARA, the primary key is MANDT + MATNR.',
  },
  {
    term: 'Foreign Key',
    definition: 'A field that references the primary key of another table, creating a relationship between tables.',
    category: 'Technical',
    example: 'VBAK.KUNNR is a foreign key referencing KNA1.KUNNR.',
  },
  {
    term: 'Composite Index',
    definition: 'An index created on multiple fields together to improve query performance for searches using those fields.',
    category: 'Technical',
    example: 'Index on BKPF (BUKRS + BELNR + GJAHR) speeds up document lookups.',
  },
  {
    term: 'CHAR',
    definition: 'Character data type for text fields with a fixed length.',
    category: 'Field Type',
    example: 'MATNR is CHAR(18) - 18 character material number.',
  },
  {
    term: 'NUMC',
    definition: 'Numeric text - characters that are numeric but stored as text (no arithmetic operations).',
    category: 'Field Type',
    example: 'KUNNR is NUMC(10) - 10 digit customer number as text.',
  },
  {
    term: 'DATS',
    definition: 'Date field stored in YYYYMMDD format (e.g., 20231116 for November 16, 2023).',
    category: 'Field Type',
    example: 'ERDAT 20231116 represents November 16, 2023.',
  },
  {
    term: 'CURR',
    definition: 'Currency amount field, typically with 2 decimal places.',
    category: 'Field Type',
    relatedTerms: ['WAERK', 'CUKY'],
    example: 'NETWR 1234.56 USD represents $1,234.56.',
  },
  {
    term: 'QUAN',
    definition: 'Quantity field for amounts with a unit of measure.',
    category: 'Field Type',
    relatedTerms: ['MEINS', 'UNIT'],
    example: 'MENGE 100.000 EA represents 100 pieces.',
  },

  // Organizational Fields
  {
    term: 'Sales Organization (VKORG)',
    definition: 'Organizational unit responsible for the sale and distribution of products and services. Represents a sales channel or region.',
    category: 'General',
    relatedTerms: ['SD', 'TVKO'],
    example: 'VKORG 1000 = "US Sales", VKORG 2000 = "Europe Sales".',
  },
  {
    term: 'Distribution Channel (VTWEG)',
    definition: 'A channel through which products or services reach customers (e.g., wholesale, retail, direct).',
    category: 'General',
    relatedTerms: ['SD'],
    example: 'VTWEG 10 = "Wholesale", VTWEG 20 = "Retail".',
  },
  {
    term: 'Division (SPART)',
    definition: 'Product groups or product lines for sales and distribution.',
    category: 'General',
    relatedTerms: ['SD'],
    example: 'SPART 00 = "All Products", SPART 01 = "Electronics".',
  },
  {
    term: 'Purchasing Organization (EKORG)',
    definition: 'Organizational unit responsible for procurement activities. Can procure for one or multiple plants.',
    category: 'General',
    relatedTerms: ['MM', 'EKKO'],
    example: 'EKORG 1000 = "US Procurement", EKORG 2000 = "EU Procurement".',
  },

  // Common Fields
  {
    term: 'Created By (ERNAM)',
    definition: 'Username of the person who created the record.',
    category: 'Technical',
    example: 'ERNAM = "JSMITH" means user JSMITH created this record.',
  },
  {
    term: 'Created On (ERDAT/ERSDA)',
    definition: 'Date when the record was created in YYYYMMDD format.',
    category: 'Technical',
    example: 'ERDAT 20231116 means created on November 16, 2023.',
  },
  {
    term: 'Changed By (AENAM)',
    definition: 'Username of the person who last changed the record.',
    category: 'Technical',
    example: 'AENAM = "MJONES" means user MJONES last modified this record.',
  },
  {
    term: 'Changed On (AEDAT/LAEDA)',
    definition: 'Date when the record was last changed.',
    category: 'Technical',
    example: 'AEDAT 20231116 means last changed on November 16, 2023.',
  },
  {
    term: 'Deletion Flag (LVORM/LOEKZ)',
    definition: 'Indicator that marks a record for deletion. "X" means marked for deletion.',
    category: 'Technical',
    example: 'LVORM = "X" means this material is flagged for deletion.',
  },
  {
    term: 'Language Key (SPRAS)',
    definition: 'Two-character language code (EN=English, DE=German, ES=Spanish, etc.).',
    category: 'Technical',
    example: 'SPRAS = "E" or "EN" represents English language.',
  },
  {
    term: 'Currency Key (WAERK/WAERS)',
    definition: 'Three-character ISO currency code.',
    category: 'Technical',
    example: 'WAERK = "USD" for US Dollars, "EUR" for Euros.',
  },
  {
    term: 'Unit of Measure (MEINS)',
    definition: 'Base unit in which the material is managed (EA=Each, KG=Kilogram, L=Liter, etc.).',
    category: 'Technical',
    example: 'MEINS = "EA" means counted in pieces/each.',
  },

  // Business Processes
  {
    term: 'Order-to-Cash (O2C)',
    definition: 'The complete business process from receiving a customer order to collecting payment. Spans sales order, delivery, billing, and payment.',
    category: 'Process',
    relatedTerms: ['SD', 'VBAK', 'LIKP', 'VBRK'],
    example: 'O2C: Customer places order → Goods shipped → Invoice sent → Payment received.',
  },
  {
    term: 'Procure-to-Pay (P2P)',
    definition: 'The complete business process from identifying a need to purchase through paying the vendor. Spans requisition, PO, goods receipt, and payment.',
    category: 'Process',
    relatedTerms: ['MM', 'EKKO', 'MSEG', 'BKPF'],
    example: 'P2P: Need identified → PO created → Goods received → Invoice paid.',
  },
  {
    term: 'MRP (Material Requirements Planning)',
    definition: 'Automated planning process that calculates material requirements based on demand, inventory levels, and lead times.',
    category: 'Process',
    relatedTerms: ['MARC', 'PP'],
    example: 'MRP runs nightly to generate purchase requisitions for low stock items.',
  },
  {
    term: 'G/L Account (HKONT)',
    definition: 'General Ledger account number used to classify financial transactions for reporting.',
    category: 'Technical',
    relatedTerms: ['BSEG', 'FI'],
    example: 'HKONT 100000 might be "Cash Account", 400000 "Revenue Account".',
  },
  {
    term: 'Cost Center (KOSTL)',
    definition: 'Organizational unit used to collect and analyze costs for internal management reporting.',
    category: 'Technical',
    relatedTerms: ['BSEG', 'CO'],
    example: 'KOSTL "CC-1000" = "Marketing Department".',
  },
  {
    term: 'Profit Center (PRCTR)',
    definition: 'Organizational unit used to analyze profitability by business segment.',
    category: 'Technical',
    relatedTerms: ['BSEG', 'CO'],
    example: 'PRCTR "PC-1000" = "Consumer Electronics Division".',
  },
];
