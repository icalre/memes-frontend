import {useEffect, useState} from "react";
import {MemeModel} from "../../../models";
import {MemeService} from "../../../services";
import {Pagination, Row, Col} from "antd";
import {Meme} from "./Meme";

export const Memes = () => {

    const [memes, setMemes] = useState<MemeModel[]>([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        getMemes(1, 5);
    }, []);

    const getMemes = (page: number, limit: number) => {
        MemeService.all(page, limit).then((response) => {
            setTotal(response.data.data.total);
            setMemes(response.data.data.data);
        });
    }

    const handleChange = (page: number, pageSize: number) => {
        setPage(page);
        setLimit(pageSize);
        getMemes(page, pageSize);
    }

    return (
        <div>
            <Row>
                {
                    memes.map((meme: MemeModel) => {
                        return (
                            <Col span={8} key={meme.id} className="m-2">
                                <Meme  meme={meme}/>
                            </Col>
                        );
                    })
                }
            </Row>
            <Pagination className="mt-3 mb-3" defaultCurrent={page} current={page} total={total} pageSize={limit}
                        showSizeChanger
                        onChange={handleChange}/>
        </div>

    );
}