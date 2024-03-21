import type { FC } from 'react';

import '../styles/layout.less';

import { Layout } from 'antd';
import { Suspense } from 'react';
import { Outlet } from 'react-router';
import SearchBar from './SearchBar';

const { Sider, Content } = Layout;
const WIDTH = 992;

const LayoutPage: FC = () => {
    return (
        <Layout className="layout-page">
            <SearchBar />
            <div className="layout-page-content">
                <Suspense fallback={null}>
                    <div
                        style={{
                            width: '100%',
                            padding: '20px',
                            height:'100%',
                        }}
                    >
                        <Outlet />
                    </div>
                </Suspense>
            </div>
        </Layout>
    );
};

export default LayoutPage;