import React from 'react'

import Common from '../../components/common/Common'
import HomeBody from '../../components/body/HomeBody';

// 토큰이 있을 때 Home으로 이동
export default function Home() {
    const page= (
        <div>
            <HomeBody/>
        </div>
    )
    
    return (
        <>
            <Common page={page} />
        </>
    );
}

