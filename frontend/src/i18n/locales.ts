export const messages = {
  zh: {
    birthday: {
      title: '生日提醒',
      date: '{month}月{day}日',
      countdown: '{days} 天后过生日',
      manage: '管理',
      addBirthday: '添加生日',
      noBirthdays: '暂无生日信息',
      edit: '编辑',
      delete: '删除',
      lunarDate: '农历',
      solarDate: '公历',
      editBirthday: '编辑生日',
      saveFailed: '保存失败',
      deleteFailed: '删除失败',
      confirmDelete: '确定要删除这个生日吗？'
    }
  },
  en: {
    birthday: {
      title: 'Birthday Reminder',
      date: '{month} {day}',
      countdown: '{days} Days Until Birthday',
      manage: 'Manage',
      addBirthday: 'Add Birthday',
      noBirthdays: 'No birthdays yet',
      edit: 'Edit',
      delete: 'Delete',
      lunarDate: 'Lunar',
      solarDate: 'Solar',
      editBirthday: 'Edit Birthday',
      saveFailed: 'Failed to save',
      deleteFailed: 'Failed to delete',
      confirmDelete: 'Are you sure you want to delete this birthday?'
    }
  }
};

export type Locale = 'zh' | 'en';
export type MessageKey = keyof typeof messages.zh.birthday; 