import React from 'react';
import { Route, Redirect, useRouteMatch, useParams } from 'react-router-dom';
import Header from '../components/Header/Header';
import LinkView from '../components/CardLink/LinkView.js';
import Footer from '../components/Footer.js';
import PageWrapper from '../components/PageWrapper.js';

function LinkViewWrapper(props) {
    const { templateId } = useParams();
    return <LinkView history={props.history} templateId={templateId} />;
}
export default function Card(props) {
    const { url } = useRouteMatch();

    return (
        <div>
            <Route exact path={url}>
                <Redirect to='/explore' />
            </Route>
            <Route exact path={`${url}/`}>
                <Redirect to='/explore' />
            </Route>
            <Route path={`${url}/:templateId`}>
                <PageWrapper>
                    <Header history={props.history} />
                    <LinkViewWrapper />
                </PageWrapper>
                <Footer />
            </Route>
        </div>
    );
}
