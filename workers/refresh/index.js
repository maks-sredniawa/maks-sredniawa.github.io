const dispatchUrl =
  'https://api.github.com/repos/maks-sredniawa/maks-sredniawa.github.io/actions/workflows/deploy.yml/dispatches';

export default {
  async scheduled(_event, env) {
    if (!env.GITHUB_DISPATCH_TOKEN) {
      throw new Error('GITHUB_DISPATCH_TOKEN is not set, so the site refresh was not dispatched.');
    }
    const response = await fetch(dispatchUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.GITHUB_DISPATCH_TOKEN}`,
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'User-Agent': 'maksforge-refresh',
      },
      body: JSON.stringify({ ref: 'main', inputs: { refresh: 'true' } }),
    });
    if (!response.ok) {
      console.error(
        `Dispatching the site refresh failed: ${response.status} ${await response.text()}`,
      );
      throw new Error(`Dispatching the site refresh failed: ${response.status}`);
    }
  },
};
