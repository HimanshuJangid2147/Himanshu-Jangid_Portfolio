import React from 'react';
import CodeMatrix from './CodeMatrix';

const GlobalBackground = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
            {/* Global Code Matrix - spans entire page */}
            <div className="fixed inset-0 z-0">
                <CodeMatrix />
            </div>

            {/* Global gradient orbs */}
            <div className="fixed inset-0 z-0">
                <div className="absolute w-96 h-96 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"
                     style={{ left: '20%', top: '10%', animationDuration: '4s' }} />
                <div className="absolute w-80 h-80 bg-gradient-to-r from-cyan-500/15 to-emerald-500/15 rounded-full blur-3xl animate-pulse"
                     style={{ right: '15%', bottom: '20%', animationDuration: '6s', animationDelay: '2s' }} />
                <div className="absolute w-72 h-72 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse"
                     style={{ left: '60%', top: '60%', animationDuration: '8s', animationDelay: '4s' }} />
            </div>

            {/* Content with relative positioning */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default React.memo(GlobalBackground);