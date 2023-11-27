import React from "react";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import TripTab from "../../components/trips/TripTab";

const TripsClient = () => {
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10  gap-8">
        <Tabs>
          <TabList>
            <Tab>Upcoming</Tab>
            <Tab>Confirmed</Tab>
            <Tab>Operational</Tab>
            <Tab>Completed</Tab>
            <Tab>All</Tab>
          </TabList>

          <TabPanel>
            <TripTab status={0} />
            <hr />
          </TabPanel>
          <TabPanel>
            <TripTab status={1} />
            <hr />
          </TabPanel>
          <TabPanel>
            <TripTab status={2} />
            <hr />
          </TabPanel>
          <TabPanel>
            <TripTab status={3} showReview/>
            <hr />
          </TabPanel>
          <TabPanel>
            <TripTab status={5} />
            <hr />
          </TabPanel>
        </Tabs>
      </div>
    </Container>
  );
};

export default TripsClient;
