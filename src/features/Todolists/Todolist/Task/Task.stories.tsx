import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';


import {Task} from "./Task";
import {TaskPriorities, TaskStatuses} from "../../../../api/Todolists-api";
import {ReduxStoreProviderDecorator} from "../../../../app/ReduxStoreProviderDecorator";


// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolists/Task',
  component: Task,
  decorators: [ReduxStoreProviderDecorator],
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    todolistId: "1",
    el: {id:"айди таски", title:'Html', status: TaskStatuses.Completed, description: "",
      completed: true, deadline:'', priority: TaskPriorities.Low, startDate:'', addedDate: '', order:0, todoListId:"1", entityStatus:"idle"}
  },
} as ComponentMeta<typeof Task>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Task> = (args) => <Task {...args} />;

export const TaskIsDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsDoneStory.args = {

};

export const TaskIsNotDoneStory = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
TaskIsNotDoneStory.args = {
    el: {id:"айди таски", title:'Html', status: TaskStatuses.New, description: "",
      completed: true, deadline:'', priority: TaskPriorities.Low, startDate:'', addedDate: '', order:0, todoListId:"1", entityStatus:"idle"}
};


