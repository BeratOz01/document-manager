import React from "react";

import Hero from "components/ui/Hero";
import Flow from "components/ui/Flow";
import About from "components/ui/About";
import Contact from "components/ui/Contact";
import { AuthContext } from "store/auth-context";

export default function Home() {
  const authCtx = React.useContext(AuthContext);

  return (
    <>
      <Hero />
      <Flow />
      <About />
      <Contact />
    </>
  );
}
