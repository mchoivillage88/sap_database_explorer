import { SAPTable, Relationship } from '../types/sap-tables';
import { Badge } from './ui/badge';
import { getSizeInfo } from '../utils/size-utils';
import { useIsMobile } from './ui/use-mobile';

interface ERDiagramProps {
  table: SAPTable;
  relatedTables: SAPTable[];
  allTables: SAPTable[];
  onSelectTable: (tableName: string) => void;
}

export function ERDiagram({ table, relatedTables, allTables, onSelectTable }: ERDiagramProps) {
  const isMobile = useIsMobile();
  const centerX = 400;
  const centerY = 250;
  const radius = 210; // Spacing between center and related tables
  const mainBoxWidth = 180;
  const mainBoxHeight = 80;
  const relatedBoxWidth = 160;
  const relatedBoxHeight = 70;

  const getRelationshipColor = (type: Relationship['type']) => {
    switch (type) {
      case 'one-to-one':
        return '#10b981'; // green
      case 'one-to-many':
        return '#3b82f6'; // blue
      case 'many-to-one':
        return '#3b82f6'; // blue
      case 'many-to-many':
        return '#a855f7'; // purple
    }
  };

  // Draw a bar (perpendicular line) at the specified point
  const drawBar = (x: number, y: number, angle: number, color: string) => {
    const barLength = 10;
    const perpAngle = angle + Math.PI / 2;
    
    const x1 = x + Math.cos(perpAngle) * barLength;
    const y1 = y + Math.sin(perpAngle) * barLength;
    const x2 = x - Math.cos(perpAngle) * barLength;
    const y2 = y - Math.sin(perpAngle) * barLength;
    
    return (
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="2"
      />
    );
  };

  // Draw a single direction arrow at the specified point
  const drawArrow = (x: number, y: number, angle: number, color: string) => {
    const arrowLength = 10;
    const arrowAngle = 0.5; // radians for arrow spread
    
    // Arrow points in the direction of 'angle'
    const line1X = x - Math.cos(angle + arrowAngle) * arrowLength;
    const line1Y = y - Math.sin(angle + arrowAngle) * arrowLength;
    const line2X = x - Math.cos(angle - arrowAngle) * arrowLength;
    const line2Y = y - Math.sin(angle - arrowAngle) * arrowLength;
    
    return (
      <g>
        <line x1={x} y1={y} x2={line1X} y2={line1Y} stroke={color} strokeWidth="2" />
        <line x1={x} y1={y} x2={line2X} y2={line2Y} stroke={color} strokeWidth="2" />
      </g>
    );
  };

  // Draw crow's foot notation - perpendicular bar at box edge with three spreading lines
  const drawCrowsFoot = (boxEdgeX: number, boxEdgeY: number, angle: number, color: string) => {
    const barLength = 10;
    const perpAngle = angle + Math.PI / 2;
    
    const barX1 = boxEdgeX + Math.cos(perpAngle) * barLength;
    const barY1 = boxEdgeY + Math.sin(perpAngle) * barLength;
    const barX2 = boxEdgeX - Math.cos(perpAngle) * barLength;
    const barY2 = boxEdgeY - Math.sin(perpAngle) * barLength;
    
    const arrowLength = 12;
    const arrowSpread = 0.4; // radians
    
    const line1Angle = angle + Math.PI + arrowSpread;
    const line2Angle = angle + Math.PI;
    const line3Angle = angle + Math.PI - arrowSpread;
    
    return (
      <g>
        <line
          x1={barX1}
          y1={barY1}
          x2={barX1 + Math.cos(line1Angle) * arrowLength}
          y2={barY1 + Math.sin(line1Angle) * arrowLength}
          stroke={color}
          strokeWidth="2"
        />
        <line
          x1={barX1}
          y1={barY1}
          x2={barX1 + Math.cos(line2Angle) * arrowLength}
          y2={barY1 + Math.sin(line2Angle) * arrowLength}
          stroke={color}
          strokeWidth="2"
        />
        <line
          x1={barX1}
          y1={barY1}
          x2={barX1 + Math.cos(line3Angle) * arrowLength}
          y2={barY1 + Math.sin(line3Angle) * arrowLength}
          stroke={color}
          strokeWidth="2"
        />
      </g>
    );
  };

  const getTableDescription = (tableName: string) => {
    const foundTable = allTables.find(t => t.name === tableName);
    return foundTable?.description || '';
  };

  // Calculate intersection point with rectangle
  const getRectIntersection = (
    centerX: number,
    centerY: number,
    angle: number,
    boxWidth: number,
    boxHeight: number
  ) => {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const halfWidth = boxWidth / 2;
    const halfHeight = boxHeight / 2;

    // Check which edge of the rectangle the line intersects
    const tanAngle = Math.tan(angle);
    
    // Calculate intersection with all four edges
    let x, y;
    
    if (Math.abs(cos) > Math.abs(sin)) {
      // Intersects left or right edge
      x = cos > 0 ? halfWidth : -halfWidth;
      y = x * tanAngle;
      if (Math.abs(y) > halfHeight) {
        // Actually intersects top or bottom
        y = sin > 0 ? halfHeight : -halfHeight;
        x = y / tanAngle;
      }
    } else {
      // Intersects top or bottom edge
      y = sin > 0 ? halfHeight : -halfHeight;
      x = y / tanAngle;
      if (Math.abs(x) > halfWidth) {
        // Actually intersects left or right
        x = cos > 0 ? halfWidth : -halfWidth;
        y = x * tanAngle;
      }
    }
    
    return {
      x: centerX + x,
      y: centerY + y
    };
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="mb-4">Entity Relationship Diagram</h3>
      
      {relatedTables.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No relationships defined for this table
        </div>
      ) : (
        <svg
          viewBox="0 0 800 500"
          className="mx-auto w-full h-auto"
          style={{
            maxWidth: '100%',
            minHeight: isMobile ? '500px' : '300px',
            transform: isMobile ? 'scale(1.4)' : 'scale(1)',
            transformOrigin: 'center top'
          }}
        >
          {/* Draw lines and relationship notation */}
          {table.relationships.map((rel, index) => {
            const angle = (index * 2 * Math.PI) / table.relationships.length - Math.PI / 2;
            const color = getRelationshipColor(rel.type);

            // Calculate proper intersection points with box edges
            const startPoint = getRectIntersection(centerX, centerY, angle, mainBoxWidth, mainBoxHeight);
            
            // Calculate related table position
            const relatedX = centerX + Math.cos(angle) * radius;
            const relatedY = centerY + Math.sin(angle) * radius;
            const endPoint = getRectIntersection(relatedX, relatedY, angle + Math.PI, relatedBoxWidth, relatedBoxHeight);

            // Offset the arrow/bar positions OUTSIDE the boxes for visibility
            const arrowOffset = 8;
            const startArrowPoint = {
              x: startPoint.x + Math.cos(angle) * arrowOffset,
              y: startPoint.y + Math.sin(angle) * arrowOffset
            };
            const endArrowPoint = {
              x: endPoint.x - Math.cos(angle) * arrowOffset,
              y: endPoint.y - Math.sin(angle) * arrowOffset
            };

            return (
              <g key={`${rel.targetTable}-${index}`}>
                {/* Connection line */}
                <line
                  x1={startPoint.x}
                  y1={startPoint.y}
                  x2={endPoint.x}
                  y2={endPoint.y}
                  stroke={color}
                  strokeWidth="2"
                />
                
                {/* Relationship notation using arrows/bars */}
                {rel.type === 'one-to-one' && (
                  <>
                    {drawBar(startPoint.x, startPoint.y, angle, color)}
                    {drawBar(endPoint.x, endPoint.y, angle + Math.PI, color)}
                  </>
                )}
                {rel.type === 'one-to-many' && (
                  <>
                    {drawBar(startPoint.x, startPoint.y, angle, color)}
                    {drawArrow(endArrowPoint.x, endArrowPoint.y, angle + Math.PI, color)}
                  </>
                )}
                {rel.type === 'many-to-one' && (
                  <>
                    {drawArrow(startArrowPoint.x, startArrowPoint.y, angle, color)}
                    {drawBar(endPoint.x, endPoint.y, angle + Math.PI, color)}
                  </>
                )}
                {rel.type === 'many-to-many' && (
                  <>
                    {drawArrow(startArrowPoint.x, startArrowPoint.y, angle, color)}
                    {drawArrow(endArrowPoint.x, endArrowPoint.y, angle + Math.PI, color)}
                  </>
                )}
              </g>
            );
          })}

          {/* Draw main table (center) */}
          <g style={{ cursor: 'pointer' }} onClick={() => onSelectTable(table.name)}>
            <rect
              x={centerX - mainBoxWidth / 2}
              y={centerY - mainBoxHeight / 2}
              width={mainBoxWidth}
              height={mainBoxHeight}
              fill="#1e40af"
              stroke="#1e3a8a"
              strokeWidth="2"
              rx="6"
            />
            <text
              x={centerX}
              y={centerY - 20}
              textAnchor="middle"
              className="text-sm"
              fill="white"
            >
              {table.name}
            </text>
            <text
              x={centerX}
              y={centerY - 4}
              textAnchor="middle"
              className="text-xs"
              fill="#bfdbfe"
            >
              {table.description}
            </text>
            {table.typicalRecordCount && (() => {
              const mainSizeInfo = getSizeInfo(table.typicalRecordCount);
              return (
                <>
                  <foreignObject x={centerX - 60} y={centerY + 8} width="120" height="20">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px' }}>
                      <Badge 
                        className={`${mainSizeInfo.color} text-white text-xs`}
                        style={{ fontSize: '9px', height: '14px', lineHeight: '14px', display: 'inline-block', padding: '0 3px' }}
                      >
                        {mainSizeInfo.label}
                      </Badge>
                      <span style={{ fontSize: '12px', color: '#93c5fd', whiteSpace: 'nowrap' }}>
                        {table.typicalRecordCount} records
                      </span>
                    </div>
                  </foreignObject>
                </>
              );
            })()}
          </g>

          {/* Draw related tables */}
          {table.relationships.map((rel, index) => {
            const angle = (index * 2 * Math.PI) / table.relationships.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            const color = getRelationshipColor(rel.type);
            const description = getTableDescription(rel.targetTable);
            const relatedTable = allTables.find(t => t.name === rel.targetTable);
            const recordCount = relatedTable?.typicalRecordCount || '';
            const sizeInfo = recordCount ? getSizeInfo(recordCount) : null;

            return (
              <g key={`box-${rel.targetTable}-${index}`} style={{ cursor: 'pointer' }} onClick={() => onSelectTable(rel.targetTable)}>
                <rect
                  x={x - relatedBoxWidth / 2}
                  y={y - relatedBoxHeight / 2}
                  width={relatedBoxWidth}
                  height={relatedBoxHeight}
                  fill={color}
                  fillOpacity="0.1"
                  stroke={color}
                  strokeWidth="2"
                  rx="6"
                />
                <text
                  x={x}
                  y={y - 18}
                  textAnchor="middle"
                  className="text-sm"
                  fill={color}
                >
                  {rel.targetTable}
                </text>
                <text
                  x={x}
                  y={y - 2}
                  textAnchor="middle"
                  className="text-xs"
                  fill="gray"
                  style={{ maxWidth: `${relatedBoxWidth - 10}px` }}
                >
                  {description.length > 20 ? description.substring(0, 20) + '...' : description}
                </text>
                {sizeInfo && recordCount && (
                  <>
                    <foreignObject x={x - 55} y={y + 8} width="110" height="20">
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                        <Badge 
                          className={`${sizeInfo.color} text-white text-xs`}
                          style={{ fontSize: '8px', height: '12px', lineHeight: '12px', display: 'inline-block', padding: '0 3px' }}
                        >
                          {sizeInfo.label}
                        </Badge>
                        <span style={{ fontSize: '12px', color: '#6b7280', whiteSpace: 'nowrap' }}>
                          {recordCount} records
                        </span>
                      </div>
                    </foreignObject>
                  </>
                )}
              </g>
            );
          })}
        </svg>
      )}

      {/* Legend */}
      {relatedTables.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-700 mb-3">Relationship Notation:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <svg width="60" height="30">
                <line x1="10" y1="15" x2="50" y2="15" stroke="#10b981" strokeWidth="2" />
                <line x1="10" y1="10" x2="10" y2="20" stroke="#10b981" strokeWidth="2" />
                <line x1="50" y1="10" x2="50" y2="20" stroke="#10b981" strokeWidth="2" />
              </svg>
              <span className="text-sm text-gray-600">One-to-One</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="60" height="30">
                <line x1="10" y1="15" x2="50" y2="15" stroke="#3b82f6" strokeWidth="2" />
                <line x1="10" y1="10" x2="10" y2="20" stroke="#3b82f6" strokeWidth="2" />
                {/* Arrow pointing right */}
                <line x1="50" y1="15" x2="44" y2="10" stroke="#3b82f6" strokeWidth="2" />
                <line x1="50" y1="15" x2="44" y2="20" stroke="#3b82f6" strokeWidth="2" />
              </svg>
              <span className="text-sm text-gray-600">One-to-Many</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="60" height="30">
                <line x1="10" y1="15" x2="50" y2="15" stroke="#3b82f6" strokeWidth="2" />
                {/* Arrow pointing right */}
                <line x1="10" y1="15" x2="16" y2="10" stroke="#3b82f6" strokeWidth="2" />
                <line x1="10" y1="15" x2="16" y2="20" stroke="#3b82f6" strokeWidth="2" />
                <line x1="50" y1="10" x2="50" y2="20" stroke="#3b82f6" strokeWidth="2" />
              </svg>
              <span className="text-sm text-gray-600">Many-to-One</span>
            </div>
            <div className="flex items-center gap-2">
              <svg width="60" height="30">
                <line x1="10" y1="15" x2="50" y2="15" stroke="#a855f7" strokeWidth="2" />
                {/* Left arrow pointing right */}
                <line x1="10" y1="15" x2="16" y2="10" stroke="#a855f7" strokeWidth="2" />
                <line x1="10" y1="15" x2="16" y2="20" stroke="#a855f7" strokeWidth="2" />
                {/* Right arrow pointing left */}
                <line x1="50" y1="15" x2="44" y2="10" stroke="#a855f7" strokeWidth="2" />
                <line x1="50" y1="15" x2="44" y2="20" stroke="#a855f7" strokeWidth="2" />
              </svg>
              <span className="text-sm text-gray-600">Many-to-Many</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}