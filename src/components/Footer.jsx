
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-slate-800 text-slate-400 py-6 mt-auto">
            <div className="container mx-auto px-4 text-center">
                <div className="mb-4 text-xs opacity-75">
                    ※本ツールによる診断結果等は一般的な情報提供を目的としており、法的効力を保証するものではありません。<br className="hidden sm:inline" />
                    個別の事案については必ず専門家へご相談ください。
                </div>
                <div className="text-sm font-medium border-t border-slate-700 pt-4">
                    &copy; 2025 Mayuha Office. All Rights Reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
