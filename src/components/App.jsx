import React, { useEffect } from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import * as actions from "../actions/actions";
import NewsList from "./NewsList";
import Story from "./Story.jsx";
import { getNewNews } from "../services/news-api";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

const mapStateToProps = (state) => {
    return { stories: state.stories };
};

const actionCreators = {
    addLatestStories: actions.addLatestStories,
    addStory: actions.addStory,
    setBranchStatus: actions.setBranchStatus,
};

const App = ({ addLatestStories, addStory, setBranchStatus }) => {
    useEffect(() => {
        const getStories = async () => {
            const latestStoriesIDs = await getNewNews();
            addLatestStories({ latestStoriesIDs: latestStoriesIDs.slice(0, 100) });
            const data = JSON.parse(sessionStorage.getItem("branchesStatus"));
            const commentBranch = data ?? {};
            setBranchStatus({ commentBranch });
        };
        getStories().then(() => {});
    }, [addLatestStories, addStory, setBranchStatus]);

    return (
        <Router basename="/">
            <Header />
            <Switch>
                <Route path="/" exact component={NewsList} />
                <Route path="/:id" component={Story} />
            </Switch>
            <Footer />
        </Router>
    );
};

export default connect(mapStateToProps, actionCreators)(App);
