import React from 'react'

import Common from '../../components/common/Common'
import HomeBody from '../../components/body/HomeBody';

// 토큰이 있을 때 Home으로 이동
export default function Home() {
    const pageTitle = 'HOME PAGE';
    const pageDesc = `직무 트렌드, 다양한 직무의 사람들과의 네트워킹으로 누구나 쉽고 간편하게 성장할 수 있는 커뮤니티`;

    const page= (
        <div>
            <HomeBody/>
        </div>
    )
    
    return (
        <>
            <Common page={page} title={pageTitle} desc={pageDesc} />
        </>
    );
}

