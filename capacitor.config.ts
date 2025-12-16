import type { CapacitorConfig } from '@capacitor/cli';

// For iOS TestFlight: Load from staging Vercel deployment
// Includes native-app class injection to hide header/footer in iOS app
const config: CapacitorConfig = {
  appId: 'com.userushr.app',
  appName: 'Rushr',
  webDir: 'out',
  server: {
    url: 'https://staging-rushr.vercel.app',
    cleartext: false
  },
  ios: {
    contentInset: 'never',
    scheme: 'Rushr',
    backgroundColor: '#ffffff',
    // Append to user agent for native detection
    appendUserAgent: 'Rushr-iOS-Native'
  },
  plugins: {
    // Custom JavaScript injection for native app detection
    SplashScreen: {
      launchAutoHide: false
    }
  }
};

export default config;
