import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AppWithRedux from "./AppWithRedux";
import {Provider} from "react-redux";
import {AppRootState, store} from "./store";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../features/Todolists/tasks-reducer";
import {todolistsReducer} from "../features/Todolists/todolists-reducer";
import {v1} from "uuid";
import {BrowserRouterDecorator, ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
  title: 'Todolists/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator, BrowserRouterDecorator]
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof AppWithRedux>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof AppWithRedux> = (args) =><AppWithRedux/>

export const AppWithReduxRender = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args




