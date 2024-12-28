import React from 'react';

interface ScanResultProps {
  result: string;
}

const ScanResult: React.FC<ScanResultProps> = ({ result }) => {
  if (!result) return null;

  return (
    <div className="w-full bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Scan Result:</h2>
      <p className="text-gray-700 break-all">{result}</p>
    </div>
  );
};

export default ScanResult;