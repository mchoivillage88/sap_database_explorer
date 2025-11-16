// Business context data for SAP tables
export interface BusinessContext {
  modules: Array<{ code: string; name: string; color: string }>;
  processes: string[];
  scenarios: Array<{ title: string; description: string }>;
  whenToUse: string[];
}

export const businessContextData: Record<string, BusinessContext> = {
  MARA: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
      { code: 'PP', name: 'Production Planning', color: 'bg-blue-100 text-blue-800' },
      { code: 'SD', name: 'Sales & Distribution', color: 'bg-purple-100 text-purple-800' },
    ],
    processes: [
      'Material Master Data Management',
      'Procurement Planning',
      'Inventory Management',
      'Production Planning',
    ],
    scenarios: [
      {
        title: 'Product Catalog Management',
        description: 'Maintain master data for all materials sold or manufactured, including descriptions, base units, and material types.',
      },
      {
        title: 'New Product Introduction',
        description: 'Create material masters for new products being introduced to the catalog.',
      },
      {
        title: 'Inventory Analysis',
        description: 'Query material information to analyze inventory levels and product characteristics.',
      },
    ],
    whenToUse: [
      'Looking up basic material information',
      'Finding all materials of a specific type',
      'Validating material numbers before creating transactions',
      'Analyzing material master data quality',
    ],
  },
  
  MARC: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
      { code: 'PP', name: 'Production Planning', color: 'bg-blue-100 text-blue-800' },
    ],
    processes: [
      'Plant-Specific Material Planning',
      'MRP (Material Requirements Planning)',
      'Procurement Planning',
      'Production Scheduling',
    ],
    scenarios: [
      {
        title: 'Plant-Specific Planning',
        description: 'Manage material planning parameters that differ by manufacturing plant or distribution center.',
      },
      {
        title: 'Safety Stock Analysis',
        description: 'Review and adjust safety stock levels for materials at different locations.',
      },
      {
        title: 'MRP Run Analysis',
        description: 'Evaluate MRP results and planning parameters for materials at specific plants.',
      },
    ],
    whenToUse: [
      'Setting up plant-specific material data',
      'Running MRP analysis for specific locations',
      'Managing procurement strategies by plant',
      'Analyzing inventory planning parameters',
    ],
  },

  KNA1: {
    modules: [
      { code: 'SD', name: 'Sales & Distribution', color: 'bg-purple-100 text-purple-800' },
      { code: 'FI', name: 'Financial Accounting', color: 'bg-yellow-100 text-yellow-800' },
    ],
    processes: [
      'Customer Master Data Management',
      'Order-to-Cash Process',
      'Credit Management',
      'Customer Relationship Management',
    ],
    scenarios: [
      {
        title: 'Customer Onboarding',
        description: 'Create new customer master records when establishing relationships with new clients.',
      },
      {
        title: 'Customer Data Quality',
        description: 'Review and cleanse customer master data to ensure accurate billing and shipping.',
      },
      {
        title: 'Market Analysis',
        description: 'Analyze customer distribution by country, region, or industry for market segmentation.',
      },
    ],
    whenToUse: [
      'Looking up customer contact information',
      'Validating customer numbers in sales orders',
      'Analyzing customer base by geography',
      'Maintaining customer master data',
    ],
  },

  LFA1: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
      { code: 'FI', name: 'Financial Accounting', color: 'bg-yellow-100 text-yellow-800' },
    ],
    processes: [
      'Vendor Master Data Management',
      'Procure-to-Pay Process',
      'Vendor Payment Processing',
      'Supplier Relationship Management',
    ],
    scenarios: [
      {
        title: 'Vendor Onboarding',
        description: 'Set up new vendor master records when establishing supplier relationships.',
      },
      {
        title: 'Payment Run Preparation',
        description: 'Review vendor banking and payment information before processing payments.',
      },
      {
        title: 'Supplier Performance Analysis',
        description: 'Evaluate vendor base and identify potential consolidation opportunities.',
      },
    ],
    whenToUse: [
      'Creating purchase orders for vendors',
      'Processing vendor invoices and payments',
      'Analyzing supplier base by country or region',
      'Maintaining vendor contact information',
    ],
  },

  VBAK: {
    modules: [
      { code: 'SD', name: 'Sales & Distribution', color: 'bg-purple-100 text-purple-800' },
    ],
    processes: [
      'Order-to-Cash Process',
      'Sales Order Processing',
      'Order Fulfillment',
      'Revenue Recognition',
    ],
    scenarios: [
      {
        title: 'Daily Order Management',
        description: 'Monitor and manage incoming sales orders from customers.',
      },
      {
        title: 'Order Status Tracking',
        description: 'Check status of customer orders for customer service inquiries.',
      },
      {
        title: 'Sales Performance Analysis',
        description: 'Analyze order volumes, values, and trends by sales organization or region.',
      },
    ],
    whenToUse: [
      'Tracking sales order status',
      'Analyzing order backlog',
      'Monitoring sales performance by organization',
      'Investigating order-related issues',
    ],
  },

  VBAP: {
    modules: [
      { code: 'SD', name: 'Sales & Distribution', color: 'bg-purple-100 text-purple-800' },
    ],
    processes: [
      'Order Line Item Processing',
      'Order Fulfillment',
      'Delivery Planning',
      'Revenue Recognition',
    ],
    scenarios: [
      {
        title: 'Order Line Analysis',
        description: 'Review detailed line item information including materials, quantities, and pricing.',
      },
      {
        title: 'Product Sales Analysis',
        description: 'Analyze which products are being ordered most frequently.',
      },
      {
        title: 'Delivery Planning',
        description: 'Review open order items to plan shipments and deliveries.',
      },
    ],
    whenToUse: [
      'Viewing detailed order line items',
      'Analyzing product-level sales data',
      'Checking material availability for orders',
      'Planning deliveries based on order items',
    ],
  },

  EKKO: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
    ],
    processes: [
      'Procure-to-Pay Process',
      'Purchase Order Processing',
      'Vendor Management',
      'Procurement Operations',
    ],
    scenarios: [
      {
        title: 'Purchase Order Tracking',
        description: 'Monitor status of purchase orders placed with vendors.',
      },
      {
        title: 'Procurement Analytics',
        description: 'Analyze purchasing volumes and spending by vendor or purchasing organization.',
      },
      {
        title: 'Order Confirmation Management',
        description: 'Track which purchase orders have been confirmed by vendors.',
      },
    ],
    whenToUse: [
      'Checking PO status and approval workflow',
      'Analyzing purchasing spend by organization',
      'Managing vendor purchase orders',
      'Tracking procurement activities',
    ],
  },

  EKPO: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
    ],
    processes: [
      'Purchase Order Line Processing',
      'Goods Receipt Planning',
      'Invoice Verification',
      'Procurement Analytics',
    ],
    scenarios: [
      {
        title: 'Line Item Analysis',
        description: 'Review detailed information about materials and quantities being purchased.',
      },
      {
        title: 'Goods Receipt Planning',
        description: 'Plan incoming deliveries based on open PO items.',
      },
      {
        title: 'Material Procurement Analysis',
        description: 'Analyze which materials are being purchased most frequently.',
      },
    ],
    whenToUse: [
      'Viewing detailed PO line items',
      'Tracking material deliveries',
      'Analyzing procurement by material',
      'Verifying PO quantities and pricing',
    ],
  },

  LIKP: {
    modules: [
      { code: 'SD', name: 'Sales & Distribution', color: 'bg-purple-100 text-purple-800' },
      { code: 'LE', name: 'Logistics Execution', color: 'bg-orange-100 text-orange-800' },
    ],
    processes: [
      'Outbound Delivery Processing',
      'Shipping & Transportation',
      'Warehouse Management',
      'Order Fulfillment',
    ],
    scenarios: [
      {
        title: 'Shipment Tracking',
        description: 'Monitor deliveries being prepared and shipped to customers.',
      },
      {
        title: 'Shipping Schedule Management',
        description: 'Plan and manage daily shipping operations.',
      },
      {
        title: 'Delivery Performance Analysis',
        description: 'Analyze on-time delivery performance and shipping patterns.',
      },
    ],
    whenToUse: [
      'Tracking shipment status',
      'Managing daily shipping operations',
      'Analyzing delivery performance',
      'Coordinating with logistics providers',
    ],
  },

  LIPS: {
    modules: [
      { code: 'SD', name: 'Sales & Distribution', color: 'bg-purple-100 text-purple-800' },
      { code: 'LE', name: 'Logistics Execution', color: 'bg-orange-100 text-orange-800' },
    ],
    processes: [
      'Delivery Item Processing',
      'Picking & Packing',
      'Warehouse Operations',
      'Inventory Movement',
    ],
    scenarios: [
      {
        title: 'Pick List Generation',
        description: 'Review delivery items to create picking lists for warehouse operations.',
      },
      {
        title: 'Material Movement Tracking',
        description: 'Track which materials are being shipped to which customers.',
      },
      {
        title: 'Warehouse Performance',
        description: 'Analyze picking and shipping efficiency at the item level.',
      },
    ],
    whenToUse: [
      'Generating pick lists for warehouse',
      'Tracking item-level shipments',
      'Analyzing shipping volumes by material',
      'Managing warehouse operations',
    ],
  },

  MSEG: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
      { code: 'IM', name: 'Inventory Management', color: 'bg-teal-100 text-teal-800' },
    ],
    processes: [
      'Inventory Management',
      'Goods Movements',
      'Stock Transfers',
      'Physical Inventory',
    ],
    scenarios: [
      {
        title: 'Goods Receipt Posting',
        description: 'Record receipt of materials from vendors or production.',
      },
      {
        title: 'Inventory Transaction Audit',
        description: 'Review all material movements for auditing and reconciliation.',
      },
      {
        title: 'Movement Analysis',
        description: 'Analyze inventory movement patterns and frequencies.',
      },
    ],
    whenToUse: [
      'Tracking all material movements',
      'Auditing inventory transactions',
      'Analyzing goods receipt/issue patterns',
      'Investigating inventory discrepancies',
    ],
  },

  BKPF: {
    modules: [
      { code: 'FI', name: 'Financial Accounting', color: 'bg-yellow-100 text-yellow-800' },
      { code: 'CO', name: 'Controlling', color: 'bg-red-100 text-red-800' },
    ],
    processes: [
      'Financial Posting',
      'Period-End Closing',
      'Financial Reporting',
      'Audit Trail',
    ],
    scenarios: [
      {
        title: 'Journal Entry Review',
        description: 'Review and verify accounting document headers for financial postings.',
      },
      {
        title: 'Period-End Analysis',
        description: 'Analyze all postings made during a fiscal period for closing activities.',
      },
      {
        title: 'Audit Documentation',
        description: 'Provide audit trail of all financial transactions.',
      },
    ],
    whenToUse: [
      'Reviewing financial postings',
      'Period-end closing procedures',
      'Financial audit support',
      'Tracking document workflow status',
    ],
  },

  BSEG: {
    modules: [
      { code: 'FI', name: 'Financial Accounting', color: 'bg-yellow-100 text-yellow-800' },
      { code: 'CO', name: 'Controlling', color: 'bg-red-100 text-red-800' },
    ],
    processes: [
      'Line Item Accounting',
      'Account Analysis',
      'Financial Reporting',
      'Reconciliation',
    ],
    scenarios: [
      {
        title: 'G/L Account Analysis',
        description: 'Review detailed line items posted to general ledger accounts.',
      },
      {
        title: 'Vendor/Customer Account Reconciliation',
        description: 'Analyze open items and payments for vendor and customer accounts.',
      },
      {
        title: 'Cost Center Reporting',
        description: 'Track expenses by cost center for management reporting.',
      },
    ],
    whenToUse: [
      'Analyzing G/L account line items',
      'Reconciling vendor/customer accounts',
      'Cost center reporting and analysis',
      'Detailed financial transaction review',
    ],
  },

  MAKT: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
    ],
    processes: [
      'Material Description Management',
      'Multi-Language Support',
      'Product Information Management',
    ],
    scenarios: [
      {
        title: 'Product Descriptions',
        description: 'Maintain material descriptions in multiple languages for international operations.',
      },
      {
        title: 'Catalog Management',
        description: 'Ensure consistent product naming across different languages and regions.',
      },
    ],
    whenToUse: [
      'Looking up material descriptions',
      'Managing multi-language product catalogs',
      'Searching materials by description',
    ],
  },

  KNVV: {
    modules: [
      { code: 'SD', name: 'Sales & Distribution', color: 'bg-purple-100 text-purple-800' },
    ],
    processes: [
      'Sales Area Assignment',
      'Customer-Specific Pricing',
      'Sales Order Processing',
    ],
    scenarios: [
      {
        title: 'Sales Area Setup',
        description: 'Configure customer relationships with specific sales organizations and distribution channels.',
      },
      {
        title: 'Pricing Configuration',
        description: 'Set up customer-specific pricing and payment terms by sales area.',
      },
    ],
    whenToUse: [
      'Setting up sales area data for customers',
      'Managing customer-specific sales terms',
      'Configuring pricing and delivery parameters',
    ],
  },

  VBRK: {
    modules: [
      { code: 'SD', name: 'Sales & Distribution', color: 'bg-purple-100 text-purple-800' },
      { code: 'FI', name: 'Financial Accounting', color: 'bg-yellow-100 text-yellow-800' },
    ],
    processes: [
      'Billing Process',
      'Invoice Management',
      'Revenue Recognition',
      'Accounts Receivable',
    ],
    scenarios: [
      {
        title: 'Invoice Generation',
        description: 'Create customer invoices based on deliveries or services rendered.',
      },
      {
        title: 'Revenue Analysis',
        description: 'Analyze billing volumes and revenue by sales organization.',
      },
      {
        title: 'Invoice Status Tracking',
        description: 'Monitor invoice processing and accounting document creation.',
      },
    ],
    whenToUse: [
      'Tracking invoice status',
      'Analyzing revenue and billing',
      'Managing billing documents',
      'Revenue recognition processes',
    ],
  },

  VBRP: {
    modules: [
      { code: 'SD', name: 'Sales & Distribution', color: 'bg-purple-100 text-purple-800' },
    ],
    processes: [
      'Billing Line Items',
      'Revenue Detail Analysis',
      'Product Sales Tracking',
    ],
    scenarios: [
      {
        title: 'Invoice Line Detail',
        description: 'Review detailed billing information for materials and services.',
      },
      {
        title: 'Product Revenue Analysis',
        description: 'Analyze revenue by product or material at the line item level.',
      },
    ],
    whenToUse: [
      'Viewing detailed invoice line items',
      'Analyzing product-level revenue',
      'Tracking billing quantities and pricing',
    ],
  },

  MARD: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
      { code: 'WM', name: 'Warehouse Management', color: 'bg-cyan-100 text-cyan-800' },
    ],
    processes: [
      'Storage Location Management',
      'Inventory Management',
      'Stock Level Monitoring',
    ],
    scenarios: [
      {
        title: 'Stock Level Checking',
        description: 'Check available inventory quantities at specific storage locations.',
      },
      {
        title: 'Storage Location Analysis',
        description: 'Analyze inventory distribution across different warehouses and storage locations.',
      },
    ],
    whenToUse: [
      'Checking available stock at locations',
      'Planning stock transfers',
      'Analyzing inventory distribution',
    ],
  },

  T001: {
    modules: [
      { code: 'FI', name: 'Financial Accounting', color: 'bg-yellow-100 text-yellow-800' },
    ],
    processes: [
      'Company Code Configuration',
      'Financial Organizational Structure',
      'Multi-Company Reporting',
    ],
    scenarios: [
      {
        title: 'Legal Entity Setup',
        description: 'Configure company codes representing legal entities for financial reporting.',
      },
      {
        title: 'Multi-Company Operations',
        description: 'Manage financial data for multiple legal entities within one SAP system.',
      },
    ],
    whenToUse: [
      'Setting up new legal entities',
      'Multi-company reporting and analysis',
      'Understanding organizational structure',
    ],
  },

  T001W: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
      { code: 'PP', name: 'Production Planning', color: 'bg-blue-100 text-blue-800' },
    ],
    processes: [
      'Plant Configuration',
      'Manufacturing Site Management',
      'Distribution Center Setup',
    ],
    scenarios: [
      {
        title: 'Plant Master Data',
        description: 'Configure manufacturing plants or distribution centers.',
      },
      {
        title: 'Multi-Site Operations',
        description: 'Manage operations across multiple manufacturing or distribution locations.',
      },
    ],
    whenToUse: [
      'Setting up new plants or warehouses',
      'Understanding organizational locations',
      'Multi-site planning and operations',
    ],
  },

  T001L: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
      { code: 'WM', name: 'Warehouse Management', color: 'bg-cyan-100 text-cyan-800' },
    ],
    processes: [
      'Storage Location Configuration',
      'Warehouse Organization',
      'Inventory Segmentation',
    ],
    scenarios: [
      {
        title: 'Storage Location Setup',
        description: 'Configure different storage areas within plants (e.g., raw materials, finished goods).',
      },
      {
        title: 'Inventory Organization',
        description: 'Organize inventory into logical storage areas for better management.',
      },
    ],
    whenToUse: [
      'Setting up storage locations',
      'Understanding warehouse organization',
      'Planning inventory segregation',
    ],
  },

  TVKO: {
    modules: [
      { code: 'SD', name: 'Sales & Distribution', color: 'bg-purple-100 text-purple-800' },
    ],
    processes: [
      'Sales Organization Configuration',
      'Sales Structure Setup',
      'Regional Sales Management',
    ],
    scenarios: [
      {
        title: 'Sales Org Setup',
        description: 'Configure sales organizations for different regions or business units.',
      },
      {
        title: 'Sales Structure Design',
        description: 'Design organizational structure for sales operations.',
      },
    ],
    whenToUse: [
      'Setting up sales organizations',
      'Understanding sales structure',
      'Regional sales configuration',
    ],
  },

  EKORG: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
    ],
    processes: [
      'Purchasing Organization Configuration',
      'Procurement Structure Setup',
      'Vendor Relationship Management',
    ],
    scenarios: [
      {
        title: 'Purchasing Org Setup',
        description: 'Configure purchasing organizations for different regions or business units.',
      },
      {
        title: 'Procurement Structure',
        description: 'Design organizational structure for procurement operations.',
      },
    ],
    whenToUse: [
      'Setting up purchasing organizations',
      'Understanding procurement structure',
      'Regional procurement configuration',
    ],
  },

  MAKT_EXTENDED: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
    ],
    processes: [
      'Material Description Management',
      'Multi-Language Support',
    ],
    scenarios: [
      {
        title: 'Description Management',
        description: 'Maintain material descriptions in various languages.',
      },
    ],
    whenToUse: [
      'Looking up translated material descriptions',
      'Managing product catalogs',
    ],
  },

  EBAN: {
    modules: [
      { code: 'MM', name: 'Materials Management', color: 'bg-green-100 text-green-800' },
    ],
    processes: [
      'Purchase Requisition Management',
      'Procurement Planning',
      'Material Request Processing',
    ],
    scenarios: [
      {
        title: 'Requisition Processing',
        description: 'Manage internal requests for materials before creating purchase orders.',
      },
      {
        title: 'Approval Workflow',
        description: 'Track requisition approvals and conversion to purchase orders.',
      },
    ],
    whenToUse: [
      'Managing purchase requisitions',
      'Tracking approval workflows',
      'Converting requisitions to POs',
    ],
  },

  AFKO: {
    modules: [
      { code: 'PP', name: 'Production Planning', color: 'bg-blue-100 text-blue-800' },
    ],
    processes: [
      'Production Order Management',
      'Manufacturing Execution',
      'Shop Floor Control',
    ],
    scenarios: [
      {
        title: 'Production Scheduling',
        description: 'Plan and schedule manufacturing orders for products.',
      },
      {
        title: 'Shop Floor Management',
        description: 'Track production order status and progress.',
      },
    ],
    whenToUse: [
      'Managing production orders',
      'Scheduling manufacturing',
      'Tracking production progress',
    ],
  },
};
