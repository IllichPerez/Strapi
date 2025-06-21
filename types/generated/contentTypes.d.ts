import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    isEntryValid: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    belongs_to_the_church: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'api::church.church'
    >;
    firstname: Attribute.String;
    lastname: Attribute.String;
    birthdate: Attribute.Date;
    contributions: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::contribution.contribution'
    >;
    phone: Attribute.String;
    address: Attribute.String;
    baptized: Attribute.Boolean;
    ecclesiastical_level: Attribute.Enumeration<
      ['explorando', 'iniciado', 'avanzado', 'no se']
    >;
    identification_number: Attribute.String;
    em_theological_studies: Attribute.Text;
    em_profile: Attribute.String &
      Attribute.SetMinMaxLength<{
        maxLength: 120;
      }>;
    em_years_of_ministry: Attribute.Integer;
    em_ministerial_rank: Attribute.String;
    gender: Attribute.Enumeration<['hombre', 'mujer']>;
    em_title: Attribute.String;
    church: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::church.church'
    >;
    providerPicture: Attribute.String;
    providerAccountId: Attribute.String & Attribute.Private;
    providerName: Attribute.String;
    petitions: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::petition.petition'
    >;
    notes: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::note.note'
    >;
    mentorships: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::mentorship.mentorship'
    >;
    courses: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::course.course'
    >;
    ministries: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToMany',
      'api::ministry.ministry'
    >;
    ministry: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'api::ministry.ministry'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAnnouncementAnnouncement extends Schema.CollectionType {
  collectionName: 'announcements';
  info: {
    singularName: 'announcement';
    pluralName: 'announcements';
    displayName: 'announcement';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    church: Attribute.Relation<
      'api::announcement.announcement',
      'manyToOne',
      'api::church.church'
    >;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[A-Za-z0-9]{8}$';
        'disable-regenerate': true;
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[A-Za-z0-9]{8}$';
          'disable-regenerate': true;
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::announcement.announcement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::announcement.announcement',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiChurchChurch extends Schema.CollectionType {
  collectionName: 'churches';
  info: {
    singularName: 'church';
    pluralName: 'churches';
    displayName: 'churches';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    physical_address: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::church.church', 'name'>;
    members: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    posts: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'api::post.post'
    >;
    accepted_payment_methods: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'api::payment-method.payment-method'
    >;
    contributions: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'api::contribution.contribution'
    >;
    billing_address: Attribute.String;
    email: Attribute.Email & Attribute.Required;
    ministry_denomination: Attribute.String & Attribute.Required;
    phone: Attribute.String & Attribute.Required;
    schedules: Attribute.Text;
    dogmatic_description: Attribute.Text;
    ministries: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'api::ministry.ministry'
    >;
    day_off: Attribute.Enumeration<
      ['lunes', 'martes', 'miercoles', 'jueves', 'viermes', 'sabado', 'domingo']
    >;
    announcements: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'api::announcement.announcement'
    >;
    events: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'api::event.event'
    >;
    pastor: Attribute.Relation<
      'api::church.church',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '';
        'disable-regenerate': false;
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '';
          'disable-regenerate': false;
        }
      >;
    contribution_purpose: Attribute.Component<'components.contributions', true>;
    courses: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'api::course.course'
    >;
    prayers: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'api::prayer.prayer'
    >;
    petitions: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'api::petition.petition'
    >;
    mentorships: Attribute.Relation<
      'api::church.church',
      'oneToMany',
      'api::mentorship.mentorship'
    >;
    website: Attribute.String;
    logo: Attribute.Media;
    latitude: Attribute.Decimal;
    longitude: Attribute.Decimal;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::church.church',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::church.church',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContributionContribution extends Schema.CollectionType {
  collectionName: 'contributions';
  info: {
    singularName: 'contribution';
    pluralName: 'contributions';
    displayName: 'Contribution';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    user: Attribute.Relation<
      'api::contribution.contribution',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    church: Attribute.Relation<
      'api::contribution.contribution',
      'manyToOne',
      'api::church.church'
    >;
    payment_method: Attribute.Relation<
      'api::contribution.contribution',
      'oneToOne',
      'api::payment-method.payment-method'
    >;
    date: Attribute.Date & Attribute.Required;
    reference_number: Attribute.String & Attribute.Required;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'disable-regenerate': false;
        'uuid-format': '^\\d{10}$';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'disable-regenerate': false;
          'uuid-format': '^\\d{10}$';
        }
      >;
    confirmed: Attribute.Boolean;
    amount: Attribute.Float & Attribute.Required;
    destination: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::contribution.contribution',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::contribution.contribution',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCourseCourse extends Schema.CollectionType {
  collectionName: 'courses';
  info: {
    singularName: 'course';
    pluralName: 'courses';
    displayName: 'course';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    duration: Attribute.String;
    instructor: Attribute.String;
    format: Attribute.Enumeration<['Online', 'Presencial', 'H\u00EDbrido']>;
    seats: Attribute.BigInteger;
    church: Attribute.Relation<
      'api::course.course',
      'manyToOne',
      'api::church.church'
    >;
    cover: Attribute.Media;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[A-Za-z0-9]{8}$';
        'disable-regenerate': true;
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[A-Za-z0-9]{8}$';
          'disable-regenerate': true;
        }
      >;
    participants: Attribute.Relation<
      'api::course.course',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiEventEvent extends Schema.CollectionType {
  collectionName: 'events';
  info: {
    singularName: 'event';
    pluralName: 'events';
    displayName: 'Event';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    date: Attribute.Date;
    location: Attribute.String;
    church: Attribute.Relation<
      'api::event.event',
      'manyToOne',
      'api::church.church'
    >;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[A-Za-z0-9]{8}$';
        'disable-regenerate': true;
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[A-Za-z0-9]{8}$';
          'disable-regenerate': true;
        }
      >;
    image: Attribute.Media;
    time: Attribute.Time & Attribute.DefaultTo<'09:00'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::event.event',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMemberRequestMemberRequest extends Schema.CollectionType {
  collectionName: 'members_requests';
  info: {
    singularName: 'member-request';
    pluralName: 'members-requests';
    displayName: 'Members requests';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    content: Attribute.Text;
    member: Attribute.Relation<
      'api::member-request.member-request',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::member-request.member-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::member-request.member-request',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMentorshipMentorship extends Schema.CollectionType {
  collectionName: 'mentorships';
  info: {
    singularName: 'mentorship';
    pluralName: 'mentorships';
    displayName: 'mentorship';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    user: Attribute.Relation<
      'api::mentorship.mentorship',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[A-Za-z0-9]{8}$';
        'disable-regenerate': true;
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[A-Za-z0-9]{8}$';
          'disable-regenerate': true;
        }
      >;
    church: Attribute.Relation<
      'api::mentorship.mentorship',
      'manyToOne',
      'api::church.church'
    >;
    content: Attribute.Blocks;
    answer: Attribute.Blocks;
    read: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::mentorship.mentorship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::mentorship.mentorship',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiMinistryMinistry extends Schema.CollectionType {
  collectionName: 'ministries';
  info: {
    singularName: 'ministry';
    pluralName: 'ministries';
    displayName: 'ministry';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    church: Attribute.Relation<
      'api::ministry.ministry',
      'manyToOne',
      'api::church.church'
    >;
    members: Attribute.Relation<
      'api::ministry.ministry',
      'manyToMany',
      'plugin::users-permissions.user'
    >;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'disable-regenerate': true;
        'uuid-format': '^[A-Za-z0-9]{8}$';
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'disable-regenerate': true;
          'uuid-format': '^[A-Za-z0-9]{8}$';
        }
      >;
    admin: Attribute.Relation<
      'api::ministry.ministry',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::ministry.ministry',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::ministry.ministry',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNoteNote extends Schema.CollectionType {
  collectionName: 'notes';
  info: {
    singularName: 'note';
    pluralName: 'notes';
    displayName: 'note';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    source_id: Attribute.Integer;
    source_type: Attribute.String;
    content: Attribute.Text;
    user: Attribute.Relation<
      'api::note.note',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::note.note', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::note.note', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPaymentMethodPaymentMethod extends Schema.CollectionType {
  collectionName: 'payment_methods';
  info: {
    singularName: 'payment-method';
    pluralName: 'payment-methods';
    displayName: 'Payment methods';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::payment-method.payment-method',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPetitionPetition extends Schema.CollectionType {
  collectionName: 'petitions';
  info: {
    singularName: 'petition';
    pluralName: 'petitions';
    displayName: 'petition';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    user: Attribute.Relation<
      'api::petition.petition',
      'manyToOne',
      'plugin::users-permissions.user'
    >;
    church: Attribute.Relation<
      'api::petition.petition',
      'manyToOne',
      'api::church.church'
    >;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[A-Za-z0-9]{8}$';
        'disable-regenerate': true;
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[A-Za-z0-9]{8}$';
          'disable-regenerate': true;
        }
      >;
    answer: Attribute.Text;
    read: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::petition.petition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::petition.petition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts';
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    slug: Attribute.UID<'api::post.post', 'title'>;
    image: Attribute.Media;
    content: Attribute.Blocks;
    church: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'api::church.church'
    >;
    description: Attribute.Text;
    video: Attribute.String;
    category: Attribute.Relation<
      'api::post.post',
      'oneToOne',
      'api::post-category.post-category'
    >;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[A-Za-z0-9]{8}$';
        'disable-regenerate': true;
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[A-Za-z0-9]{8}$';
          'disable-regenerate': true;
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPostCategoryPostCategory extends Schema.CollectionType {
  collectionName: 'post_categories';
  info: {
    singularName: 'post-category';
    pluralName: 'post-categories';
    displayName: 'post category';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::post-category.post-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::post-category.post-category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPrayerPrayer extends Schema.CollectionType {
  collectionName: 'prayers';
  info: {
    singularName: 'prayer';
    pluralName: 'prayers';
    displayName: 'Prayer';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.Text;
    church: Attribute.Relation<
      'api::prayer.prayer',
      'manyToOne',
      'api::church.church'
    >;
    uuid: Attribute.UID<
      undefined,
      undefined,
      {
        'uuid-format': '^[A-Za-z0-9]{8}$';
        'disable-regenerate': true;
      }
    > &
      Attribute.CustomField<
        'plugin::strapi-advanced-uuid.uuid',
        {
          'uuid-format': '^[A-Za-z0-9]{8}$';
          'disable-regenerate': true;
        }
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::prayer.prayer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::prayer.prayer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiServiceService extends Schema.CollectionType {
  collectionName: 'services';
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'services';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSurveySurvey extends Schema.CollectionType {
  collectionName: 'surveys';
  info: {
    singularName: 'survey';
    pluralName: 'surveys';
    displayName: 'surveys';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    content: Attribute.Blocks;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::survey.survey',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::survey.survey',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::announcement.announcement': ApiAnnouncementAnnouncement;
      'api::church.church': ApiChurchChurch;
      'api::contribution.contribution': ApiContributionContribution;
      'api::course.course': ApiCourseCourse;
      'api::event.event': ApiEventEvent;
      'api::member-request.member-request': ApiMemberRequestMemberRequest;
      'api::mentorship.mentorship': ApiMentorshipMentorship;
      'api::ministry.ministry': ApiMinistryMinistry;
      'api::note.note': ApiNoteNote;
      'api::payment-method.payment-method': ApiPaymentMethodPaymentMethod;
      'api::petition.petition': ApiPetitionPetition;
      'api::post.post': ApiPostPost;
      'api::post-category.post-category': ApiPostCategoryPostCategory;
      'api::prayer.prayer': ApiPrayerPrayer;
      'api::service.service': ApiServiceService;
      'api::survey.survey': ApiSurveySurvey;
    }
  }
}
