// webapi地址
const api = {
  login: '/api/auth/login',
  refresh: '/api/auth/refresh', // 刷新token
  menuList: '/api/auth/menuList', // 权限列表
  users: 'api/users', // 所有用户
  usersId: 'api/users/{userId}', // 用户id
  user: 'api/user', // 单个用户
  usersRoles: 'api/users/{userId}/roles', // 用户角色
  usersClaims: 'api/users/{userId}/claims', // 用户权限
  roles: 'api/roles', // 角色
  rolesId: 'api/roles/{roleId}', // 角色Id
  roleClaims: 'api/roles/{roleId}/claims', // 角色权限
  rolesTree: 'api/rolesTree', // 角色树
  claimsTree: 'api/claimsTree', // 权限树
}

export default api
