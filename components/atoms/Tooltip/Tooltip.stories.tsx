import React from 'react';
import { Tooltip } from './Tooltip';

const meta = {
  title: 'Atoms/Tooltip',
  component: Tooltip,
};

export default meta;

export const Default = {
  render: () => (
    <Tooltip content="Helper info text" side="top">
      <button className="px-4 py-2 bg-canvas-recessed rounded-md">Hover / Focus Me</button>
    </Tooltip>
  ),
};
