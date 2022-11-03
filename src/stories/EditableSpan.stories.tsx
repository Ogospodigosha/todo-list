import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Button } from './Button';
import {AddItemForm} from "../Components/AddItemForm";
import {action} from "@storybook/addon-actions";
import {Task} from "../Task";
import {InArrayProps} from "../Todolist";
import {EditableSpan} from "../Components/EditableSpan";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Todolists/EditableSpan',
  component: EditableSpan,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  args: {
    title: "this title can be changed",
    onChange: action('title was changed')
  },
} as ComponentMeta<typeof EditableSpan>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof EditableSpan> = (args) => <EditableSpan {...args} />;

export const EditableSpanChanged = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
EditableSpanChanged.args = {

};



