
import { SafeAreaProvider, } from "react-native-safe-area-context";
import SignIn from "../components/SignIn";


const index = () => {
  return (
    <SafeAreaProvider>
      <SignIn />
    </SafeAreaProvider>
  );
};

export default index;
