import packageJson from '../../package.json';
import environmentVariables from './environmentVariables';

async function enableMocking() {
  if (environmentVariables.nodeEnv !== 'test') {
    return '';
  }
  const { worker } = await import('../../mocks/browser');
  return worker.start({
    serviceWorker: {
      url: `${packageJson.msw.homepage}/mockServiceWorker.js`,
    },
  });
}

export default enableMocking;
