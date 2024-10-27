const SUCCESS_MSG = "Success";
const FAILURE_MSG = "Failure";

const MAINTENANCE_PROCEDURE_CREATED = "Maintenance Procedure Created";
const MAINTENANCE_PROCEDURE_DELETED = "Maintenance Procedure Deleted";
const MAINTENANCE_PROCEDURE_UPDATED = "Maintenance Procedure Updated";

const VEHICLE_CREATED = "Vehicle Created";
const VEHICLE_DELETED = "Vehicle Deleted";
const VEHICLE_UPDATED = "Vehicle Updated";

const DATABASE_FAILURE = "Database Failure";
const BAD_REQUEST = "Bad Request";
const FORBIDDEN = "Forbidden Resource";
const UNAUTHORIZED = "Unauthorized";
const BAD_GATEWAY = "Bad Gateway";

const ENTRY_CREATED = "Entry Created";
const ENTRY_DELETED = "Entry Deleted";
const ENTRY_UPDATED = "Entry Updated";

const SUCCESSFUL_ENTRY_CREATED_CODE = 201;
const SUCCESSFUL_ENTRY_UPDATED_CODE = 200;
const SUCCESSFUL_ENTRY_DELETED_CODE = 200;
const SUCCESSFUL_ENTRY_GET_CODE = 200;
const DATABASE_FAILURE_CODE = 404;
const BAD_REQUEST_CODE = 400;
const FORBIDDEN_CODE = 403;
const UNAUTHORIZED_CODE = 401;
const BAD_GATEWAY_CODE = 502;

export const RESPONSE_DATA = {
  SUCCESS_MSG: SUCCESS_MSG,
  FAILURE_MSG: FAILURE_MSG,

  BAD_GATEWAY: BAD_GATEWAY,
  BAD_GATEWAY_CODE: BAD_GATEWAY_CODE,

  ENTRY_CREATED: ENTRY_CREATED,
  ENTRY_DELETED: ENTRY_DELETED,
  ENTRY_UPDATED: ENTRY_UPDATED,

  MAINTENANCE_PROCEDURE_CREATED: MAINTENANCE_PROCEDURE_CREATED,
  MAINTENANCE_PROCEDURE_DELETED: MAINTENANCE_PROCEDURE_DELETED,
  MAINTENANCE_PROCEDURE_UPDATED: MAINTENANCE_PROCEDURE_UPDATED,

  VEHICLE_CREATED: VEHICLE_CREATED,
  VEHICLE_UPDATED: VEHICLE_UPDATED,
  VEHICLE_DELETED: VEHICLE_DELETED,

  DATABASE_FAILURE: DATABASE_FAILURE,
  BAD_REQUEST: BAD_REQUEST,
  FORBIDDEN: FORBIDDEN,
  UNAUTHORIZED: UNAUTHORIZED,

  SUCCESSFUL_ENTRY_CREATED_CODE: SUCCESSFUL_ENTRY_CREATED_CODE,
  SUCCESSFUL_ENTRY_UPDATED_CODE: SUCCESSFUL_ENTRY_UPDATED_CODE,
  SUCCESSFUL_ENTRY_DELETED_CODE: SUCCESSFUL_ENTRY_DELETED_CODE,
  SUCCESSFUL_ENTRY_GET_CODE: SUCCESSFUL_ENTRY_GET_CODE,
  DATABASE_FAILURE_CODE: DATABASE_FAILURE_CODE,
  BAD_REQUEST_CODE: BAD_REQUEST_CODE,
  FORBIDDEN_CODE: FORBIDDEN_CODE,
  UNAUTHORIZED_CODE: UNAUTHORIZED_CODE,
};
