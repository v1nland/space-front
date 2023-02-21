import AstronautsTable from "@/components/astronautsTable";
import Search from "@/components/search";
import { Mission } from "@/types/mission";
import { Title, Text, Card } from "@tremor/react";
import { GetServerSideProps } from "next";
import React from "react";

type MissionDetailsProps = {
  missionDetails: Mission;
};

type MissionDetailsParams = {
  id: string;
};

export default function MissionDetails({ missionDetails }: MissionDetailsProps) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Mission details</Title>
      <Text>
        The detail of the mission retrieved from the space-playground database.
      </Text>
      <Search />
      <Card marginTop="mt-6">
        <AstronautsTable astronauts={missionDetails.crew} />
      </Card>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<MissionDetailsProps, MissionDetailsParams> = async (context) => {
  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          getMissionById(id: ${context.params?.id}) {
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

  const gql: getMissionByIdResponse = await response.json();

  return {
    props: {
      missionDetails: gql.data.getMissionById,
    },
  };
}

// gql types
type getMissionByIdResponse = {
  data: {
    getMissionById: {
      id: number;
      title: string;
      description: string;
      crew: getMissionByIdCrew[],
    }
  }
};

type getMissionByIdCrew = {
  id: string;
  name: string;
  isPilot: boolean;
};
