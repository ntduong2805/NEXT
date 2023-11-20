import React, { useState } from "react";
import Container from "../../components/Container";
import Heading from "../../components/Heading";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ReservationTab from "../../components/reservations/ReservationTab";

const ReservationsClient = ({ currentUser }) => {
  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />
      <div className="mt-10">
        <Tabs>
          <TabList>
            <Tab>Upcoming</Tab>
            <Tab>Confirmed</Tab>
            <Tab>Operational</Tab>
            <Tab>Completed</Tab>
            <Tab>Canceled</Tab>
            <Tab>All</Tab>
          </TabList>

          <TabPanel>
           <ReservationTab status={0} statusChange={1} />
          </TabPanel>
          <TabPanel>
          <ReservationTab status={1} statusChange={2} />
          </TabPanel>
          <TabPanel>
          <ReservationTab status={2} statusChange={3} />
          </TabPanel>
          <TabPanel>
          <ReservationTab status={3} statusChange={0} />
          </TabPanel>
          <TabPanel>
          <ReservationTab status={4} statusChange={0} />
          </TabPanel>
          <TabPanel>
          <ReservationTab status={""} statusChange={0} />
          </TabPanel>
        </Tabs>
      </div>
    </Container>
  );
};

export default ReservationsClient;
