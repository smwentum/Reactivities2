import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);

  function handleFormOpen(id?: string) {
    id ? handelSelectActivity(id) : handelCancelSelectedActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handelCreateOrEditActivity(activity: Activity) {
    activity.id
      ? setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]) //this is if it is not
      : setActivities([...activities, { ...activity, id: uuid() }]); //this is if it is new
    setEditMode(false);
    setSelectedActivity(activity);
  }

  function handelDeleteActivity(id: string) {
    setActivities([...activities.filter((x) => x.id !== id)]);
  }

  useEffect(() => {
    axios
      .get<Activity[]>('http://localhost:5000/api/activities')
      .then((response) => {
        //console.log(response);
        setActivities(response.data);
      });
  }, []);

  function handelSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  // function handler
  function handelCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  return (
    <Fragment>
      <NavBar openForm={handleFormOpen} />
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handelSelectActivity}
          cancelSelectActivity={handelCancelSelectedActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit={handelCreateOrEditActivity}
          deleteActivity={handelDeleteActivity}
        />
      </Container>
    </Fragment>
  );
}

export default App;
