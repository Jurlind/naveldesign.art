import crypto from 'node:crypto';

const getSiteUrl = event => {
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  const host = event.headers['x-forwarded-host'] || event.headers.host || 'naveldesign.art';
  return `${protocol}://${host}`;
};

export const handler = async event => {
  const clientId = process.env.OAUTH_CLIENT_ID;

  if (!clientId) {
    return {
      statusCode: 500,
      body: 'Missing OAUTH_CLIENT_ID environment variable.',
    };
  }

  const provider = event.queryStringParameters?.provider || 'github';
  const scope = event.queryStringParameters?.scope || 'repo';
  const state = crypto.randomBytes(16).toString('hex');
  const siteUrl = getSiteUrl(event);
  const redirectUri = `${siteUrl}/callback`;

  const authorizeUrl = new URL('https://github.com/login/oauth/authorize');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('scope', scope);
  authorizeUrl.searchParams.set('state', state);

  return {
    statusCode: 302,
    headers: {
      Location: authorizeUrl.toString(),
      'Cache-Control': 'no-store',
    },
    body: '',
  };
};
