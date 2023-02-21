import AstronautsTable from "@/components/astronautsTable";
import Search from "@/components/search";
import { Astronaut } from "@/types/astronaut";
import { Title, Text, Card } from "@tremor/react";
import React from "react";

type AstronautsProps = {
  astronauts: Astronaut[];
};

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

export async function getStaticProps() {
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

  const gql = await response.json();

  return {
    props: {
      astronauts: gql.data.getAllAstronauts,
    },
  };
}
