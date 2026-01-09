import { Page, useFetchClient } from '@strapi/strapi/admin';
import { useEffect, useState } from 'react';

const AnalyticsPage = () => {
  const { get } = useFetchClient();
  const [umamiUrl, setUmamiUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await get('/umami-analytics/config');
        setUmamiUrl(data.umamiUrl);
      } catch (err) {
        setError('Failed to load analytics configuration');
        console.error('Error loading Umami config:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, [get]);

  if (loading) {
    return (
      <Page.Main>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div>Loading analytics...</div>
        </div>
      </Page.Main>
    );
  }

  if (error || !umamiUrl) {
    return (
      <Page.Main>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <div>
            <h2>Analytics Not Configured</h2>
            <p>
              Please configure the Umami Analytics plugin in <code>config/plugins.ts</code>:
            </p>
            <pre style={{
              background: '#f5f5f5',
              padding: '1rem',
              borderRadius: '4px',
              textAlign: 'left',
              marginTop: '1rem'
            }}>
{`'umami-analytics': {
  enabled: true,
  config: {
    umamiUrl: env('UMAMI_URL'),
  },
}`}
            </pre>
          </div>
        </div>
      </Page.Main>
    );
  }

  return (
    <Page.Main>
      <iframe
        src={umamiUrl}
        style={{
          width: '100%',
          height: 'calc(100vh)',
          border: 'none',
          display: 'block'
        }}
        title="Umami Analytics"
      />
    </Page.Main>
  );
};

export { AnalyticsPage };

