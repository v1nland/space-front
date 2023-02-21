import { Astronaut } from '@/types/astronaut';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';

const parseIsPilot = (isPilot: boolean) => {
  if (isPilot) {
    return <Text color="green">Yes</Text>;
  }

  return <Text color="red">No</Text>;
};

export default function AstronautsTable({ astronauts }: { astronauts: Astronaut[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Pilot?</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {astronauts.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell>{user.name}</TableCell>
            <TableCell>{parseIsPilot(user.isPilot)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}