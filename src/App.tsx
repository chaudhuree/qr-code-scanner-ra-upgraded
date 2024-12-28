import React from 'react';
import QRScanner from './components/QRScanner';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <QRScanner />
      </div>
    </div>
  );
}

export default App;