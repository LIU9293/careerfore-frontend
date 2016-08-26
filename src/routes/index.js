import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute, Link } from 'react-router';
import APP from '../components/APP';
import NotFound from '../components/404/NotFound';

//main app components
import Activity from '../components/activity/';
import ActivityDetail from '../components/activity/activityDetail';
import Discover from '../components/discover/';
import NewArticle from '../components/discover/newArticle';
import DiscoverDetail from '../components/discover/discoverDetail';
import Login from '../components/profile/login';
import Register from '../components/profile/register';
import MyHome from '../components/profile/home';
import Simditor from '../components/discover/PostArticle';
import Draft from '../components/common/draft';
import SubmitPosts from '../components/discover/SubmitPost';
import Search from '../components/common/searchPage';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={APP}>
      <Route path="/activity" component={Activity} />
      <Route path="/new" component={Simditor} />
      <Route path="/draft" component={Draft} />
      <Route path="/activity/:activityID" component={ActivityDetail} />
      <Route path="/discover" component={Discover} />
      <Route path="/discover/new" component={NewArticle} />
      <Route path="/discover/:discoverID" component={DiscoverDetail} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={MyHome} />
      <Route path="/submitpost" component = {SubmitPosts} />
      <Route path="/search" component={Search} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
