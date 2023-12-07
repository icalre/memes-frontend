import {useState} from "react";
import {useParams} from "react-router-dom";
import {MemeService, CommentService, LikeService} from "../../services";
import {useEffect} from "react";
import {MemeModel} from "../../models";
import {Badge, Button, Modal, Input, Avatar, List, Pagination} from "antd";
import {CommentOutlined, LikeOutlined} from "@ant-design/icons";
import {useAuth} from "../../providers";

const {TextArea} = Input;
export const Show = () => {
    const {id} = useParams();
    const [meme, setMeme] = useState<MemeModel>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const auth = useAuth();
    const user: any = auth.getAccessToken();
    const [text, setText] = useState('');
    const [comments, setComments] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        MemeService.get(Number(id)).then((response) => {
            setMeme(response.data.data);
        });

        getComments(1,5);
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleLike = () => {
        LikeService.create({memeId: Number(id), userId: user.id}).then(() => {
            window.location.reload();
        });
    }

    const saveComment = () => {
        CommentService.create({text, memeId: Number(id), userId: user.id}).then(() => {
            setText('');
            handleOpenModal();
            window.location.reload();
        });
    }

    const getComments = (page:number, limit:number) => {
        CommentService.all(page,limit,Number(id)).then((response) => {
            setComments(response.data.data.data);
            setTotal(response.data.data.total);
        });
    }

    const handleChange = (page: number, pageSize: number) => {
        setPage(page);
        setLimit(pageSize);
        getComments(page, pageSize);
    }

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="w-full max-w-2xl mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                <h1 className="font-bold">{meme?.title}</h1>
                <div className="m-2">
                    <img src={meme?.image} alt={meme?.title}/>
                </div>
                <div className="m-2">
                    <Button type="text" onClick={handleOpenModal}>
                        <CommentOutlined key="comment"/>
                    </Button>
                    <Button type="text" onClick={handleLike}>
                        <Badge size="small" count={meme?.numberOfLikes}>
                            <LikeOutlined key="like"/>,
                        </Badge>
                    </Button>
                </div>
                <div className="m-2">
                    <List
                        itemLayout="horizontal"
                        dataSource={comments}
                        renderItem={(item:any, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`} />}
                                    title={item.user.name}
                                    description={item.text}
                                />
                            </List.Item>
                        )}
                    />
                    <Pagination className="mt-3 mb-3" defaultCurrent={page} current={page} total={total} pageSize={limit}
                                showSizeChanger
                                onChange={handleChange}/>
                </div>
            </div>
            {isModalOpen && <Modal title="Comentario"
                                   open={isModalOpen}
                                   onOk={saveComment}
                                   onCancel={handleOpenModal}>
                <TextArea rows={4} onChange={(e) => setText(e.target.value)}/>
            </Modal>}
        </div>

    );
}