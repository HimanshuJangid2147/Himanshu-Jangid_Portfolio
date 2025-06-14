import React, { useState, useEffect } from 'react';

const GitHubStats = () => {
    const [stats, setStats] = useState(null);
    const username = 'HimanshuJangid2147';

    useEffect(() => {
        fetch(`https://api.github.com/users/${username}`)
            .then(res => res.json())
            .then(data => setStats(data))
            .catch(error => console.error("Error fetching GitHub stats:", error));
    }, [username]);

    return (
        <div className="p-6 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/50 rounded-2xl">
            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-4">Live GitHub Stats</h3>
            <div className="flex justify-around text-center">
                <div className="stat-item">
                    <p className="text-3xl font-bold text-blue-600 dark:text-cyan-400">{stats?.public_repos ?? '...'}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Repositories</p>
                </div>
                <div className="stat-item">
                    <p className="text-3xl font-bold text-blue-600 dark:text-cyan-400">{stats?.followers ?? '...'}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Followers</p>
                </div>
            </div>
        </div>
    );
};

export default GitHubStats;