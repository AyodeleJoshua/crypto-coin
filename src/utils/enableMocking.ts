import environmentVariables from './environmentVariables';

async function enableMocking() {
  if (environmentVariables.nodeEnv !== 'development') {
    return '';
  }
  const { worker } = await import('../../mocks/browser');
  return worker.start();
}

export default enableMocking;
