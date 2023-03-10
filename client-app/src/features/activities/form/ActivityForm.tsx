import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { Activity } from '../../../app/models/activity';
import { useStore } from '../../../app/stores/store';

export default observer(function ActivityForm() {
  const { activityStore } = useStore();
  const {
    selectedActivity,
    closeForm,
    createActivity,
    updateActivity,
    loading,
  } = activityStore;
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: '',
  };
  const [activity, setActivity] = useState(initialState);

  function handelSubmit() {
    console.log(activity);
    activity.id ? updateActivity(activity) : createActivity(activity);
  }

  function handelInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handelSubmit} autoComplete="off">
        <Form.Input
          value={activity.title}
          name="title"
          onChange={handelInputChange}
        />
        <Form.TextArea
          name="description"
          value={activity.description}
          onChange={handelInputChange}
        />
        <Form.Input
          name="category"
          onChange={handelInputChange}
          value={activity.category}
        />
        <Form.Input
          name="date"
          type="date"
          onChange={handelInputChange}
          value={activity.date}
        />
        <Form.Input
          name="city"
          onChange={handelInputChange}
          value={activity.city}
        />
        <Form.Input
          name="venue"
          onChange={handelInputChange}
          value={activity.venue}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="submit"
        />
        <Button
          floated="right"
          onClick={() => activityStore.closeForm()}
          type="button"
          content="cancel"
        />
      </Form>
    </Segment>
  );
});
