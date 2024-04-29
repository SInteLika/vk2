import {Div, Group} from "@vkontakte/vkui";
import {useState} from "react";
import instance from "../../../../utils/instance.js";
import dayjs from "dayjs";

export default function Comment(props) {
    const [listComments, setListComments] = useState(null)
    const [isOpen, setIsOpen] = useState(false)

    async function fetchComments() {
        const listReq = props.kids.map(e => instance.get(`item/${e}.json`))
        const data = await Promise.all(listReq)
            .then(res => res.map(e => e.data))
        setListComments(data)
        setIsOpen(true)
    }

    function openAccordion() {
        setIsOpen(!isOpen)
        !listComments && fetchComments()
    }


    if (!props.kids) {
        return <Div>Ответы: (0)</Div>
    }


    return (<>

            <Div onClick={openAccordion}>Ответы: ({props.kids?.length}) Загрузить</Div>
            {isOpen && <Group>
                {
                    !listComments ? <Div>Загружаю...</Div>
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
            </Group>}

        </>
    )
}

