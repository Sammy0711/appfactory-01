
import React from 'react';

const Header = () => {
    return (
        <header className="sticky top-0 z-50 bg-slate-900 text-white shadow-md">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="font-bold text-lg tracking-wide">
                    Mayuha Office App Factory
                </div>
                <div className="flex items-center">
                    <div className="bg-white/10 px-3 py-1 rounded-full border border-white/20 text-sm backdrop-blur-sm">
                        <span className="opacity-75 text-xs mr-1">監修</span>
                        <span className="font-medium">行政書士 麥生田勇</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
