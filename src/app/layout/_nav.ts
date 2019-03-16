export const navItems = [
    {
        name: 'Bảng tổng hợp',
        url: '/dashboard',
        icon: 'icon-speedometer'
    },
    /*{
        name: 'Version',
        url: '/version',
        icon: 'icon-star'
    },*/
    {
        name: 'Chủ thú',
        url: '/mowner/owner',
        icon: 'cui-people'
    },
    {
        name: 'Quản lý thú',
        url: '/mpet',
        icon: 'icon-puzzle',
        children: [
            {
                name: 'Thú',
                url: '/mpet/pet',
                icon: 'icon-puzzle'
            },
            {
                name: 'Loài',
                url: '/mpet/species',
                icon: 'cui-graph'
            },
            {
                name: 'Giống',
                url: '/mpet/breed',
                icon: 'fa fa-sitemap'
            }
        ]
    },
    /*{
        name: 'Settings',
        url: '/#',
        icon: 'icon-settings',
    }*/
];
