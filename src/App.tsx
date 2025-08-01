
import { AppRouter } from "@/routes";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from 'react-router';

export default function App(): React.JSX.Element {
  return (
    <BrowserRouter>
    <Provider store={store}>
        <AppRouter />
    </Provider>
    </BrowserRouter>
  )
};
