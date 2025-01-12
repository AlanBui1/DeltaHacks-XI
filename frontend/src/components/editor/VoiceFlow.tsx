import React, { useEffect } from 'react';

const VoiceflowWidget: React.FC = () => {
  useEffect(() => {
    const loadVoiceflowWidget = () => {
      const script = document.createElement('script');
      script.src = 'https://cdn.voiceflow.com/widget/bundle.mjs';
      script.type = 'text/javascript';
      script.onload = () => {
        if (window.voiceflow && window.voiceflow.chat) {
          window.voiceflow.chat.load({
            verify: { projectID: '6782f74bcbac8c6678499e10' },
            url: 'https://general-runtime.voiceflow.com',
            versionID: 'production',
          });
        }
      };
      document.body.appendChild(script);
    };

    loadVoiceflowWidget();
  }, []);

  return null; // This component doesn't render any visible content
};

export default VoiceflowWidget;
