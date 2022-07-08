import React from 'react';
import { useState } from 'react';
import { Tabs, Tab, Container } from 'react-bootstrap';
import AllStatus from './AllStatus';
import CanlStatus from './CanlStatus';
import DoinStatus from './DoinStatus';
import DoneStatus from './DoneStatus';
import PainStatus from './PainStatus';
import PrssStatus from './PrssStatus';


function BillList(props) {
    const [key, setKey] = useState('all');
    return (
        <Container className="mt-5">
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="mb-3"
            >
                <Tab eventKey="all" title="Tất cả">
                    <AllStatus />
                </Tab>
                <Tab eventKey="pain" title="Chờ thanh toán">
                    <PainStatus />
                </Tab>
                <Tab eventKey="prss" title="Đang xử lý">
                    <PrssStatus />
                </Tab>
                <Tab eventKey="doin" title="Đang vận chuyển">
                    <DoinStatus />
                </Tab>
                <Tab eventKey="done" title="Đã giao">
                    <DoneStatus />
                </Tab>
                <Tab eventKey="canl" title="Đã hủy">
                    <CanlStatus />
                </Tab>
            </Tabs>
        </Container>
    );
}

export default BillList;