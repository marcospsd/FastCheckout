import "./global.css";
import AppRoutes from './src/Routes/index';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SWRConfig } from 'swr';
import { AuthProvider } from './src/Context/authcontext';
import { GluestackUIProvider } from './src/Components/ui/gluestack-ui-provider';
import { useState } from 'react';
import { Splash } from './src/Components/Splash';

export default function App() {
  const [splashComplete, setSplashComplete] = useState(false)

  return (
    <GluestackUIProvider mode="light">
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
