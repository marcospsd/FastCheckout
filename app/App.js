import AppRoutes from './src/Routes/index';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { SWRConfig } from 'swr';
import { AuthProvider } from './src/Context/authcontext';

export default function App() {
  return (
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
  );
}
