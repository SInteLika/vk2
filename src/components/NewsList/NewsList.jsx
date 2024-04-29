import {Button} from "@vkontakte/vkui";
import {useEffect, useState} from "react";
import instance from "../../utils/instance.js";
import News from "./News/News.jsx";

export default function NewsList() {
    const [stories, setStories] = useState(null)
    const [isLoadingNews, setIsLoadingNews] = useState(false)

    async function getStories() {
        setIsLoadingNews(true)
        setStories(null)
        const {data} = await instance.get('newstories.json')
        data.length = 100
        setStories(data)
        setIsLoadingNews(false)
    }


    useEffect(() => {
        getStories()
        const intervalId = setInterval(getStories, 60 * 1000)
        return () => {clearTimeout(intervalId)}
    }, [])
    return (
        <>
            <Button size={"s"} appearance={'neutral'} loading={isLoadingNews}
                    onClick={() => getStories()}>Обновить</Button>
            {
                stories && stories.map((e) => <News news={e} key={e}/>)
            }
        </>
    )
}





