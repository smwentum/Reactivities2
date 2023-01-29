import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import ActivityStore from '../stores/activityStore';
import { useStore } from '../stores/store';

export default function NavBar() {
  const { activityStore } = useStore();

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: '10px' }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities"></Menu.Item>
        <Menu.Item name="Create Activity">
          <Button
            onClick={() => activityStore.openForm()}
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
}
