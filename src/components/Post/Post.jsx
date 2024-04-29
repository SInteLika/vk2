import {Button, Card, Div, FormItem, Link, Title} from "@vkontakte/vkui";
import {RouterLink, useParams, useRouteNavigator} from "@vkontakte/vk-mini-apps-router";
import {useEffect, useState} from "react";
import dayjs from "dayjs";
import instance from "../../utils/instance.js";
import Comments from "./Comments/Comments.jsx";
import relativeTime from "dayjs/plugin/relativeTime";


export default function Post() {
    const {id} = useParams()
    const [story, setStory] = useState(null)
    const [isLoadingComments, setIsLoadingComments] = useState(false)
    const routeNavigator = useRouteNavigator()
    dayjs.extend(relativeTime)



    useEffect(() => {
        async function getStories() {
            const {data} = await instance.get(`item/${id}.json`)
            setStory(data)
        }
        getStories()

    }, [])

    async function getComments() {
        setIsLoadingComments(true)
        const {data} = await instance.get(`item/${id}.json`)
        data.kids && setStory({
            ...story,
            kids: data.kids
        })
        setIsLoadingComments(false)
    }

    if (!story) {
        return (
            <Card mode="shadow">
                <Div>Загружаю....</Div>
            </Card>
        )
    }

    return (
        <>
            <Card className={'story'} mode={"shadow"}>
                <Button className={'story__back'} size={"l"} appearance={'neutral'}
                        onClick={() => routeNavigator.back()}>Назад</Button>
                <Title className={'story__title'} level={2}>
                    {story.title}
                </Title>
                <Div>
                    <Div className={'story__link'}>
                        {story.url ?
                            <>Link: <RouterLink to={story.url}>{story.url}</RouterLink></>
                            : <Div dangerouslySetInnerHTML={{__html: story.text}}/>
                        }
                    </Div>
                    <Div className={'story__from'}>
                        <Div>From: {story.by}</Div>
                        <Div>{dayjs(story.time * 1000).fromNow()}</Div>
                        <Div className={'story__comments'}>
                            <Div>Comments: {story.kids?.length || 0}</Div>
                            <Button size={"s"} appearance={'neutral'} loading={isLoadingComments}
                                    onClick={() => getComments()}>Обновить</Button>
                        </Div>

                    </Div>

                </Div>
            </Card>
            {story.kids && <Card>
                <Title className={'story-comments__title'} level={1}>Comments </Title>
                <Comments comments={story.kids}/>
            </Card>
            }
        </>
    )

}
