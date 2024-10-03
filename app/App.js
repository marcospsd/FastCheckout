import AppRoutes from './src/Routes/index';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SWRConfig } from 'swr';
import { AuthProvider } from './src/Context/authcontext';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config as configGluestack } from "./config/gluestack-ui.config"
import { useState } from 'react';
import { Splash } from './src/Components/Splash';

export default function App() {
  const [splashComplete, setSplashComplete] = useState(false)

  return (
    <GluestackUIProvider
      config={configGluestack}
      >
      <SWRConfig
        value={{
          revalidateOnFocus: true,
          revalidateOnReconnect: true,
          revalidateIfStale: true,
          
        }}
      >
        <NavigationContainer>
          <AuthProvider>
            { splashComplete ?
              <>
              <AppRoutes/>
              <StatusBar backgroundColor={'#c52f33'}/>
              </>              
              : <Splash onComplete={setSplashComplete} />
              }
          </AuthProvider>
        </NavigationContainer>
      </SWRConfig>
    </GluestackUIProvider>
  );
}
