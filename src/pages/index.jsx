import React from "react";
import Wrapper from "./Wrapper";
import HomePage from "./Home/index";
import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Kodr",
  description: "For the coder in you.",
};

export default function index() {
  return (
    <Wrapper>
      <MetaComponent meta={metadata} />
      <HomePage />
    </Wrapper>
  );
}
