import {useState} from "react";
import {Tabs, Row, Col, Button, Modal} from 'antd';
import type {TabsProps} from 'antd';
import {Memes} from "./partial/Memes";
import {MyMemes} from './partial/MyMemes';
import {useAuth} from "../../providers";
import {MemeForm} from "./partial/MemeForm";

export const Meme = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const auth = useAuth();
    const user: any = auth.getAccessToken();

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Todos',
            children: <Memes/>
        },
        {
            key: '2',
            label: 'Mis Memes',
            children: <MyMemes/>
        }
    ];

    const handleVisible = () => {
        setIsModalOpen(!isModalOpen);
    }


    return (<div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div className="w-full max-w-2xl mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <div className="w-full">
                <Row>
                    <Col span={12} className="font-bold">
                        Bienvenido!! {user.name}
                    </Col>
                    <Col span={12}>
                        <Button type="primary" className="float-right" onClick={handleVisible}>
                            Crear Meme
                        </Button>
                    </Col>
                </Row>
            </div>
            <Tabs items={items} />
        </div>
        <Modal
            title="Crear Meme"
            open={isModalOpen}
            onCancel={handleVisible}
            footer={null}
        >
            <MemeForm/>
        </Modal>
    </div>);
}