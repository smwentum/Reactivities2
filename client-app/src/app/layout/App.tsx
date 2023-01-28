import React, { Fragment, useEffect, useState } from 'react';
import './styles.css';
import { Container } from 'semantic-ui-react';
import { Activity } from '../models/activity';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { v4 as uuid } from 'uuid';
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >(undefined);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  function handleFormOpen(id?: string) {
    id ? handelSelectActivity(id) : handelCancelSelectedActivity();
    setEditMode(true);
  }
  function handleFormClose() {
    setEditMode(false);
  }

  function handelCreateOrEditActivity(activity: Activity) {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== activity.id),
          activity,
        ]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, { ...activity }]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
  }

  function handelDeleteActivity(id: string) {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter((x) => x.id !== id)]);
      setSubmitting(false);
    });
  }

  useEffect(() => {
    agent.Activities.list().then((response) => {
      let activities: Activity[] = [];
      response.forEach((activity) => {
        activity.date = activity.date.split('T')[0];
        activities.push(activity);
      });
      setActivities(response);
      setLoading(false);
    });
  }, []);

  function handelSelectActivity(id: string) {
    setSelectedActivity(activities.find((x) => x.id === id));
  }

  // function handler
  function handelCancelSelectedActivity() {
    setSelectedActivity(undefined);
  }

  if (loading) {
    return <LoadingComponent content="Loading app" />;
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
          submitting={submitting}
        />
      </Container>
    </Fragment>
  );
}

export default App;
