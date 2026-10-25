import React from 'react';
import AtsScannerShowcase from './AtsScannerShowcase';

const TwoTierAtsSection = ({ onStartAnalysis, setActiveTab }) => {
  return (
    <section className="py-6 border-t border-surface-200">
      <AtsScannerShowcase
        onStartAnalysis={onStartAnalysis}
        setActiveTab={setActiveTab}
      />
    </section>
  );
};

export default TwoTierAtsSection;
