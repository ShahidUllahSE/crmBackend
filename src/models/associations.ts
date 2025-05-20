// import User from "./user.model";
// import Role from "./role.model";
// import Permission from "./permission.model";
// import RolePermission from "./rolePermission.model";

// // Role ↔ Permission (Many-to-Many)
// Role.belongsToMany(Permission, {
//   through: RolePermission,
//   foreignKey: "roleId",
//   otherKey: "permissionId",
//   as: "permissions",
// });

// Permission.belongsToMany(Role, {
//   through: RolePermission,
//   foreignKey: "permissionId",
//   otherKey: "roleId",
//   as: "roles",
// });

// // Role ↔ User (One-to-Many)
// Role.hasMany(User, { foreignKey: "roleId" }); // ✅ No alias here
// User.belongsTo(Role, { foreignKey: "roleId", as: "role" }); // ✅ Use alias only ONCE



import User from "./user.model";
import Role from "./role.model";
import Permission from "./permission.model";
import RolePermission from "./rolePermission.model";

// Relations
Role.belongsToMany(Permission, { through: RolePermission, foreignKey: "roleId" });
Permission.belongsToMany(Role, { through: RolePermission, foreignKey: "permissionId" });

Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });


