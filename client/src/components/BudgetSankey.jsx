import React from 'react';
import { ResponsiveSankey } from '@nivo/sankey';

const BudgetSankey = ({ state }) => {
  if (!state || !state.expenditure || !state.revenue) {
    return <div className="text-text-muted text-center p-8">Loading budget data...</div>;
  }

  const totalExp = state.expenditure.reduce((sum, e) => sum + e.value, 0);
  const totalRev = state.revenue.reduce((sum, r) => sum + r.value, 0);
  const deficit = totalExp - totalRev;

  // Plain English naming
  const nameMap = {
    'Social Protection': 'Pensions & Benefits',
    'Debt Interest': 'Debt Interest',
    'Other Services': 'Police & Councils',
    'Corporation Tax': 'Business Tax',
    'NI': 'National Insurance',
    'Other Revenue': 'Fuel & Alcohol',
    'Income Tax': 'Income Tax',
    'VAT': 'VAT',
    'Health': 'NHS',
    'Education': 'Schools',
    'Defence': 'Defence',
    'Infrastructure': 'Roads & Rail'
  };

  const nodes = [
    ...state.revenue.map(r => ({ id: nameMap[r.id] || r.id, nodeType: 'revenue' })),
    { id: 'HM TREASURY', nodeType: 'center' },
    ...state.expenditure.map(e => ({ id: nameMap[e.id] || e.id, nodeType: 'expenditure' })),
  ];

  if (deficit > 0) {
    nodes.push({ id: 'BORROWING', nodeType: 'deficit' });
  } else if (deficit < 0) {
    nodes.push({ id: 'SURPLUS', nodeType: 'surplus' });
  }

  const links = [
    ...state.revenue.map(r => ({
      source: nameMap[r.id] || r.id,
      target: 'HM TREASURY',
      value: r.value
    })),
    ...state.expenditure.map(e => ({
      source: 'HM TREASURY',
      target: nameMap[e.id] || e.id,
      value: e.value
    }))
  ];

  if (deficit > 0) {
    links.push({ source: 'BORROWING', target: 'HM TREASURY', value: deficit });
  } else if (deficit < 0) {
    links.push({ source: 'HM TREASURY', target: 'SURPLUS', value: Math.abs(deficit) });
  }

  const isLight = document.body.getAttribute('data-theme') === 'light';
  const textColor = isLight ? '#000000' : '#ffffff';

  const theme = {
    text: {
      fill: textColor,
      fontSize: 12,
    },
    tooltip: {
      container: {
        background: isLight ? '#ffffff' : '#0a0a0a',
        color: isLight ? '#000000' : '#ffffff',
        fontSize: '14px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      }
    }
  };

  // Get node type safely
  const getNodeType = (node) => {
    // Check various places where the type might be stored
    return node?.nodeType || node?.data?.nodeType || 'unknown';
  };

  return (
    <ResponsiveSankey
      data={{ nodes, links }}
      margin={{ top: 20, right: 160, bottom: 20, left: 160 }}
      align="justify"
      colors={(node) => {
        const nodeType = getNodeType(node);

        // Revenue: Bright Green
        if (nodeType === 'revenue') return '#22c55e';
        // Expenditure: Bright Red
        if (nodeType === 'expenditure') return '#ef4444';
        // Treasury: Gold
        if (node.id === 'HM TREASURY') return '#D4AF37';
        // Borrowing: Blue
        if (node.id === 'BORROWING') return '#3b82f6';
        // Surplus: Cyan
        if (node.id === 'SURPLUS') return '#06b6d4';

        return '#888';
      }}
      nodeOpacity={1}
      nodeHoverOthersOpacity={0.3}
      nodeThickness={24}
      nodeSpacing={20}
      nodeBorderWidth={0}
      nodeBorderRadius={4}
      linkOpacity={0.5}
      linkHoverOpacity={0.8}
      linkHoverOthersOpacity={0.1}
      linkContract={3}
      enableLinkGradient={true}
      labelPosition="outside"
      labelOrientation="horizontal"
      labelPadding={16}
      labelTextColor={textColor}
      theme={theme}
      animate={true}
      motionConfig="gentle"
    />
  );
};

export default BudgetSankey;
