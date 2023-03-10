import MissionsTable from "@/components/missionsTable";
import Search from "@/components/search";
import { Astronaut } from "@/types/astronaut";
import { Mission } from "@/types/mission";
import { Title, Text, Card } from "@tremor/react";
import { GetServerSideProps } from "next";
import React from "react";

type MissionsProps = {
  missions: Mission[];
};

type MissionsParams = {};

export default function Missions({ missions }: MissionsProps) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Missions</Title>
      <Text>
        A list of missions retrieved from the space-playground database.
      </Text>
      <Search />
      <Card marginTop="mt-6">
        <MissionsTable missions={missions} />
      </Card>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<MissionsProps, MissionsParams> = async () => {
  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          getAllMissions {
            id
            title
            description
            crew {
              id
              name
              isPilot
            }
          }
        }
      `,
    }),
  });

  const gql: getAllMissionsResponse = await response.json();

  return {
    props: {
      missions: gql.data.getAllMissions,
    },
  };
}

// gql types
type getAllMissionsResponse = {
  data: {
    getAllMissions: getAllMissionsMission[],
  }
};

type getAllMissionsMission = {
  id: number;
  title: string;
  description: string;
  crew: getAllMissionsCrew[],
};

type getAllMissionsCrew = {
  id: string;
  name: string;
  isPilot: boolean;
};
