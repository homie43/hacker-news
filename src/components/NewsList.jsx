import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/actions";
import { getNewNews } from "../services/news-api";
import StoryPreview from "./StoryPreview.jsx";
import LazyLoad from "react-lazyload";
import StoryPreviewPlaceholder from "./StoryPreviewPlaceholder";

const mapStateToProps = (state) => {
    return { stories: state.stories, ui: state.ui };
};

const actionCreators = {
    addLatestStories: actions.addLatestStories,
};

const NewsList = ({ stories, addLatestStories }) => {
    const [seconds, setSeconds] = useState(59);

    // Таймер
    useEffect(() => {
        let timer;
        if (seconds > 0) {
            timer = setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            handleUpdateStoriesIDs().then(() => setSeconds(59));
        }

        return () => {
            clearTimeout(timer);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setSeconds, seconds]);

    // обновит новости
    const handleUpdateStoriesIDs = async () => {
        const latestStoriesIDs = await getNewNews();
        addLatestStories({ latestStoriesIDs: latestStoriesIDs.slice(0, 100) });
        setSeconds(59);
    };

    const renderNews = () =>
        stories.latestStoriesIDs.map((storyID) => (
            <LazyLoad
                key={storyID}
                placeholder={<StoryPreviewPlaceholder />}
                offset={300}
            >
                <StoryPreview key={storyID} id={storyID} />
            </LazyLoad>
        ));

    return (
        <main>
            <h2>LATEST NEWS</h2>
            <div className="refresh-btn-wrapper">
                <button
                    className="button button-animated"
                    onClick={handleUpdateStoriesIDs}
                >
                    <span>
                        <span>Refresh {seconds}</span>
                    </span>
                </button>
            </div>
            <section className="stories-list">{renderNews()}</section>
        </main>
    );
};

export default connect(mapStateToProps, actionCreators)(NewsList);
