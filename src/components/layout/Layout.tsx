import Head from "next/head";
import NavBar from "./NavBar";
import React from "react";

const Layout = ({
  children,
  title = "RoboEvents",
  description = "RoboEvents",
}: {
  children: React.ReactNode;
  title?: string;
  description?: string;
}) => {
  const routes = [
    { name: "User information", path: "/" },
    { name: "Sponsor Packs", path: "/sponsors" },
    {
      name: "Create event",
      path: "/add-event",
      visibility: "organizationMember",
    },
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar routes={routes} />
      <main>{children}</main>
    </>
  );
};

export default Layout;
