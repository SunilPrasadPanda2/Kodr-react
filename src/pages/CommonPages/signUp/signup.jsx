import Preloader from "@/components/common/Preloader";

import AuthImageMove from "@/components/others/AuthImageMove";
import SignUpForm from "@/pages/CommonPages/signUp/components/SignUpForm";
import React from "react";
import MetaComponent from "@/components/common/MetaComponent";
import HeaderAuth from "@/components/pages/student/signup/HeaderAuth";

const metadata = {
  title:
    "Signup - Growfine",
  description:
    "",
};
export default function SignupPage() {

  return (
    <div className="main-content  ">
      <MetaComponent meta={metadata} />
      <Preloader />

      < HeaderAuth />
      <div className="content-wrapper js-content-wrapper overflow-hidden">
        <section className="form-page js-mouse-move-container">
          <AuthImageMove />
          <SignUpForm />
        </section>
      </div>
    </div>
  );
}
