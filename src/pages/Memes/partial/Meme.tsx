import {Card, Badge, Button, Modal} from 'antd';
import {PropsWithChildren, useState} from "react";
import {CommentOutlined, EllipsisOutlined, LikeOutlined, DeleteOutlined, EditOutlined} from '@ant-design/icons';
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../providers";

import {MemeModel} from "../../../models";
import {LikeService, MemeService} from "../../../services";
import {MemeForm} from "./MemeForm.tsx";

const {Meta} = Card;
export const Meme = (
    {
        meme,
        owner
    }: PropsWithChildren<{
        meme: Partial<MemeModel>,
        owner?: boolean
    }>) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const navigate = useNavigate();
    const auth = useAuth();
    const user: any = auth.getAccessToken();

    const handleLike = () => {
        LikeService.create({memeId: Number(meme.id), userId: user.id}).then(() => {
            window.location.reload();
        });
    }

    const handleComment = () => {
        return navigate(`/${meme.id}`);
    }

    const deleteMeme = () => {
        MemeService.delete(Number(meme.id)).then(() => {
            window.location.reload();
        });
    }

    const handleVisible = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <Card
            hoverable
            cover={<img alt={meme.title} src={meme.image}/>}
            actions={owner ? [<Button type="text" onClick={handleVisible}>
                <EditOutlined key="edit"/>
            </Button>,
                <Button type="text" onClick={deleteMeme} danger>
                    <DeleteOutlined key="delete"/>
                </Button>
            ] : [<Button type="text" onClick={handleComment}>
                <Badge size="small" count={meme.numberOfComments}>
                    <CommentOutlined key="comment"/>
                </Badge>
            </Button>
                ,
                <Button type="text" onClick={handleLike}>
                    <Badge size="small" count={meme.numberOfLikes}>
                        <LikeOutlined key="like"/>,
                    </Badge>
                </Button>,
                <Button type="text" onClick={handleComment}>
                    <EllipsisOutlined key="ellipsis"/>
                </Button>]}
        >
            <Meta title={meme.title}/>
            {isModalOpen && <Modal
                title="Editar Meme"
                open={isModalOpen}
                onCancel={handleVisible}
                footer={null}
            >
                <MemeForm meme={meme}/>
            </Modal>}
        </Card>
    );
}