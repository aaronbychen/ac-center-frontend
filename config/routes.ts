export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {path: '/user/login', name: 'Log in', component: './User/Login'},
      {path: '/user/register', name: 'Register', component: './User/Register'}
    ],
  },
  {path: '/welcome', name: 'Welcome', icon: 'smile', component: './Welcome'},
  {
    path: '/admin',
    name: 'Admin Page',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {path: '/admin', redirect: '/admin/sub-page'},
      {path: '/admin/user-manage', name: 'User Manage', component: './Admin/UserManage'},
      //{path: '/admin/sub-page', name: '二级管理页', component: './Admin'},
    ],
  },
  {name: '查询表格', icon: 'table', path: '/list', component: './TableList'},
  {path: '/', redirect: '/welcome'},
  {path: '*', layout: false, component: './404'},
];
