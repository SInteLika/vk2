import {Card, Div, Link, PanelHeader, Title} from "@vkontakte/vkui";
import {useEffect, useState} from "react";
import instance from "../../../utils/instance.js";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from 'dayjs/plugin/relativeTime'
import {RouterLink, useRouteNavigator} from "@vkontakte/vk-mini-apps-router";

export default function News(props) {
    const [news, setNews] = useState(null)
    dayjs.extend(relativeTime)

    useEffect(() => {
        async function getStories() {
            const {data} = await instance.get(`item/${props.news}.json`)
            console.log(12312)
            setNews(data)
        }
        getStories()
    }, [props.news])
    if (!news) {
        return (
            <Card mode="shadow">
                <Div>Загружаю....</Div>
            </Card>
        )
    }
    return (
        <Card className={'news'} mode="shadow">
            <Title className={'news__title'} level={2}>
                <RouterLink to={`${news.id}`}>{news.title}</RouterLink>
            </Title>
            <Div className={'news-about'}>
                <Div >From: {news.by}</Div>
                <Div>Rating: {news.score}</Div>
                <Div> {dayjs(news.time * 1000).fromNow()}</Div>
            </Div>
        </Card>
    )
}