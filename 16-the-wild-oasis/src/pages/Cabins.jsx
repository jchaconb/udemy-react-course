import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import AddCabin from '../features/cabins/addCabin';
import CabinTableOperatios from '../features/cabins/CabinTableOperatios';

function Cabins() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperatios />
      </Row>

      <Row>
        <CabinTable />
      </Row>

      <AddCabin />
    </>
  );
}

export default Cabins;
