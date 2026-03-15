const buildResponsePage = ({ origin, payload }) => `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        function receiveMessage(event) {
          if (event.origin !== ${JSON.stringify(origin)}) {
            return;
          }

          window.opener.postMessage(
            'authorization:github:success:' + JSON.stringify(${JSON.stringify(payload)}),
            event.origin,
          );

          window.removeEventListener('message', receiveMessage, false);
          window.close();
        }

        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', ${JSON.stringify(origin)});
      })();
    </script>
  </body>
</html>`;

const buildErrorPage = ({ origin, message }) => `<!doctype html>
<html>
  <body>
    <script>
      (function() {
        function receiveMessage(event) {
          if (event.origin !== ${JSON.stringify(origin)}) {
            return;
          }

          window.opener.postMessage(
            'authorization:github:error:' + JSON.stringify({ message: ${JSON.stringify(message)} }),
            event.origin,
          );

          window.removeEventListener('message', receiveMessage, false);
          window.close();
        }

        window.addEventListener('message', receiveMessage, false);
        window.opener.postMessage('authorizing:github', ${JSON.stringify(origin)});
      })();
    </script>
  </body>
</html>`;

const getSiteUrl = event => {
  const protocol = event.headers['x-forwarded-proto'] || 'https';
  const host = event.headers['x-forwarded-host'] || event.headers.host || 'naveldesign.art';
  return `${protocol}://${host}`;
};

export const handler = async event => {
  const clientId = process.env.OAUTH_CLIENT_ID;
  const clientSecret = process.env.OAUTH_CLIENT_SECRET;
  const code = event.queryStringParameters?.code;
  const origin = getSiteUrl(event);

  if (!clientId || !clientSecret) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: buildErrorPage({ origin, message: 'OAuth credentials are not configured on Netlify.' }),
    };
  }

  if (!code) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: buildErrorPage({ origin, message: 'Missing GitHub authorization code.' }),
    };
  }

  const redirectUri = `${origin}/callback`;

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || tokenData.error || !tokenData.access_token) {
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
      body: buildErrorPage({
        origin,
        message: tokenData.error_description || tokenData.error || 'GitHub token exchange failed.',
      }),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
    body: buildResponsePage({
      origin,
      payload: {
        token: tokenData.access_token,
        provider: 'github',
      },
    }),
  };
};