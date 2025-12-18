
import React from 'react';
import Layout from './components/Layout';

import VisaChecker from './components/VisaChecker';

function App() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <VisaChecker />
      </div>
    </Layout>
  );
}

export default App;
