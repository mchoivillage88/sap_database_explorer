// Field format examples to help users understand expected data formats
export const getFieldFormatExample = (fieldName: string, fieldType: string): string | null => {
  // Specific field examples
  const specificExamples: Record<string, string> = {
    // Material fields
    'MATNR': '000000000000100001 (18-char padded)',
    'EAN11': '12345678901 (11-digit barcode)',
    'BISMT': 'OLD-MAT-123',
    'MEINS': 'EA, KG, L (unit of measure)',
    'MTART': 'FERT, HALB, ROH (material type)',
    'MATKL': 'PROD-001',
    
    // Customer fields
    'KUNNR': '0000100001 (10-char padded)',
    'NAME1': 'ACME Corporation',
    'SORTL': 'ACME',
    'LAND1': 'US, DE, GB (ISO country)',
    'ORT01': 'New York',
    'PSTLZ': '10001',
    'REGIO': 'NY, CA, TX (state/region)',
    'STRAS': '123 Main Street',
    'TELF1': '+1-555-0100',
    
    // Vendor fields
    'LIFNR': '0000100001 (10-char padded)',
    
    // Sales order fields
    'VBELN': '0000012345 (10-char padded)',
    'POSNR': '000010 (6-char line item)',
    'AUART': 'OR, TA, ZOR (order type)',
    'VKORG': '1000, 2000 (sales org)',
    'VTWEG': '10, 20 (distribution channel)',
    'SPART': '00, 01 (division)',
    'VKGRP': 'SALES1, SALES2',
    'VKBUR': 'OFFICE1',
    'WAERK': 'USD, EUR, GBP (currency)',
    
    // Purchase order fields
    'EBELN': '4500012345 (10-char)',
    'EBELP': '00010 (5-char line item)',
    'BSART': 'NB, UB (doc type)',
    'EKORG': '1000, 2000 (purch org)',
    'EKGRP': 'PUR1, PUR2 (purch group)',
    'WERKS': '1000, 2000 (plant)',
    
    // Material document fields
    'MBLNR': '5000012345 (10-char)',
    'ZEILE': '0001 (4-char item)',
    'BWART': '101, 501, 311 (movement type)',
    'LGORT': '0001, FG01 (storage location)',
    
    // Financial fields
    'BELNR': '1900000001 (10-char)',
    'GJAHR': '2023, 2024 (fiscal year)',
    'BUZEI': '001, 002 (line item)',
    'BUKRS': '1000, 2000 (company code)',
    'HKONT': '100000 (G/L account)',
    'KOSTL': 'CC-1000 (cost center)',
    'PRCTR': 'PC-1000 (profit center)',
    'AUFNR': 'ORD-12345 (internal order)',
    'WRBTR': '1234.56 (amount)',
    'DMBTR': '1234.56 (local currency)',
    'SGTXT': 'Invoice payment',
    
    // Common fields
    'MANDT': '100, 200, 800 (client)',
    'ERNAM': 'JSMITH, AJONES (username)',
    'AENAM': 'MJOHNSON (changed by)',
    'SPRAS': 'EN, DE, FR (language)',
    'LVORM': 'X (deletion flag)',
    'LOEKZ': 'X (deletion indicator)',
  };

  if (specificExamples[fieldName]) {
    return specificExamples[fieldName];
  }

  // Generic type-based examples
  const typeExamples: Record<string, string> = {
    'DATS': 'YYYYMMDD (e.g., 20231116)',
    'TIMS': 'HHMMSS (e.g., 143022)',
    'CURR': '1234.56 (2 decimals)',
    'QUAN': '123.456 (3 decimals)',
    'NUMC': 'Numeric text (e.g., 001234)',
    'CLNT': '100, 200, 800',
    'LANG': 'EN, DE, ES, FR',
    'CUKY': 'USD, EUR, JPY, GBP',
    'UNIT': 'EA, KG, L, M',
  };

  return typeExamples[fieldType] || null;
};
