import { getSession, useSession } from "next-auth/react";
import { NextPageContext } from "next";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
}

const Profiles = () => {
  return (
    <div>
      <p className="text-white text-4xl">Profiles</p>
    </div>
  );
};

export default Profiles;
