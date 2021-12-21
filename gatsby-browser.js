import './src/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './src/css/style.css';

if(typeof window !== 'undefined') {
  window.alert(`
  🚨 Please Be Advised:
  This is a test site and is only used
  for staging future changes before adding
  them to production.🚧
  `)
}

export const onServiceWorkerUpdateReady = () => {
    const answer = window.confirm(
      `This application has been updated. ` +
        `Reload to display the latest version?`
    );
  
    if (answer === true) {
      window.location.reload();
    }
};
