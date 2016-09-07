import React, { PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import APP from '../components/APP';
import NotFound from '../components/404/NotFound';

//main app components
import Activity from '../components/activity/';
import ActivityDetail from '../components/activity/activityDetail';
import Discover from '../components/discover/';
import DiscoverDetail from '../components/discover/discoverDetail';
import Login from '../components/profile/login';
import Register from '../components/profile/register';
import MyHome from '../components/profile/home';
import Simditor from '../components/discover/PostArticle';
import SubmitPosts from '../components/discover/SubmitPost';
import Search from '../components/common/searchPage';
import Essence from '../components/discover/essence';
import DiscoverTopicList from '../components/discover/discoverTopicList';
import ActivityListByCity from '../components/activity/activityListByCity';
import Notify from '../components/activity/notifyAliPay';

const Routes = ({ history }) =>
  <Router history={history}>
    <Route path="/" component={APP}>
      <IndexRoute component={Discover} />
      <Route path="/activity" component={Activity} />
      <Route path="/new" component={SubmitPosts} />
      <Route path="/activity/:activityID" component={ActivityDetail} />
      <Route path="/activity/city/:cityID" component={ActivityListByCity} />
      <Route path="/discover" component={Discover} />
      <Route path="/discover/:discoverID" component={DiscoverDetail} />
      <Route path="/discover/topic/:id" component={DiscoverTopicList} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/profile" component={MyHome} />
      <Route path="/submitpost" component = {SubmitPosts} />
      <Route path="/search" component={Search} />
      <Route path="/a" component={Essence} />
      <Route path="/alipay/create_direct_pay_by_user/return_url" component = {Notify} />
    </Route>
    <Route path="*" component={NotFound} />
  </Router>;

Routes.propTypes = {
  history: PropTypes.any,
};

export default Routes;
