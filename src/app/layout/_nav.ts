export const navItems = [
    {
        name: 'Bảng tổng hợp',
        url: '/admin/dashboard',
        icon: 'icon-speedometer'
    },
    {
        name: 'Giỏ hàng',
        url: '/admin/cart',
        icon: 'fa fa-cart-plus'
    },
    {
        name: 'Đơn hàng',
        url: '/admin/order',
        icon: 'fa fa-gavel',
        children: [
            {
                name: 'Tất cả',
                url: '/admin/order/pet',
                icon: 'fa fa-folder'
            },
            {
                name: 'Chờ báo giá',
                url: '/admin/order/species',
                icon: 'fa fa-folder'
            },
            {
                name: 'Chờ đặt cọc',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Đang mua hàng',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Đã mua hàng',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Người bán giao',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Kho THQC nhận',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Trên đường về VN',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Trong kho VN',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Đang giao hàng',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Đã trả hàng',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Thanh lý',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            },
            {
                name: 'Đơn hủy',
                url: '/admin/order/breed',
                icon: 'fa fa-folder'
            }
        ]
    },
    {
        name: 'Kiện hàng',
        url: '/#',
        icon: 'fa fa-cubes',
    },
    {
        name: 'Ví điện tử',
        url: '/#',
        icon: 'fa fa-money',
    }
];
