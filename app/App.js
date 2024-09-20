import AppRoutes from './src/Routes/index';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SWRConfig } from 'swr';
import { AuthProvider } from './src/Context/authcontext';
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config as configGluestack } from "./config/gluestack-ui.config"

export default function App() {


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
            <StatusBar backgroundColor={'#c52f33'}/>
            <AppRoutes/>
          </AuthProvider>
        </NavigationContainer>
      </SWRConfig>
    </GluestackUIProvider>
  );
}
