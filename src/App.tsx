import { Router } from "./utils/Router";
import { Footer } from "../src/components/Footer/Footer"
import { Header } from "../src/components/Header/Header"

export const App = () => {

  return (
    <>
      <Header />
      <Router />
      <Footer />
    </>
  );
}
