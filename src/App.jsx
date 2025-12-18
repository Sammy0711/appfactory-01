
import React from 'react';
import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          特定技能ビザ 要件判定ツール（デモ版）
        </h1>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-slate-600">
            ここに判定ツールのコンテンツが入ります。
          </p>
        </div>
      </div>
    </Layout>
  );
}

export default App;
