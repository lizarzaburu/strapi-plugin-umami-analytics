import { Page } from '@strapi/strapi/admin';

const AnalyticsPage = () => {
  const umamiUrl = process.env.STRAPI_ADMIN_UMAMI_URL;

  if (!umamiUrl) {
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
            <p>Please set the STRAPI_ADMIN_UMAMI_URL environment variable to display analytics.</p>
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

