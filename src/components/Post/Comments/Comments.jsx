import {Div } from "@vkontakte/vkui";
import {useEffect, useState} from "react";
import instance from "../../../utils/instance.js";
import dayjs from "dayjs";
import Comment from "./Comment/Comment.jsx";

export default function Comments(props) {
    const [listComments, setListComments] = useState(null)

    async function fetchComments() {
        const listReq = props.comments.map(e => instance.get(`item/${e}.json`))
        const data = await Promise.all(listReq)
            .then(res => res.map(e => e.data))
        setListComments(data)
    }

    useEffect(() => {
        setListComments(null)
        fetchComments()
    }, [props.comments])

    return (
        <>
            {!listComments ? <Div>Загружаю...</Div>
                : listComments.map(e => {
                    return <Div key={e.id} className={'comments'}>
                            <Div dangerouslySetInnerHTML={{__html: e.text}}/>
                        <Div>From: {e.by}</Div>
                        <Div>{dayjs(e.time * 1000).fromNow()}</Div>
                            <Div>
                                <Comment kids={e.kids}/>
                            </Div>
                        </Div>
                })
            }
        </>
    )
}



