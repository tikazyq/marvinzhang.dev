import { useState, useEffect } from 'react';

interface GitHubRepo {
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  updated_at: string;
}

interface UseGitHubStarsResult {
  stars: number | null;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
}

export function useGitHubStars(githubUrl: string): UseGitHubStarsResult {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    if (!githubUrl) {
      setLoading(false);
      return;
    }

    // Extract owner and repo from GitHub URL
    const match = githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!match) {
      setError('Invalid GitHub URL');
      setLoading(false);
      return;
    }

    const [, owner, repo] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

    let isMounted = true;

    const fetchStars = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`GitHub API error: ${response.status}`);
        }

        const data: GitHubRepo = await response.json();
        
        if (isMounted) {
          setStars(data.stargazers_count);
          setLastUpdated(new Date(data.updated_at));
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to fetch stars');
          setLoading(false);
        }
      }
    };

    fetchStars();

    // Optional: Set up periodic updates (every 5 minutes)
    const interval = setInterval(fetchStars, 5 * 60 * 1000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [githubUrl]);

  return { stars, loading, error, lastUpdated };
}

// Hook for multiple repositories
export function useMultipleGitHubStars(githubUrls: string[]): Record<string, UseGitHubStarsResult> {
  const [results, setResults] = useState<Record<string, UseGitHubStarsResult>>({});

  useEffect(() => {
    const fetchAllStars = async () => {
      const promises = githubUrls.map(async (url) => {
        if (!url) return { url, result: { stars: null, loading: false, error: null, lastUpdated: null } };

        const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
        if (!match) {
          return { 
            url, 
            result: { stars: null, loading: false, error: 'Invalid GitHub URL', lastUpdated: null } 
          };
        }

        const [, owner, repo] = match;
        const apiUrl = `https://api.github.com/repos/${owner}/${repo}`;

        try {
          const response = await fetch(apiUrl);
          
          if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
          }

          const data: GitHubRepo = await response.json();
          
          return {
            url,
            result: {
              stars: data.stargazers_count,
              loading: false,
              error: null,
              lastUpdated: new Date(data.updated_at)
            }
          };
        } catch (err) {
          return {
            url,
            result: {
              stars: null,
              loading: false,
              error: err instanceof Error ? err.message : 'Failed to fetch stars',
              lastUpdated: null
            }
          };
        }
      });

      // Set loading state for all URLs
      setResults(prev => {
        const loadingResults: Record<string, UseGitHubStarsResult> = {};
        githubUrls.forEach(url => {
          loadingResults[url] = prev[url] || { stars: null, loading: true, error: null, lastUpdated: null };
        });
        return loadingResults;
      });

      const resolvedResults = await Promise.all(promises);
      
      const newResults: Record<string, UseGitHubStarsResult> = {};
      resolvedResults.forEach(({ url, result }) => {
        newResults[url] = result;
      });
      
      setResults(newResults);
    };

    if (githubUrls.length > 0) {
      fetchAllStars();
    }
  }, [githubUrls.join(',')]);

  return results;
}