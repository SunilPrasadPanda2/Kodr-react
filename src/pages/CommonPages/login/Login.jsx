import PageLinks from "@/components/common/PageLinks";
import Preloader from "@/components/common/Preloader";

import HeaderAuth from "@/components/pages/student/signup/HeaderAuth";
import AuthImageMove from "@/components/others/AuthImageMove";
import LoginForm from "./components/LoginForm";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title:
    "Kodr",
  description:
    "For the coder in you",
};
export default function Login() {
  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      <HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <LoginForm />
        </section>
      </div>
    </div>
  );
}
