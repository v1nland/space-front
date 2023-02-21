import AstronautsTable from "@/components/astronautsTable";
import Search from "@/components/search";
import { Astronaut } from "@/types/astronaut";
import { Title, Text, Card } from "@tremor/react";
import { GetServerSideProps } from "next";
import React from "react";

type AstronautsProps = {
  astronauts: Astronaut[];
};

type AstronautsParams = {};

export default function Astronauts({ astronauts }: AstronautsProps) {
  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Astronauts</Title>
      <Text>
        A list of astronauts retrieved from the space-playground database.
      </Text>
      <Search />
      <Card marginTop="mt-6">
        <AstronautsTable astronauts={astronauts} />
      </Card>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<AstronautsProps, AstronautsParams> = async () => {
  const response = await fetch("http://localhost:8080/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `
        query {
          getAllAstronauts {
            id
            name
            isPilot
          }
        }
      `,
    }),
  });

  const gql: getAllAstronautsResponse = await response.json();

  return {
    props: {
      astronauts: gql.data.getAllAstronauts,
    },
  };
}

// gql types
type getAllAstronautsResponse = {
  data: {
    getAllAstronauts: getAllAstronautsAstronaut[];
  };
};

type getAllAstronautsAstronaut = {
  id: string;
  name: string;
  isPilot: boolean;
};
