import React from 'react'
import {Icon} from 'antd';

function Footer() {
    return (
        <div style={{
            height: '80px', display: 'flex',
            flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', fontSize:'1rem'
        }}>
           <p><Icon type="youtube" spin="true" /> Happy Coding  <Icon type="smile" spin="true" /></p>
        </div>
    )
}

export default Footer
