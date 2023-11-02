import {
  mdiAccountCircle,
  mdiMonitor,
  mdiGithub,
  mdiLock,
  mdiAlertCircle,
  mdiSquareEditOutline,
  mdiTable,
  mdiViewList,
  mdiTelevisionGuide,
  mdiResponsive,
  mdiPalette,
  mdiReact
} from '@mdi/js'

export default [
  {
    to: '/dashboard',
    icon: mdiMonitor,
    label: 'Dashboard'
  },
  {
    to: '/admin/list-user',
    label: 'List User',
    icon: mdiTable
  },
  {
    to: '/admin/included-file',
    label: 'Included File',
    icon: mdiResponsive
  },
  {
    to: '/admin/template-postcard',
    label: 'Template Postcard',
    icon: mdiPalette
  },
  {
    to: '/admin/list-donation',
    label: 'List Donation',
    icon: mdiViewList
  },
  {
    to: '/admin/list-transaction',
    label: 'List Transaction',
    icon: mdiViewList
  },
]
