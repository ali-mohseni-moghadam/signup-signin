import React from "react";
import { verifyToken } from "../../utils/auth";

function Dashboard({ result }: any) {
  console.log(result);
  return <div className="p-5">Dashboard</div>;
}

export default Dashboard;

export async function getServerSideProps(context: any) {
  const { token } = context.req.cookies;
  const secretKey = process.env.SECRET_KEY;

  const result = verifyToken(token, secretKey!);

  if (!result) {
    return {
      redirect: { destination: "/signin", permanent: false },
    };
  }

  return {
    props: { result },
  };
}
