import { Astronaut } from "@/types/astronaut";
import { Mission } from "@/types/mission";
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
} from "@tremor/react";

const getAstronautName = (astronaut: Astronaut) => astronaut.name;

const getCrewNames = (crew: Astronaut[]) => {
  const names = crew.map(getAstronautName);

  return names.join(", ");
};

export default function MissionsTable({ missions }: { missions: Mission[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Description</TableHeaderCell>
          <TableHeaderCell>Crew</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {missions.map((mission) => (
          <TableRow key={mission.id}>
            <TableCell>{mission.id}</TableCell>
            <TableCell>{mission.title}</TableCell>
            <TableCell>{mission.description}</TableCell>
            <TableCell>{getCrewNames(mission.crew)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
