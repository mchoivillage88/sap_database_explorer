// Common SQL queries for each SAP table
export interface QueryExample {
  title: string;
  description: string;
  sql: string;
  category: 'Basic' | 'Intermediate' | 'Advanced';
}

export const commonQueries: Record<string, QueryExample[]> = {
  MARA: [
    {
      title: 'Find All Active Materials',
      description: 'Get all materials that are not marked for deletion',
      sql: `SELECT MATNR, MTART, MEINS, ERSDA
FROM MARA
WHERE LVORM IS NULL OR LVORM = ''
ORDER BY ERSDA DESC;`,
      category: 'Basic',
    },
    {
      title: 'List Materials by Type',
      description: 'Find all finished goods (FERT) materials',
      sql: `SELECT MATNR, MTART, MATKL, MEINS
FROM MARA
WHERE MTART = 'FERT'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'Recently Created Materials',
      description: 'Find materials created in the last 30 days',
      sql: `SELECT MATNR, MTART, MATKL, ERSDA, ERNAM
FROM MARA
WHERE ERSDA >= '20231017'  -- Replace with current date - 30
  AND MANDT = '100'
ORDER BY ERSDA DESC;`,
      category: 'Intermediate',
    },
    {
      title: 'Materials with Descriptions',
      description: 'Join with MAKT to get material descriptions',
      sql: `SELECT m.MATNR, m.MTART, t.MAKTX, m.MEINS
FROM MARA m
INNER JOIN MAKT t ON m.MATNR = t.MATNR
WHERE t.SPRAS = 'E'  -- English
  AND m.MANDT = '100'
  AND t.MANDT = '100';`,
      category: 'Intermediate',
    },
  ],

  KNA1: [
    {
      title: 'Find Customer by Number',
      description: 'Look up a specific customer',
      sql: `SELECT KUNNR, NAME1, LAND1, ORT01, STRAS
FROM KNA1
WHERE KUNNR = '0000100001'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'Customers by Country',
      description: 'Get all customers in a specific country',
      sql: `SELECT KUNNR, NAME1, ORT01, REGIO, PSTLZ
FROM KNA1
WHERE LAND1 = 'US'
  AND MANDT = '100'
ORDER BY NAME1;`,
      category: 'Basic',
    },
    {
      title: 'Active Customers with Contact Info',
      description: 'List active customers with phone numbers',
      sql: `SELECT KUNNR, NAME1, LAND1, ORT01, TELF1, SMTP_ADDR
FROM KNA1
WHERE (LOEVM IS NULL OR LOEVM = '')
  AND TELF1 IS NOT NULL
  AND MANDT = '100'
ORDER BY NAME1;`,
      category: 'Intermediate',
    },
    {
      title: 'Customer Count by Region',
      description: 'Analyze customer distribution by state/region',
      sql: `SELECT LAND1, REGIO, COUNT(*) as CUSTOMER_COUNT
FROM KNA1
WHERE MANDT = '100'
  AND (LOEVM IS NULL OR LOEVM = '')
GROUP BY LAND1, REGIO
ORDER BY CUSTOMER_COUNT DESC;`,
      category: 'Advanced',
    },
  ],

  LFA1: [
    {
      title: 'Find Vendor by Number',
      description: 'Look up vendor details',
      sql: `SELECT LIFNR, NAME1, LAND1, ORT01, STRAS
FROM LFA1
WHERE LIFNR = '0000100001'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'Vendors by Country',
      description: 'Get all vendors in specific countries',
      sql: `SELECT LIFNR, NAME1, LAND1, ORT01
FROM LFA1
WHERE LAND1 IN ('US', 'DE', 'GB')
  AND MANDT = '100'
ORDER BY LAND1, NAME1;`,
      category: 'Basic',
    },
    {
      title: 'Active Vendor List',
      description: 'List all active vendors with contact information',
      sql: `SELECT LIFNR, NAME1, SORTL, LAND1, TELF1
FROM LFA1
WHERE (LOEVM IS NULL OR LOEVM = '')
  AND (SPERR IS NULL OR SPERR = '')
  AND MANDT = '100'
ORDER BY NAME1;`,
      category: 'Intermediate',
    },
  ],

  VBAK: [
    {
      title: 'Find Sales Order by Number',
      description: 'Look up a specific sales order',
      sql: `SELECT VBELN, AUART, VKORG, KUNNR, AUDAT, NETWR, WAERK
FROM VBAK
WHERE VBELN = '0000012345'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'Open Orders for Customer',
      description: 'Find all open orders for a specific customer',
      sql: `SELECT VBELN, AUART, AUDAT, NETWR, WAERK
FROM VBAK
WHERE KUNNR = '0000100001'
  AND (ABSTK = '' OR ABSTK = 'A')  -- Not fully processed
  AND MANDT = '100'
ORDER BY AUDAT DESC;`,
      category: 'Intermediate',
    },
    {
      title: 'High Value Orders',
      description: 'Find orders above a certain value',
      sql: `SELECT v.VBELN, v.KUNNR, k.NAME1, v.AUDAT, v.NETWR, v.WAERK
FROM VBAK v
LEFT JOIN KNA1 k ON v.KUNNR = k.KUNNR AND v.MANDT = k.MANDT
WHERE v.NETWR > 10000
  AND v.WAERK = 'USD'
  AND v.MANDT = '100'
ORDER BY v.NETWR DESC;`,
      category: 'Advanced',
    },
    {
      title: 'Orders by Sales Org',
      description: 'Analyze order volume by sales organization',
      sql: `SELECT VKORG, AUART, COUNT(*) as ORDER_COUNT, SUM(NETWR) as TOTAL_VALUE
FROM VBAK
WHERE AUDAT >= '20231001'
  AND MANDT = '100'
GROUP BY VKORG, AUART
ORDER BY TOTAL_VALUE DESC;`,
      category: 'Advanced',
    },
  ],

  VBAP: [
    {
      title: 'Order Line Items',
      description: 'Get all line items for a sales order',
      sql: `SELECT VBELN, POSNR, MATNR, KWMENG, MEINS, NETWR, WAERK
FROM VBAP
WHERE VBELN = '0000012345'
  AND MANDT = '100'
ORDER BY POSNR;`,
      category: 'Basic',
    },
    {
      title: 'Material Sales Analysis',
      description: 'Find all orders containing a specific material',
      sql: `SELECT v.VBELN, v.POSNR, h.AUDAT, v.KWMENG, v.NETWR
FROM VBAP v
INNER JOIN VBAK h ON v.VBELN = h.VBELN AND v.MANDT = h.MANDT
WHERE v.MATNR = '000000000000100001'
  AND v.MANDT = '100'
ORDER BY h.AUDAT DESC;`,
      category: 'Intermediate',
    },
    {
      title: 'Top Selling Products',
      description: 'Identify best-selling materials by quantity',
      sql: `SELECT v.MATNR, m.MAKTX, SUM(v.KWMENG) as TOTAL_QTY, COUNT(*) as ORDER_COUNT
FROM VBAP v
INNER JOIN MAKT m ON v.MATNR = m.MATNR AND v.MANDT = m.MANDT
INNER JOIN VBAK h ON v.VBELN = h.VBELN AND v.MANDT = h.MANDT
WHERE h.AUDAT >= '20230101'
  AND m.SPRAS = 'E'
  AND v.MANDT = '100'
GROUP BY v.MATNR, m.MAKTX
ORDER BY TOTAL_QTY DESC
LIMIT 20;`,
      category: 'Advanced',
    },
  ],

  EKKO: [
    {
      title: 'Find Purchase Order',
      description: 'Look up a specific purchase order',
      sql: `SELECT EBELN, BSART, LIFNR, BEDAT, WAERS
FROM EKKO
WHERE EBELN = '4500012345'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'POs by Vendor',
      description: 'Find all purchase orders for a vendor',
      sql: `SELECT e.EBELN, e.BSART, e.BEDAT, l.NAME1
FROM EKKO e
LEFT JOIN LFA1 l ON e.LIFNR = l.LIFNR AND e.MANDT = l.MANDT
WHERE e.LIFNR = '0000100001'
  AND e.MANDT = '100'
ORDER BY e.BEDAT DESC;`,
      category: 'Intermediate',
    },
    {
      title: 'Open POs Awaiting Delivery',
      description: 'Find purchase orders not fully received',
      sql: `SELECT EBELN, LIFNR, BSART, BEDAT
FROM EKKO
WHERE (ELIKZ IS NULL OR ELIKZ = '')  -- Not fully delivered
  AND LOEKZ = ''  -- Not deleted
  AND MANDT = '100'
ORDER BY BEDAT;`,
      category: 'Intermediate',
    },
  ],

  EKPO: [
    {
      title: 'PO Line Items',
      description: 'Get all line items for a purchase order',
      sql: `SELECT EBELN, EBELP, MATNR, MENGE, MEINS, NETPR, WAERS
FROM EKPO
WHERE EBELN = '4500012345'
  AND MANDT = '100'
ORDER BY EBELP;`,
      category: 'Basic',
    },
    {
      title: 'Material Procurement History',
      description: 'Find all POs for a specific material',
      sql: `SELECT p.EBELN, p.EBELP, h.LIFNR, h.BEDAT, p.MENGE, p.NETPR
FROM EKPO p
INNER JOIN EKKO h ON p.EBELN = h.EBELN AND p.MANDT = h.MANDT
WHERE p.MATNR = '000000000000100001'
  AND p.MANDT = '100'
ORDER BY h.BEDAT DESC;`,
      category: 'Intermediate',
    },
  ],

  MSEG: [
    {
      title: 'Material Document Items',
      description: 'View all items in a material document',
      sql: `SELECT MBLNR, ZEILE, MATNR, BWART, MENGE, MEINS, WERKS, LGORT
FROM MSEG
WHERE MBLNR = '5000012345'
  AND MANDT = '100'
ORDER BY ZEILE;`,
      category: 'Basic',
    },
    {
      title: 'Goods Receipts for Material',
      description: 'Find all goods receipts (movement type 101) for a material',
      sql: `SELECT MBLNR, BUDAT, MENGE, MEINS, WERKS, EBELN
FROM MSEG
WHERE MATNR = '000000000000100001'
  AND BWART = '101'  -- Goods receipt for PO
  AND MANDT = '100'
ORDER BY BUDAT DESC;`,
      category: 'Intermediate',
    },
    {
      title: 'Movement Type Analysis',
      description: 'Analyze material movements by type',
      sql: `SELECT BWART, COUNT(*) as MOVEMENT_COUNT, SUM(MENGE) as TOTAL_QTY
FROM MSEG
WHERE MATNR = '000000000000100001'
  AND GJAHR = '2023'
  AND MANDT = '100'
GROUP BY BWART
ORDER BY MOVEMENT_COUNT DESC;`,
      category: 'Advanced',
    },
  ],

  BKPF: [
    {
      title: 'Find Accounting Document',
      description: 'Look up a specific accounting document',
      sql: `SELECT BELNR, GJAHR, BUKRS, BLART, BUDAT, WAERS, USNAM
FROM BKPF
WHERE BELNR = '1900000001'
  AND GJAHR = '2023'
  AND BUKRS = '1000'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'Documents by Posting Date',
      description: 'Find all documents posted on a specific date',
      sql: `SELECT BELNR, GJAHR, BLART, BUKRS, USNAM
FROM BKPF
WHERE BUDAT = '20231116'
  AND BUKRS = '1000'
  AND MANDT = '100'
ORDER BY BELNR;`,
      category: 'Basic',
    },
    {
      title: 'User Posting Activity',
      description: 'Analyze posting activity by user',
      sql: `SELECT USNAM, COUNT(*) as DOC_COUNT, MIN(BUDAT) as FIRST_POST, MAX(BUDAT) as LAST_POST
FROM BKPF
WHERE BUKRS = '1000'
  AND GJAHR = '2023'
  AND MANDT = '100'
GROUP BY USNAM
ORDER BY DOC_COUNT DESC;`,
      category: 'Advanced',
    },
  ],

  BSEG: [
    {
      title: 'Document Line Items',
      description: 'Get all line items for an accounting document',
      sql: `SELECT BELNR, BUZEI, BUKRS, HKONT, WRBTR, SHKZG, KOSTL, SGTXT
FROM BSEG
WHERE BELNR = '1900000001'
  AND GJAHR = '2023'
  AND BUKRS = '1000'
  AND MANDT = '100'
ORDER BY BUZEI;`,
      category: 'Basic',
    },
    {
      title: 'G/L Account Activity',
      description: 'View all postings to a specific G/L account',
      sql: `SELECT h.BUDAT, s.BELNR, s.BUZEI, s.WRBTR, s.SHKZG, s.SGTXT
FROM BSEG s
INNER JOIN BKPF h ON s.BELNR = h.BELNR 
  AND s.GJAHR = h.GJAHR 
  AND s.BUKRS = h.BUKRS 
  AND s.MANDT = h.MANDT
WHERE s.HKONT = '100000'
  AND s.GJAHR = '2023'
  AND s.BUKRS = '1000'
  AND s.MANDT = '100'
ORDER BY h.BUDAT DESC;`,
      category: 'Intermediate',
    },
    {
      title: 'Cost Center Expenses',
      description: 'Analyze expenses by cost center',
      sql: `SELECT s.KOSTL, SUM(s.WRBTR) as TOTAL_AMOUNT, COUNT(*) as LINE_COUNT
FROM BSEG s
WHERE s.GJAHR = '2023'
  AND s.BUKRS = '1000'
  AND s.KOSTL IS NOT NULL
  AND s.KOSTL <> ''
  AND s.MANDT = '100'
GROUP BY s.KOSTL
ORDER BY TOTAL_AMOUNT DESC;`,
      category: 'Advanced',
    },
  ],

  LIKP: [
    {
      title: 'Find Delivery Document',
      description: 'Look up a specific delivery',
      sql: `SELECT VBELN, LFART, KUNNR, WADAT_IST, LFDAT
FROM LIKP
WHERE VBELN = '0080012345'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'Deliveries by Customer',
      description: 'Find all deliveries for a customer',
      sql: `SELECT VBELN, LFART, WADAT_IST, LFDAT
FROM LIKP
WHERE KUNNR = '0000100001'
  AND MANDT = '100'
ORDER BY WADAT_IST DESC;`,
      category: 'Basic',
    },
  ],

  LIPS: [
    {
      title: 'Delivery Line Items',
      description: 'Get all items in a delivery',
      sql: `SELECT VBELN, POSNR, MATNR, LFIMG, MEINS, VGBEL
FROM LIPS
WHERE VBELN = '0080012345'
  AND MANDT = '100'
ORDER BY POSNR;`,
      category: 'Basic',
    },
  ],

  MAKT: [
    {
      title: 'Material Description Lookup',
      description: 'Get material description in English',
      sql: `SELECT MATNR, MAKTX
FROM MAKT
WHERE MATNR = '000000000000100001'
  AND SPRAS = 'E'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'Search Materials by Description',
      description: 'Find materials matching a description',
      sql: `SELECT MATNR, MAKTX
FROM MAKT
WHERE MAKTX LIKE '%PUMP%'
  AND SPRAS = 'E'
  AND MANDT = '100'
ORDER BY MAKTX;`,
      category: 'Basic',
    },
  ],

  MARC: [
    {
      title: 'Plant-Specific Material Data',
      description: 'Get material data for a specific plant',
      sql: `SELECT MATNR, WERKS, PLIFZ, BESKZ, SOBSL, MABST
FROM MARC
WHERE MATNR = '000000000000100001'
  AND WERKS = '1000'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'Safety Stock Analysis',
      description: 'Review safety stock levels across plants',
      sql: `SELECT WERKS, COUNT(*) as MATERIAL_COUNT, AVG(EISBE) as AVG_SAFETY_STOCK
FROM MARC
WHERE EISBE > 0
  AND MANDT = '100'
GROUP BY WERKS
ORDER BY AVG_SAFETY_STOCK DESC;`,
      category: 'Advanced',
    },
  ],

  MARD: [
    {
      title: 'Stock Levels by Location',
      description: 'Check stock at specific storage location',
      sql: `SELECT MATNR, WERKS, LGORT, LABST, INSME, SPEME
FROM MARD
WHERE MATNR = '000000000000100001'
  AND WERKS = '1000'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'Total Stock by Plant',
      description: 'Sum available stock across all storage locations',
      sql: `SELECT WERKS, SUM(LABST) as TOTAL_UNRESTRICTED, SUM(INSME) as TOTAL_QI
FROM MARD
WHERE MATNR = '000000000000100001'
  AND MANDT = '100'
GROUP BY WERKS;`,
      category: 'Intermediate',
    },
  ],

  VBRK: [
    {
      title: 'Find Billing Document',
      description: 'Look up invoice details',
      sql: `SELECT VBELN, FKART, KUNRG, FKDAT, NETWR, WAERK
FROM VBRK
WHERE VBELN = '0090012345'
  AND MANDT = '100';`,
      category: 'Basic',
    },
    {
      title: 'Customer Invoices',
      description: 'Find all invoices for a customer',
      sql: `SELECT VBELN, FKART, FKDAT, NETWR, WAERK
FROM VBRK
WHERE KUNRG = '0000100001'
  AND MANDT = '100'
ORDER BY FKDAT DESC;`,
      category: 'Basic',
    },
  ],

  VBRP: [
    {
      title: 'Invoice Line Items',
      description: 'Get all items in an invoice',
      sql: `SELECT VBELN, POSNR, MATNR, FKIMG, NETWR, WAERK
FROM VBRP
WHERE VBELN = '0090012345'
  AND MANDT = '100'
ORDER BY POSNR;`,
      category: 'Basic',
    },
  ],
};
