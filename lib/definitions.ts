// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

import { StringValidation } from "zod";

export type Namespace = {
  id: number;
  name: string;
  uri: string;
  description: string;
  // 为了简化处理
  created: string;
  modified: string;
};

export enum DatabaseType {
  postgis = "postgis",
  sqlserver = "sqlserver"
}

export const initDatastore: Datastore = {
  id: -1,
  namespaceId: -1,
  name: "",
  description: "",
  type: DatabaseType.postgis,
  host: "",
  port: "",
  schema: "",
  database: "",
  user: "",
  password: "",
  maxConnections: -1,
  minConnections: -1,
  connectionTimeout: -1,
  validateConnections: true,
  fetchSize: -1
}

export type Datastore = {
  id: number;
  namespaceId: number;
  name: string;
  description: string;
  type: DatabaseType;
  host: string;
  port: string;
  schema: string;
  database: string;
  user: string;
  password: string;
  maxConnections: number;
  minConnections: number;
  connectionTimeout: number;
  validateConnections: boolean;
  fetchSize: number;
  created?: string;
  modified?: string;
};

export enum GeometryType {
  POINT = 1,
  LineString = 2,
  Polygon = 3,
  // 此处在服务端的处理中, 凡是不属于1,2,3的全给指定为Geometry
  Geometry = 4
}

export type VirtualView = {
  id: number | null;
  name?: string;
  sql: string;
  pkColumns: string;
  geometryColumn: string;
  geometryType: GeometryType;
  srid: number;
}

const initView: VirtualView = {
  id: null,
  sql: "",
  pkColumns: "id,",
  geometryColumn: "geom",
  geometryType: GeometryType.Geometry,
  srid: 3857
}

export type PyramidRuleExpression = {
  id: number | null;
  minLevel: number;
  maxLevel: number;
  filter: string;
}

const initPyramidRuleExpressions: PyramidRuleExpression[] = [{
  id: null,
  minLevel: 0,
  maxLevel: 5,
  filter: "EXCLUDE"
}]

export type FeatureLayer = {
  id?: number;
  namespaceId: number;
  spatialReferenceId: number | null;
  datastoreId: number;
  name: string;
  view: VirtualView;
  enabledRules: boolean;
  rules: PyramidRuleExpression[];
  description: string;
  created?: Date;
  modified?: Date;
}

export const initFeatureLayer: FeatureLayer = {
  namespaceId: -1,
  spatialReferenceId: null,
  datastoreId: -1,
  name: "",
  view: initView,
  enabledRules: false,
  rules: initPyramidRuleExpressions,
  description: ""
}