module.exports = {
    dest: 'public',
    title: 'FLIGHTAPPGQ',
    base: '/flightappgq/mantis/',
    description: 'dev tool',
    themeConfig: {
        nav: [
            {test: '整体阶段', link: '/stage/introduce'},
            {text: 'issueFormat', link: '/issueFormat/introduction'},
            {text: 'mantis', link: '/mantis/introduction'},
            {text: 'CI/CD', link: '/CI/introduction'}
        ],
        sidebar: [
            {
                title: '整体阶段',
                collapsable: true,
                children: [
                    '/stage/introduce'//简介
                ]
            },
            {
                title: 'issueFormat',
                collapsable: true,
                children: [
                    '/issueFormat/introduction',//简介
                    '/issueFormat/step' // 操作步骤
                ]
            },
            {
                title: 'mantis',
                collapsable: true,
                children: [
                    '/mantis/introduction', // 简介
                    '/mantis/install.md', // 安装
                    '/mantis/step' // 操作步骤
                ]
            },
            {
                title: 'CI',
                collapsable: true,
                children: [
                    '/CI/install', //安装
                    '/CI/introduction' //简介
                ]
            }
        ]
    }
}
