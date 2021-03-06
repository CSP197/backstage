/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import {
  ApiProvider,
  ApiRegistry,
  appThemeApiRef,
  AppThemeSelector,
  configApiRef,
  ConfigReader,
  FeatureFlags,
  featureFlagsApiRef,
  Sidebar,
  SidebarDivider,
  SidebarSpace,
} from '@backstage/core';
import { MemoryRouter } from 'react-router';
import { Settings } from './Settings';
import { SettingsPage } from './SettingsPage';

export default {
  title: 'Plugins/user-settings/Settings',
  component: Settings,
  decorators: [
    (storyFn: () => JSX.Element) => (
      <MemoryRouter initialEntries={['/']}>{storyFn()}</MemoryRouter>
    ),
  ],
};

export const SidebarItem = () => (
  <Sidebar>
    <SidebarSpace />
    <SidebarDivider />
    <Settings />
  </Sidebar>
);

const createConfig = () =>
  ConfigReader.fromConfigs([
    {
      context: '',
      data: {
        auth: {
          providers: {},
        },
      },
    },
  ]);

const config = createConfig();

const apis = ApiRegistry.from([
  [configApiRef, config],
  [featureFlagsApiRef, new FeatureFlags()],
  [appThemeApiRef, AppThemeSelector.createWithStorage([])],
]);

export const TheSettingsPage = () => (
  <div style={{ border: '1px solid #ddd' }}>
    <ApiProvider apis={apis}>
      <SettingsPage />
    </ApiProvider>
  </div>
);
