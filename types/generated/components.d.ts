import type { Schema, Attribute } from '@strapi/strapi';

export interface ComponentsContributions extends Schema.Component {
  collectionName: 'components_components_contributions';
  info: {
    displayName: 'Contributions';
    description: '';
  };
  attributes: {
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'components.contributions': ComponentsContributions;
    }
  }
}
