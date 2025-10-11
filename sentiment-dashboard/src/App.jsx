// src/App.jsx
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function App() {
  // State for user input
  const [topic, setTopic] = useState('NVIDIA stock');
  
  // State for API results and loading status
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyzeClick = async () => {
    setIsLoading(true);
    setError('');
    setChartData(null);

    try {
      const response = await fetch('http://127.0.0.1:5000/get_sentiment_for_topic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Only send the topic in the body
        body: JSON.stringify({ topic }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || 'Something went wrong');
      }

      const data = await response.json();
      
      const formattedData = [
        { name: 'Positive', count: data.POSITIVE },
        { name: 'Negative', count: data.NEGATIVE },
      ];
      setChartData(formattedData);

    } catch (err) {
      console.error('Error fetching sentiment:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Dashboard</h2>
        <p>Enter a topic to analyze public sentiment across all of Reddit in real-time.</p>
      </aside>

      <main className="main-content">
        <header className="header">
          <h1>Real-Time Topic Sentiment</h1>
        </header>

        <div className="card">
          <h3>Analysis Query</h3>
          {/* Simplified input section */}
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic..."
              style={{ padding: '8px', flexGrow: 1 }}
            />
            <button onClick={handleAnalyzeClick} disabled={isLoading}>
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </div>
        
        <div className="chart-container" style={{ marginTop: '24px' }}>
           <h3>Sentiment Distribution</h3>
           {isLoading && <p>Searching all of Reddit and analyzing results...</p>}
           {error && <p style={{ color: 'red' }}>Error: {error}</p>}
           {chartData && (
             <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
           )}
           {!isLoading && !chartData && !error && (
            <p>Enter a topic and click Analyze to see results.</p>
           )}
        </div>
      </main>
    </div>
  );
}

export default App;