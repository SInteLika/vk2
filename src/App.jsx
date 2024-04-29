import {Panel, PanelHeader, Root, View,} from "@vkontakte/vkui";
import '@vkontakte/vkui/dist/vkui.css'
import NewsList from "./components/NewsList/NewsList.jsx";
import './App.css'
import {useActiveVkuiLocation, useGetPanelForView} from "@vkontakte/vk-mini-apps-router";
import Post from "./components/Post/Post.jsx";


function App() {
    const { view: activeView } = useActiveVkuiLocation();
    const activePanel = useGetPanelForView('default_view');

    return (
        <Root activeView={activeView}>
            <View nav="default_view" activePanel={activePanel}>
                <Panel nav="home_panel">
                    <PanelHeader>Новости</PanelHeader>
                    <NewsList nav={''}/>
                </Panel>
                <Panel nav="post_panel">
                    <Post/>
                </Panel>
            </View>
        </Root>
    )
}

export default App
